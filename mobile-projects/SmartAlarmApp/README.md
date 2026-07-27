# SmartAlarmApp - Despertador Inteligente con Detección de Sentadillas

## 📱 Descripción

Aplicación móvil Android (Flutter) que funciona como un despertador inteligente. Para apagar la alarma, el usuario debe realizar **15 sentadillas frente a la cámara**, detectadas automáticamente mediante inteligencia artificial (ML Kit Pose Detection).

## 🎯 Características Principales

- ✅ **Detección de Poses en Tiempo Real**: Usa Google ML Kit para detectar la postura del usuario
- ✅ **Máquina de Estados Robusta**: Validación estricta de sentadillas completas
- ✅ **Wake Up desde Doze Mode**: Enciende el dispositivo incluso en modo suspensión
- ✅ **Pantalla Bloqueada**: El botón de retroceso está deshabilitado mientras suena la alarma
- ✅ **Sin Memory Leaks**: Gestión correcta del ciclo de vida y liberación de recursos
- ✅ **Sound Null Safety**: Código 100% compatible con Dart null safety

## 🛠 Tecnología

| Componente | Herramienta |
|-----------|-----------|
| Framework | Flutter 3.0+ |
| Lenguaje | Dart 3.0+ |
| Visión Computadora | Google ML Kit Pose Detection |
| Alarma Background | android_alarm_manager_plus |
| Audio | audioplayers |
| Permisos | permission_handler |
| Wake Lock | wakelock_plus |

## 📋 Requisitos del Sistema

- Android API Level 21+ (Android 5.0+)
- Mínimo 2GB de RAM
- Cámara frontal
- Flutter 3.0+

## 🚀 Instalación y Compilación

### Prerequisitos

```bash
# Instalar Flutter
flutter --version

# Obtener dependencias
cd SmartAlarmApp
flutter pub get
```

### Compilar APK

```bash
# Debug APK
flutter build apk --debug

# Release APK (optimizado)
flutter build apk --release

# APK ubicado en: build/app/outputs/flutter-apk/app-release.apk
```

### Ejecutar en Dispositivo

```bash
# Conectar dispositivo Android
adb devices

# Ejecutar app
flutter run

# O con verbose para debugging
flutter run -v
```

## 📁 Estructura del Proyecto

```
lib/
├── main.dart                          # Punto de entrada
├── models/
│   └── pose_model.dart               # Modelos de datos (SquatState, PoseAnalysis)
├── services/
│   ├── alarm_service.dart            # Gestión de alarmas
│   ├── camera_service.dart           # Gestión de cámara
│   └── wake_lock_service.dart        # Control de wake lock
├── utils/
│   └── squat_analyzer.dart           # Lógica de detección (trigonometría, máquina de estados)
├── screens/
│   └── alarm_active_screen.dart      # Pantalla principal con cámara
└── widgets/
    ├── pose_painter.dart             # CustomPainter para dibujar esqueleto
    └── squat_counter_overlay.dart    # UI overlay con contador

android/
├── app/src/main/AndroidManifest.xml  # Permisos CRÍTICOS
└── app/src/main/kotlin/com/smartalarm/app/
    └── MainActivity.kt               # Wake up + flags de pantalla
```

## 🔐 Permisos Requeridos

```xml
<!-- AndroidManifest.xml -->
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.SCHEDULE_EXACT_ALARM" />
<uses-permission android:name="android.permission.USE_FULL_SCREEN_INTENT" />
<uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW" />
<uses-permission android:name="android.permission.WAKE_LOCK" />
<uses-permission android:name="android.permission.DISABLE_KEYGUARD" />
<uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
```

## 🧮 Lógica de Detección de Sentadillas

### 1. **Extracción de Puntos Clave**
   - Hip (cadera) izquierda/derecha
   - Knee (rodilla) izquierda/derecha
   - Ankle (tobillo) izquierda/derecha

### 2. **Validación**
   - Confidence score > 0.6 en los 6 puntos
   - Si falla: "❌ Cuerpo completo no visible"

### 3. **Cálculo de Ángulo**
   ```dart
   // Trigonometría: atan2 para calcular ángulo entre vectores
   final angle = acos((v1 · v2) / (|v1| × |v2|)) * 180 / π
   ```

### 4. **Máquina de Estados**
   ```
   STANDING (ángulo > 160°)
       ↓
   SQUATTING (ángulo < 100°)
       ↓
   STANDING → +1 sentadilla
   ```

### 5. **Histéresis**
   - Evita oscilaciones rápidas
   - Transiciones claras entre estados

## 🎮 Flujo de Usuario

1. **Pantalla de Inicio**
   - Solicita permisos (cámara, micrófono, alarma)
   - Botón "INICIAR ALARMA"

2. **Alarma Activa**
   - Pantalla se enciende (wake up)
   - Suena alarma en bucle
   - Cámara frontal activa
   - Muestra contador de sentadillas (0/15)

3. **Detección de Sentadillas**
   - En tiempo real, detecta poses
   - Dibuja esqueleto en pantalla
   - Muestra ángulo de rodilla
   - Incrementa contador al completar cada sentadilla

4. **Alarma Desactivada**
   - Al llegar a 15 sentadillas
   - Se detiene el audio
   - Pantalla se desbloquea
   - Mensaje de éxito

## ⚠️ Notas Críticas

### Memory Management
- ✅ `CameraController` se dispose correctamente
- ✅ `PoseDetector` se cierra al terminar
- ✅ `WidgetsBindingObserver` se remueve en dispose
- ✅ No hay listeners sin desuscribirse

### Battery Optimization
- ✅ Detección cada 500ms (no cada frame)
- ✅ Wake lock se libera al completar
- ✅ ScreenOn flags se limpian

### Compatibilidad Android
- ✅ Android 5.0+ (API 21+)
- ✅ Android 12+ (FOREGROUND_SERVICE_ALARM)
- ✅ Doze Mode compatible

## 🐛 Troubleshooting

### "Persona no detectada"
- Asegúrate que la cámara pueda verte completamente
- Mejora la iluminación
- Acércate un poco más a la cámara

### "Cuerpo completo no visible"
- Confidence score bajo
- Muévete dentro del área de visión de la cámara

### La alarma no se detiene
- Verifica que completaste 15 sentadillas COMPLETAS
- Cada sentadilla debe pasar por STANDING → SQUATTING → STANDING

### Crash de memoria
- Cierra otras apps
- Reinicia el dispositivo
- Libre al menos 500MB de RAM

## 📝 Documentación Técnica

- **Pose Detection**: [Google ML Kit Docs](https://developers.google.com/ml-kit/vision/pose-detection)
- **Flutter Camera**: [camera package](https://pub.dev/packages/camera)
- **Android Alarm Manager**: [android_alarm_manager_plus](https://pub.dev/packages/android_alarm_manager_plus)

## 📧 Contacto

Emmanuel Munayar - emmanuelmunayar@gmail.com
GitHub: [@emm1223](https://github.com/emm1223)

## 📄 Licencia

MIT License - Libre para uso personal y educativo
