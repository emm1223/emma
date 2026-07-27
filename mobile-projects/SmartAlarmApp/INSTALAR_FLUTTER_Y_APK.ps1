# Script de instalación automática de Flutter + compilación de APK
# Ejecutar como: powershell -ExecutionPolicy Bypass -File "INSTALAR_FLUTTER_Y_APK.ps1"

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "   SmartAlarmApp - Flutter + APK Setup" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Determinar ruta de Flutter
$flutterPath = "C:\Users\$env:USERNAME\flutter"
$flutterUrl = "https://storage.googleapis.com/flutter_infra_release/releases/stable/windows/flutter_windows_3.22.0-stable.zip"
$zipPath = "$env:TEMP\flutter.zip"

# 1. DESCARGAR FLUTTER
if (-not (Test-Path "$flutterPath\bin\flutter.bat")) {
  Write-Host "📥 Descargando Flutter..." -ForegroundColor Yellow
  Write-Host "   Destino: $flutterPath" -ForegroundColor Gray
  Write-Host "   (Esto puede tomar 2-5 minutos)" -ForegroundColor Gray
    
  try {
    # Descargar con Invoke-WebRequest
    $ProgressPreference = 'SilentlyContinue'
    Invoke-WebRequest -Uri $flutterUrl -OutFile $zipPath -UseBasicParsing
        
    Write-Host "   ✅ Descarga completada" -ForegroundColor Green
        
    # Extraer
    Write-Host "   📦 Extrayendo..." -ForegroundColor Yellow
    if (Test-Path "$flutterPath") {
      Remove-Item "$flutterPath" -Recurse -Force | Out-Null
    }
    Expand-Archive -Path $zipPath -DestinationPath "C:\Users\$env:USERNAME" -Force
    Remove-Item $zipPath -Force
        
    Write-Host "   ✅ Flutter instalado en: $flutterPath" -ForegroundColor Green
  }
  catch {
    Write-Host "Error en descarga: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "Descarga manual desde:" -ForegroundColor Yellow
    Write-Host "https://storage.googleapis.com/flutter_infra_release/releases/stable/windows/flutter_windows_3.22.0-stable.zip" -ForegroundColor Cyan
    exit 1
  }
}
else {
  Write-Host "✅ Flutter ya instalado en: $flutterPath" -ForegroundColor Green
}

# 2. VERIFICAR FLUTTER
Write-Host ""
Write-Host "🔍 Verificando Flutter..." -ForegroundColor Yellow
& "$flutterPath\bin\flutter.bat" --version
Write-Host ""

# 3. NAVEGAR AL PROYECTO
$projectPath = "C:\Proyectos\emma\mobile-projects\SmartAlarmApp"
if (-not (Test-Path $projectPath)) {
  Write-Host "❌ Proyecto no encontrado en: $projectPath" -ForegroundColor Red
  exit 1
}

Set-Location $projectPath
Write-Host "📁 Proyecto: $projectPath" -ForegroundColor Green

# 4. OBTENER DEPENDENCIAS
Write-Host ""
Write-Host "📋 Obteniendo dependencias..." -ForegroundColor Yellow
Write-Host "   (Esto puede tomar 2-3 minutos)" -ForegroundColor Gray
& "$flutterPath\bin\flutter.bat" pub get

# 5. COMPILAR APK DEBUG
Write-Host ""
Write-Host "🔨 Compilando APK..." -ForegroundColor Yellow
Write-Host "   (Esto puede tomar 5-10 minutos)" -ForegroundColor Gray

$buildStart = Get-Date
& "$flutterPath\bin\flutter.bat" build apk --debug

if ($LASTEXITCODE -eq 0) {
  $buildTime = (Get-Date) - $buildStart
  Write-Host ""
  Write-Host "✅ ¡APK COMPILADO EXITOSAMENTE!" -ForegroundColor Green
  Write-Host ""
  Write-Host "📱 Ubicación del APK:" -ForegroundColor Cyan
  Write-Host "   $projectPath\build\app\outputs\flutter-apk\app-debug.apk" -ForegroundColor White
  Write-Host ""
  Write-Host "📦 Tamaño del APK:" -ForegroundColor Cyan
  $apkSize = (Get-Item "$projectPath\build\app\outputs\flutter-apk\app-debug.apk").Length / 1MB
  Write-Host "   {0:F2} MB" -f $apkSize -ForegroundColor White
  Write-Host ""
  Write-Host "⏱️  Tiempo de compilación: $($buildTime.TotalMinutes -as [int]) minutos" -ForegroundColor Cyan
  Write-Host ""
    
  # Opción de compilar RELEASE
  Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan
  $release = Read-Host "¿Compilar versión RELEASE optimizada? (s/n)"
  if ($release -eq "s") {
    Write-Host ""
    Write-Host "🚀 Compilando RELEASE..." -ForegroundColor Yellow
    Write-Host "   (Esto puede tomar 10-15 minutos)" -ForegroundColor Gray
        
    $releaseStart = Get-Date
    & "$flutterPath\bin\flutter.bat" build apk --release
        
    if ($LASTEXITCODE -eq 0) {
      $releaseTime = (Get-Date) - $releaseStart
      Write-Host ""
      Write-Host "✅ ¡APK RELEASE COMPILADO!" -ForegroundColor Green
      Write-Host ""
      Write-Host "📱 Ubicación:" -ForegroundColor Cyan
      Write-Host "   $projectPath\build\app\outputs\flutter-apk\app-release.apk" -ForegroundColor White
      Write-Host ""
      $releaseSize = (Get-Item "$projectPath\build\app\outputs\flutter-apk\app-release.apk").Length / 1MB
      Write-Host "📦 Tamaño: {0:F2} MB" -f $releaseSize -ForegroundColor White
      Write-Host "⏱️  Tiempo: $($releaseTime.TotalMinutes -as [int]) minutos" -ForegroundColor Cyan
    }
    else {
      Write-Host "❌ Error compilando RELEASE" -ForegroundColor Red
    }
  }
    
  Write-Host ""
  Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan
  Write-Host "📱 Para instalar en tu Android:" -ForegroundColor Yellow
  Write-Host ""
  Write-Host "Opción 1 (usando ADB):" -ForegroundColor Cyan
  Write-Host "  adb install -r build\app\outputs\flutter-apk\app-debug.apk" -ForegroundColor White
  Write-Host ""
  Write-Host "Opción 2 (copiar manualmente):" -ForegroundColor Cyan
  Write-Host "  Copia el APK a tu teléfono y abre" -ForegroundColor White
  Write-Host ""
  Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan
}
else {
  Write-Host ""
  Write-Host "❌ Error en la compilación" -ForegroundColor Red
  Write-Host ""
  Write-Host "Intenta:" -ForegroundColor Yellow
  Write-Host "  1. flutter clean" -ForegroundColor White
  Write-Host "  2. flutter pub get" -ForegroundColor White
  Write-Host "  3. flutter build apk --debug" -ForegroundColor White
}

Write-Host ""
Read-Host "Presiona Enter para cerrar"
