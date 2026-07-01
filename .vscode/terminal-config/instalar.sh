#!/bin/bash
# 🚀 SCRIPT INSTALACIÓN AUTOMÁTICA - GIT BASH INTELIGENTE
# Ejecutar desde Git Bash

echo -e "\033[0;36m"
echo "╔════════════════════════════════════════════╗"
echo "║   🚀 INSTALADOR GIT BASH INTELIGENTE 🚀   ║"
echo "╚════════════════════════════════════════════╝"
echo -e "\033[0m"

# Verificar si estamos en Git Bash
if [[ ! "$BASH" == *"git"* ]]; then
    echo -e "\033[0;31m⚠️  Por favor ejecuta este script desde Git Bash\033[0m"
    exit 1
fi

echo -e "\033[0;33m\n[1/3] Verificando directorios...\033[0m"

# Crear directorio .bashrc si no existe
if [ ! -d ~/ ]; then
    echo -e "\033[0;31mError: No se encuentra carpeta home\033[0m"
    exit 1
fi

echo -e "\033[0;32m✓ Directorios OK\033[0m"

echo -e "\033[0;33m\n[2/3] Instalando .bashrc...\033[0m"

# Hacer backup del .bashrc existente
if [ -f ~/.bashrc ]; then
    echo -e "\033[0;33m⚠️  Existe .bashrc anterior, creando backup...\033[0m"
    mv ~/.bashrc ~/.bashrc.backup.$(date +%Y%m%d_%H%M%S)
    echo -e "\033[0;32m✓ Backup creado\033[0m"
fi

# Copiar el nuevo .bashrc
cp /c/Proyectos/emma/.vscode/terminal-config/.bashrc ~/.bashrc

if [ -f ~/.bashrc ]; then
    echo -e "\033[0;32m✓ .bashrc instalado\033[0m"
else
    echo -e "\033[0;31m✗ Error al copiar .bashrc\033[0m"
    exit 1
fi

echo -e "\033[0;33m\n[3/3] Reloading configuración...\033[0m"

# Recargar .bashrc
source ~/.bashrc

echo -e "\033[0;32m✓ Configuración cargada\033[0m"

echo -e "\033[0;36m\n╔════════════════════════════════════════════╗"
echo "║      ✅ INSTALACIÓN COMPLETADA ✅          ║"
echo "╚════════════════════════════════════════════╝"
echo -e "\033[0m"

echo -e "\033[0;32m\n🎯 Próximos pasos:\033[0m"
echo -e "\033[0;33m1) Cierra y reabre Git Bash\033[0m"
echo -e "\033[0;33m2) Escribe: menu\033[0m"
echo -e "\033[0;33m3) Prueba un alias: gst (git status)\033[0m"
echo -e "\033[0;33m4) Navega: carro (ir a PROYECTOCARRO)\033[0m"

echo -e "\033[0;36m\n💡 Para más info, lee: .vscode/terminal-config/INSTRUCCIONES.md\033[0m\n"
