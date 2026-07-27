import 'package:wakelock_plus/wakelock_plus.dart';
import 'package:logger/logger.dart';

/// Servicio para mantener la pantalla encendida durante la alarma
class WakeLockService {
  static final logger = Logger();
  static bool _isEnabled = false;

  /// Activa el wake lock (mantiene pantalla encendida)
  static Future<void> enable() async {
    if (_isEnabled) {
      return;
    }

    try {
      await WakelockPlus.enable();
      _isEnabled = true;
      logger.i('WakeLock enabled');
    } catch (e) {
      logger.e('Error enabling WakeLock: $e');
    }
  }

  /// Desactiva el wake lock
  static Future<void> disable() async {
    if (!_isEnabled) {
      return;
    }

    try {
      await WakelockPlus.disable();
      _isEnabled = false;
      logger.i('WakeLock disabled');
    } catch (e) {
      logger.e('Error disabling WakeLock: $e');
    }
  }

  /// Getter para saber si está activo
  static bool get isEnabled => _isEnabled;

  /// Toggle
  static Future<void> toggle() async {
    if (_isEnabled) {
      await disable();
    } else {
      await enable();
    }
  }
}
