#!/usr/bin/env node

/**
 * WATCH-GALLERY.JS
 * Monitorea cambios en la carpeta 'images/' y regenera automáticamente
 * cuando se agregan/modifican fotos
 * 
 * Uso: npm run watch
 */

const fs = require('fs');
const path = require('path');

// Importar el generador
const GalleryGenerator = require('./generate-gallery.js');

const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    cyan: '\x1b[36m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
};

class WatchGallery {
    constructor() {
        this.imagesPath = path.join(__dirname, '../images');
        this.debounceTimer = null;
        this.debounceDelay = 1000; // 1 segundo
    }

    /**
     * Iniciar monitoreo
     */
    start() {
        console.log(`\n${colors.bright}${colors.cyan}👀 Monitoreando carpeta de imágenes...${colors.reset}`);
        console.log(`${colors.yellow}📁 ${this.imagesPath}${colors.reset}`);
        console.log(`${colors.yellow}Presiona Ctrl+C para detener${colors.reset}\n`);

        // Crear carpeta si no existe
        if (!fs.existsSync(this.imagesPath)) {
            fs.mkdirSync(this.imagesPath, { recursive: true });
        }

        // Monitorear cambios
        fs.watch(this.imagesPath, (eventType, filename) => {
            if (!filename) return;

            // Solo procesar archivos de imagen
            const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'];
            const ext = path.extname(filename).toLowerCase();
            
            if (!imageExtensions.includes(ext)) return;

            console.log(`${colors.yellow}📸 Cambio detectado: ${filename}${colors.reset}`);
            
            // Debounce para evitar múltiples regeneraciones
            clearTimeout(this.debounceTimer);
            this.debounceTimer = setTimeout(() => {
                this.regenerate();
            }, this.debounceDelay);
        });
    }

    /**
     * Regenerar galería
     */
    regenerate() {
        console.log(`\n${colors.cyan}🔄 Regenerando galería...${colors.reset}`);
        
        try {
            const generator = new GalleryGenerator();
            generator.generatePhotos();
            generator.saveDataJs();
            
            console.log(`${colors.green}✅ Galería actualizada!${colors.reset}\n`);
            console.log(`${colors.yellow}Total de fotos: ${generator.photos.length}${colors.reset}\n`);
        } catch (error) {
            console.error(`${colors.red}Error al regenerar: ${error.message}${colors.reset}\n`);
        }
    }
}

// Iniciar watcher
const watcher = new WatchGallery();
watcher.start();

// Manejar Ctrl+C
process.on('SIGINT', () => {
    console.log(`\n${colors.yellow}👋 Monitoreo detenido${colors.reset}\n`);
    process.exit(0);
});