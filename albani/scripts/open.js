#!/usr/bin/env node

/**
 * OPEN.JS
 * Abre automáticamente el proyecto en el navegador
 * Detecta el navegador disponible según tu SO
 */

const open = require('open');
const path = require('path');
const fs = require('fs');

const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    cyan: '\x1b[36m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
};

class ProjectOpener {
    constructor() {
        this.projectRoot = path.join(__dirname, '..');
        this.indexPath = path.join(this.projectRoot, 'index.html');
    }

    log(message, color = 'reset') {
        console.log(`${colors[color]}${message}${colors.reset}`);
    }

    /**
     * Obtener URL del archivo
     */
    getFileUrl() {
        return `file://${this.indexPath}`;
    }

    /**
     * Verificar si index.html existe
     */
    checkIndexExists() {
        if (!fs.existsSync(this.indexPath)) {
            this.log('❌ index.html no encontrado', 'yellow');
            return false;
        }
        return true;
    }

    /**
     * Abrir en navegador
     */
    async openBrowser() {
        if (!this.checkIndexExists()) {
            return;
        }

        try {
            const fileUrl = this.getFileUrl();
            this.log('🌐 Abriendo navegador...', 'cyan');

            await open(fileUrl);

            this.log('✅ Navegador abierto', 'green');
            this.log(`📄 ${fileUrl}`, 'cyan');
        } catch (error) {
            this.log(`⚠️  No se pudo abrir automáticamente`, 'yellow');
            this.log(`📄 Abre manualmente: ${this.getFileUrl()}`, 'yellow');
        }
    }

    /**
     * Ejecutar
     */
    async run() {
        this.log('\n✨ Abriendo proyecto...', 'cyan');
        await this.openBrowser();
        this.log();
    }
}

// Ejecutar
const opener = new ProjectOpener();
opener.run().catch(console.error);