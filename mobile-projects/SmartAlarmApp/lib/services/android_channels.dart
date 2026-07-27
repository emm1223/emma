import 'package:flutter/services.dart';

/// Configuración centralizada de canales con Android
class AndroidChannels {
  static const platform = MethodChannel('com.smartalarm.app/alarm');

  /// Configura toda la pantalla para wake up
  static Future<void> configureScreenForAlarm() async {
    try {
      await platform.invokeMethod('wakeUp');
      await platform.invokeMethod('keepScreenOn');
    } on PlatformException catch (e) {
      print('Error: ${e.message}');
    }
  }

  /// Libera el wake lock
  static Future<void> releaseWakeLock() async {
    try {
      await platform.invokeMethod('releaseWakeLock');
    } on PlatformException catch (e) {
      print('Error: ${e.message}');
    }
  }
}
