import 'package:android_alarm_manager_plus/android_alarm_manager_plus.dart';
import 'package:audioplayers/audioplayers.dart';
import 'package:logger/logger.dart';

/// Servicio para gestionar la programación y reproducción de alarmas
class AlarmService {
  static final logger = Logger();
  static final AudioPlayer _audioPlayer = AudioPlayer();
  static bool _isAlarmPlaying = false;

  /// Inicializa el servicio de alarma
  static Future<void> initialize() async {
    try {
      await AndroidAlarmManager.initialize();
      logger.i('AlarmService initialized');
    } catch (e) {
      logger.e('Error initializing AlarmService: $e');
    }
  }

  /// Programa una alarma para que suene en X minutos
  static Future<void> scheduleAlarm({
    required int delayMinutes,
    required Function() onAlarmCallback,
  }) async {
    try {
      final bool scheduled = await AndroidAlarmManager.periodic(
        Duration(minutes: delayMinutes),
        0, // Alarm ID
        _alarmCallback,
        wakeup: true, // Enciende el dispositivo
        rescheduleOnBoot: true, // Reprograma al reiniciar
        exact: true, // Exacto
        allowWhileIdle: true, // En Doze mode
      );

      if (scheduled) {
        logger.i('Alarm scheduled for $delayMinutes minutes');
      }
    } catch (e) {
      logger.e('Error scheduling alarm: $e');
    }
  }

  /// Callback de alarma (ejecutado en background)
  static Future<void> _alarmCallback() async {
    logger.i('Alarm callback triggered');
    await playAlarmSound();
  }

  /// Reproduce el sonido de alarma en bucle
  static Future<void> playAlarmSound() async {
    if (_isAlarmPlaying) {
      return;
    }

    try {
      _isAlarmPlaying = true;

      // Usar un tono simple o asset
      // En producción, reemplazar con un archivo de audio real
      await _audioPlayer.setReleaseMode(ReleaseMode.loop);
      await _audioPlayer.setVolume(1.0);

      // Intenta cargar desde assets
      try {
        await _audioPlayer.play(AssetSource('sounds/alarm_tone.mp3'));
      } catch (e) {
        logger.w('Asset not found, using fallback URL: $e');
        // Fallback a un tono online (Zapsplat)
        await _audioPlayer.play(
          UrlSource(
            'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
          ),
        );
      }

      logger.i('Alarm sound playing');
    } catch (e) {
      logger.e('Error playing alarm sound: $e');
      _isAlarmPlaying = false;
    }
  }

  /// Detiene el sonido de alarma
  static Future<void> stopAlarmSound() async {
    try {
      await _audioPlayer.stop();
      _isAlarmPlaying = false;
      logger.i('Alarm sound stopped');
    } catch (e) {
      logger.e('Error stopping alarm sound: $e');
    }
  }

  /// Cancela todas las alarmas programadas
  static Future<void> cancelAllAlarms() async {
    try {
      await AndroidAlarmManager.cancel(0);
      await stopAlarmSound();
      logger.i('All alarms cancelled');
    } catch (e) {
      logger.e('Error cancelling alarms: $e');
    }
  }

  /// Getter para saber si la alarma está sonando
  static bool get isAlarmPlaying => _isAlarmPlaying;
}
