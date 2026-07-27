import 'package:flutter/material.dart';
import 'package:camera/camera.dart';
import 'package:permission_handler/permission_handler.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const SmartAlarmApp());
}

class SmartAlarmApp extends StatelessWidget {
  const SmartAlarmApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'SmartAlarm - Squat Detection',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        useMaterial3: true,
      ),
      home: const AlarmScreen(),
    );
  }
}

class AlarmScreen extends StatefulWidget {
  const AlarmScreen({Key? key}) : super(key: key);

  @override
  State<AlarmScreen> createState() => _AlarmScreenState();
}

class _AlarmScreenState extends State<AlarmScreen> {
  late CameraController? _cameraController;
  int _squatCount = 0;
  late List<CameraDescription> cameras;
  bool _alarmActive = true;
  bool _initialized = false;

  @override
  void initState() {
    super.initState();
    _initializeScreen();
  }

  Future<void> _initializeScreen() async {
    try {
      await Permission.camera.request();
      await Permission.microphone.request();
      
      cameras = await availableCameras();
      _cameraController = CameraController(
        cameras.first,
        ResolutionPreset.medium,
      );
      await _cameraController!.initialize();
      
      setState(() {
        _initialized = true;
      });
    } catch (e) {
      print('Error initializing: $e');
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error: $e')),
        );
      }
    }
  }

  void _incrementSquat() {
    setState(() {
      _squatCount++;
    });
    
    if (_squatCount >= 15) {
      _disableAlarm();
    }
  }

  void _disableAlarm() {
    setState(() {
      _alarmActive = false;
    });
    
    showDialog(
      context: context,
      builder: (BuildContext context) => AlertDialog(
        title: const Text('¡Alarma Desactivada!'),
        content: Text('Completaste 15 sentadillas. Total: $_squatCount'),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.of(context).pop();
              _resetAlarm();
            },
            child: const Text('Nueva Ronda'),
          ),
        ],
      ),
    );
  }

  void _resetAlarm() {
    setState(() {
      _alarmActive = true;
      _squatCount = 0;
    });
  }

  @override
  void dispose() {
    _cameraController?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (!_initialized || _cameraController == null) {
      return const Scaffold(
        body: Center(
          child: CircularProgressIndicator(),
        ),
      );
    }

    if (!_cameraController!.value.isInitialized) {
      return const Scaffold(
        body: Center(
          child: CircularProgressIndicator(),
        ),
      );
    }

    return Scaffold(
      appBar: AppBar(
        title: const Text('SmartAlarm - Detectar Sentadillas'),
        centerTitle: true,
      ),
      body: Stack(
        children: [
          CameraPreview(_cameraController!),
          Positioned(
            bottom: 20,
            left: 20,
            right: 20,
            child: Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.black54,
                borderRadius: BorderRadius.circular(10),
              ),
              child: Column(
                children: [
                  Text(
                    'Sentadillas: $_squatCount/15',
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 28,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 10),
                  LinearProgressIndicator(
                    value: _squatCount / 15,
                    minHeight: 8,
                    backgroundColor: Colors.grey[400],
                    valueColor: AlwaysStoppedAnimation<Color>(
                      _squatCount >= 15 ? Colors.green : Colors.blue,
                    ),
                  ),
                  const SizedBox(height: 10),
                  Text(
                    _alarmActive ? 'Alarma ACTIVA' : 'Alarma DESACTIVADA',
                    style: TextStyle(
                      color: _alarmActive ? Colors.red : Colors.green,
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
      floatingActionButton: _alarmActive
          ? FloatingActionButton(
              onPressed: _incrementSquat,
              child: const Icon(Icons.add),
            )
          : null,
    );
  }
}
