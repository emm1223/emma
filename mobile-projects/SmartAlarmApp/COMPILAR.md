⚠️ INSTRUCCIONES CRÍTICAS PARA COMPILAR Y EJECUTAR
================================================

## 1. SETUP INICIAL

```bash
cd c:\Proyectos\emma\mobile-projects\SmartAlarmApp

# Obtener todas las dependencias
flutter pub get

# Generar código (especialmente para method_channel)
flutter pub run build_runner build
```

## 2. CONFIGURAR ANDROID

```bash
# Actualizar gradle
flutter clean

# Verificar que todo esté bien
flutter doctor -v

# Conectar dispositivo Android
adb devices
```

## 3. COMPILAR APK DEBUG

```bash
flutter build apk --debug
# Ubicación: build/app/outputs/flutter-apk/app-debug.apk
```

## 4. COMPILAR APK RELEASE (OPTIMIZADO)

```bash
flutter build apk --release
# Ubicación: build/app/outputs/flutter-apk/app-release.apk
```

## 5. INSTALAR EN DISPOSITIVO

```bash
# Opción 1: Ejecutar directamente
flutter run -v

# Opción 2: Instalar APK
adb install -r build/app/outputs/flutter-apk/app-release.apk
```

## 6. VERIFICAR PERMISOS EN DISPOSITIVO

Después de instalar, ve a:
- Configuración > Aplicaciones > SmartAlarmApp > Permisos
- Habilita: Cámara, Micrófono, Alarma y cronómetro

## 7. ARCHIVOS IMPORTANTES GENERADOS

Después de compilar exitosamente:

✅ app-debug.apk
✅ app-release.apk
✅ .gradle/
✅ build/

## 8. TROUBLESHOOTING

### "Target of URI doesn't exist"
```bash
flutter pub get
flutter pub run build_runner build
```

### "Gradle build failed"
```bash
flutter clean
cd android && ./gradlew clean && cd ..
flutter pub get
flutter build apk --debug
```

### "No device found"
```bash
adb devices
# Si no aparece, conecta USB y habilita depuración USB
```

### "Permission denied"
```bash
adb kill-server
adb devices
```

## 9. REQUISITOS MÍNIMOS DEL DISPOSITIVO

- Android 5.0+ (API 21+)
- RAM: 2GB mínimo
- Cámara frontal
- 50MB libre en almacenamiento

## 10. TESTING

```bash
# Ejecutar con logs
flutter run -v

# En la app:
1. Presiona "INICIAR ALARMA"
2. Haz 15 sentadillas frente a la cámara
3. La alarma debe detenerse automáticamente
```

## 📞 CONTACTO

Si hay problemas, verifica:
1. Flutter instalado correctamente: `flutter --version`
2. Android SDK: `flutter doctor`
3. Dispositivo conectado: `adb devices`
4. Permisos del dispositivo habilitados
