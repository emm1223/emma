@echo off
REM ============================================================
REM SCRIPT DE INSTALACION - HERRAMIENTAS DE SEGURIDAD
REM ============================================================

setlocal enabledelayedexpansion

echo.
echo ============================================================
echo    INSTALADOR DE HERRAMIENTAS DE SEGURIDAD WEB
echo    Emmanuel Munayar - Julio 2026
echo ============================================================
echo.

REM Verificar si es administrador
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo.
    echo ⚠️  ADVERTENCIA: Se recomienda ejecutar como Administrador
    echo.
    pause
)

REM ============================================================
REM 1. VERIFICAR E INSTALAR CHOCOLATEY
REM ============================================================
echo [1/5] Verificando Chocolatey...
choco --version >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo ❌ Chocolatey no está instalado
    echo Instalando Chocolatey (gestor de paquetes)...
    echo.
    
    @"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.ServicePointManager).SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072); iex ((New-Object Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))"
    
    echo.
    echo ✅ Chocolatey instalado
    echo IMPORTANTE: Cierra y reabre este CMD como Administrador
    pause
    exit /b
) else (
    echo ✅ Chocolatey encontrado
)

REM ============================================================
REM 2. INSTALAR CURL
REM ============================================================
echo.
echo [2/5] Verificando curl...
curl --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ curl no está instalado, instalando...
    choco install curl -y
    echo ✅ curl instalado
) else (
    echo ✅ curl encontrado
)

REM ============================================================
REM 3. INSTALAR JQ (para parsear JSON)
REM ============================================================
echo.
echo [3/5] Verificando jq...
jq --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ jq no está instalado, instalando...
    choco install jq -y
    echo ✅ jq instalado
) else (
    echo ✅ jq encontrado
)

REM ============================================================
REM 4. INSTALAR BURP SUITE COMMUNITY
REM ============================================================
echo.
echo [4/5] Verificando Burp Suite Community...

REM Verificar si existe Burp en Program Files
if exist "C:\Program Files\BurpSuiteCommunity\BurpSuiteCommunity.exe" (
    echo ✅ Burp Suite Community ya instalado
) else if exist "C:\Program Files (x86)\BurpSuiteCommunity\BurpSuiteCommunity.exe" (
    echo ✅ Burp Suite Community ya instalado
) else (
    echo ❌ Burp Suite Community no está instalado
    echo.
    echo Para instalar Burp Suite Community:
    echo.
    echo OPCIÓN 1 - Instalador de Chocolatey:
    echo   choco install burpsuite-community -y
    echo.
    echo OPCIÓN 2 - Descargar manual:
    echo   Visita: https://portswigger.net/burp/community/download
    echo.
    echo ⏳ Descargando e instalando Burp Suite Community...
    choco install burpsuite-community -y
    echo ✅ Burp Suite Community instalado
)

REM ============================================================
REM 5. INSTALAR OWASP ZAP
REM ============================================================
echo.
echo [5/5] Verificando OWASP ZAP...
where zaproxy >nul 2>&1
if %errorlevel% neq 0 (
    echo ℹ️  OWASP ZAP es opcional (alternativa a Burp)
    echo.
    set /p INSTALL_ZAP="¿Instalar OWASP ZAP? (s/n): "
    if /i "!INSTALL_ZAP!"=="s" (
        echo Instalando OWASP ZAP...
        choco install zaproxy -y
        echo ✅ OWASP ZAP instalado
    ) else (
        echo ⏭️  OWASP ZAP omitido
    )
) else (
    echo ✅ OWASP ZAP encontrado
)

REM ============================================================
REM 6. INSTALAR POSTMAN (OPCIONAL)
REM ============================================================
echo.
echo.
set /p INSTALL_POSTMAN="¿Instalar Postman para testing de APIs? (s/n): "
if /i "!INSTALL_POSTMAN!"=="s" (
    if exist "C:\Users\%USERNAME%\AppData\Local\Postman\Postman.exe" (
        echo ✅ Postman ya instalado
    ) else (
        echo Instalando Postman...
        choco install postman -y
        echo ✅ Postman instalado
    )
)

REM ============================================================
REM 7. VERIFICAR GIT
REM ============================================================
echo.
echo Verificando Git...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ℹ️  Git no está instalado (opcional)
    echo Para instalar: choco install git -y
) else (
    echo ✅ Git encontrado
)

REM ============================================================
REM RESUMEN FINAL
REM ============================================================
echo.
echo ============================================================
echo                    ✅ RESUMEN DE HERRAMIENTAS
echo ============================================================
echo.
echo Herramientas instaladas:
echo   ✅ curl              - HTTP requests (testing)
curl --version | findstr /r /c:"curl [0-9]" | for /f "tokens=2" %%A in ('findstr "curl"') do echo       Versión: %%A
echo.
echo   ✅ jq                - Parsear JSON
jq --version
echo.
echo   ✅ Node.js / npm     - JavaScript runtime
node --version
npm --version
echo.

REM Verificar Burp
if exist "C:\Program Files\BurpSuiteCommunity\BurpSuiteCommunity.exe" (
    echo   ✅ Burp Suite Community - Interceptor HTTP (PROFESIONAL)
    echo       📍 C:\Program Files\BurpSuiteCommunity\
) else if exist "C:\Program Files (x86)\BurpSuiteCommunity\BurpSuiteCommunity.exe" (
    echo   ✅ Burp Suite Community - Interceptor HTTP (PROFESIONAL)
    echo       📍 C:\Program Files (x86)\BurpSuiteCommunity\
)

echo.
echo ============================================================
echo              🎯 PRÓXIMOS PASOS
echo ============================================================
echo.
echo 1. Abre una NUEVA terminal (Administrador)
echo.
echo 2. Inicia PROYECTOCARRO:
echo    cd c:\Proyectos\emma\web-projects\PROYECTOCARRO
echo    npm run dev
echo.
echo 3. Abre Burp Suite Community:
echo    Búsqueda de Windows > "Burp Suite Community"
echo    O: C:\Program Files\BurpSuiteCommunity\BurpSuiteCommunity.exe
echo.
echo 4. Lee las guías de seguridad:
echo    c:\Proyectos\emma\security-research\README.md
echo.
echo ============================================================
echo.
pause
