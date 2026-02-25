#!/usr/bin/env node

/**
 * SETUP-ALIAS.JS
 * Configura un alias permanente "albani" en tu shell
 * Uso: npm run setup-alias
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    cyan: '\x1b[36m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
};

console.log(`
${colors.bright}${colors.cyan}
╔════════════════════════════════════════╗
║   🎮 CONFIGURANDO ATAJO GLOBAL        ║
╚════════════════════════════════════════╝
${colors.reset}
`);

const platform = process.platform;
const homeDir = os.homedir();

// Detectar shell
let shellFile;
let shellName;

if (fs.existsSync(path.join(homeDir, '.zshrc'))) {
    shellFile = path.join(homeDir, '.zshrc');
    shellName = 'zsh';
} else if (fs.existsSync(path.join(homeDir, '.bashrc'))) {
    shellFile = path.join(homeDir, '.bashrc');
    shellName = 'bash';
} else if (fs.existsSync(path.join(homeDir, '.bash_profile'))) {
    shellFile = path.join(homeDir, '.bash_profile');
    shellName = 'bash';
} else {
    console.log(`${colors.red}No se detectó shell configurado${colors.reset}`);
    process.exit(1);
}

console.log(`${colors.green}✅ Shell detectado: ${shellName}${colors.reset}`);
console.log(`${colors.cyan}Archivo: ${shellFile}${colors.reset}\n`);

// Crear alias
const projectPath = path.join(__dirname, '..');
const aliasCommand = `alias albani='cd "${projectPath}" && npm run albani'`;

// Verificar si ya existe
let content = fs.readFileSync(shellFile, 'utf8');

if (content.includes('alias albani=')) {
    console.log(`${colors.yellow}⚠️  El alias ya está configurado${colors.reset}`);
} else {
    // Agregar alias
    content += `\n\n# Alias para la galería de Albani (${new Date().toLocaleDateString('es-ES')})\n${aliasCommand}\n`;
    fs.writeFileSync(shellFile, content);
    console.log(`${colors.green}✅ Alias agregado correctamente${colors.reset}`);
}

console.log(`
${colors.bright}${colors.green}════════════════════════════════════════${colors.reset}
${colors.bright}✨ CONFIGURACIÓN COMPLETADA ✨${colors.reset}
${colors.bright}${colors.green}════════════════════════════════════════${colors.reset}

${colors.yellow}🎮 AHORA PUEDES USAR:${colors.reset}

${colors.cyan}$ albani${colors.reset}

En lugar de:
${colors.cyan}$ cd /home/emm/emma/albani && npm run albani${colors.reset}

${colors.yellow}📝 PASOS:${colors.reset}

1. ${colors.bright}Cierra esta terminal${colors.reset}
2. ${colors.bright}Abre una nueva terminal${colors.reset}
3. ${colors.bright}Escribe:${colors.reset} ${colors.cyan}albani${colors.reset}
4. ${colors.bright}¡Listo! Se abre todo automáticamente${colors.reset}

${colors.yellow}🎯 AHORA CON ATAJO DE TECLADO:${colors.reset}

${colors.green}OPCIÓN 1: Windows/Linux/Mac${colors.reset}
   Settings → Keyboard Shortcuts
   Busca "Run Terminal Command"
   Asigna la combinación que quieras (Ej: Ctrl+Alt+A)
   Escribe: ${colors.cyan}albani${colors.reset}

${colors.green}OPCIÓN 2: Linux (GNOME)${colors.reset}
   Settings → Keyboard → View and Customize Shortcuts
   Al final: "+" → Add Custom Shortcut
   Nombre: Galería Albani
   Comando: ${colors.cyan}gnome-terminal -- bash -c "cd ${projectPath} && npm run albani; bash"${colors.reset}
   Tecla: Ctrl+Alt+A (o la que prefieras)

${colors.green}OPCIÓN 3: Windows${colors.reset}
   Crea archivo: ${colors.cyan}albani.bat${colors.reset}
   Contenido:
   ${colors.cyan}@echo off
cd "${projectPath}"
npm run albani
pause${colors.reset}
   
   Clic derecho → Propiedades → Avanzadas → Atajo de teclado

${colors.magenta}════════════════════════════════════════${colors.reset}

${colors.yellow}Cierra y abre una nueva terminal para que funcione el alias.${colors.reset}

`);
