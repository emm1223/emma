/**
 * FEATURES.JS
 * Características avanzadas de la galería
 * Búsqueda, favoritos, zoom, compartir, etc.
 */

class GalleryFeatures {
    constructor() {
        this.favorites = this.loadFavorites();
        this.isZoomed = false;
        this.init();
    }

    /**
     * Inicializar features
     */
    init() {
        this.setupSearch();
        this.setupTheme();
        this.setupFavorites();
        this.setupZoom();
        this.setupShare();
    }

    /**
     * BÚSQUEDA
     */
    setupSearch() {
        const searchBtn = document.getElementById('btnSearch');
        const searchBar = document.getElementById('searchBar');
        const searchInput = document.getElementById('searchInput');
        const searchClear = document.getElementById('searchClear');
        const searchResults = document.getElementById('searchResults');

        searchBtn.addEventListener('click', () => {
            searchBar.classList.toggle('active');
            if (searchBar.classList.contains('active')) {
                searchInput.focus();
            }
        });

        searchInput.addEventListener('input', (e) => {
            this.performSearch(e.target.value);
        });

        searchClear.addEventListener('click', () => {
            searchInput.value = '';
            searchResults.innerHTML = '';
            searchResults.classList.add('hidden');
        });

        // Cerrar búsqueda al presionar Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && searchBar.classList.contains('active')) {
                searchBar.classList.remove('active');
                searchResults.classList.add('hidden');
            }
        });
    }

    /**
     * Realizar búsqueda
     */
    performSearch(query) {
        const searchResults = document.getElementById('searchResults');

        if (query.trim().length === 0) {
            searchResults.classList.add('hidden');
            return;
        }

        const results = photosDatabase.photos.filter(photo => {
            const searchTerm = query.toLowerCase();
            return (
                photo.title.toLowerCase().includes(searchTerm) ||
                photo.location.toLowerCase().includes(searchTerm) ||
                photo.description.toLowerCase().includes(searchTerm)
            );
        });

        this.displaySearchResults(results, searchResults);
    }

    /**
     * Mostrar resultados de búsqueda
     */
    displaySearchResults(results, container) {
        if (results.length === 0) {
            container.innerHTML = '<div class="search-no-results">No hay resultados</div>';
            container.classList.remove('hidden');
            return;
        }

        container.innerHTML = results.map(photo => `
            <div class="search-result-item" onclick="galleryManager.openLightbox(photosDatabase.getPhotoById(${photo.id}), ${photosDatabase.photos.indexOf(photo)})">
                <div class="search-result-icon">${photo.image}</div>
                <div class="search-result-info">
                    <div class="search-result-title">${photo.title}</div>
                    <div class="search-result-location">${photo.location}</div>
                </div>
            </div>
        `).join('');

        container.classList.remove('hidden');
    }

    /**
     * TEMA OSCURO
     */
    setupTheme() {
        const themeBtn = document.getElementById('btnTheme');
        const savedTheme = localStorage.getItem('theme') || 'light';

        if (savedTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
        }

        themeBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            themeBtn.innerHTML = newTheme === 'dark' 
                ? '<i class="fas fa-sun"></i>' 
                : '<i class="fas fa-moon"></i>';
        });
    }

    /**
     * FAVORITOS
     */
    setupFavorites() {
        const favoriteBtn = document.getElementById('favoriteBtn');
        favoriteBtn.addEventListener('click', (e) => {
            e.target.closest('.filtro-btn').classList.add('active');
            document.querySelectorAll('.filtro-btn').forEach(btn => {
                if (btn !== e.target.closest('.filtro-btn')) {
                    btn.classList.remove('active');
                }
            });
            galleryManager.currentFilter = 'favoritos';
            this.renderFavorites();
        });
    }

    /**
     * Marcar como favorito
     */
    toggleFavorite(photoId) {
        if (this.favorites.includes(photoId)) {
            this.favorites = this.favorites.filter(id => id !== photoId);
        } else {
            this.favorites.push(photoId);
        }
        this.saveFavorites();
        this.updateFavoriteButton(photoId);
    }

    /**
     * Actualizar botón de favorito
     */
    updateFavoriteButton(photoId) {
        const favBtn = document.getElementById('favBtn');
        if (!favBtn) return;

        if (this.favorites.includes(photoId)) {
            favBtn.innerHTML = '<i class="fas fa-heart"></i>';
            favBtn.classList.add('favorited');
        } else {
            favBtn.innerHTML = '<i class="far fa-heart"></i>';
            favBtn.classList.remove('favorited');
        }
    }

    /**
     * Renderizar favoritos
     */
    renderFavorites() {
        const favoritePhotos = photosDatabase.photos.filter(photo => 
            this.favorites.includes(photo.id)
        );

        const container = document.getElementById('galeriaGrid');
        container.innerHTML = '';

        if (favoritePhotos.length === 0) {
            container.innerHTML = '<div class="no-favorites">No tienes favoritos aún</div>';
            return;
        }

        favoritePhotos.forEach((photo, index) => {
            const photoElement = galleryManager.createPhotoElement(photo, index);
            container.appendChild(photoElement);
        });
    }

    /**
     * Guardar y cargar favoritos
     */
    saveFavorites() {
        localStorage.setItem('gallery_favorites', JSON.stringify(this.favorites));
    }

    loadFavorites() {
        return JSON.parse(localStorage.getItem('gallery_favorites') || '[]');
    }

    /**
     * ZOOM
     */
    setupZoom() {
        const zoomBtn = document.getElementById('zoomBtn');
        const lightboxImage = document.getElementById('lightboxImage');

        if (!zoomBtn) return;

        zoomBtn.addEventListener('click', () => {
            this.isZoomed = !this.isZoomed;
            
            if (this.isZoomed) {
                lightboxImage.classList.add('zoomed');
                zoomBtn.classList.add('active');
            } else {
                lightboxImage.classList.remove('zoomed');
                zoomBtn.classList.remove('active');
            }
        });
    }

    /**
     * COMPARTIR
     */
    setupShare() {
        const shareBtn = document.getElementById('shareBtn');
        if (!shareBtn) return;

        shareBtn.addEventListener('click', () => {
            const modal = document.getElementById('lightboxModal');
            const title = document.getElementById('lightboxTitle').textContent;
            const url = window.location.href;

            const shareText = `Mira este momento especial: "${title}" en mi galería de Albani`;

            // Opciones de compartir
            const shareOptions = `
                <div class="share-options">
                    <button onclick="galleryFeatures.copyToClipboard('${url}')">
                        <i class="fas fa-link"></i> Copiar Link
                    </button>
                    <button onclick="galleryFeatures.shareWhatsApp('${shareText}', '${url}')">
                        <i class="fab fa-whatsapp"></i> WhatsApp
                    </button>
                </div>
            `;

            const existingShare = document.querySelector('.share-options');
            if (existingShare) {
                existingShare.remove();
            } else {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = shareOptions;
                modal.querySelector('.lightbox-content').appendChild(tempDiv.firstElementChild);
            }
        });
    }

    /**
     * Copiar al portapapeles
     */
    copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            alert('¡Enlace copiado!');
        });
    }

    /**
     * Compartir en WhatsApp
     */
    shareWhatsApp(text, url) {
        const message = `${text}\n${url}`;
        const encoded = encodeURIComponent(message);
        window.open(`https://wa.me/?text=${encoded}`, '_blank');
    }
}

let galleryFeatures;
document.addEventListener('DOMContentLoaded', () => {
    galleryFeatures = new GalleryFeatures();
});