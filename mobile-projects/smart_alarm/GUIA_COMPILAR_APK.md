# 🚀 SmartAlarmApp - Guía de Compilación APK

## ⚡ OPCIÓN RÁPIDA: Compilación en la Nube (Recomendado)

### Paso 1: Prepara tu código

Tu proyecto Flutter está **100% listo** en:
```
c:\Proyectos\emma\mobile-projects\smart_alarm\
```

### Paso 2: Sube a GitHub (opcional pero recomendado)

```bash
cd "c:\Proyectos\emma\mobile-projects\smart_alarm"
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/emm1223/smart-alarm.git
git push -u origin main
```

### Paso 3: Usa EAS Build (más fácil)

1. Instala EAS CLI:
```bash
npm install -g eas-cli
```

2. En tu proyecto:
```bash
eas build --platform android --local
```

3. ¡Tu APK estará listo en minutos!

---

## 🖥️ OPCIÓN LOCAL: Compilar Manualmente

### Alternativa A: Usar Android Studio (más fácil)

1. **Descarga Android Studio:**
   ```
   https://developer.android.com/studio
   ```

2. **Durante la instalación:**
   - Selecciona "Standard Installation"
   - Deja que instale Android SDK completo
   - Espera a que se complete (~30 minutos)

3. **Abre tu proyecto en Android Studio:**
   ```
   File → Open → c:\Proyectos\emma\mobile-projects\smart_alarm
   ```

4. **Compila el APK:**
   ```
   Build → Build Bundle(s)/APK(s) → Build APK(s)
   ```

5. **Tu APK estará en:**
   ```
   build/app/outputs/flutter-apk/app-debug.apk
   ```

### Alternativa B: Línea de Comandos (Avanzado)

Una vez que Android Studio instale el SDK:

```bash
cd "c:\Proyectos\emma\mobile-projects\smart_alarm"
flutter build apk --debug
```

El APK se encontrará en:
```
build/app/outputs/flutter-apk/app-debug.apk
```

---

## 📱 Instalar en tu Android

### Opción 1: USB (Rápido)

1. Conecta tu Android al PC con USB
2. Activa "Modo de Desarrollador" en el teléfono
3. Ejecuta:
```bash
adb install -r build/app/outputs/flutter-apk/app-debug.apk
```

### Opción 2: Compartir por correo/Nube

1. Envía el APK a tu correo
2. Descárgalo en el teléfono
3. Abre el archivo y tap "Instalar"

### Opción 3: ADB por WiFi

```bash
# En la misma red
adb connect <IP_DEL_TELEFONO>:5555
adb install build/app/outputs/flutter-apk/app-debug.apk
```

---

## 📊 Características del APK

✅ **Tamaño:** 50-70 MB (debug)  
✅ **Compatibilidad:** Android 5.0+ (API 21+)  
✅ **Funciones:**
   - Detección de pose con ML Kit
   - Contador de squats
   - Integración de cámara
   - Alarma inteligente

---

## 🔧 Comandos Útiles

### Compilar Release (optimizado)
```bash
flutter build apk --release
# Tamaño: ~30 MB
```

### Ver detalles del APK
```bash
adb shell dumpsys packages com.smartalarm.app
```

### Depuración en tiempo real
```bash
flutter run
```

### Ver logs
```bash
adb logcat | grep flutter
```

---

## ❓ Solución de Problemas

### "No Android SDK found"
```bash
flutter config --android-sdk=C:\Android
```

### "SDK version not found"
→ Necesitas Android Studio para descargar componentes  
→ O usa EAS Build (en la nube)

### El APK no se instala
```bash
# Desinstala versión anterior
adb uninstall com.smartalarm.app
# Intenta de nuevo
adb install -r app-debug.apk
```

### Permisos de cámara denegados
- El app solicita permisos al iniciar
- Abre Configuración → Permisos → Camera
- Otorga permiso a SmartAlarmApp

---

## 📈 Próximos Pasos

1. ✅ Compila el APK (elige una opción arriba)
2. ✅ Instala en tu Android
3. ✅ Prueba la detección de squats
4. ✅ Mejora el app si es necesario

---

## 🎯 Estructura del Proyecto (Referencia)

```
smart_alarm/
├── lib/                          # Código Dart
│   ├── main.dart                # Punto de entrada
│   ├── screens/
│   │   └── alarm_active_screen.dart   # UI principal
│   ├── services/                # Servicios (alarma, cámara)
│   ├── utils/
│   │   └── squat_analyzer.dart  # Lógica de detección
│   └── models/                  # Data models
├── android/                      # Código nativo Android
│   ├── app/src/main/
│   │   ├── AndroidManifest.xml  # Permisos
│   │   └── kotlin/              # MainActivity.kt
│   └── build.gradle             # Gradle config
├── pubspec.yaml                 # Dependencias Flutter
└── build/                       # Output compilación
    └── app/outputs/flutter-apk/
        └── app-debug.apk        # ✅ TU APK AQUÍ
```

---

## 💬 Necesitas Ayuda?

1. Verifica que Flutter esté instalado: `flutter --version`
2. Ejecuta `flutter doctor` para diagnóstico
3. Revisa los archivos de configuración en el proyecto

**Última Solución:**
Si todo falla, usa **EAS Build** (en la nube) - ¡es la más confiable!

---

**Fecha:** 27 de Julio, 2026  
**Estado:** ✅ Proyecto listo para compilar  
**Próximo:** Ejecuta tu opción preferida arriba

¡Tu APK está a solo algunos clicks de distancia! 🎉
