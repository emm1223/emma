import 'package:google_mlkit_pose_detection/google_mlkit_pose_detection.dart';

/// Modelo para almacenar información de un ángulo de articulación
class JointAngle {
  final double angle; // en grados
  final String jointName;
  final double confidence;

  JointAngle({
    required this.angle,
    required this.jointName,
    required this.confidence,
  });
}

/// Modelo para rastrear el estado de sentadillas
enum SquatState {
  standing, // Ángulo rodilla > 160°
  squatting, // Ángulo rodilla < 100°
}

/// Modelo para información de pose y validación
class PoseAnalysis {
  final List<PoseLandmark> landmarks;
  final bool isValid; // Todos los puntos clave son visibles (confidence > 0.6)
  final String validationMessage;
  final SquatState? currentState;
  final double kneeAngleDegrees;

  PoseAnalysis({
    required this.landmarks,
    required this.isValid,
    required this.validationMessage,
    this.currentState,
    this.kneeAngleDegrees = 0.0,
  });
}

/// Modelo para estadísticas de sentadillas
class SquatStatistics {
  int count = 0;
  SquatState currentState = SquatState.standing;
  bool bodyFullyVisible = false;
  String lastMessage = "Preparando...";
  double lastKneeAngle = 0.0;

  void reset() {
    count = 0;
    currentState = SquatState.standing;
    bodyFullyVisible = false;
    lastMessage = "Preparando...";
    lastKneeAngle = 0.0;
  }
}
