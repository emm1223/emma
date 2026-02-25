/**
 * MAIN.JS
 * Script principal que controla toda la funcionalidad de la aplicación
 * Maneja la navegación, animaciones y funcionalidades adicionales
 */

// ========================================
// CONFIGURACIÓN GLOBAL
// ========================================
const APP = {
    currentSection: 'inicio',
    scrollPosition: 0
};

// ========================================
// INICIALIZACIÓN
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    console.log('🎨 Inicializando aplicación...');
    
    setupNavigationListeners();
    setupSmoothScroll();
    setupLightboxListeners();
    renderDaysCounter();
    renderTimeline();
    renderStatistics();
    setupResponsiveMenu();
    
    console.log('✅ Aplicación inicializada exitosamente');
}

// ========================================
// NAVEGACIÓN
// ========================================
function setupNavigationListeners() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.dataset.section;
            navigateToSection(section);
            closeMobileMenu();
        });
    });
}

function navigateToSection(section) {
    // Actualizar enlace activo
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.section === section) {
            link.classList.add('active');
        }
    });

    APP.currentSection = section;

    // Scroll suave a la sección
    const element = document.getElementById(section);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// ========================================
// SCROLL SUAVE
// ========================================
function setupSmoothScroll() {
    window.addEventListener('scroll', () => {
        APP.scrollPosition = window.scrollY;
        updateNavbarBackground();
    });
}

function updateNavbarBackground() {
    const navbar = document.querySelector('.navbar');
    if (APP.scrollPosition > 50) {
        navbar.style.boxShadow = '0 8px 16px rgba(255, 20, 147, 0.15)';
    } else {
        navbar.style.boxShadow = '0 8px 16px rgba(255, 20, 147, 0.15)';
    }
}

// ========================================
// CONTADOR DE DÍAS
// ========================================
function renderDaysCounter() {
    const diasElement = document.getElementById('diasJuntos');
    const days = photosDatabase.getDaysTogetherCount();

    // Animación de conteo
    animateCounter(diasElement, days, 2000);
}

function animateCounter(element, targetValue, duration) {
    const startValue = 0;
    const startTime = Date.now();

    function updateCounter() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentValue = Math.floor(startValue + (targetValue - startValue) * progress);
        
        element.textContent = currentValue;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }

    updateCounter();
}

// ========================================
// TIMELINE
// ========================================
function renderTimeline() {
    const timelineContainer = document.getElementById('timelineContainer');
    const timeline = photosDatabase.getTimelineData();

    timelineContainer.innerHTML = '';

    timeline.forEach((photo, index) => {
        const timelineItem = createTimelineItem(photo, index);
        timelineContainer.appendChild(timelineItem);
    });
}

function createTimelineItem(photo, index) {
    const div = document.createElement('div');
    div.className = 'timeline-item';
    div.style.animationDelay = `${index * 0.1}s`;

    const dateFormatted = formatDateTimeline(photo.date);
    const categoryLabel = getCategoryLabel(photo.category);

    div.innerHTML = `
        <div class="timeline-dot"></div>
        <div class="timeline-content">
            <div class="timeline-date">${dateFormatted}</div>
            <div class="timeline-title">${photo.title}</div>
            <div class="timeline-description">${photo.description}</div>
            <div style="margin-top: 10px; font-size: 12px; color: #ff1493;">
                📍 ${photo.location} • ${categoryLabel}
            </div>
        </div>
    `;

    return div;
}

function formatDateTimeline(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('es-ES', options);
}

// ========================================
// ESTADÍSTICAS
// ========================================
function renderStatistics() {
    const stats = photosDatabase.getStatistics();

    // Actualizar números
    document.getElementById('totalFotos').textContent = stats.totalPhotos;
    document.getElementById('totalLugares').textContent = stats.totalLocations;
    document.getElementById('recuerdosFavoritos').textContent = stats.totalFavorites;
    document.getElementById('sonrisas').textContent = stats.totalSmiles;

    // Actualizar gráficos
    const total = stats.totalPhotos;
    const parejasPercent = (stats.categoriesBreakdown.parejas / total) * 100;
    const aventurasPercent = (stats.categoriesBreakdown.aventuras / total) * 100;
    const momentosPercent = (stats.categoriesBreakdown.momentos / total) * 100;

    document.getElementById('chartParejas').style.width = parejasPercent + '%';
    document.getElementById('chartAventuras').style.width = aventurasPercent + '%';
    document.getElementById('chartMomentos').style.width = momentosPercent + '%';
}

// ========================================
// MENÚ RESPONSIVE
// ========================================
function setupResponsiveMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (!hamburger) return;

    hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        hamburger.style.transform = navMenu.style.display === 'flex' ? 'rotate(90deg)' : 'rotate(0)';
    });
}

function closeMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');

    if (navMenu) {
        navMenu.style.display = 'none';
        if (hamburger) {
            hamburger.style.transform = 'rotate(0)';
        }
    }
}

// ========================================
// UTILIDADES
// ========================================
function getCategoryLabel(category) {
    const labels = {
        parejas: '💑 Nosotros',
        aventuras: '🗺️ Aventuras',
        momentos: '✨ Momentos'
    };
    return labels[category] || category;
}

// ========================================
// EVENT LISTENERS GLOBALES
// ========================================
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        document.querySelector('.nav-menu').style.display = 'flex';
    }
});

// Listeners para favoritos
function setupLightboxListeners() {
    const favBtn = document.getElementById('favBtn');
    if (!favBtn) return;

    favBtn.addEventListener('click', () => {
        if (!galleryManager || !galleryManager.filteredPhotos) return;
        const currentPhoto = galleryManager.filteredPhotos[galleryManager.currentPhotoIndex];
        if (currentPhoto) {
            galleryFeatures.toggleFavorite(currentPhoto.id);
        }
    });
}

// Log de desarrollo (puedes remover en producción)
console.log('📸 Galería cargada correctamente');
console.log('📊 Total de fotos:', photosDatabase.getStatistics().totalPhotos);
console.log('💕 Días juntos:', photosDatabase.getDaysTogetherCount());