#!/bin/bash
# Script para compilar APK de SmartAlarmApp
# Uso: bash COMPILAR.sh

set -e

PROJECT_DIR="c:\Proyectos\emma\mobile-projects\SmartAlarmApp"
FLUTTER_PATH="C:\Users\Emman\flutter"

echo ""
echo "=========================================="
echo "  SmartAlarmApp - APK Compiler"
echo "=========================================="
echo ""

# Verificar Flutter
if [ ! -f "$FLUTTER_PATH/bin/flutter.bat" ]; then
    echo "ERROR: Flutter no encontrado en $FLUTTER_PATH"
    echo "Se descargará en breve..."
    exit 1
fi

cd "$PROJECT_DIR"

# Paso 1: Limpiar (opcional)
echo "Limpiando proyecto..."
"$FLUTTER_PATH/bin/flutter.bat" clean

# Paso 2: Obtener dependencias
echo ""
echo "Obteniendo dependencias (flutter pub get)..."
"$FLUTTER_PATH/bin/flutter.bat" pub get

# Paso 3: Compilar APK DEBUG
echo ""
echo "Compilando APK (esto toma 5-10 minutos)..."
"$FLUTTER_PATH/bin/flutter.bat" build apk --debug

echo ""
echo "✅ ¡APK COMPILADO!"
echo ""
echo "Ubicación: $PROJECT_DIR/build/app/outputs/flutter-apk/app-debug.apk"
echo ""
echo "Para instalar:"
echo "  adb install -r build\app\outputs\flutter-apk\app-debug.apk"
echo ""
