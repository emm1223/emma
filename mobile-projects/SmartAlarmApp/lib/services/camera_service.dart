import 'package:camera/camera.dart';
import 'package:google_mlkit_pose_detection/google_mlkit_pose_detection.dart';
import 'package:logger/logger.dart';

/// Servicio para manejar la cámara y detección de poses
class CameraService {
  static final logger = Logger();

  late CameraController _cameraController;
  late PoseDetector _poseDetector;
  bool _isInitialized = false;
  bool _isProcessing = false;

  /// Inicializa la cámara y el detector de poses
  Future<void> initialize() async {
    try {
      final cameras = await availableCameras();
      final frontCamera = cameras.firstWhere(
        (camera) => camera.lensDirection == CameraLensDirection.front,
        orElse: () => cameras.first,
      );

      _cameraController = CameraController(
        frontCamera,
        ResolutionPreset.high,
        enableAudio: false,
      );

      await _cameraController.initialize();

      // Inicializar detector de poses
      final options = PoseDetectorOptions();
      _poseDetector = PoseDetector(options: options);

      _isInitialized = true;
      logger.i('CameraService initialized successfully');
    } catch (e) {
      logger.e('Error initializing CameraService: $e');
      rethrow;
    }
  }

  /// Procesa frames de la cámara y detecta poses
  Future<List<Pose>?> detectPoseFromCamera() async {
    if (!_isInitialized || _isProcessing) {
      return null;
    }

    _isProcessing = true;
    try {
      final image = await _cameraController.takePicture();
      
      final inputImage = InputImage.fromFilePath(image.path);
      final poses = await _poseDetector.processImage(inputImage);

      await inputImage.close();
      
      return poses;
    } catch (e) {
      logger.e('Error detecting pose: $e');
      return null;
    } finally {
      _isProcessing = false;
    }
  }

  /// Stream de frames para procesamiento continuo
  Stream<CameraImage> get frameStream {
    if (!_isInitialized) {
      throw Exception('CameraService not initialized');
    }
    return _cameraController.onFrameAvailable;
  }

  /// Libera recursos de la cámara
  Future<void> dispose() async {
    try {
      if (_isInitialized) {
        await _cameraController.dispose();
        await _poseDetector.close();
        _isInitialized = false;
        logger.i('CameraService disposed successfully');
      }
    } catch (e) {
      logger.e('Error disposing CameraService: $e');
    }
  }

  /// Getter para el controller de la cámara
  CameraController get controller {
    if (!_isInitialized) {
      throw Exception('CameraService not initialized');
    }
    return _cameraController;
  }

  /// Getter para saber si está inicializado
  bool get isInitialized => _isInitialized;
}
