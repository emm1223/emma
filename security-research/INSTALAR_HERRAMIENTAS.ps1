# ============================================================
# INSTALADOR DE HERRAMIENTAS DE SEGURIDAD - PowerShell
# Emmanuel Munayar - Julio 2026
# ============================================================

Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "    INSTALADOR DE HERRAMIENTAS PARA PENTESTING" -ForegroundColor Green
Write-Host "    Seguridad Web + Auditoria PROYECTOCARRO" -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

# Verificar si esta corriendo como admin
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")

if (-not $isAdmin) {
  Write-Host "ADVERTENCIA: Se recomienda ejecutar como Administrador" -ForegroundColor Yellow
  Write-Host "Algunos paquetes pueden no instalar correctamente sin permisos elevados" -ForegroundColor Yellow
  Write-Host ""
  Read-Host "Presiona Enter para continuar de todas formas"
}

# ============================================================
# FUNCION: Verificar herramienta
# ============================================================
function Test-Tool {
  param(
    [string]$ToolName,
    [string]$Command,
    [string]$Description
  )
    
  try {
    $version = & $Command --version 2>&1 | Select-Object -First 1
    Write-Host "  OK: $ToolName" -ForegroundColor Green
    Write-Host "     $version" -ForegroundColor Gray
    return $true
  }
  catch {
    Write-Host "  FALTA: $ToolName no encontrado" -ForegroundColor Red
    Write-Host "     $Description" -ForegroundColor Yellow
    return $false
  }
}

# ============================================================
# VERIFICAR HERRAMIENTAS ACTUALES
# ============================================================
Write-Host "[1/4] Verificando herramientas instaladas..." -ForegroundColor Cyan
Write-Host ""

$tools = @(
  @{ Name = "curl"; Command = "curl"; Description = "Cliente HTTP para requests" },
  @{ Name = "Node.js"; Command = "node"; Description = "Runtime JavaScript" },
  @{ Name = "npm"; Command = "npm"; Description = "Gestor de paquetes" },
  @{ Name = "jq"; Command = "jq"; Description = "Parser de JSON" },
  @{ Name = "Chocolatey"; Command = "choco"; Description = "Gestor de paquetes Windows" },
  @{ Name = "Git"; Command = "git"; Description = "Control de versiones" }
)

$installed = @()
$missing = @()

foreach ($tool in $tools) {
  if (Test-Tool -ToolName $tool.Name -Command $tool.Command) {
    $installed += $tool.Name
  }
  else {
    $missing += $tool.Name
  }
}

Write-Host ""
Write-Host "Resumen: $(($installed).Count) instalados, $(($missing).Count) faltantes" -ForegroundColor Yellow
Write-Host ""

# ============================================================
# INSTALAR HERRAMIENTAS FALTANTES
# ============================================================
if ($missing.Count -gt 0) {
  Write-Host "[2/4] Instalando herramientas faltantes..." -ForegroundColor Cyan
  Write-Host ""
    
  # Instalar jq si falta
  if ("jq" -in $missing) {
    Write-Host "INSTALANDO: jq..." -ForegroundColor Yellow
    choco install jq -y 2>&1 | Write-Host -ForegroundColor Gray
    Write-Host "OK: jq instalado" -ForegroundColor Green
    Write-Host ""
  }
    
  # Instalar curl si falta
  if ("curl" -in $missing) {
    Write-Host "INSTALANDO: curl..." -ForegroundColor Yellow
    choco install curl -y 2>&1 | Write-Host -ForegroundColor Gray
    Write-Host "OK: curl instalado" -ForegroundColor Green
    Write-Host ""
  }
    
  # Instalar Git si falta
  if ("Git" -in $missing) {
    Write-Host "INSTALANDO: Git..." -ForegroundColor Yellow
    choco install git -y 2>&1 | Write-Host -ForegroundColor Gray
    Write-Host "OK: Git instalado" -ForegroundColor Green
    Write-Host ""
  }
}
else {
  Write-Host "[2/4] Todas las herramientas basicas estan instaladas" -ForegroundColor Green
  Write-Host ""
}

# ============================================================
# INSTALAR BURP SUITE COMMUNITY
# ============================================================
Write-Host "[3/4] Verificando Burp Suite Community..." -ForegroundColor Cyan
Write-Host ""

$burpPath = "C:\Program Files\BurpSuiteCommunity\BurpSuiteCommunity.exe"
$burpPath64 = "C:\Program Files (x86)\BurpSuiteCommunity\BurpSuiteCommunity.exe"

if ((Test-Path $burpPath) -or (Test-Path $burpPath64)) {
  Write-Host "  OK: Burp Suite Community ya instalado" -ForegroundColor Green
}
else {
  Write-Host "  FALTA: Burp Suite Community no encontrado" -ForegroundColor Red
  Write-Host ""
  Write-Host "Instalar Burp Suite Community? (Herramienta profesional para pentesting)" -ForegroundColor Yellow
  $response = Read-Host "Escribe 's' para instalar"
    
  if ($response -eq "s" -or $response -eq "S") {
    Write-Host "INSTALANDO: Burp Suite Community..." -ForegroundColor Yellow
    choco install burpsuite-community -y 2>&1 | Write-Host -ForegroundColor Gray
    Write-Host "OK: Burp Suite Community instalado" -ForegroundColor Green
    Write-Host ""
    Write-Host "IMPORTANTE: Cierra y reabre terminal para activar cambios" -ForegroundColor Cyan
  }
  else {
    Write-Host "OMITIDO: Burp Suite (puedes instalarlo despues)" -ForegroundColor Yellow
  }
}

# ============================================================
# INSTALAR OWASP ZAP (OPCIONAL)
# ============================================================
Write-Host ""
Write-Host "[4/4] Herramientas opcionales..." -ForegroundColor Cyan
Write-Host ""

Write-Host "Instalar OWASP ZAP? (Alternativa a Burp Suite)" -ForegroundColor Yellow
$zap = Read-Host "Escribe 's' para instalar"

if ($zap -eq "s" -or $zap -eq "S") {
  Write-Host "INSTALANDO: OWASP ZAP..." -ForegroundColor Yellow
  choco install zaproxy -y 2>&1 | Write-Host -ForegroundColor Gray
  Write-Host "OK: OWASP ZAP instalado" -ForegroundColor Green
}

Write-Host ""
Write-Host "Instalar Postman? (Testing de APIs, opcional)" -ForegroundColor Yellow
$postman = Read-Host "Escribe 's' para instalar"

if ($postman -eq "s" -or $postman -eq "S") {
  Write-Host "INSTALANDO: Postman..." -ForegroundColor Yellow
  choco install postman -y 2>&1 | Write-Host -ForegroundColor Gray
  Write-Host "OK: Postman instalado" -ForegroundColor Green
}

# ============================================================
# VERIFICAR NUEVAMENTE
# ============================================================
Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "                  ESTADO FINAL" -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Herramientas disponibles:" -ForegroundColor Yellow
Test-Tool -ToolName "curl" -Command "curl"
Test-Tool -ToolName "Node.js" -Command "node"
Test-Tool -ToolName "npm" -Command "npm"
Test-Tool -ToolName "jq" -Command "jq"
Test-Tool -ToolName "Git" -Command "git"

if ((Test-Path $burpPath) -or (Test-Path $burpPath64)) {
  Write-Host "  OK: Burp Suite Community" -ForegroundColor Green
}

Write-Host ""
Write-Host "============================================================" -ForegroundColor Green
Write-Host "              PROXIMOS PASOS" -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Green
Write-Host ""
Write-Host "1. Abre una NUEVA terminal (Administrador)" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Inicia PROYECTOCARRO:" -ForegroundColor Cyan
Write-Host "   cd c:\Proyectos\emma\web-projects\PROYECTOCARRO" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "3. Abre Burp Suite Community:" -ForegroundColor Cyan
Write-Host "   Windows Start Menu > Busca: Burp Suite Community" -ForegroundColor White
Write-Host "   O: C:\Program Files\BurpSuiteCommunity\BurpSuiteCommunity.exe" -ForegroundColor White
Write-Host ""
Write-Host "4. Lee la guia de setup Burp:" -ForegroundColor Cyan
Write-Host "   c:\Proyectos\emma\security-research\05_BURP_SUITE_SETUP.md" -ForegroundColor White
Write-Host ""
Write-Host "5. Comienza los tests:" -ForegroundColor Cyan
Write-Host "   c:\Proyectos\emma\security-research\06_TESTS_EN_VIVO.md" -ForegroundColor White
Write-Host ""
Write-Host "============================================================" -ForegroundColor Green
Write-Host ""

Write-Host "Presiona Enter para salir..." -ForegroundColor Gray
Read-Host
