import 'package:flutter/material.dart';
import 'package:camera/camera.dart';
import 'package:google_mlkit_pose_detection/google_mlkit_pose_detection.dart';
import 'package:smart_alarm_app/models/pose_model.dart';
import 'package:smart_alarm_app/services/alarm_service.dart';
import 'package:smart_alarm_app/services/camera_service.dart';
import 'package:smart_alarm_app/services/wake_lock_service.dart';
import 'package:smart_alarm_app/utils/squat_analyzer.dart';
import 'package:smart_alarm_app/widgets/pose_painter.dart';
import 'package:smart_alarm_app/widgets/squat_counter_overlay.dart';
import 'package:logger/logger.dart';
import 'dart:io' show Platform;
import 'package:flutter/services.dart';

/// Pantalla principal de la alarma activa
/// Implementa WidgetsBindingObserver para manejar ciclo de vida
class AlarmActiveScreen extends StatefulWidget {
  final bool isFromAlarmTrigger;

  const AlarmActiveScreen({
    Key? key,
    this.isFromAlarmTrigger = false,
  }) : super(key: key);

  @override
  State<AlarmActiveScreen> createState() => _AlarmActiveScreenState();
}

class _AlarmActiveScreenState extends State<AlarmActiveScreen>
    with WidgetsBindingObserver {
  late CameraService _cameraService;
  late SquatAnalyzer _squatAnalyzer;
  late PoseDetector _poseDetector;

  final logger = Logger();

  // Estado UI
  int _squatCount = 0;
  String _statusMessage = 'Iniciando cámara...';
  double _lastKneeAngle = 0.0;
  bool _bodyFullyVisible = false;
  bool _isInitialized = false;
  bool _isProcessing = false;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);

    // Inicializar servicios
    _cameraService = CameraService();
    _squatAnalyzer = SquatAnalyzer();

    _initializeScreen();
  }

  /// Inicializa todos los servicios necesarios
  Future<void> _initializeScreen() async {
    try {
      // 1. Activar wake lock (mantener pantalla encendida)
      await WakeLockService.enable();

      // 2. Llamar a MainActivity para configurar flags de pantalla (Android)
      if (Platform.isAndroid) {
        const platform =
            MethodChannel('com.smartalarm.app/alarm');
        await platform.invokeMethod('wakeUp');
        await platform.invokeMethod('keepScreenOn');
      }

      // 3. Inicializar cámara
      await _cameraService.initialize();

      // 4. Inicializar detector de poses
      final options = PoseDetectorOptions();
      _poseDetector = PoseDetector(options: options);

      // 5. Iniciar detección continua
      _startPoseDetection();

      setState(() {
        _isInitialized = true;
        _statusMessage = 'Posición lista. Comienza a hacer sentadillas.';
      });

      // 6. Reproducir alarma
      await AlarmService.playAlarmSound();

      logger.i('AlarmActiveScreen initialized successfully');
    } catch (e) {
      logger.e('Error initializing AlarmActiveScreen: $e');
      setState(() {
        _statusMessage = 'Error: $e';
      });
    }
  }

  /// Inicia la detección continua de poses
  void _startPoseDetection() {
    if (!_isInitialized) return;

    // Usar un timer para procesar frames periódicamente
    // Esto evita sobrecarga de CPU
    Stream.periodic(const Duration(milliseconds: 500)).listen(
      (_) async {
        if (_isProcessing || !_isInitialized) return;

        _isProcessing = true;
        try {
          // Procesar frame
          await _processCameraFrame();
        } catch (e) {
          logger.e('Error in pose detection: $e');
        } finally {
          _isProcessing = false;
        }
      },
    );
  }

  /// Procesa cada frame de la cámara
  Future<void> _processCameraFrame() async {
    try {
      final image = await _cameraService.controller.takePicture();
      final inputImage = InputImage.fromFilePath(image.path);

      // Detectar poses
      final poses = await _poseDetector.processImage(inputImage);
      await inputImage.close();

      if (poses.isEmpty) {
        setState(() {
          _statusMessage = '❌ Persona no detectada';
          _bodyFullyVisible = false;
        });
        return;
      }

      // Analizar primera pose detectada
      final pose = poses.first;
      final analysis = _squatAnalyzer.analyzePose(pose.landmarks);

      // Procesar conteo de sentadillas
      if (analysis.isValid) {
        final shouldIncrement = _squatAnalyzer.processSquatCount(analysis);

        setState(() {
          _lastKneeAngle = analysis.kneeAngleDegrees;
          _bodyFullyVisible = true;
          _statusMessage = 'Postura válida';

          if (shouldIncrement) {
            _squatCount++;
            logger.i('Squat count: $_squatCount');

            // Vibración háptica
            HapticFeedback.mediumImpact();

            // Reproducir sonido de confirmación
            if (_squatCount == 15) {
              _onAlarmComplete();
            }
          }
        });
      } else {
        setState(() {
          _statusMessage = analysis.validationMessage;
          _bodyFullyVisible = false;
        });
      }
    } catch (e) {
      logger.e('Error processing camera frame: $e');
    }
  }

  /// Se ejecuta cuando el usuario completa las 15 sentadillas
  Future<void> _onAlarmComplete() async {
    logger.i('Alarm complete! 15 squats done.');

    try {
      // Detener alarma
      await AlarmService.stopAlarmSound();

      // Desactivar wake lock
      await WakeLockService.disable();

      // Liberar cámara
      await _cameraService.dispose();

      // Liberar pose detector
      await _poseDetector.close();

      // Mostrar diálogo de éxito
      if (mounted) {
        showDialog(
          context: context,
          barrierDismissible: false,
          builder: (context) => AlertDialog(
            backgroundColor: Colors.green,
            title: const Icon(Icons.celebration, color: Colors.white, size: 50),
            content: const Text(
              '¡Felicidades!\n\nHas completado 15 sentadillas.\nLa alarma ha sido desactivada.',
              textAlign: TextAlign.center,
              style: TextStyle(
                color: Colors.white,
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            actions: [
              TextButton(
                onPressed: () {
                  Navigator.of(context).pop();
                  Navigator.of(context).pop();
                },
                child: const Text('OK', style: TextStyle(color: Colors.white)),
              ),
            ],
          ),
        );
      }
    } catch (e) {
      logger.e('Error completing alarm: $e');
    }
  }

  /// Manejo del ciclo de vida - cuando la app pasa a background
  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    super.didChangeAppLifecycleState(state);

    logger.i('App lifecycle state: $state');

    if (state == AppLifecycleState.paused) {
      // La app pasó a background
      // Pausar detección pero mantener alarma sonando
      _isProcessing = true;
      logger.w('App paused - stopping pose detection');
    } else if (state == AppLifecycleState.resumed) {
      // La app volvió a foreground
      _isProcessing = false;
      logger.i('App resumed - resuming pose detection');
    }
  }

  @override
  void dispose() {
    // Importante: liberar todos los recursos
    WidgetsBinding.instance.removeObserver(this);

    unawaited(() async {
      try {
        await _cameraService.dispose();
        await _poseDetector.close();
        await AlarmService.stopAlarmSound();
        await WakeLockService.disable();
      } catch (e) {
        logger.e('Error disposing resources: $e');
      }
    }());

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: () async {
        // Bloquear el botón de retroceso mientras suena la alarma
        logger.w('Back button pressed - blocked');
        return false;
      },
      child: Scaffold(
        backgroundColor: Colors.black,
        body: _buildBody(),
      ),
    );
  }

  Widget _buildBody() {
    if (!_isInitialized) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const CircularProgressIndicator(color: Colors.cyan),
            const SizedBox(height: 20),
            Text(
              _statusMessage,
              style: const TextStyle(
                color: Colors.white,
                fontSize: 16,
              ),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      );
    }

    return Stack(
      fit: StackFit.expand,
      children: [
        // Camera Preview
        CameraPreview(_cameraService.controller),

        // Overlay con contador
        SquatCounterOverlay(
          squatCount: _squatCount,
          statusMessage: _statusMessage,
          kneeAngle: _lastKneeAngle,
          bodyFullyVisible: _bodyFullyVisible,
        ),
      ],
    );
  }
}

void unawaited(Future<void> Function() future) {
  future();
}
