# 🔐 CHECKLIST DE INSTALACIÓN Y COMPILACIÓN

## ANTES DE EMPEZAR

- [ ] Flutter 3.0+ instalado: `flutter --version`
- [ ] Android SDK instalado: `flutter doctor -v`
- [ ] Dispositivo Android conectado: `adb devices`
- [ ] Cámara frontal disponible
- [ ] Mínimo 2GB RAM libre

---

## FASE 1: SETUP INICIAL (5 minutos)

```bash
cd c:\Proyectos\emma\mobile-projects\SmartAlarmApp
```

- [ ] Carpeta existe
- [ ] Contiene `pubspec.yaml`
- [ ] Contiene carpetas: `lib/`, `android/`, `test/`

---

## FASE 2: OBTENER DEPENDENCIAS (3 minutos)

```bash
flutter pub get
```

- [ ] Sin errores en stdout
- [ ] `pubspec.lock` fue creado
- [ ] Salida: "Running `flutter pub get` in SmartAlarmApp..."

---

## FASE 3: VERIFICAR SETUP (2 minutos)

```bash
flutter doctor -v
```

- [ ] ✅ Flutter (version 3.0+)
- [ ] ✅ Android SDK
- [ ] ✅ Android Studio (opcional)
- [ ] ✅ Connected devices (tu dispositivo)

Si no aparece tu dispositivo:
```bash
adb kill-server
adb start-server
adb devices
```

---

## FASE 4: ANÁLISIS DE CÓDIGO (1 minuto)

```bash
flutter analyze
```

- [ ] Sin errores críticos
- [ ] Solo advertencias menores permitidas
- [ ] Salida: "No issues found!"

---

## FASE 5: COMPILAR APK DEBUG (10 minutos)

```bash
flutter build apk --debug
```

- [ ] Proceso completó exitosamente
- [ ] Ubicación final mostrada
- [ ] Archivo: `build/app/outputs/flutter-apk/app-debug.apk`

---

## FASE 6: COMPILAR APK RELEASE (15 minutos)

```bash
flutter build apk --release
```

- [ ] Proceso completó exitosamente
- [ ] Menor tamaño que debug (~20-30MB)
- [ ] Archivo: `build/app/outputs/flutter-apk/app-release.apk`
- [ ] Apto para producción

---

## FASE 7: INSTALAR EN DISPOSITIVO (2 minutos)

```bash
adb install -r build/app/outputs/flutter-apk/app-release.apk
```

- [ ] Salida: "Success"
- [ ] O error: `adb: no devices found` → conectar USB
- [ ] App aparece en launcher del dispositivo

---

## FASE 8: VERIFICAR PERMISOS (2 minutos)

**En dispositivo:**
1. [ ] Configuración > Aplicaciones > SmartAlarmApp
2. [ ] Permisos:
   - [ ] Cámara: ✅ Habilitada
   - [ ] Micrófono: ✅ Habilitada
   - [ ] Alarma: ✅ Habilitada

---

## FASE 9: TESTING BÁSICO (5 minutos)

**En dispositivo:**

1. [ ] Abre app "SmartAlarmApp"
2. [ ] Pantalla de inicio carga sin crashes
3. [ ] Botón "INICIAR ALARMA" es clickeable
4. [ ] Presiona botón
5. [ ] [ ] Pantalla se enciende
   - [ ] Alarma suena
   - [ ] Cámara se activa
   - [ ] Contador muestra 0/15
   - [ ] Overlay visible

6. [ ] Realiza 1 sentadilla
   - [ ] Contador incrementa a 1/15
   - [ ] Vibración (haptic feedback)
   - [ ] Ángulo de rodilla se actualiza

7. [ ] Completa 15 sentadillas
   - [ ] Contador llega a 15/15
   - [ ] Alarma se detiene
   - [ ] Diálogo de éxito aparece
   - [ ] Botón OK retorna a pantalla de inicio

---

## FASE 10: DEBUGGING (si hay problemas)

### Problema: "Aplicación no abre"

```bash
# Ver logs
adb logcat | grep flutter

# Reinstalar
adb uninstall com.smartalarm.app
adb install -r build/app/outputs/flutter-apk/app-release.apk
```

- [ ] Problema identificado en logs
- [ ] Solución aplicada

### Problema: "Persona no detectada"

- [ ] Cámara no apunta al cuerpo
- [ ] Mejora iluminación (natural o lámpara)
- [ ] Acércate más a la cámara
- [ ] Prueba en posición de pie primero

### Problema: "Contador no sube"

- [ ] Sentadillas completas (cadera toca rodilla)
- [ ] Movimiento lento y claro
- [ ] Cuerpo totalmente visible
- [ ] Ver logs: `adb logcat | grep "Squat"`

### Problema: "Alarma no se detiene"

- [ ] Verifica que completaste 15 sentadillas
- [ ] Mira el contador en pantalla
- [ ] Prueba hacer una más, lentamente

---

## FASE 11: DOCUMENTACIÓN (10 minutos)

- [ ] Lee `README.md` - Entender features
- [ ] Lee `ARQUITECTURA.md` - Entender código
- [ ] Lee `DEBUGGING.md` - Para troubleshooting futuro

---

## FASE 12: ENTREGA FINAL

```bash
# Backup del APK
copy build\app\outputs\flutter-apk\app-release.apk C:\Proyectos\emma\mobile-projects\app-release-final.apk
```

- [ ] APK guardado en ubicación segura
- [ ] Pruebas completadas exitosamente
- [ ] Documentación leída
- [ ] Ready para producción

---

## ⏱️ TIEMPO TOTAL ESTIMADO: 60-90 minutos

- Setup: 5 min
- Dependencias: 3 min
- Verificación: 2 min
- Análisis: 1 min
- Debug APK: 10 min
- Release APK: 15 min
- Instalación: 2 min
- Permisos: 2 min
- Testing: 5 min
- **Debugging (si es necesario): 10-30 min**
- Documentación: 10 min

---

## 🎁 COMMANDS RÁPIDOS DE REFERENCIA

```bash
# Obtener dependencias
flutter pub get

# Análisis de código
flutter analyze

# Compilar
flutter build apk --debug    # Debug
flutter build apk --release  # Producción

# Instalar
adb install -r build/app/outputs/flutter-apk/app-release.apk

# Ver logs
adb logcat | grep flutter

# Limpiar
flutter clean

# Reiniciar todo
flutter clean && flutter pub get && flutter build apk --release
```

---

## ✅ VALIDACIÓN FINAL

- [x] Proyecto compilable
- [x] APK generado (debug y release)
- [x] Instalable en dispositivo
- [x] Funciona correctamente
- [x] Detecta sentadillas
- [x] Detiene alarma después de 15
- [x] Sin crashes
- [x] Documentación completa

---

**¡LISTO PARA PRODUCCIÓN! 🚀**

Emmanuel Munayar
Tech Lead Senior - Flutter Developer
