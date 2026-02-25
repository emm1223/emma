#!/usr/bin/env node

/**
 * SERVER.JS
 * Servidor HTTP simple para servir la galería
 * Permite cargar imágenes correctamente con rutas relativas
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 8080;
const projectRoot = path.join(__dirname, '..');

// Tipos MIME comunes
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.bmp': 'image/bmp'
};

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    let pathname = parsedUrl.pathname;

    // Por defecto, servir index.html
    if (pathname === '/') {
        pathname = '/index.html';
    }

    // Ruta completa del archivo
    const filePath = path.join(projectRoot, pathname);

    // Seguridad: no permitir acceso fuera del directorio raíz
    if (!filePath.startsWith(projectRoot)) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('Acceso denegado');
        return;
    }

    // Intenta leer el archivo
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Archivo no encontrado: ' + pathname);
            } else {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error del servidor: ' + err.code);
            }
        } else {
            // Determinar tipo MIME
            const ext = path.extname(filePath).toLowerCase();
            const contentType = mimeTypes[ext] || 'application/octet-stream';

            res.writeHead(200, { 
                'Content-Type': contentType,
                'Cache-Control': 'no-cache'
            });
            res.end(content);
        }
    });
});

server.listen(PORT, () => {
    console.log(`\n${'═'.repeat(50)}`);
    console.log(`✅ Servidor corriendo en: http://localhost:${PORT}`);
    console.log(`📁 Directorio raíz: ${projectRoot}`);
    console.log(`🎵 Abre http://localhost:${PORT} en tu navegador`);
    console.log(`${'═'.repeat(50)}\n`);
});
