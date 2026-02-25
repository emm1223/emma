#!/usr/bin/env node

/**
 * FIX.JS
 * Intenta arreglar errores comunes automáticamente
 * Útil para resolver problemas sin perder datos
 */

const fs = require('fs');
const path = require('path');

const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    cyan: '\x1b[36m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
};

class GalleryFixer {
    constructor() {
        this.projectRoot = path.join(__dirname, '..');
        this.imagesPath = path.join(this.projectRoot, 'images');
        this.fixes = [];
        this.errors = [];
    }

    log(message, color = 'reset') {
        console.log(`${colors[color]}${message}${colors.reset}`);
    }

    success(message) {
        this.log(`✅ ${message}`, 'green');
        this.fixes.push(message);
    }

    error(message) {
        this.log(`❌ ${message}`, 'red');
        this.errors.push(message);
    }

    info(message) {
        this.log(`ℹ️  ${message}`, 'cyan');
    }

    /**
     * Limpiar datos corruptos
     */
    cleanDataJs() {
        this.info('Limpiando data.js...');

        const dataPath = path.join(this.projectRoot, 'js/data.js');

        try {
            // Hacer backup
            const backupPath = path.join(this.projectRoot, 'js/data.backup.js');
            if (fs.existsSync(dataPath)) {
                fs.copyFileSync(dataPath, backupPath);
                this.success('Backup creado: data.backup.js');
            }

            // Crear data.js vacío válido
            const emptyData = `/**
 * DATA.JS
 * Base de datos vacía (regenera con: npm run generate)
 */

const photosDatabase = {
    config: {
        startDate: new Date('2024-01-15'),
        appVersion: '1.0.0',
        owner: 'Albani',
        generatedAt: '${new Date().toISOString()}'
    },

    photos: [],

    getPhotos() { return this.photos; },
    getPhotosByCategory(category) {
        if (category === 'todos') return this.photos;
        return this.photos.filter(photo => photo.category === category);
    },
    getPhotoById(id) { return this.photos.find(photo => photo.id === id); },
    getFavoritePhotos() { return this.photos.filter(photo => photo.favorites); },
    getPhotosByLocation() {
        const locations = {};
        this.photos.forEach(photo => {
            if (!locations[photo.location]) locations[photo.location] = [];
            locations[photo.location].push(photo);
        });
        return locations;
    },
    getStatistics() {
        return {
            totalPhotos: this.photos.length,
            totalFavorites: this.photos.filter(p => p.favorites).length,
            totalSmiles: this.photos.filter(p => p.smile).length,
            totalLocations: new Set(this.photos.map(p => p.location)).size,
            categoriesBreakdown: {
                parejas: this.photos.filter(p => p.category === 'parejas').length,
                aventuras: this.photos.filter(p => p.category === 'aventuras').length,
                momentos: this.photos.filter(p => p.category === 'momentos').length,
            }
        };
    },
    getTimelineData() {
        return this.photos.sort((a, b) => new Date(b.date) - new Date(a.date));
    },
    getDaysTogetherCount() {
        const today = new Date();
        const startDate = this.config.startDate;
        const diffTime = Math.abs(today - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    },
    addPhoto(photoData) {
        const newId = Math.max(...this.photos.map(p => p.id), 0) + 1;
        const newPhoto = {
            id: newId,
            date: new Date().toISOString().split('T')[0],
            favorites: false,
            smile: true,
            ...photoData
        };
        this.photos.push(newPhoto);
        return newPhoto;
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = photosDatabase;
}`;

            fs.writeFileSync(dataPath, emptyData);
            this.success('data.js regenerado correctamente');
        } catch (error) {
            this.error(`No se pudo limpiar data.js: ${error.message}`);
        }
    }

    /**
     * Regenerar package-lock.json
     */
    regeneratePackageLock() {
        this.info('Regenerando package-lock.json...');

        try {
            const lockPath = path.join(this.projectRoot, 'package-lock.json');
            if (fs.existsSync(lockPath)) {
                fs.unlinkSync(lockPath);
                this.success('package-lock.json eliminado');
            }
            this.success('Próxima ejecución creará uno nuevo');
        } catch (error) {
            this.error(`No se pudo regenerar package-lock.json: ${error.message}`);
        }
    }

    /**
     * Crear carpeta de imágenes si no existe
     */
    ensureImagesFolder() {
        this.info('Verificando carpeta de imágenes...');

        if (!fs.existsSync(this.imagesPath)) {
            fs.mkdirSync(this.imagesPath, { recursive: true });
            this.success('Carpeta images/ creada');
        } else {
            this.success('Carpeta images/ ya existe');
        }

        // Crear archivo de instrucciones
        const instructionsPath = path.join(this.imagesPath, '_INSTRUCCIONES.txt');
        if (!fs.existsSync(instructionsPath)) {
            const content = `📸 CARPETA DE IMÁGENES

Coloca aquí tus fotos con este formato:
  nombreFoto_categoria_ubicacion.jpg

Categorías válidas:
  - parejas (para fotos de ustedes dos)
  - aventuras (para viajes y aventuras)
  - momentos (para momentos especiales)

Ejemplos:
  ✅ atardecer_momentos_playa.jpg
  ✅ nosotros_parejas_cafe.jpg
  ✅ trekking_aventuras_montana.jpg

Luego ejecuta: npm run watch
`;
            fs.writeFileSync(instructionsPath, content);
            this.success('Archivo de instrucciones creado');
        }
    }

    /**
     * Resetear todo (DESTRUCTIVO)
     */
    reset() {
        this.info('⚠️  ADVERTENCIA: Esto eliminará todos los datos generados');
        
        const confirm = process.argv.includes('--force');
        if (!confirm) {
            this.error('Usa: npm run fix -- --force para confirmar');
            return;
        }

        this.cleanDataJs();
        this.regeneratePackageLock();
        this.ensureImagesFolder();

        this.success('Proyecto reseteado');
    }

    /**
     * Reparar permisos (Linux/Mac)
     */
    fixPermissions() {
        this.info('Intentando reparar permisos...');

        try {
            const scriptsPath = path.join(this.projectRoot, 'scripts');
            const scripts = fs.readdirSync(scriptsPath).filter(f => f.endsWith('.js'));

            scripts.forEach(script => {
                const scriptPath = path.join(scriptsPath, script);
                fs.chmodSync(scriptPath, '755');
            });

            this.success('Permisos reparados');
        } catch (error) {
            // Silencioso en Windows
            if (process.platform !== 'win32') {
                this.error(`No se pudieron reparar permisos: ${error.message}`);
            }
        }
    }

    /**
     * Mostrar resumen
     */
    showSummary() {
        console.log('\n' + colors.bright + colors.cyan + '╔════════════════════════════════════════╗' + colors.reset);
        console.log(colors.bright + colors.cyan + '║        REPARACIÓN COMPLETADA ✅        ║' + colors.reset);
        console.log(colors.bright + colors.cyan + '╚════════════════════════════════════════╝' + colors.reset + '\n');

        if (this.fixes.length > 0) {
            this.log('Reparaciones realizadas:', 'green');
            this.fixes.forEach(fix => {
                this.log(`  • ${fix}`, 'green');
            });
        }

        if (this.errors.length > 0) {
            this.log('\nErrores encontrados:', 'red');
            this.errors.forEach(err => {
                this.log(`  • ${err}`, 'red');
            });
        }

        console.log('\n' + colors.yellow + 'Próximos pasos:' + colors.reset);
        console.log('  1. npm install  (reinstala dependencias)');
        console.log('  2. npm run validate  (verifica todo)');
        console.log('  3. npm run generate  (genera galería)\n');
    }

    /**
     * Ejecutar todas las reparaciones
     */
    run() {
        this.log('\n🔧 Iniciando reparación del proyecto...\n', 'cyan');

        this.cleanDataJs();
        this.ensureImagesFolder();
        this.fixPermissions();

        if (process.argv.includes('--reset')) {
            this.reset();
        } else {
            this.info('Ejecuta: npm run fix -- --reset para un reset completo');
        }

        this.showSummary();
    }
}

// Ejecutar
const fixer = new GalleryFixer();
fixer.run();