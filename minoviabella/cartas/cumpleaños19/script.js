// ============================================================
// CONTADOR DE RELACIÓN
// ============================================================
class RelationshipCounter {
    constructor() {
        this.startDate = new Date('2025-10-17'); // 17 de octubre 2025
    }

    update() {
        const now = new Date();
        const diff = now - this.startDate;
        
        const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30.44));
        const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        return { months, days, hours, seconds };
    }

    render() {
        const { months, days, hours, seconds } = this.update();
        
        const monthEl = document.getElementById('months');
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const secondsEl = document.getElementById('seconds');
        
        if (monthEl) monthEl.textContent = months;
        if (daysEl) daysEl.textContent = String(days).padStart(3, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }
}

// ============================================================
// CONFETI DE CUMPLEAÑOS
// ============================================================
function throwConfetti() {
    const colors = [
        '#ff1493', '#f093fb', '#667eea', '#ffd700',
        '#ff6347', '#00ffff', '#00ff00', '#ffff00'
    ];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '0px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 4000);
    }
}

// ============================================================
// ENVIAR BESOS (ANIMACIÓN)
// ============================================================
function sendLove() {
    const btn = event.target;
    const colors = ['💕', '💖', '💗', '💓', '💞'];
    
    gsap.to(btn, { rotation: 360, duration: 0.6 });
    
    for (let i = 0; i < 20; i++) {
        const love = document.createElement('div');
        love.textContent = colors[Math.floor(Math.random() * colors.length)];
        love.style.position = 'fixed';
        love.style.left = btn.getBoundingClientRect().left + 'px';
        love.style.top = btn.getBoundingClientRect().top + 'px';
        love.style.fontSize = '30px';
        love.style.pointerEvents = 'none';
        love.style.zIndex = '9999';
        document.body.appendChild(love);
        
        gsap.to(love, {
            duration: 1.5,
            y: -200,
            x: (Math.random() - 0.5) * 200,
            opacity: 0,
            ease: 'power2.out',
            onComplete: () => love.remove()
        });
    }
}

// ============================================================
// REPRODUCTOR DE MÚSICA
// ============================================================
function playMusic(artist) {
    const audioPlayer = document.getElementById('audioPlayer');
    
    // URLs de YouTube Music (requieren acceso directo o servicio proxy)
    const musicLinks = {
        'manuel': 'https://www.youtube.com/results?search_query=Manuel+Medrano',
        'mike': 'https://www.youtube.com/results?search_query=Mike+Towers'
    };
    
    // Abre búsqueda en YouTube
    window.open(musicLinks[artist], '_blank');
    
    // Muestra mensaje
    alert(`🎵 Abriendo ${artist === 'manuel' ? 'Manuel Medrano' : 'Mike Towers'} en YouTube Music\n\nEscanea el código QR o búscalo en Spotify para escuchar mientras lees esta carta.`);
}

// ============================================================
// ANIMACIÓN DE ENTRADA CON GSAP
// ============================================================
function initializeAnimations() {
    if (typeof gsap === 'undefined') return;
    
    // Animar tarjeta de cumpleaños
    gsap.from('.birthday-card', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2
    });
    
    // Animar galería items con observador para eficiencia
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = 'true';
                gsap.from(entry.target, {
                    opacity: 0,
                    y: 20,
                    duration: 0.6,
                    ease: 'power2.out'
                });
            }
        });
    }, { threshold: 0.1 });
    
    galleryItems.forEach(item => observer.observe(item));
}

// ============================================================
// INICIALIZACIÓN
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('%c🎂 CARTA DE CUMPLEAÑOS ESPECIAL 🎂', 'font-size: 20px; color: #ff1493; font-weight: bold;');
    console.log('%c19 años de tu hermosa existencia', 'font-size: 16px; color: #f093fb;');
    console.log('%cTe amo infinitamente ❤️', 'font-size: 16px; color: #ff1493;');
    
    // Iniciar contador inmediatamente
    const counter = new RelationshipCounter();
    counter.render();
    setInterval(() => counter.render(), 1000);
    
    // Cargar galería después de un pequeño delay para mejor rendimiento
    setTimeout(() => {
        loadGallery();
        initializeAnimations();
    }, 100);
    
    // Confeti automático al entrar (con delay más grande para que cargue todo primero)
    setTimeout(() => {
        throwConfetti();
    }, 1200);
});

// ============================================================
// CARGAR GALERÍA DINÁMICAMENTE
// ============================================================
function loadGallery() {
    const galleryContainer = document.getElementById('galleryContainer');
    if (!galleryContainer) return;
    
    const captions = [
        'Tu hermosa sonrisa',
        'Recuerdos juntos',
        'Cada momento es perfecto',
        'Eternamente tuyos',
        'Mi amor infinito',
        'Siempre juntos',
        'Tú eres mi razón',
        'Contigo en cada paso',
        'Tu esencia me encanta',
        'Nosotros es todo',
        'Momentos de oro',
        'Luz en mi vida',
        'Amor infinito',
        'Mi bendición',
        'Tu compañía es todo',
        'Juntos es perfecto',
        'Te amo más cada día',
        'Mi corazón es tuyo',
        'Contigo siempre',
        'Eres mi persona',
        'En tus ojos veo el futuro',
        'Tu risa es mi canción',
        'Con vos soy feliz',
        'Eternidad en tus brazos',
        'Cada foto, un recuerdo',
        'Mi vida eres vos',
        'Amor puro y sincero',
        'Tu presencia me calma',
        'Sonrisas de amor',
        'Tú y yo, para siempre',
        'Instantes inolvidables',
        'Tu belleza interior',
        'Nosotros, el destino',
        'Amor que crece',
        'Tu mano en la mía',
        'Momentos mágicos',
        'Contigo es hogar',
        'El mejor regalo',
        'Te quiero hoy y siempre',
        'Mi mitad del alma',
        'Felicidad completa',
        'Amor verdadero',
        'Tu sonrisa brillante',
        'Forever with you'
    ];
    
    // Cargar fotos de forma más fluida
    for (let photoCount = 1; photoCount <= 50; photoCount++) {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        
        const placeholder = document.createElement('div');
        placeholder.className = 'photo-placeholder';
        
        const img = document.createElement('img');
        const photoFile = `fotos/${photoCount}.jpg`;
        img.src = photoFile;
        img.alt = `Foto ${photoCount}`;
        img.loading = 'lazy';
        
        let photoLoaded = false;
        
        img.onerror = function() {
            if (!photoLoaded) {
                galleryItem.style.display = 'none';
            }
        };
        
        img.onload = function() {
            photoLoaded = true;
            galleryItem.style.display = 'block';
        };
        
        const placeholderText = document.createElement('div');
        placeholderText.className = 'placeholder-text';
        placeholderText.textContent = `Foto ${photoCount}`;
        
        placeholder.appendChild(img);
        placeholder.appendChild(placeholderText);
        
        const caption = document.createElement('p');
        caption.className = 'photo-caption';
        caption.textContent = captions[(photoCount - 1) % captions.length];
        
        galleryItem.appendChild(placeholder);
        galleryItem.appendChild(caption);
        
        galleryContainer.appendChild(galleryItem);
    }
}
