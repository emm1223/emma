#!/usr/bin/env node

/**
 * VALIDATE.JS
 * Valida la carpeta de imágenes y detecta errores comunes
 * Ayuda a solucionar problemas antes de generar
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
    magenta: '\x1b[35m',
};

class GalleryValidator {
    constructor() {
        this.imagesPath = path.join(__dirname, '../images');
        this.issues = [];
        this.warnings = [];
        this.valid = [];
    }

    log(message, color = 'reset') {
        console.log(`${colors[color]}${message}${colors.reset}`);
    }

    /**
     * Validar estructura de carpetas
     */
    validateStructure() {
        this.log('\n📁 Validando estructura...', 'cyan');

        if (!fs.existsSync(this.imagesPath)) {
            this.issues.push('Carpeta "images" no existe');
            fs.mkdirSync(this.imagesPath, { recursive: true });
            this.log('  ✅ Carpeta "images" creada', 'green');
            return false;
        }

        this.log('  ✅ Carpeta "images" existe', 'green');
        return true;
    }

    /**
     * Validar archivos de imagen
     */
    validateImages() {
        this.log('\n🖼️  Validando imágenes...', 'cyan');

        if (!fs.existsSync(this.imagesPath)) {
            this.log('  ℹ️  Carpeta vacía (agrega fotos)', 'yellow');
            return;
        }

        const files = fs.readdirSync(this.imagesPath);
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'];

        let imageCount = 0;

        files.forEach(file => {
            const ext = path.extname(file).toLowerCase();
            const fullPath = path.join(this.imagesPath, file);

            // Ignorar carpetas y archivos ocultos
            if (fs.statSync(fullPath).isDirectory() || file.startsWith('.')) {
                return;
            }

            // Verificar extensión
            if (!imageExtensions.includes(ext)) {
                this.issues.push(`Archivo no es imagen: "${file}" (${ext})`);
                return;
            }

            imageCount++;

            // Verificar formato de nombre
            this.validateFileName(file);
        });

        if (imageCount === 0) {
            this.log('  ℹ️  Sin imágenes detectadas', 'yellow');
        } else {
            this.log(`  ✅ ${imageCount} imagen(es) válida(s)`, 'green');
        }
    }

    /**
     * Validar formato de nombre
     */
    validateFileName(filename) {
        const categories = ['parejas', 'aventuras', 'momentos'];
        const nameWithoutExt = path.parse(filename).name;
        const parts = nameWithoutExt.split('_');

        // Verificar si tiene al menos 2 partes
        if (parts.length < 1) {
            this.issues.push(`Nombre inválido: "${filename}" (muy corto)`);
            return;
        }

        // Verificar categoría
        let hasCategory = false;
        if (parts.length >= 2) {
            const category = parts[1].toLowerCase();
            if (categories.includes(category)) {
                hasCategory = true;
            }
        }

        if (!hasCategory && parts.length < 2) {
            this.warnings.push(
                `Nombre: "${filename}"\n` +
                `  💡 Mejor formato: nombreFoto_categoria_ubicacion.jpg\n` +
                `  Categorías: parejas, aventuras, momentos`
            );
        }

        // Si pasó las validaciones
        if (hasCategory && parts.length >= 2) {
            const category = parts[1].toLowerCase();
            const location = parts.length >= 3 ? parts.slice(2).join(' ') : 'No especificado';
            this.valid.push({
                file: filename,
                category,
                location
            });
            this.log(`  ✅ ${filename}`, 'green');
            this.log(`     └─ Categoría: ${category} | Ubicación: ${location}`, 'cyan');
        }
    }

    /**
     * Validar config.json
     */
    validateConfig() {
        this.log('\n⚙️  Validando configuración...', 'cyan');

        const configPath = path.join(__dirname, '../config.json');
        
        try {
            const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

            if (!config.startDate) {
                this.warnings.push('config.json: startDate no definido');
            } else {
                this.log(`  ✅ startDate: ${config.startDate}`, 'green');
            }

            if (!config.categories) {
                this.issues.push('config.json: categories no definido');
            } else {
                this.log('  ✅ Categorías configuradas', 'green');
            }

            return true;
        } catch (error) {
            this.issues.push(`config.json inválido: ${error.message}`);
            return false;
        }
    }

    /**
     * Validar dependencias
     */
    validateDependencies() {
        this.log('\n📦 Validando dependencias...', 'cyan');

        const packageJsonPath = path.join(__dirname, '../package.json');
        
        try {
            const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
            this.log(`  ✅ package.json válido`, 'green');

            const nodeModules = path.join(__dirname, '../node_modules');
            if (fs.existsSync(nodeModules)) {
                this.log('  ✅ node_modules instalado', 'green');
            } else {
                this.warnings.push('node_modules no encontrado. Ejecuta: npm install');
            }

            return true;
        } catch (error) {
            this.issues.push(`package.json inválido: ${error.message}`);
            return false;
        }
    }

    /**
     * Mostrar reporte
     */
    showReport() {
        console.log('\n' + colors.bright + colors.magenta + '╔════════════════════════════════════════╗' + colors.reset);
        console.log(colors.bright + colors.magenta + '║    REPORTE DE VALIDACIÓN ✨           ║' + colors.reset);
        console.log(colors.bright + colors.magenta + '╚════════════════════════════════════════╝' + colors.reset);

        // Errores
        if (this.issues.length > 0) {
            this.log(`\n❌ ${this.issues.length} PROBLEMA(S) ENCONTRADO(S):`, 'red');
            this.issues.forEach(issue => {
                this.log(`  • ${issue}`, 'red');
            });
        }

        // Advertencias
        if (this.warnings.length > 0) {
            this.log(`\n⚠️  ${this.warnings.length} ADVERTENCIA(S):`, 'yellow');
            this.warnings.forEach(warning => {
                this.log(`  • ${warning}`, 'yellow');
            });
        }

        // Válidos
        if (this.valid.length > 0) {
            this.log(`\n✅ ${this.valid.length} IMAGEN(ES) LISTA(S):`, 'green');
        }

        // Resumen
        console.log('\n' + colors.bright + '📊 RESUMEN:' + colors.reset);
        console.log(`  Problemas: ${this.issues.length}`);
        console.log(`  Advertencias: ${this.warnings.length}`);
        console.log(`  Válidas: ${this.valid.length}`);

        // Siguiente paso
        if (this.issues.length === 0 && this.valid.length > 0) {
            console.log('\n' + colors.green + colors.bright + '🚀 ¡Todo está listo! Ejecuta: npm run generate' + colors.reset);
        } else if (this.issues.length === 0 && this.valid.length === 0) {
            console.log('\n' + colors.yellow + '💡 Agrega fotos a la carpeta images/' + colors.reset);
        }

        console.log();
    }

    /**
     * Ejecutar validación completa
     */
    run() {
        this.log('\n🔍 Iniciando validación de galería...\n', 'cyan');

        this.validateStructure();
        this.validateImages();
        this.validateConfig();
        this.validateDependencies();

        this.showReport();

        process.exit(this.issues.length > 0 ? 1 : 0);
    }
}

// Ejecutar
const validator = new GalleryValidator();
validator.run();