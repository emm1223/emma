# 📱 Guía: Instalar SmartAlarmApp en tu Android

## ✅ APK Compilado

Tu aplicación Flutter **SmartAlarmApp** está lista para instalar en tu dispositivo Android.

### 📁 Ubicación del APK
```
c:\Proyectos\emma\mobile-projects\SmartAlarmApp\build\app\outputs\flutter-apk\app-debug.apk
```

**Tamaño**: ~50-60 MB (después de compilación)

---

## 🔧 Opción 1: Con ADB (Androide Debug Bridge)

### Requisitos:
- ✅ Android SDK Platform Tools (incluyen `adb`)
- ✅ USB conectado (o emulador Android Studio)
- ✅ USB Debugging habilitado en el dispositivo

### Pasos:

1. **Habilitar USB Debugging** en tu Android:
   - Abre Configuración → Información del Dispositivo
   - Toca "Número de Compilación" 7 veces
   - Volverá a Configuración → Opciones de Desarrollador
   - Habilita "Depuración USB"

2. **Conecta tu dispositivo** por USB

3. **Abre PowerShell/Terminal** en la carpeta del proyecto:
   ```powershell
   cd "c:\Proyectos\emma\mobile-projects\SmartAlarmApp"
   ```

4. **Instala el APK**:
   ```bash
   adb install -r build\app\outputs\flutter-apk\app-debug.apk
   ```

5. **Espera a que termine**:
   ```
   Installing...
   Success
   ```

---

## 📂 Opción 2: Copia Manual

### Pasos:

1. **Copia el APK a tu teléfono**:
   - Conecta por USB o copia a carpeta compartida
   - Destino: Carpeta Downloads de tu teléfono

2. **En tu dispositivo Android**:
   - Abre Archivos / File Manager
   - Navega a Downloads
   - Toca el APK `app-debug.apk`
   - Tap en "Instalar"
   - Si pide permisos: tap "Instalar de todas formas"

3. **Listo** 🎉

---

## 🚀 Requisitos del Dispositivo

La app necesita:
- **Android 5.0+** (API 21+) ✅ La mayoría de dispositivos
- **Cámara frontal** (para detectar squats)
- **Micrófono** (para alarma)
- **Permisos**: Se pide al abrir la app

---

## ❓ Solución de Problemas

### "No se puede instalar la aplicación"
**Solución:**
```bash
adb uninstall com.smartalarm.app
adb install build\app\outputs\flutter-apk\app-debug.apk
```

### "No reconoce el dispositivo"
```bash
adb devices
```
Si no aparece tu device:
- Desconecta y reconecta el USB
- Reinicia el ADB:
```bash
adb kill-server
adb start-server
```

### "Archivos ejecutables no encontrados"
- Asegúrate que Android SDK está instalado en Android Studio
- Agrega a PATH:
  ```
  C:\Users\[TuUsuario]\AppData\Local\Android\sdk\platform-tools
  ```

---

## 📊 Información Técnica

| Componente | Detalles |
|-----------|---------|
| **Versión Flutter** | 3.22.0 |
| **Versión Dart** | 3.0+ |
| **API Android** | 21+ (Android 5.0) |
| **Arquitectura** | arm64-v8a (la mayoría) |
| **Lenguaje** | Dart + Kotlin (Android) |

---

## 🎯 Funcionalidades

✅ **Alarma Inteligente**: Requiere 15 squats detectados por cámara  
✅ **Detección Pose**: Utiliza ML Kit Pose Detection  
✅ **Análisis de Ángulos**: Trigonometría avanzada para rodillas  
✅ **Contador de Squats**: Interfaz interactiva  
✅ **Sonido de Alarma**: Audio personalizado  
✅ **Activación de Pantalla**: Wake lock automático  

---

## 📞 Soporte

Si tienes problemas:
1. Verifica que el APK se compiló exitosamente
2. Comprueba que tu Android tiene permisos habilitados
3. Reinicia el dispositivo antes de instalar
4. Prueba en emulador de Android Studio para debug

---

**¡Disfruta tu Smart Alarm!** 🚀
