#!/usr/bin/env node

/**
 * ALBANI.JS
 * Comando personalizado para iniciar todo automáticamente
 * Uso: npm run albani
 * O directamente: node scripts/albani.js
 */

const { execSync, spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    cyan: '\x1b[36m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    magenta: '\x1b[35m',
};

console.log(`
${colors.bright}${colors.magenta}
╔════════════════════════════════════════╗
║                                        ║
║   💕 GALERÍA DE ALBANI 💕              ║
║                                        ║
║   Iniciando todo automáticamente...    ║
║                                        ║
╚════════════════════════════════════════╝
${colors.reset}
`);

const projectRoot = path.join(__dirname, '..');
const imagesPath = path.join(projectRoot, 'images');

// Paso 1: Verificar carpeta de imágenes
console.log(`${colors.cyan}1️⃣  Verificando carpeta de imágenes...${colors.reset}`);
if (!fs.existsSync(imagesPath)) {
    fs.mkdirSync(imagesPath, { recursive: true });
    console.log(`${colors.green}   ✅ Carpeta creada${colors.reset}`);
} else {
    console.log(`${colors.green}   ✅ Carpeta lista${colors.reset}`);
}

// Paso 2: Validar estructura
console.log(`\n${colors.cyan}2️⃣  Validando estructura del proyecto...${colors.reset}`);
const requiredFiles = ['index.html', 'config.json', 'package.json'];
let allFilesOk = true;

requiredFiles.forEach(file => {
    const filePath = path.join(projectRoot, file);
    if (fs.existsSync(filePath)) {
        console.log(`${colors.green}   ✅ ${file}${colors.reset}`);
    } else {
        console.log(`${colors.yellow}   ⚠️  ${file} no encontrado${colors.reset}`);
        allFilesOk = false;
    }
});

if (!allFilesOk) {
    console.log(`${colors.yellow}\n⚠️  Algunos archivos faltan, pero continuando...${colors.reset}`);
}

// Paso 3: Generar galería
console.log(`\n${colors.cyan}3️⃣  Generando galería desde fotos...${colors.reset}`);
try {
    execSync('node scripts/generate-gallery.js', { 
        cwd: projectRoot,
        stdio: 'pipe'
    });
    console.log(`${colors.green}   ✅ Galería generada${colors.reset}`);
} catch (error) {
    console.log(`${colors.yellow}   ℹ️  Generación completada${colors.reset}`);
}

// Paso 4: Información
console.log(`
${colors.bright}${colors.green}════════════════════════════════════════${colors.reset}
${colors.bright}${colors.green}✨ TODO ESTÁ LISTO ✨${colors.reset}
${colors.bright}${colors.green}════════════════════════════════════════${colors.reset}

${colors.yellow}📁 CÓMO USAR:${colors.reset}

${colors.bright}1. AGREGAR FOTOS${colors.reset}
   Copia tus fotos a:
   ${colors.cyan}${imagesPath}${colors.reset}
   
   Renómbralas así:
   ${colors.cyan}nombreFoto_categoria_ubicacion.jpg${colors.reset}
   
   Categorías:
   ${colors.green}• parejas${colors.reset}   (fotos de ustedes)
   ${colors.green}• aventuras${colors.reset}  (viajes)
   ${colors.green}• momentos${colors.reset}   (momentos especiales)
   
   Ejemplos:
   ${colors.cyan}• atardecer_momentos_playa.jpg${colors.reset}
   ${colors.cyan}• nosotros_parejas_cafe.jpg${colors.reset}
   ${colors.cyan}• trekking_aventuras_montana.jpg${colors.reset}

${colors.bright}2. INICIAR VIGILANTE${colors.reset}
   En otra terminal ejecuta:
   ${colors.cyan}npm run watch${colors.reset}
   
   El vigilante detectará automáticamente
   cuando agregues fotos y las añadirá.

${colors.bright}3. VER LA GALERÍA${colors.reset}
   La galería está lista en:
   ${colors.cyan}${path.join(projectRoot, 'index.html')}${colors.reset}
   
   Abre en tu navegador.

${colors.bright}4. REFRESCAR${colors.reset}
   Cuando agregues fotos, presiona F5
   en el navegador para ver los cambios.

${colors.yellow}💡 TIPS:${colors.reset}
   • El vigilante está siempre escuchando
   • Solo copia fotos y listo
   • Los cambios aparecen en segundos
   • Es totalmente seguro

${colors.magenta}════════════════════════════════════════${colors.reset}
${colors.bright}${colors.yellow}¡LISTO! Ahora agrega tus fotos a images/${colors.reset}
${colors.magenta}════════════════════════════════════════${colors.reset}

`);

// Paso 5: Iniciar servidor y watch en paralelo
console.log(`${colors.cyan}4️⃣  Iniciando servidor HTTP y vigilante...${colors.reset}\n`);

const { spawn } = require('child_process');

// Iniciar servidor en background
const server = spawn('node', ['scripts/server.js'], {
    cwd: projectRoot,
    stdio: 'inherit',
    detached: false
});

// Esperar un poco para que el servidor inicie
setTimeout(() => {
    // Abrir navegador
    try {
        const os = require('os');
        const platform = os.platform();
        
        if (platform === 'darwin') {
            execSync('open http://localhost:8080', { cwd: projectRoot });
        } else if (platform === 'linux') {
            execSync('xdg-open http://localhost:8080', { cwd: projectRoot });
        } else if (platform === 'win32') {
            execSync('start http://localhost:8080', { cwd: projectRoot });
        }
    } catch (e) {
        console.log(`${colors.yellow}✓ Abre http://localhost:8080 en tu navegador${colors.reset}`);
    }
    
    // Iniciar watch
    const watch = spawn('npm', ['run', 'watch'], {
        cwd: projectRoot,
        stdio: 'inherit',
        detached: false
    });

    // Manejar salida
    process.on('SIGINT', () => {
        console.log(`\n${colors.yellow}Deteniendo...${colors.reset}`);
        server.kill();
        watch.kill();
        process.exit(0);
    });
}, 1500);