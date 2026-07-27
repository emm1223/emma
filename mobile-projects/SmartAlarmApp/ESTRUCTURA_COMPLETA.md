# 📂 ESTRUCTURA COMPLETA DEL PROYECTO

## Árbol de Directorios

```
SmartAlarmApp/
│
├── 📄 pubspec.yaml                          ⭐ Dependencias (18 librerías)
│
├── 📁 lib/                                  ⭐ Código Dart (1090+ líneas)
│   ├── main.dart                            (150 líneas) Entrada, pantalla inicial
│   │
│   ├── models/
│   │   └── pose_model.dart                  (50 líneas) Modelos de datos
│   │       ├── JointAngle
│   │       ├── PoseAnalysis
│   │       ├── SquatStatistics
│   │       └── SquatState (enum)
│   │
│   ├── services/                            (200 líneas totales)
│   │   ├── alarm_service.dart               (60 líneas) Audio + alarma
│   │   ├── camera_service.dart              (60 líneas) Acceso a cámara
│   │   ├── wake_lock_service.dart           (35 líneas) Pantalla encendida
│   │   └── android_channels.dart            (25 líneas) MethodChannel
│   │
│   ├── utils/
│   │   └── squat_analyzer.dart              (200 líneas) ⭐ LÓGICA CENTRAL
│   │       ├── SquatAnalyzer class
│   │       ├── _calculateJointAngle()       Trigonometría
│   │       ├── _determineState()            Máquina de estados
│   │       ├── _validateBodyParts()         Validación ML
│   │       └── processSquatCount()          Contador
│   │
│   ├── screens/
│   │   └── alarm_active_screen.dart         (300 líneas) ⭐ PANTALLA PRINCIPAL
│   │       ├── AlarmActiveScreen (StatefulWidget)
│   │       ├── WidgetsBindingObserver
│   │       ├── _initializeScreen()
│   │       ├── _processCameraFrame()
│   │       ├── _startPoseDetection()
│   │       └── _onAlarmComplete()
│   │
│   └── widgets/
│       ├── squat_counter_overlay.dart       (100 líneas) Contador visual
│       │   └── SquatCounterOverlay
│       └── pose_painter.dart                (90 líneas) Esqueleto dibujado
│           └── PosePainter (CustomPainter)
│
├── 📁 android/                              ⭐ Configuración nativa Android
│   ├── app/
│   │   ├── src/main/
│   │   │   ├── AndroidManifest.xml          ⭐ Permisos CRÍTICOS (50 líneas)
│   │   │   │   └── 7 permisos esenciales
│   │   │   │
│   │   │   └── kotlin/com/smartalarm/app/
│   │   │       └── MainActivity.kt          ⭐ Wake up + Flags (60 líneas)
│   │   │           ├── wakeUpDevice()
│   │   │           ├── keepScreenOn()
│   │   │           └── releaseWakeLock()
│   │   │
│   │   └── build.gradle                     Configuración de build
│   │
│   └── build.gradle                         Configuración raíz
│
├── 📁 assets/                               Recursos de la app
│   ├── sounds/
│   │   └── alarm_tone.mp3                   (Referencia para agregar)
│   ├── icons/
│   │   └── (iconos de launcher)
│   └── fonts/
│       ├── Roboto-Regular.ttf
│       └── Roboto-Bold.ttf
│
├── 📁 test/                                 Tests unitarios
│   └── squat_analyzer_test.dart             (40 líneas) Tests básicos
│
├── 📄 analysis_options.yaml                 ⭐ Linting avanzado (100+ reglas)
├── 📄 .gitignore                            Archivos a ignorar
│
├── 📚 DOCUMENTACIÓN:
│   ├── 📄 README.md                         Guía completa (150 líneas)
│   ├── 📄 ARQUITECTURA.md                   Diagramas y explicación técnica (250+ líneas)
│   ├── 📄 DEBUGGING.md                      Troubleshooting y tips (200 líneas)
│   ├── 📄 COMPILAR.md                       Pasos de compilación (100 líneas)
│   ├── 📄 CHECKLIST_INSTALACION.md          Checklist paso a paso (150 líneas)
│   ├── 📄 RESUMEN_EJECUTIVO.md              Resumen del proyecto (100 líneas)
│   └── 📄 ESTRUCTURA_COMPLETA.md            Este archivo

└── Estadísticas:
    ├── Líneas de código Dart:     ~1,090
    ├── Líneas de código Kotlin:   ~60
    ├── Líneas de documentación:   ~950
    ├── Archivos totales:          16
    ├── Librerías usadas:          18
    └── Tamaño APK estimado:       50-70MB
```

---

## 📊 Desglose de Archivos

### Código Principal (Dart)
| Archivo | LOC | Propósito | Complejidad |
|---------|-----|----------|-------------|
| `lib/main.dart` | 150 | Entrada, UI inicial | Baja |
| `lib/screens/alarm_active_screen.dart` | 300 | Pantalla principal | **Alta** ⭐ |
| `lib/utils/squat_analyzer.dart` | 200 | Lógica de sentadillas | **Muy Alta** ⭐⭐ |
| `lib/widgets/squat_counter_overlay.dart` | 100 | Overlay contador | Media |
| `lib/widgets/pose_painter.dart` | 90 | Dibujo de esqueleto | Media |
| `lib/services/alarm_service.dart` | 60 | Gestión de alarma | Media |
| `lib/services/camera_service.dart` | 60 | Gestión de cámara | Media |
| `lib/services/android_channels.dart` | 25 | MethodChannel | Baja |
| `lib/services/wake_lock_service.dart` | 35 | Wake lock control | Baja |
| `lib/models/pose_model.dart` | 50 | Modelos de datos | Baja |
| **TOTAL** | **1,070** | | |

### Configuración Android (Kotlin)
| Archivo | LOC | Propósito |
|---------|-----|----------|
| `android/app/src/main/AndroidManifest.xml` | 50 | Permisos y configuración |
| `android/app/src/main/kotlin/.../MainActivity.kt` | 60 | Wake up y flags de pantalla |
| `android/build.gradle` | 30 | Build configuration |
| **TOTAL** | **140** | |

### Documentación
| Archivo | LOC | Propósito |
|---------|-----|----------|
| `README.md` | 150 | Guía general |
| `ARQUITECTURA.md` | 280 | Diagramas y explicación técnica |
| `DEBUGGING.md` | 200 | Troubleshooting |
| `COMPILAR.md` | 100 | Compilación |
| `CHECKLIST_INSTALACION.md` | 150 | Checklist paso a paso |
| `RESUMEN_EJECUTIVO.md` | 120 | Resumen ejecutivo |
| **TOTAL** | **1,000** | |

### Configuración
| Archivo | Propósito |
|---------|-----------|
| `pubspec.yaml` | Dependencias y metadatos |
| `analysis_options.yaml` | Linting y análisis |
| `.gitignore` | Archivos a ignorar en Git |

---

## 🔗 Dependencias Clave

```yaml
# pubspec.yaml - 18 dependencias principales

# UI & Framework
- flutter (SDK)
- cupertino_icons (1.0.2)

# State Management
- provider (6.0.0)
- get (4.6.5)

# Camera & ML
- camera (0.10.5+5)                 ⭐ Captura de cámara
- google_mlkit_pose_detection (0.3.0)  ⭐ Detección de poses
- image (4.0.17)

# Alarma & Audio
- android_alarm_manager_plus (3.0.0)   ⭐ Alarma background
- audioplayers (5.2.1)                 ⭐ Reproducción de audio

# Permisos & Sistema
- permission_handler (11.4.3)
- device_info_plus (9.1.1)
- wakelock_plus (1.1.0)                ⭐ Pantalla encendida

# Debugging
- logger (2.0.1)
```

---

## ⭐ Archivos Críticos

### 1. `squat_analyzer.dart` - La Joya del Proyecto
```
- Trigonometría: Cálculo de ángulos con acos()
- Máquina de estados: STANDING ↔ SQUATTING
- Validación: Confidence > 0.6
- Conteo: Ciclo completo validado
- Histéresis: Evita oscilaciones
```

### 2. `alarm_active_screen.dart` - Orquestador Principal
```
- WidgetsBindingObserver: Ciclo de vida
- CameraService: Acceso a cámara
- SquatAnalyzer: Lógica de detección
- AlarmService: Audio
- WakeLockService: Pantalla encendida
- Android MethodChannel: Wake up
```

### 3. `MainActivity.kt` - Integración Nativa
```
- WakeLock: FULL_WAKE_LOCK + ACQUIRE_CAUSES_WAKEUP
- Flags: FLAG_TURN_SCREEN_ON, FLAG_SHOW_WHEN_LOCKED
- Keyguard: requestDismissKeyguard()
```

### 4. `AndroidManifest.xml` - Permisos
```
- CAMERA
- SCHEDULE_EXACT_ALARM
- USE_FULL_SCREEN_INTENT
- WAKE_LOCK
- DISABLE_KEYGUARD
- FOREGROUND_SERVICE
- (y 3 más)
```

---

## 🔄 Flujo de Datos

```
main.dart
    ↓
HomeScreen (selecciona permisos)
    ↓
AlarmActiveScreen
    ├─ Initialize:
    │   ├─ WakeLockService.enable()
    │   ├─ MainActivity.wakeUp() [Android]
    │   ├─ CameraService.initialize()
    │   ├─ PoseDetector.init()
    │   ├─ AlarmService.play()
    │   └─ _startPoseDetection()
    │
    └─ Loop (cada 500ms):
        ├─ takePicture()
        ├─ PoseDetector.processImage()
        ├─ SquatAnalyzer.analyzePose()
        │   ├─ validateBodyParts()
        │   ├─ calculateJointAngle()
        │   ├─ determineState()
        │   └─ processSquatCount()
        ├─ setState() → update UI
        └─ Si squatCount == 15:
            ├─ AlarmService.stop()
            ├─ WakeLockService.disable()
            └─ Navigator.pop()
```

---

## 📐 Fórmulas Matemáticas Implementadas

### 1. Cálculo de Ángulo (Ley de Cosenos)
```
θ = arccos((v1·v2) / (|v1| × |v2|)) × 180/π
```

### 2. Estados de Ángulo
```
STANDING:  θ > 160°
SQUATTING: θ < 100°
```

### 3. Ciclo de Conteo
```
STANDING → SQUATTING → STANDING = +1
```

---

## ✅ Validaciones Implementadas

| Nivel | Validación |
|-------|-----------|
| **1. Detección** | Postura detectada por ML Kit |
| **2. Confianza** | Confidence > 0.6 en 6 puntos |
| **3. Visibilidad** | Cuerpo completo visible |
| **4. Ángulo** | Transición STANDING ↔ SQUATTING |
| **5. Ciclo** | Solo cuenta ciclo completo |
| **6. Conteo** | Incremento solo si llega a 15 |

---

## 🎯 Entrada y Salida

### Entrada
- ✅ Feed de cámara frontal en tiempo real
- ✅ Postura del usuario
- ✅ Intención de encender alarma

### Salida
- ✅ Contador de sentadillas (0-15)
- ✅ Estado actual (STANDING/SQUATTING)
- ✅ Ángulo de rodilla en grados
- ✅ Mensajes de estado
- ✅ Audio de alarma

---

## 🚀 Compilación: Entrada → APK

```
pubspec.yaml + Dart Code
    ↓
flutter pub get (descargar dependencias)
    ↓
flutter build apk (compilar)
    ↓
MainActivity.kt + AndroidManifest.xml (Android nativo)
    ↓
APK firmado o sin firmar
    ↓
app-debug.apk (~60MB) o app-release.apk (~30MB)
```

---

## 📝 Tipos de Prueba Incluidas

```
Unit Tests:
- test/squat_analyzer_test.dart

Manual Tests:
- Verificar detección de poses
- Contar sentadillas manualmente
- Verificar wake up
- Verificar audio

Automated (flutter test):
```bash
flutter test
```
```

---

## 🔧 Herramientas Usadas

| Herramienta | Versión | Propósito |
|-------------|---------|----------|
| Flutter | 3.0+ | Framework principal |
| Dart | 3.0+ | Lenguaje |
| Kotlin | 1.8+ | Android nativo |
| Gradle | 7.3+ | Build |
| Android SDK | 21-33+ | SDK Android |
| Google ML Kit | Latest | Pose detection |
| VS Code / Android Studio | - | IDE |

---

## 📋 Checklist de Archivos

- [x] pubspec.yaml
- [x] AndroidManifest.xml
- [x] MainActivity.kt
- [x] main.dart
- [x] alarm_active_screen.dart
- [x] squat_analyzer.dart
- [x] alarm_service.dart
- [x] camera_service.dart
- [x] wake_lock_service.dart
- [x] android_channels.dart
- [x] pose_model.dart
- [x] squat_counter_overlay.dart
- [x] pose_painter.dart
- [x] analysis_options.yaml
- [x] .gitignore
- [x] Documentación (6 archivos)

---

**Total: 19 archivos de código + 6 documentación + configuración = 30+ archivos**

---

Creado: 2026-07-27
Versión: 1.0.0
Autor: Emmanuel Munayar (Tech Lead Senior)
