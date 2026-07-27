# 🏗️ ARQUITECTURA TÉCNICA - SmartAlarmApp

## 1. DIAGRAMA DE FLUJO GENERAL

```
┌─────────────────────────────────────────────────────────────┐
│  App Inicia (main.dart)                                     │
│  ├─ AlarmService.initialize()                               │
│  └─ HomeScreen solicita permisos                            │
└───────────────┬───────────────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────────────────────┐
│  Usuario presiona "INICIAR ALARMA"                          │
│  └─ Navigator.push(AlarmActiveScreen)                       │
└───────────────┬───────────────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────────────────────┐
│  AlarmActiveScreen._initializeScreen()                      │
│  ├─ WakeLockService.enable()                                │
│  ├─ Platform.isAndroid → MethodChannel("wakeUp")            │
│  ├─ CameraService.initialize()                              │
│  ├─ PoseDetector.init()                                     │
│  ├─ _startPoseDetection()                                   │
│  └─ AlarmService.playAlarmSound()                           │
└───────────────┬───────────────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────────────────────┐
│  LOOP PRINCIPAL (cada 500ms)                                │
│  ├─ _processCameraFrame()                                   │
│  │  ├─ CameraController.takePicture()                       │
│  │  ├─ PoseDetector.processImage(InputImage)                │
│  │  └─ SquatAnalyzer.analyzePose()                          │
│  │     ├─ _validateBodyParts() → confidence > 0.6           │
│  │     ├─ _calculateJointAngle() → trigonometría            │
│  │     ├─ _determineState() → STANDING/SQUATTING            │
│  │     └─ processSquatCount() → máquina de estados          │
│  └─ setState() → actualizar UI                              │
└───────────────┬───────────────────────────────────────────┘
                │
                ▼ (¿squatCount == 15?)
       ┌─────────┴─────────┐
       │                   │
      NO                  SÍ
       │                   │
       │                   ▼
       │        ┌──────────────────────┐
       │        │ _onAlarmComplete()   │
       │        ├─ AlarmService.stop() │
       │        ├─ Vibración háptica   │
       │        ├─ Dialog de éxito     │
       │        └─ Navigator.pop()     │
       │
       └─────────────────►
```

## 2. JERARQUÍA DE CLASES

```
StatefulWidget
└─ AlarmActiveScreen
   ├─ State._AlarmActiveScreenState
   │  ├─ WidgetsBindingObserver (ciclo de vida)
   │  ├─ CameraService (gestión de cámara)
   │  ├─ SquatAnalyzer (lógica de conteo)
   │  ├─ PoseDetector (ML Kit)
   │  └─ UI Widgets
   │     ├─ CameraPreview
   │     └─ SquatCounterOverlay
   │        └─ CustomPainter: PosePainter

Services
├─ AlarmService (reproducción de audio)
├─ CameraService (acceso a cámara)
├─ WakeLockService (keep screen on)
└─ AndroidChannels (método MethodChannel)

Models
└─ PoseModel
   ├─ JointAngle
   ├─ PoseAnalysis
   ├─ SquatStatistics
   └─ SquatState (enum)

Utils
└─ SquatAnalyzer (máquina de estados)
```

## 3. MÁQUINA DE ESTADOS DE SENTADILLAS

### Diagrama de Estados

```
              STANDING (ángulo > 160°)
                    ▲
                    │
                    │ Sube de rodillas
                    │ (ángulo > 165° - histéresis)
                    │
    ┌───────────────┴──────────────────┐
    │                                  │
    │ Baja de rodillas                 │
    │ (ángulo < 100°)                  │
    │                                  │
    ▼                                  
SQUATTING ◄─────────────────────────────
(ángulo < 100°)    Transición al ciclo

CONTAR SENTADILLA: STANDING → SQUATTING → STANDING = +1
```

### Pseudocódigo

```dart
class SquatAnalyzer {
  SquatState _currentState = STANDING;
  bool _lastWasStanding = true;

  bool processSquatCount(PoseAnalysis analysis) {
    SquatState newState = determineState(analysis.kneeAngle);
    
    // Detectar transición STANDING → SQUATTING → STANDING
    if (newState == STANDING && !_lastWasStanding) {
      // ✅ Ciclo completo → +1 sentadilla
      return true;
    }
    
    _currentState = newState;
    _lastWasStanding = (newState == STANDING);
    return false;
  }
}
```

## 4. TRIGONOMETRÍA: CÁLCULO DE ÁNGULOS

### Fórmula: Ley de Cosenos

Dados 3 puntos: P1 (cadera), P2 (rodilla), P3 (tobillo)

```
     P1
      /
     /
    / θ (ángulo a calcular)
   /
  P2 ───── P3

Vector v1 = P1 - P2
Vector v2 = P3 - P2

θ = arccos((v1 · v2) / (|v1| × |v2|))

Donde:
- v1 · v2 = producto punto = v1.x*v2.x + v1.y*v2.y
- |v1| = magnitud = sqrt(v1.x² + v1.y²)
- |v2| = magnitud = sqrt(v2.x² + v2.y²)
```

### Código Dart

```dart
JointAngle _calculateJointAngle(
  PoseLandmark hip,
  PoseLandmark knee,
  PoseLandmark ankle,
) {
  // 1. Calcular vectores desde la rodilla
  final dx1 = hip.x - knee.x;
  final dy1 = hip.y - knee.y;
  final dx2 = ankle.x - knee.x;
  final dy2 = ankle.y - knee.y;

  // 2. Magnitudes
  final mag1 = sqrt(dx1² + dy1²);
  final mag2 = sqrt(dx2² + dy2²);

  // 3. Producto punto
  final dotProduct = dx1*dx2 + dy1*dy2;

  // 4. Coseno del ángulo
  final cosAngle = dotProduct / (mag1 * mag2);

  // 5. Arccos → ángulo en radianes
  final angleRad = acos(cosAngle);

  // 6. Convertir a grados
  final angleDeg = angleRad * 180 / π;

  return JointAngle(angle: angleDeg);
}
```

### Ejemplo Numérico

```
Punto cadera: (100, 50)
Punto rodilla: (100, 150)
Punto tobillo: (100, 250)

Vectores:
v1 = (0, -100)
v2 = (0, 100)

Magnitudes:
|v1| = 100
|v2| = 100

Producto punto:
v1·v2 = 0*0 + (-100)*100 = -10000

Coseno:
cos(θ) = -10000 / (100 * 100) = -1

Ángulo:
θ = arccos(-1) = π ≈ 180°
```

**Interpretación:**
- 180° → piernas completamente estiradas (STANDING)
- 90° → ángulo recto (SQUATTING)
- 0° → imposible (las piernas se superponen)

## 5. FLUJO DE VALIDACIÓN

```
┌─ analyzepose(landmarks)
│
├─ _validateBodyParts(landmarks)
│  ├─ Verificar 6 puntos: leftHip, leftKnee, leftAnkle, rightHip, rightKnee, rightAnkle
│  └─ confidence > 0.6 para TODOS
│     └─ Si falla → "❌ Cuerpo completo no visible" → return false
│
├─ Extraer landmarks de ambas piernas
│
├─ Calcular ángulos:
│  ├─ Ángulo rodilla izquierda
│  └─ Ángulo rodilla derecha
│
├─ Promediar ángulos: (izq + der) / 2
│
├─ Determinar estado:
│  ├─ Si ángulo < 100° → SQUATTING
│  └─ Si ángulo > 160° → STANDING
│
└─ Retornar PoseAnalysis
   ├─ isValid: true
   ├─ currentState: STANDING/SQUATTING
   └─ kneeAngleDegrees: X.X
```

## 6. CICLO DE VIDA DE LA CÁMARA (WidgetsBindingObserver)

```
App Inicia
    │
    ▼
resumed (foreground)
    ├─ CameraService.initialize()
    ├─ Iniciar pose detection loop
    └─ Reproducir alarma
    
    ◄────────────────────────► 
    
paused (background)
    ├─ Detener pose detection (BUT alarma sigue)
    └─ Mantener wake lock
    
    ◄────────────────────────► 
    
detached (cerrada)
    ├─ CameraService.dispose()
    ├─ PoseDetector.close()
    ├─ AlarmService.stop()
    └─ WakeLockService.disable()
```

## 7. GESTIÓN DE RECURSOS (Memory Safety)

```
Recurso              Inicialización          Liberación
─────────────────────────────────────────────────────────
CameraController     initialize()            dispose()
PoseDetector         init()                  close()
AudioPlayer          play()                  stop()
WakeLock             enable()                disable()
MethodChannel        –                       (automático)
WidgetsBindingObserver addObserver()         removeObserver()
```

### Checklist de dispose()

```dart
@override
void dispose() {
  WidgetsBinding.instance.removeObserver(this);  // ✅ Observer
  await _cameraService.dispose();                // ✅ Cámara
  await _poseDetector.close();                   // ✅ ML Kit
  await AlarmService.stopAlarmSound();           // ✅ Audio
  await WakeLockService.disable();               // ✅ Wake lock
  super.dispose();
}
```

## 8. UMBRALES Y CONSTANTES CRÍTICAS

| Constante | Valor | Propósito |
|-----------|-------|----------|
| `CONFIDENCE_THRESHOLD` | 0.6 | Validez de landmarks (0-1) |
| `STANDING_ANGLE_THRESHOLD` | 160° | Ángulo mínimo para estar de pie |
| `SQUATTING_ANGLE_THRESHOLD` | 100° | Ángulo máximo para sentadilla |
| `HYSTERESIS_STANDING` | 165° | Evitar oscilaciones (histéresis) |
| `HYSTERESIS_SQUATTING` | 95° | Evitar oscilaciones (histéresis) |
| `FRAME_PROCESS_INTERVAL` | 500ms | Procesamiento cada 500ms |
| `WAKE_LOCK_DURATION` | 10s | Wake lock inicial |
| `TARGET_SQUATS` | 15 | Sentadillas requeridas |

## 9. ANDROID NATIVE INTEGRATION (MainActivity.kt)

### Flags de Pantalla

```kotlin
// Encender pantalla + desbloquear
window.addFlags(
    FLAG_TURN_SCREEN_ON |      // Enciende desde off
    FLAG_SHOW_WHEN_LOCKED |    // Muestra sobre lock screen
    FLAG_KEEP_SCREEN_ON |      // No apaga automáticamente
    FLAG_DISMISS_KEYGUARD      // Desbloquea
)

// Wake Lock
wakeLock = pm.newWakeLock(
    FULL_WAKE_LOCK |           // Máxima potencia
    ACQUIRE_CAUSES_WAKEUP,     // Despierta el dispositivo
    "SmartAlarm::WakeLock"
)
wakeLock.acquire(10000)  // 10 segundos
```

## 10. POSIBLES PUNTOS DE FALLO Y SOLUCIONES

| Problema | Causa | Solución |
|----------|-------|----------|
| Memory leak en cámara | No liberar resources | Llamar dispose() |
| "Persona no detectada" | Confidence < 0.6 | Mejor iluminación |
| Contador no sube | Validación stricta fallando | Verificar 6 puntos |
| App crashea en background | MethodChannel error | Try-catch en Android |
| Alarma no se apaga | Debug app, no release | Compilar release APK |
| Battery drain | Wake lock no se libera | Verificar dispose() |

---

**Última actualización:** 2026-07-27
**Versión:** 1.0.0
**Autor:** Tech Lead - Emmanuel Munayar
