import 'package:flutter/material.dart';
import 'package:smart_alarm_app/screens/alarm_active_screen.dart';
import 'package:smart_alarm_app/services/alarm_service.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:logger/logger.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Inicializar servicios de alarma
  await AlarmService.initialize();
  
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Smart Alarm',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        brightness: Brightness.dark,
        primaryColor: Colors.cyan,
        scaffoldBackgroundColor: Colors.black,
        appBarTheme: const AppBarTheme(
          backgroundColor: Colors.black,
          foregroundColor: Colors.cyan,
        ),
      ),
      home: const HomeScreen(),
    );
  }
}

/// Pantalla de inicio
class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final logger = Logger();
  bool _permissionsGranted = false;

  @override
  void initState() {
    super.initState();
    _requestPermissions();
  }

  /// Solicita todos los permisos necesarios
  Future<void> _requestPermissions() async {
    try {
      final statuses = await [
        Permission.camera,
        Permission.microphone,
        Permission.scheduleExactAlarm,
      ].request();

      final allGranted = statuses.values.every(
        (status) => status.isGranted || status.isDenied,
      );

      if (mounted) {
        setState(() {
          _permissionsGranted = allGranted;
        });
      }

      if (!allGranted) {
        logger.w('Some permissions were denied');
      } else {
        logger.i('All permissions granted');
      }
    } catch (e) {
      logger.e('Error requesting permissions: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Smart Alarm - 15 Sentadillas'),
        centerTitle: true,
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(
                Icons.alarm,
                size: 80,
                color: Colors.cyan,
              ),
              const SizedBox(height: 40),
              const Text(
                '¿Listo para despertarte con estilo?',
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 20),
              const Text(
                'Deberás hacer 15 sentadillas frente a la cámara para apagar la alarma.',
                style: TextStyle(
                  fontSize: 16,
                  color: Colors.white70,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 40),
              ElevatedButton.icon(
                onPressed: _permissionsGranted
                    ? () {
                        Navigator.of(context).push(
                          MaterialPageRoute(
                            builder: (context) => const AlarmActiveScreen(
                              isFromAlarmTrigger: false,
                            ),
                          ),
                        );
                      }
                    : null,
                icon: const Icon(Icons.play_arrow),
                label: const Text('INICIAR ALARMA'),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.cyan,
                  foregroundColor: Colors.black,
                  padding: const EdgeInsets.symmetric(
                    horizontal: 40,
                    vertical: 16,
                  ),
                  textStyle: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              if (!_permissionsGranted)
                Padding(
                  padding: const EdgeInsets.only(top: 20),
                  child: Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: Colors.red.withOpacity(0.2),
                      borderRadius: BorderRadius.circular(8),
                      border: Border.all(color: Colors.red),
                    ),
                    child: const Text(
                      '❌ Permisos no otorgados. Por favor, ve a Configuración.',
                      style: TextStyle(color: Colors.red),
                      textAlign: TextAlign.center,
                    ),
                  ),
                ),
              const SizedBox(height: 40),
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.blue.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: Colors.blue),
                ),
                child: const Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      '📋 Instrucciones:',
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                        color: Colors.cyan,
                      ),
                    ),
                    SizedBox(height: 10),
                    Text(
                      '1. Asegúrate que la cámara pueda ver tu cuerpo completo\n'
                      '2. Realiza sentadillas de forma clara\n'
                      '3. Debes completar 15 sentadillas para apagar la alarma\n'
                      '4. El sistema detectará automáticamente cada movimiento',
                      style: TextStyle(
                        fontSize: 14,
                        color: Colors.white70,
                        height: 1.5,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
