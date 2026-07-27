# Compilar APK de SmartAlarmApp

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   SmartAlarmApp - APK Builder" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Buscar Flutter
$flutterPath = ""
if (Test-Path "C:\Users\$env:USERNAME\flutter\bin\flutter.bat") {
    $flutterPath = "C:\Users\$env:USERNAME\flutter"
}
elseif (Test-Path "C:\flutter\bin\flutter.bat") {
    $flutterPath = "C:\flutter"
}
else {
    Write-Host "ERROR: Flutter no encontrado" -ForegroundColor Red
    Write-Host "Descarga desde: https://flutter.dev/docs/get-started/install/windows"
    exit 1
}

Write-Host "Flutter: $flutterPath" -ForegroundColor Green

# Ir al proyecto
$projectPath = "C:\Proyectos\emma\mobile-projects\SmartAlarmApp"
Set-Location $projectPath

# Paso 1: pub get
Write-Host ""
Write-Host "Paso 1: Obteniendo dependencias..." -ForegroundColor Yellow
& "$flutterPath\bin\flutter.bat" pub get

# Paso 2: Compilar
Write-Host ""
Write-Host "Paso 2: Compilando APK..." -ForegroundColor Yellow
& "$flutterPath\bin\flutter.bat" build apk --debug

Write-Host ""
Write-Host "¡Hecho!" -ForegroundColor Green
Write-Host "APK en: build\app\outputs\flutter-apk\app-debug.apk"
