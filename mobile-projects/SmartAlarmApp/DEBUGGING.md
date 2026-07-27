# 🔧 GUÍA RÁPIDA DE DEBUGGING

## 1. VERIFICAR QUE TODO ESTÁ CONECTADO

```bash
# Conectar dispositivo USB
adb devices

# Debe mostrar:
# List of attached devices
# XXXXXXXXXXXX          device
```

## 2. FLUTTER DOCTOR

```bash
flutter doctor -v

# Verificar:
✅ Flutter
✅ Android SDK
✅ Xcode (no necesario para Android)
✅ Connected devices
```

## 3. LOGS EN TIEMPO REAL

```bash
# Ver logs de la app
flutter run -v

# O directamente del dispositivo
adb logcat | grep flutter

# Ver logs específicos
adb logcat | grep "SmartAlarm"
```

## 4. DEBUGGING CON BREAKPOINTS

```dart
// En VS Code: F5 para iniciar debug
// O desde terminal:
flutter run --debug

// Agregar breakpoints en:
// - SquatAnalyzer._calculateJointAngle()
// - SquatAnalyzer.processSquatCount()
// - AlarmActiveScreen._processCameraFrame()
```

## 5. VERIFICAR POSES EN VIVO

```dart
// En AlarmActiveScreen._processCameraFrame()
// Agregar logs:

logger.i('Landmarks: ${pose.landmarks.length}');
for (final landmark in pose.landmarks) {
  logger.i('${landmark.type}: x=${landmark.x}, y=${landmark.y}, conf=${landmark.confidence}');
}
logger.i('Knee Angle: ${analysis.kneeAngleDegrees}');
```

## 6. TEST LOCAL (sin dispositivo)

```dart
// En squat_analyzer_test.dart

void main() {
  test('Calcular ángulo de 90°', () {
    final analyzer = SquatAnalyzer();
    
    final hip = PoseLandmark(
      type: PoseLandmarkType.leftHip,
      x: 100, y: 100, z: 0,
      inFrameLikelihood: 0.9,
    );
    final knee = PoseLandmark(
      type: PoseLandmarkType.leftKnee,
      x: 100, y: 200, z: 0,
      inFrameLikelihood: 0.9,
    );
    final ankle = PoseLandmark(
      type: PoseLandmarkType.leftAnkle,
      x: 200, y: 200, z: 0,
      inFrameLikelihood: 0.9,
    );
    
    final angle = analyzer._calculateJointAngle(hip, knee, ankle);
    expect(angle.angle, closeTo(90, 5));
  });
}
```

## 7. GRABAR VIDEO PARA ANÁLISIS

```bash
# Grabar pantalla del dispositivo
adb shell screenrecord /sdcard/test.mp4 --duration 30

# Transferir a PC
adb pull /sdcard/test.mp4 ./test.mp4

# Analizar fotograma por fotograma
# En frame donde debería contar, verificar confidence
```

## 8. PROBLEMAS COMUNES Y SOLUCIONES

### "E/android: Permission denied"
```bash
# Resetear permisos
adb shell pm reset-permissions

# O manualmente en dispositivo:
# Configuración > Aplicaciones > SmartAlarmApp > Permisos > Cámara (on)
```

### "I/Choreographer: Skipped X frames"
- Reducir FPS de detección (cambiar 500ms a 1000ms)
- Usar device más potente
- Cerrar otras apps

### "PlatformException(no activity)"
- Asegurar que `MainActivity` está en AndroidManifest
- Hacer clean: `flutter clean && flutter pub get`

### "Memory pressure, dropping frames"
- Liberar recursos: `flutter clean`
- Reducir resolución de cámara: `ResolutionPreset.medium`
- Limitar pose detection a 1 vez por segundo

## 9. PROFILING (Rendimiento)

```bash
# Iniciar en modo profile
flutter run --profile

# Ver frame rate y memory en:
# Android Studio > Profiler
# Flutter DevTools > CPU, Memory, Network
```

## 10. COMPILAR RELEASE FINAL

```bash
flutter clean
flutter pub get
flutter build apk --release --verbose

# Ubicación final:
# build/app/outputs/flutter-apk/app-release.apk
```

## 11. SIGNING (Firma de APK)

```bash
# Crear keystore (una vez)
keytool -genkey -v -keystore ~/smartalarm-key.keystore \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias smartalarm_key

# Crear android/key.properties
storePassword=<password>
keyPassword=<password>
keyAlias=smartalarm_key
storeFile=~/smartalarm-key.keystore

# Build firmado
flutter build apk --release
```

## 12. INSTALAR Y PROBAR EN DISPOSITIVO

```bash
# Instalar APK
adb install -r build/app/outputs/flutter-apk/app-release.apk

# Abrir app
adb shell am start -n com.smartalarm.app/.MainActivity

# Ver en tiempo real
adb logcat -v brief

# Desinstalar
adb uninstall com.smartalarm.app
```

## 13. EMULADOR (Si no tienes dispositivo)

```bash
# Descargar Android Emulator con AVD Manager
# Crear dispositivo con:
# - Min SDK: API 21
# - Target SDK: API 33+
# - ABI: arm64-v8a (mejor performance)

# Iniciar emulador
emulator -avd Pixel_5_API_33

# Verificar conexión
adb devices

# Flutter run en emulador
flutter run
```

## 14. VERIFICAR ARQUITECTURA DEL APK

```bash
# Descomprimir APK
unzip build/app/outputs/flutter-apk/app-release.apk -d apk_contents

# Ver librerías nativas
ls apk_contents/lib/
# Debe contener: arm64-v8a, armeabi-v7a

# Ver contenido
file build/app/outputs/flutter-apk/app-release.apk
# Debe ser: ZIP archive data
```

---

**💡 Tip Pro:** Mantén siempre un `logcat` abierto en otra terminal mientras debuggeas. Así verás los errores en tiempo real.

```bash
# Terminal 1: Flutter run
flutter run -v

# Terminal 2: ADB Logcat
adb logcat | grep -E "flutter|SmartAlarm|E/"
```
