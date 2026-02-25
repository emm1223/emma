#!/usr/bin/env node

/**
 * SETUP.JS
 * Configuración automática del proyecto
 * Instala dependencias, crea carpetas y valida todo
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    cyan: '\x1b[36m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
};

class ProjectSetup {
    constructor() {
        this.projectRoot = path.join(__dirname, '..');
        this.errors = [];
        this.warnings = [];
    }

    log(message, color = 'reset') {
        console.log(`${colors[color]}${message}${colors.reset}`);
    }

    success(message) {
        this.log(`✅ ${message}`, 'green');
    }

    error(message) {
        this.log(`❌ ${message}`, 'red');
        this.errors.push(message);
    }

    warning(message) {
        this.log(`⚠️  ${message}`, 'yellow');
        this.warnings.push(message);
    }

    info(message) {
        this.log(`ℹ️  ${message}`, 'cyan');
    }

    /**
     * Verificar Node.js
     */
    checkNodeJs() {
        this.info('Verificando Node.js...');
        try {
            const version = execSync('node --version', { encoding: 'utf8' }).trim();
            this.success(`Node.js ${version} detectado`);
            return true;
        } catch (error) {
            this.error('Node.js no está instalado. Por favor instálalo desde nodejs.org');
            return false;
        }
    }

    /**
     * Verificar npm
     */
    checkNpm() {
        this.info('Verificando npm...');
        try {
            const version = execSync('npm --version', { encoding: 'utf8' }).trim();
            this.success(`npm ${version} detectado`);
            return true;
        } catch (error) {
            this.error('npm no está instalado');
            return false;
        }
    }

    /**
     * Crear carpetas necesarias
     */
    createDirectories() {
        this.info('Creando estructura de carpetas...');

        const directories = [
            { path: 'images', desc: 'Fotos' },
            { path: 'css', desc: 'Estilos' },
            { path: 'js', desc: 'Scripts' },
            { path: 'scripts', desc: 'Automatizaciones' }
        ];

        directories.forEach(dir => {
            const fullPath = path.join(this.projectRoot, dir.path);
            if (!fs.existsSync(fullPath)) {
                fs.mkdirSync(fullPath, { recursive: true });
                this.success(`Carpeta '${dir.path}' (${dir.desc}) creada`);
            } else {
                this.info(`Carpeta '${dir.path}' ya existe`);
            }
        });
    }

    /**
     * Verificar archivos necesarios
     */
    checkRequiredFiles() {
        this.info('Verificando archivos necesarios...');

        const files = [
            'index.html',
            'config.json',
            'package.json',
            'css/styles.css',
            'js/main.js',
            'js/gallery.js',
            'scripts/generate-gallery.js'
        ];

        const missing = [];
        files.forEach(file => {
            const fullPath = path.join(this.projectRoot, file);
            if (fs.existsSync(fullPath)) {
                this.success(`${file}`);
            } else {
                this.error(`${file} - NO ENCONTRADO`);
                missing.push(file);
            }
        });

        return missing.length === 0;
    }

    /**
     * Instalar dependencias
     */
    installDependencies() {
        this.info('Instalando dependencias...');
        try {
            this.log('(esto puede tomar unos minutos)...', 'cyan');
            execSync('npm install', { 
                cwd: this.projectRoot,
                stdio: 'pipe'
            });
            this.success('Dependencias instaladas');
            return true;
        } catch (error) {
            this.warning('Error al instalar dependencias. Intenta manualmente: npm install');
            return false;
        }
    }

    /**
     * Crear archivo de ejemplo en images
     */
    createExampleFile() {
        const examplePath = path.join(this.projectRoot, 'images', 'EJEMPLO.txt');
        const content = `📸 COLOCA TUS FOTOS AQUÍ

Formato de nombre:
  nombreFoto_categoria_ubicacion.jpg

Ejemplos:
  ✅ atardecer_momentos_playa.jpg
  ✅ nosotros_parejas_cafe.jpg
  ✅ excursion_aventuras_montana.jpg

Categorías:
  - parejas (💑)
  - aventuras (🗺️)
  - momentos (✨)

Luego ejecuta: npm run watch
`;

        try {
            fs.writeFileSync(examplePath, content);
            this.success('Archivo de ejemplo creado en images/');
        } catch (error) {
            this.warning('No se pudo crear archivo de ejemplo');
        }
    }

    /**
     * Validar config.json
     */
    validateConfig() {
        this.info('Validando configuración...');

        const configPath = path.join(this.projectRoot, 'config.json');
        try {
            const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

            if (!config.startDate) {
                this.warning('config.json: startDate no definido');
            } else {
                this.success('config.json válido');
            }

            return true;
        } catch (error) {
            this.error(`config.json inválido: ${error.message}`);
            return false;
        }
    }

    /**
     * Mostrar resumen
     */
    showSummary() {
        console.log('\n' + colors.bright + colors.cyan + '╔════════════════════════════════════════╗' + colors.reset);
        console.log(colors.bright + colors.cyan + '║       SETUP COMPLETADO ✨             ║' + colors.reset);
        console.log(colors.bright + colors.cyan + '╚════════════════════════════════════════╝' + colors.reset + '\n');

        if (this.errors.length === 0) {
            this.log('🎉 ¡Todo está listo!', 'green');
        } else {
            this.log(`❌ ${this.errors.length} error(es) encontrado(s)`, 'red');
        }

        if (this.warnings.length > 0) {
            this.log(`⚠️  ${this.warnings.length} advertencia(s)`, 'yellow');
        }

        console.log('\n' + colors.yellow + '🚀 Próximos pasos:' + colors.reset);
        console.log('  1. Copia tus fotos a: /albani/images/');
        console.log('  2. Renómbralas: nombreFoto_categoria_ubicacion.jpg');
        console.log('  3. Ejecuta: npm run watch');
        console.log('  4. Abre: index.html en tu navegador\n');
    }

    /**
     * Ejecutar setup completo
     */
    run() {
        console.log('\n' + colors.bright + colors.cyan + '🚀 Iniciando configuración del proyecto...' + colors.reset + '\n');

        // Verificaciones
        if (!this.checkNodeJs() || !this.checkNpm()) {
            this.showSummary();
            process.exit(1);
        }

        this.createDirectories();
        
        if (!this.checkRequiredFiles()) {
            this.warning('Algunos archivos no se encontraron. Verifica la instalación.');
        }

        this.installDependencies();
        this.validateConfig();
        this.createExampleFile();

        this.showSummary();

        if (this.errors.length > 0) {
            process.exit(1);
        }
    }
}

// Ejecutar
const setup = new ProjectSetup();
setup.run();