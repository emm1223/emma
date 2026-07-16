@echo off
REM Script para iniciar PROYECTOCARRO

echo =========================================
echo Iniciando PROYECTOCARRO
echo =========================================

cd /d c:\Proyectos\emma\web-projects\PROYECTOCARRO

echo.
echo Verificando dependencias...
npm list > nul 2>&1
if errorlevel 1 (
    echo.
    echo Instalando dependencias (primera vez)...
    npm install
)

echo.
echo Iniciando servidor Next.js...
npm run dev

pause
