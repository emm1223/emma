/**
 * DATA.JS - AUTO-GENERADO
 * Este archivo fue generado automáticamente por generate-gallery.js
 * No edites manualmente, usa: npm run generate
 * 
 * Generado: 24/2/2026, 22:17:48
 * Total de fotos: 1
 */

const photosDatabase = {
    // Configuración base
    config: {
        startDate: new Date('2024-01-15'),
        appVersion: '1.0.0',
        owner: 'Albani',
        generatedAt: '2026-02-25T03:17:48.659Z'
    },

    // Colección de fotos (auto-generada)
    photos: [
    {
        "id": 1,
        "title": "Albani",
        "description": "Momento especial: Albani. Capturando la felicidad de este instante.",
        "date": "2026-02-25",
        "category": "momentos",
        "location": "Lugar Especial",
        "image": "./images/albani.png",
        "favorites": false,
        "smile": true
    }
],

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
}