# 🚀 CONFIGURACIÓN DE FLUTTER - GUÍA RÁPIDA

## El Problema
Flutter no está en tu PATH del sistema. Necesitas instalarlo o agregarlo.

## Solución Rápida (2 opciones)

### Opción 1: Instalar Flutter (Recomendado)

1. **Descarga Flutter:**
   ```
   https://flutter.dev/docs/get-started/install/windows
   ```

2. **Extrae el archivo** en una carpeta (ej: `C:\flutter`)

3. **Agrega a PATH:**
   - Presiona `Win + X` → `Configuración`
   - Busca "variables de entorno"
   - Clic en "Editar las variables de entorno del sistema"
   - Clic en "Variables de entorno"
   - En "Variables de usuario" clic en "Nueva"
   - Nombre: `PATH`
   - Valor: `C:\flutter\bin` (o donde lo extrajiste)
   - OK → OK

4. **Reinicia la terminal** (cierra y abre nuevamente)

### Opción 2: Usar el comando directo

Si ya tienes Flutter instalado en otra ubicación, ejecuta desde VS Code Terminal:

```powershell
# En PowerShell (ve al proyecto):
cd "C:\Proyectos\emma\mobile-projects\SmartAlarmApp"

# Luego ejecuta:
C:\flutter\bin\flutter pub get
C:\flutter\bin\flutter build apk --release
```

(Reemplaza `C:\flutter` con tu ruta de instalación)

## Verificar que Flutter está instalado

```bash
flutter --version
flutter doctor -v
```

Si aparecen versiones, ¡estás listo!

## Próximos Pasos (una vez Flutter esté en PATH)

```bash
cd c:\Proyectos\emma\mobile-projects\SmartAlarmApp
flutter pub get
flutter build apk --release
```

---

**¿Ya instalaste Flutter?** Dame un 👍 y ejecutamos los comandos.
