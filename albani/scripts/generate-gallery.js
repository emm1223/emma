#!/usr/bin/env node

/**
 * GENERATE-GALLERY.JS
 * Script automático que detecta imágenes en la carpeta 'images/'
 * y genera automáticamente el archivo data.js con toda la información
 * 
 * Uso: npm run generate
 * O: node scripts/generate-gallery.js
 */

const fs = require('fs');
const path = require('path');

// Colores para la consola
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    cyan: '\x1b[36m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    blue: '\x1b[34m',
};

class GalleryGenerator {
    constructor() {
        this.configPath = path.join(__dirname, '../config.json');
        this.imagesPath = path.join(__dirname, '../images');
        this.outputPath = path.join(__dirname, '../js/data.js');
        this.config = this.loadConfig();
        this.photos = [];
        this.errors = [];
        this.warnings = [];
    }

    /**
     * Cargar configuración
     */
    loadConfig() {
        try {
            const config = JSON.parse(fs.readFileSync(this.configPath, 'utf8'));
            return config;
        } catch (error) {
            console.error(`${colors.red}Error cargando config.json:${colors.reset}`, error.message);
            console.error(`${colors.yellow}Usando configuración por defecto${colors.reset}`);
            
            // Configuración por defecto
            return {
                startDate: '2024-01-15',
                imagesFolder: './images',
                outputFile: './js/data.js',
                categories: {
                    parejas: '💑 Nosotros',
                    aventuras: '🗺️ Aventuras',
                    momentos: '✨ Momentos'
                }
            };
        }
    }

    /**
     * Obtener todas las imágenes de la carpeta
     */
    getImages() {
        if (!fs.existsSync(this.imagesPath)) {
            console.log(`${colors.yellow}⚠️  Carpeta 'images' no existe. Creándola...${colors.reset}`);
            fs.mkdirSync(this.imagesPath, { recursive: true });
            return [];
        }

        try {
            const files = fs.readdirSync(this.imagesPath);
            const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'];
            
            return files.filter(file => {
                const ext = path.extname(file).toLowerCase();
                const fullPath = path.join(this.imagesPath, file);
                
                // Ignorar carpetas y archivos ocultos
                if (fs.statSync(fullPath).isDirectory() || file.startsWith('.')) {
                    return false;
                }
                
                return imageExtensions.includes(ext);
            }).sort();
        } catch (error) {
            console.error(`${colors.red}Error leyendo carpeta images:${colors.reset}`, error.message);
            this.errors.push(`Error leyendo carpeta: ${error.message}`);
            return [];
        }
    }

    /**
     * Parsear nombre de archivo para extraer información
     * Formato esperado: nombreFoto_categoria_ubicacion.jpg
     */
    parseFileName(filename) {
        const nameWithoutExt = path.parse(filename).name;
        const parts = nameWithoutExt.split('_');

        let title = parts[0] || 'Foto';
        let category = this.config.defaults.category;
        let location = this.config.defaults.location;

        // Si hay más de una parte, intentar parsear
        if (parts.length >= 2) {
            // Parte 1: categoría
            if (Object.keys(this.config.categories).includes(parts[1].toLowerCase())) {
                category = parts[1].toLowerCase();
            }
        }

        if (parts.length >= 3) {
            // Parte 2+: ubicación (puede tener múltiples palabras)
            location = parts.slice(2).join(' ').replace(/-/g, ' ');
        }

        // Mejorar el título (capitalize)
        title = this.capitalizeTitle(title.replace(/-/g, ' '));

        return { title, category, location };
    }

    /**
     * Capitalizar título
     */
    capitalizeTitle(str) {
        return str
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }

    /**
     * Obtener fecha de modificación del archivo
     */
    getFileDate(filePath) {
        try {
            const stats = fs.statSync(filePath);
            return new Date(stats.mtime);
        } catch (error) {
            return new Date();
        }
    }

    /**
     * Generar objetos de foto
     */
    generatePhotos() {
        const images = this.getImages();

        this.photos = images.map((filename, index) => {
            const filePath = path.join(this.imagesPath, filename);
            const parsed = this.parseFileName(filename);
            const fileDate = this.getFileDate(filePath);

            return {
                id: index + 1,
                title: parsed.title,
                description: `Momento especial: ${parsed.title}. ${this.getRandomDescription()}`,
                date: fileDate.toISOString().split('T')[0],
                category: parsed.category,
                location: parsed.location,
                image: `./images/${filename}`,
                favorites: false,
                smile: true
            };
        });

        return this.photos;
    }

    /**
     * Descripción aleatoria (para que no todas sean iguales)
     */
    getRandomDescription() {
        const descriptions = [
            'Un momento que quiero recordar siempre.',
            'Uno de esos días especiales que nunca olvidaré.',
            'Capturando la felicidad de este instante.',
            'Un recuerdo que brilla en mi corazón.',
            'Este momento vale más que mil palabras.',
            'Sonrisas, risas y mucho amor en una sola foto.',
            'Un día perfecto contigo.',
            'Cuando la magia sucede en un instante.'
        ];

        return descriptions[Math.floor(Math.random() * descriptions.length)];
    }

    /**
     * Generar el contenido del archivo data.js
     */
    generateDataJsContent() {
        const photosJson = JSON.stringify(this.photos, null, 4);

        return `/**
 * DATA.JS - AUTO-GENERADO
 * Este archivo fue generado automáticamente por generate-gallery.js
 * No edites manualmente, usa: npm run generate
 * 
 * Generado: ${new Date().toLocaleString('es-ES')}
 * Total de fotos: ${this.photos.length}
 */

const photosDatabase = {
    // Configuración base
    config: {
        startDate: new Date('${this.config.startDate}'),
        appVersion: '1.0.0',
        owner: 'Albani',
        generatedAt: '${new Date().toISOString()}'
    },

    // Colección de fotos (auto-generada)
    photos: ${photosJson},

    /**
     * Métodos para interactuar con la base de datos
     */
    getPhotos() {
        return this.photos;
    },

    getPhotosByCategory(category) {
        if (category === 'todos') return this.photos;
        return this.photos.filter(photo => photo.category === category);
    },

    getPhotoById(id) {
        return this.photos.find(photo => photo.id === id);
    },

    getFavoritePhotos() {
        return this.photos.filter(photo => photo.favorites);
    },

    getPhotosByLocation() {
        const locations = {};
        this.photos.forEach(photo => {
            if (!locations[photo.location]) {
                locations[photo.location] = [];
            }
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

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = photosDatabase;
}`;
    }

    /**
     * Guardar el archivo data.js
     */
    saveDataJs() {
        try {
            const content = this.generateDataJsContent();
            
            // Crear backup si el archivo existe
            if (fs.existsSync(this.outputPath)) {
                const backupPath = this.outputPath.replace('.js', '.backup.js');
                fs.copyFileSync(this.outputPath, backupPath);
            }
            
            fs.writeFileSync(this.outputPath, content, 'utf8');
            return true;
        } catch (error) {
            console.error(`${colors.red}Error guardando data.js:${colors.reset}`, error.message);
            this.errors.push(`Error guardando: ${error.message}`);
            return false;
        }
    }

    /**
     * Mostrar reporte
     */
    showReport() {
        console.log(`\n${colors.bright}${colors.cyan}╔════════════════════════════════════════╗${colors.reset}`);
        console.log(`${colors.bright}${colors.cyan}║    GALERÍA AUTO-GENERADA ✨              ║${colors.reset}`);
        console.log(`${colors.bright}${colors.cyan}╚════════════════════════════════════════╝${colors.reset}\n`);

        console.log(`${colors.green}✅ Fotos detectadas: ${colors.bright}${this.photos.length}${colors.reset}`);
        console.log(`${colors.blue}📁 Carpeta: ${colors.bright}${this.imagesPath}${colors.reset}`);
        console.log(`${colors.blue}📄 Archivo generado: ${colors.bright}${this.outputPath}${colors.reset}\n`);

        if (this.photos.length > 0) {
            console.log(`${colors.yellow}Fotos detectadas:${colors.reset}`);
            this.photos.forEach((photo, index) => {
                console.log(`  ${colors.cyan}${index + 1}.${colors.reset} ${photo.title}`);
                console.log(`     Categoría: ${photo.category} | Ubicación: ${photo.location}`);
                console.log(`     Fecha: ${photo.date}\n`);
            });

            // Estadísticas
            const stats = this.getStats();
            console.log(`${colors.yellow}Estadísticas:${colors.reset}`);
            console.log(`  ${colors.bright}Parejas:${colors.reset} ${stats.parejas}`);
            console.log(`  ${colors.bright}Aventuras:${colors.reset} ${stats.aventuras}`);
            console.log(`  ${colors.bright}Momentos:${colors.reset} ${stats.momentos}\n`);
        } else {
            console.log(`${colors.yellow}⚠️  No hay fotos en la carpeta 'images'${colors.reset}`);
            console.log(`${colors.yellow}💡 Copia tus fotos a: ${this.imagesPath}${colors.reset}`);
            console.log(`${colors.yellow}📝 Formato recomendado: nombreFoto_categoria_ubicacion.jpg${colors.reset}`);
            console.log(`${colors.yellow}   Ejemplo: atardecer_momentos_playa.jpg\n${colors.reset}`);
        }

        console.log(`${colors.green}${colors.bright}✨ ¡Listo! Abre index.html para ver la galería${colors.reset}\n`);
    }

    /**
     * Obtener estadísticas
     */
    getStats() {
        return {
            parejas: this.photos.filter(p => p.category === 'parejas').length,
            aventuras: this.photos.filter(p => p.category === 'aventuras').length,
            momentos: this.photos.filter(p => p.category === 'momentos').length,
        };
    }

    /**
     * Ejecutar generación completa
     */
    run() {
        console.log(`\n${colors.bright}${colors.cyan}🚀 Iniciando generación de galería...${colors.reset}\n`);

        // Generar fotos
        this.generatePhotos();

        // Guardar archivo
        const saved = this.saveDataJs();

        if (saved) {
            this.showReport();
        } else {
            console.error(`${colors.red}❌ Error durante la generación${colors.reset}\n`);
            process.exit(1);
        }
    }
}

// Ejecutar
const generator = new GalleryGenerator();
generator.run();