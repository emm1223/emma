/**
 * GALLERY.JS
 * Gestor profesional de la galería con todas las funcionalidades
 * Maneja renderizado, filtros, lightbox y animaciones
 */

class GalleryManager {
    constructor(containerSelector = '#galeriaGrid') {
        this.container = document.querySelector(containerSelector);
        this.currentFilter = 'todos';
        this.currentPhotoIndex = 0;
        this.filteredPhotos = [];
        this.init();
    }

    /**
     * Inicializar el gestor de galería
     */
    init() {
        this.setupEventListeners();
        this.renderGallery();
    }

    /**
     * Configurar listeners de eventos
     */
    setupEventListeners() {
        // Filtros
        document.querySelectorAll('.filtro-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFilterClick(e));
        });

        // Lightbox
        const lightboxModal = document.getElementById('lightboxModal');
        document.querySelector('.lightbox-close').addEventListener('click', () => {
            this.closeLightbox();
        });

        document.querySelector('.lightbox-next').addEventListener('click', () => {
            this.nextPhoto();
        });

        document.querySelector('.lightbox-prev').addEventListener('click', () => {
            this.prevPhoto();
        });

        // Cerrar lightbox al hacer click fuera
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                this.closeLightbox();
            }
        });

        // Navegación con teclado
        document.addEventListener('keydown', (e) => {
            if (!lightboxModal.classList.contains('active')) return;
            if (e.key === 'ArrowLeft') this.prevPhoto();
            if (e.key === 'ArrowRight') this.nextPhoto();
            if (e.key === 'Escape') this.closeLightbox();
        });
    }

    /**
     * Manejar clics en filtros
     */
    handleFilterClick(e) {
        // Remover clase active de todos los botones
        document.querySelectorAll('.filtro-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Agregar clase active al botón actual
        e.target.closest('.filtro-btn').classList.add('active');

        // Obtener el filtro seleccionado
        this.currentFilter = e.target.closest('.filtro-btn').dataset.filter;

        // Renderizar galería con nuevo filtro
        this.renderGallery();

        // Animación suave
        this.container.style.animation = 'none';
        setTimeout(() => {
            this.container.style.animation = 'slideInUp 0.6s ease-out';
        }, 10);
    }

    /**
     * Renderizar la galería
     */
    renderGallery() {
        // Obtener fotos filtradas
        if (this.currentFilter === 'favoritos') {
            this.filteredPhotos = photosDatabase.photos.filter(photo => 
                galleryFeatures.favorites.includes(photo.id)
            );
        } else {
            this.filteredPhotos = photosDatabase.getPhotosByCategory(this.currentFilter);
        }

        // Limpiar contenedor
        this.container.innerHTML = '';

        // Renderizar cada foto
        this.filteredPhotos.forEach((photo, index) => {
            const photoElement = this.createPhotoElement(photo, index);
            this.container.appendChild(photoElement);
        });
    }

    /**
     * Crear elemento de foto
     */
    createPhotoElement(photo, index) {
        const div = document.createElement('div');
        div.className = 'galeria-item';
        div.dataset.photoId = photo.id;
        div.style.animation = `slideInUp 0.6s ease-out ${index * 0.1}s both`;

        const dateFormatted = this.formatDate(photo.date);

        div.innerHTML = `
            <img src="${photo.image}" alt="${photo.title}" class="placeholder-image">
            <div class="galeria-item-overlay">
                <div class="galeria-item-title">${photo.title}</div>
                <div class="galeria-item-date">${dateFormatted}</div>
            </div>
        `;

        div.addEventListener('click', () => {
            this.openLightbox(photo, this.filteredPhotos.indexOf(photo));
        });

        return div;
    }

    /**
     * Abrir lightbox
     */
    openLightbox(photo, index) {
        this.currentPhotoIndex = index;
        this.updateLightbox(photo);

        const modal = document.getElementById('lightboxModal');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Actualizar botón de favorito
        if (galleryFeatures) {
            galleryFeatures.updateFavoriteButton(photo.id);
        }
    }

    /**
     * Cerrar lightbox
     */
    closeLightbox() {
        const modal = document.getElementById('lightboxModal');
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    /**
     * Actualizar contenido del lightbox
     */
    updateLightbox(photo) {
        const img = document.getElementById('lightboxImage');
        const title = document.getElementById('lightboxTitle');
        const description = document.getElementById('lightboxDescription');
        const date = document.getElementById('lightboxDate');
        const category = document.getElementById('lightboxCategory');

        img.src = photo.image;
        img.alt = photo.title;
        img.style.maxWidth = '100%';
        img.style.maxHeight = '100%';
        img.style.objectFit = 'contain';

        title.textContent = photo.title;
        description.textContent = photo.description;
        date.innerHTML = `<i class="fas fa-calendar"></i> ${this.formatDate(photo.date)}`;
        category.innerHTML = `<i class="fas fa-tag"></i> ${this.getCategoryLabel(photo.category)}`;
    }

    /**
     * Ir a la siguiente foto
     */
    nextPhoto() {
        this.currentPhotoIndex = (this.currentPhotoIndex + 1) % this.filteredPhotos.length;
        this.updateLightbox(this.filteredPhotos[this.currentPhotoIndex]);
    }

    /**
     * Ir a la foto anterior
     */
    prevPhoto() {
        this.currentPhotoIndex = (this.currentPhotoIndex - 1 + this.filteredPhotos.length) % this.filteredPhotos.length;
        this.updateLightbox(this.filteredPhotos[this.currentPhotoIndex]);
    }

    /**
     * Utilidades
     */
    formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('es-ES', options);
    }

    getCategoryLabel(category) {
        const labels = {
            parejas: '💑 Nosotros',
            aventuras: '🗺️ Aventuras',
            momentos: '✨ Momentos'
        };
        return labels[category] || category;
    }
}

// Crear instancia global
let galleryManager;
document.addEventListener('DOMContentLoaded', () => {
    galleryManager = new GalleryManager('#galeriaGrid');
});