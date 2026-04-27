// ============================================================
// CONTADOR DE RELACIÓN
// ============================================================
class RelationshipCounter {
    constructor() {
        this.startDate = new Date('2025-09-17');
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
// GESTOR DE LIGHTBOX
// ============================================================
class LightboxGallery {
    constructor() {
        this.currentIndex = 0;
        this.totalPhotos = 0;
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImage = document.getElementById('lightbox-image');
        this.lightboxCaption = document.getElementById('lightbox-caption');
        this.lightboxCounter = document.getElementById('lightbox-counter');
        
        this.captions = [
            'Tu hermosa sonrisa',
            'Recuerdos juntos',
            'Cada momento es perfecto',
            'Eternamente tuyo',
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
            'Mi vida eres tu',
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
        
        this.setupEventListeners();
        this.countPhotos();
    }

    countPhotos() {
        for (let i = 1; i <= 50; i++) {
            const img = new Image();
            img.onload = () => {
                if (i > this.totalPhotos) this.totalPhotos = i;
            };
            img.src = `fotos/${i}.jpg`;
        }
    }

    setupEventListeners() {
        document.querySelector('.lightbox-close').addEventListener('click', () => this.close());
        document.querySelector('.lightbox-prev').addEventListener('click', () => this.prevPhoto());
        document.querySelector('.lightbox-next').addEventListener('click', () => this.nextPhoto());
        
        document.addEventListener('keydown', (e) => {
            if (!this.lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') this.close();
            if (e.key === 'ArrowLeft') this.prevPhoto();
            if (e.key === 'ArrowRight') this.nextPhoto();
        });
    }

    open(index) {
        this.currentIndex = index;
        this.lightbox.classList.add('active');
        this.updatePhoto();
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    updatePhoto() {
        const photoNumber = this.currentIndex + 1;
        this.lightboxImage.src = `fotos/${photoNumber}.jpg`;
        this.lightboxCaption.textContent = this.captions[(this.currentIndex) % this.captions.length];
        this.lightboxCounter.textContent = `${photoNumber} / ${this.totalPhotos || '?'}`;
    }

    nextPhoto() {
        this.currentIndex = (this.currentIndex + 1) % this.totalPhotos;
        this.updatePhoto();
    }

    prevPhoto() {
        this.currentIndex = (this.currentIndex - 1 + this.totalPhotos) % this.totalPhotos;
        this.updatePhoto();
    }
}

// ============================================================
// GESTOR DE MÚSICA
// ============================================================
class MusicPlayer {
    constructor() {
        this.audio = document.getElementById('backgroundMusic');
        this.isPlaying = false;
        this.initialized = false;
        
        setTimeout(() => {
            this.autoPlay();
        }, 2000);
    }

    autoPlay() {
        if (this.initialized) return;
        
        const promise = this.audio.play();
        
        if (promise !== undefined) {
            promise
                .then(() => {
                    this.isPlaying = true;
                    this.initialized = true;
                    console.log('🎵 Música iniciada automáticamente');
                })
                .catch(() => {
                    console.log('🔇 Reproducción automática bloqueada (necesita interacción del usuario)');
                });
        }
    }

    toggle() {
        if (!this.initialized) {
            this.autoPlay();
        }
        
        if (this.audio.paused) {
            this.audio.play();
            this.isPlaying = true;
        } else {
            this.audio.pause();
            this.isPlaying = false;
        }
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
    const musicLinks = {
        'manuel': 'https://www.youtube.com/results?search_query=Manuel+Medrano',
        'mike': 'https://www.youtube.com/results?search_query=Mike+Towers'
    };
    
    window.open(musicLinks[artist], '_blank');
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
// VARIABLES GLOBALES
// ============================================================
let lightbox = null;
let musicPlayer = null;

// ============================================================
// INICIALIZACIÓN
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('%c🎂 CARTA DE CUMPLEAÑOS ESPECIAL 🎂', 'font-size: 20px; color: #ff1493; font-weight: bold;');
    console.log('%c19 años de tu hermosa existencia', 'font-size: 16px; color: #f093fb;');
    console.log('%cTe amo infinitamente ❤️', 'font-size: 16px; color: #ff1493;');
    
    // Inicializar componentes
    lightbox = new LightboxGallery();
    musicPlayer = new MusicPlayer();
    
    // Iniciar contador inmediatamente
    const counter = new RelationshipCounter();
    counter.render();
    setInterval(() => counter.render(), 1000);
    
    // Cargar galería después de un pequeño delay para mejor rendimiento
    setTimeout(() => {
        loadGallery();
        initializeAnimations();
    }, 100);
    
    // Confeti automático al entrar
    setTimeout(() => {
        throwConfetti();
    }, 1200);
    
    // Permitir click para reproducir música (por políticas de navegador)
    document.addEventListener('click', () => {
        if (!musicPlayer.initialized) {
            musicPlayer.autoPlay();
        }
    }, { once: true });
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
        'Te amo hoy y siempre',
        'Mi mitad del alma',
        'Felicidad completa',
        'Amor verdadero',
        'Tu sonrisa brillante',
        'Forever with you'
    ];
    
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
        
        placeholder.style.cursor = 'pointer';
        placeholder.addEventListener('click', () => {
            if (lightbox) lightbox.open(photoCount - 1);
        });
        
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


// ============================================================
// VARIABLES GLOBALES
// ============================================================

// ============================================================
// INICIALIZACIÓN
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('%c🎂 CARTA DE CUMPLEAÑOS ESPECIAL 🎂', 'font-size: 20px; color: #ff1493; font-weight: bold;');
    console.log('%c19 años de tu hermosa existencia', 'font-size: 16px; color: #f093fb;');
    console.log('%cTe amo infinitamente ❤️', 'font-size: 16px; color: #ff1493;');
    
    // Inicializar componentes
    lightbox = new LightboxGallery();
    musicPlayer = new MusicPlayer();
    
    // Iniciar contador inmediatamente
    const counter = new RelationshipCounter();
    counter.render();
    setInterval(() => counter.render(), 1000);
    
    // Cargar galería después de un pequeño delay para mejor rendimiento
    setTimeout(() => {
        loadGallery();
        initializeAnimations();
    }, 100);
    
    // Confeti automático al entrar
    setTimeout(() => {
        throwConfetti();
    }, 1200);
    
    // Permitir click para reproducir música (por políticas de navegador)
    document.addEventListener('click', () => {
        if (!musicPlayer.initialized) {
            musicPlayer.autoPlay();
        }
    }, { once: true });
});
