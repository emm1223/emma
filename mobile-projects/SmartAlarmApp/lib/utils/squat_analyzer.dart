import 'dart:math' as math;
import 'package:google_mlkit_pose_detection/google_mlkit_pose_detection.dart';
import 'package:smart_alarm_app/models/pose_model.dart';

/// Analizador robusto de sentadillas con máquina de estados
/// Usa trigonometría para calcular ángulos y valida la postura
class SquatAnalyzer {
  // Umbrales de confianza y ángulos
  static const double CONFIDENCE_THRESHOLD = 0.6;
  static const double STANDING_ANGLE_THRESHOLD = 160.0;
  static const double SQUATTING_ANGLE_THRESHOLD = 100.0;
  static const double HYSTERESIS_STANDING = 165.0; // Para evitar oscilaciones
  static const double HYSTERESIS_SQUATTING = 95.0;

  // Estado interno
  SquatState _currentState = SquatState.standing;
  bool _lastWasStanding = true;

  SquatAnalyzer();

  /// Análisis completo de pose
  /// Retorna objeto con validación, ángulos y estado actual
  PoseAnalysis analyzePose(List<PoseLandmark> landmarks) {
    // Validar puntos clave (6 puntos para las piernas)
    final validation = _validateBodyParts(landmarks);

    if (!validation['isValid']) {
      return PoseAnalysis(
        landmarks: landmarks,
        isValid: false,
        validationMessage: validation['message']!,
      );
    }

    // Extraer landmarks clave
    final leftHip = _getLandmark(landmarks, PoseLandmarkType.leftHip);
    final leftKnee = _getLandmark(landmarks, PoseLandmarkType.leftKnee);
    final leftAnkle = _getLandmark(landmarks, PoseLandmarkType.leftAnkle);
    final rightHip = _getLandmark(landmarks, PoseLandmarkType.rightHip);
    final rightKnee = _getLandmark(landmarks, PoseLandmarkType.rightKnee);
    final rightAnkle = _getLandmark(landmarks, PoseLandmarkType.rightAnkle);

    // Calcular ángulos de rodilla (ambas piernas)
    final leftKneeAngle = _calculateJointAngle(leftHip, leftKnee, leftAnkle);
    final rightKneeAngle = _calculateJointAngle(rightHip, rightKnee, rightAnkle);

    // Promediar los ángulos de ambas piernas
    final averageKneeAngle = (leftKneeAngle.angle + rightKneeAngle.angle) / 2;

    // Determinar estado actual basado en ángulo
    final newState = _determineState(averageKneeAngle);

    return PoseAnalysis(
      landmarks: landmarks,
      isValid: true,
      validationMessage: "Postura válida",
      currentState: newState,
      kneeAngleDegrees: averageKneeAngle,
    );
  }

  /// Procesa el análisis y actualiza el contador de sentadillas
  /// Retorna true si debe incrementarse el contador
  bool processSquatCount(PoseAnalysis analysis) {
    if (!analysis.isValid) {
      _lastWasStanding = false; // Resetear el ciclo
      return false;
    }

    final currentState = analysis.currentState ?? _currentState;
    _currentState = currentState;

    // Máquina de estados: solo cuenta si completa el ciclo STANDING -> SQUATTING -> STANDING
    bool shouldIncrement = false;

    if (currentState == SquatState.standing && !_lastWasStanding) {
      // Completó el ciclo: volvió a posición de pie desde sentadilla
      shouldIncrement = true;
      _lastWasStanding = true;
    } else if (currentState == SquatState.squatting) {
      _lastWasStanding = false;
    }

    return shouldIncrement;
  }

  /// Valida que los 6 puntos clave estén visibles con confianza > 0.6
  Map<String, dynamic> _validateBodyParts(List<PoseLandmark> landmarks) {
    final requiredPoints = [
      PoseLandmarkType.leftHip,
      PoseLandmarkType.leftKnee,
      PoseLandmarkType.leftAnkle,
      PoseLandmarkType.rightHip,
      PoseLandmarkType.rightKnee,
      PoseLandmarkType.rightAnkle,
    ];

    for (final pointType in requiredPoints) {
      final landmark = _getLandmark(landmarks, pointType);
      if (landmark == null || landmark.confidence < CONFIDENCE_THRESHOLD) {
        return {
          'isValid': false,
          'message': '❌ Cuerpo completo no visible. Confidence: ${landmark?.confidence ?? 0.0}'
        };
      }
    }

    return {
      'isValid': true,
      'message': 'Postura válida'
    };
  }

  /// Extrae un landmark específico por tipo
  PoseLandmark? _getLandmark(List<PoseLandmark> landmarks, int type) {
    try {
      return landmarks.firstWhere((landmark) => landmark.type == type);
    } catch (e) {
      return null;
    }
  }

  /// Calcula el ángulo entre tres puntos usando ley de cosenos
  /// Retorna objeto JointAngle con ángulo en grados
  JointAngle _calculateJointAngle(
    PoseLandmark point1,
    PoseLandmark point2,
    PoseLandmark point3,
  ) {
    // Vectores desde point2 (vértice del ángulo)
    final dx1 = point1.x - point2.x;
    final dy1 = point1.y - point2.y;
    final dx2 = point3.x - point2.x;
    final dy2 = point3.y - point2.y;

    // Magnitudes
    final mag1 = math.sqrt(dx1 * dx1 + dy1 * dy1);
    final mag2 = math.sqrt(dx2 * dx2 + dy2 * dy2);

    // Evitar división por cero
    if (mag1 == 0 || mag2 == 0) {
      return JointAngle(
        angle: 0.0,
        jointName: 'knee',
        confidence: point2.confidence,
      );
    }

    // Producto punto y ángulo
    final dotProduct = dx1 * dx2 + dy1 * dy2;
    final cosAngle = dotProduct / (mag1 * mag2);
    
    // Clamp para evitar errores de arccos
    final clampedCosAngle = cosAngle.clamp(-1.0, 1.0);
    final angleRad = math.acos(clampedCosAngle);
    final angleDeg = angleRad * 180.0 / math.pi;

    return JointAngle(
      angle: angleDeg,
      jointName: 'knee',
      confidence: (point1.confidence + point2.confidence + point3.confidence) / 3,
    );
  }

  /// Determina el estado actual (STANDING o SQUATTING) basado en ángulo
  /// Usa histéresis para evitar oscilaciones
  SquatState _determineState(double kneeAngleDegrees) {
    if (_currentState == SquatState.standing) {
      // Cambiar a SQUATTING si ángulo baja por debajo del threshold
      if (kneeAngleDegrees < SQUATTING_ANGLE_THRESHOLD) {
        return SquatState.squatting;
      }
      return SquatState.standing;
    } else {
      // En estado SQUATTING, cambiar a STANDING si sube por encima
      if (kneeAngleDegrees > HYSTERESIS_STANDING) {
        return SquatState.standing;
      }
      return SquatState.squatting;
    }
  }

  /// Reset del analizador
  void reset() {
    _currentState = SquatState.standing;
    _lastWasStanding = true;
  }

  /// Getter del estado actual
  SquatState get currentState => _currentState;
}
