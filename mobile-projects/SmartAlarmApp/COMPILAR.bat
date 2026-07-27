@echo off
REM Compilar APK de SmartAlarmApp
REM Este script busca Flutter automáticamente

setlocal enabledelayedexpansion

echo.
echo ============================================
echo     SmartAlarmApp - APK Compiler
echo ============================================
echo.

REM Buscar Flutter en ubicaciones comunes
set "FLUTTER_PATH="

if exist "C:\Users\%USERNAME%\flutter\bin\flutter.bat" (
    set "FLUTTER_PATH=C:\Users\%USERNAME%\flutter"
    echo ✅ Flutter encontrado en: !FLUTTER_PATH!
) else if exist "C:\flutter\bin\flutter.bat" (
    set "FLUTTER_PATH=C:\flutter"
    echo ✅ Flutter encontrado en: !FLUTTER_PATH!
) else if exist "D:\flutter\bin\flutter.bat" (
    set "FLUTTER_PATH=D:\flutter"
    echo ✅ Flutter encontrado en: !FLUTTER_PATH!
) else (
    echo ❌ Flutter NO encontrado
    echo.
    echo Descarga Flutter desde:
    echo https://flutter.dev/docs/get-started/install/windows
    echo.
    echo E instálalo en una de estas carpetas:
    echo - C:\flutter
    echo - C:\Users\%USERNAME%\flutter
    echo - D:\flutter
    echo.
    pause
    exit /b 1
)

REM Navegar a la carpeta del proyecto
cd /d "C:\Proyectos\emma\mobile-projects\SmartAlarmApp"

echo.
echo 📋 Paso 1: Obtener dependencias...
call "!FLUTTER_PATH!\bin\flutter.bat" pub get
if errorlevel 1 (
    echo ❌ Error al obtener dependencias
    pause
    exit /b 1
)

echo.
echo 🔨 Paso 2: Compilar APK (DEBUG)...
echo (Esto puede tomar 3-5 minutos)
call "!FLUTTER_PATH!\bin\flutter.bat" build apk --debug

if errorlevel 1 (
    echo ❌ Error en la compilación DEBUG
    pause
    exit /b 1
)

echo.
echo ✅ APK DEBUG compilado:
echo build\app\outputs\flutter-apk\app-debug.apk
echo.

REM Ofrecer compilar RELEASE
set /p COMPILE_RELEASE="¿Compilar versión RELEASE (optimizada)? (s/n): "
if /i "%COMPILE_RELEASE%"=="s" (
    echo.
    echo 🚀 Compilando APK RELEASE (esto toma 5-10 minutos)...
    call "!FLUTTER_PATH!\bin\flutter.bat" build apk --release
    
    if errorlevel 1 (
        echo ❌ Error en la compilación RELEASE
        pause
        exit /b 1
    )
    
    echo.
    echo ✅ APK RELEASE compilado:
    echo build\app\outputs\flutter-apk\app-release.apk
    echo.
    echo 📱 Para pasar a tu Android:
    echo    adb install -r build\app\outputs\flutter-apk\app-release.apk
)

echo.
echo ============================================
echo     ✅ ¡COMPILACIÓN COMPLETADA!
echo ============================================
echo.

pause
