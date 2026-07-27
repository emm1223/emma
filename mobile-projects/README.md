# 📱 Mobile Projects - Portfolio Profesional

## Contenido

Este directorio contiene proyectos móviles profesionales desarrollados con tecnologías modernas.

### Proyectos

#### 1. **SmartAlarmApp** (Flutter + Android)
- **Descripción:** Despertador inteligente que detecta 15 sentadillas con IA
- **Tecnología:** Flutter (Dart), Google ML Kit, Android Nativo (Kotlin)
- **Status:** ✅ Producción
- **Características:**
  - Detección de poses con ML Kit
  - Wake up desde Doze Mode
  - Trigonometría para análisis de movimiento
  - 100% Null Safe
  - Memory leak free
  - Listo para compilar a APK

**Localización:** `SmartAlarmApp/`

---

## 📋 Estructura

```
mobile-projects/
└── SmartAlarmApp/
    ├── lib/
    │   ├── main.dart
    │   ├── models/
    │   ├── screens/
    │   ├── services/
    │   ├── utils/
    │   └── widgets/
    ├── android/
    │   ├── app/src/main/
    │   │   ├── AndroidManifest.xml
    │   │   └── kotlin/
    │   └── build.gradle
    ├── pubspec.yaml
    ├── README.md
    ├── ARQUITECTURA.md
    ├── DEBUGGING.md
    ├── COMPILAR.md
    ├── CHECKLIST_INSTALACION.md
    └── RESUMEN_EJECUTIVO.md
```

---

## 🚀 Inicio Rápido

```bash
cd SmartAlarmApp
flutter pub get
flutter build apk --release
```

**APK ubicado en:** `build/app/outputs/flutter-apk/app-release.apk`

---

## 📚 Documentación

Cada proyecto contiene documentación completa:
- `README.md` - Guía de uso
- `ARQUITECTURA.md` - Diagrama técnico
- `DEBUGGING.md` - Troubleshooting
- `COMPILAR.md` - Compilación paso a paso

---

## 🛠️ Requisitos

- Flutter 3.0+
- Android SDK 21+ (API Level)
- Kotlin 1.8+
- 2GB RAM mínimo

---

## 👨‍💻 Autor

Emmanuel Munayar
- Email: emmanuelmunayar@gmail.com
- GitHub: @emm1223

---

**Última actualización:** 2026-07-27
