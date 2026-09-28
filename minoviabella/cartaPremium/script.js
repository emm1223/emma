// ==================== CONFIGURACIÓN INICIAL ====================
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initParallaxEffect();
    initMusicPlayer();
});

// ==================== ANIMACIONES AL SCROLL ====================
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in-element');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// ==================== EFECTO PARALLAX ====================
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const heroContent = document.querySelector('.hero-content');
        
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrollPosition * 0.5}px)`;
            heroContent.style.opacity = Math.max(0, 1 - scrollPosition / 600);
        }
    });
}

// ==================== REPRODUCTOR DE MÚSICA ====================
function initMusicPlayer() {
    // INSTRUCCIONES PARA AGREGAR MÚSICA:
    // 
    // OPCIÓN 1: Usar un archivo de audio local
    // 1. Crea una carpeta llamada "music" en la misma carpeta que este archivo
    // 2. Pon tu archivo de audio ahí (canción.mp3)
    // 3. Descomenta la línea de abajo y cambia "canción.mp3" por el nombre de tu archivo
    //
    // const audioSrc = './music/cancion.mp3';
    //
    // OPCIÓN 2: Usar un enlace de Spotify
    // 1. Descomenta la sección de Spotify embed de abajo
    // 2. Reemplaza el ID de la canción
    //
    // OPCIÓN 3: Usar YouTube
    // 1. Usa un iframe de YouTube embed
    //
    
    const audioPlayer = document.querySelector('.audio-player');
    
    // Aquí es donde puedes agregar tu código de música
    // Por ahora está como placeholder
    
    // EJEMPLO DE CÓMO AGREGAR AUDIO LOCAL:
    // const audio = document.createElement('audio');
    // audio.src = './music/cancion.mp3';
    // audio.controls = true;
    // audio.style.width = '100%';
    // audio.style.marginTop = '20px';
    // audioPlayer.appendChild(audio);
}

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ==================== EFECTOS ADICIONALES ====================

// Efecto de luz al mover el mouse (solo en la sección hero)
document.querySelector('.hero').addEventListener('mousemove', function(e) {
    const { clientX, clientY } = e;
    const xPercent = (clientX / window.innerWidth) * 100;
    const yPercent = (clientY / window.innerHeight) * 100;
    
    const beforeElement = this.querySelector('.hero::before');
    // Esto es un efecto visual sutil (el gradiente ya está en CSS)
});

// ==================== CARGA DE FOTOS ====================
function loadPhotos() {
    // INSTRUCCIONES:
    // 1. Crea una carpeta llamada "fotos" en la misma ubicación que este archivo
    // 2. Pon tus fotos de ustedes en esa carpeta
    // 3. Este código las cargará automáticamente
    
    const galleryPlaceholder = document.querySelector('.gallery-placeholder');
    
    // Aquí iría el código para cargar y mostrar las fotos
    // Si quieres usar esto, descomenta y configura según tus necesidades
}

// ==================== FUNCIONES AUXILIARES ====================

// Función para agregar un archivo de audio (llámala desde la consola si necesitas)
function addAudio(filePath) {
    const audioPlayer = document.querySelector('.audio-player');
    const audio = document.createElement('audio');
    audio.src = filePath;
    audio.controls = true;
    audio.style.width = '100%';
    audio.style.marginTop = '20px';
    audioPlayer.innerHTML = '<h3>🎵 Tu Canción</h3>';
    audioPlayer.appendChild(audio);
}

// Función para cambiar colores de la página (llámala desde la consola)
function changeColors(primaryColor, accentColor) {
    document.documentElement.style.setProperty('--primary-color', primaryColor);
    document.documentElement.style.setProperty('--accent-gold', accentColor);
}

// ==================== DETECCIÓN DE SECCIÓN ACTIVA ====================
function updateActiveSectionOnScroll() {
    const sections = document.querySelectorAll('.content-section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('class');
            }
        });
    });
}

updateActiveSectionOnScroll();

// ==================== COMANDO DE AYUDA ====================
console.log(`
╔════════════════════════════════════════════════════════════╗
║          BIENVENIDO A TU PÁGINA PREMIUM 💝                 ║
╚════════════════════════════════════════════════════════════╝

📝 COMANDOS DISPONIBLES EN LA CONSOLA:

1. Agregar Audio:
   addAudio('./music/cancion.mp3')

2. Cambiar Colores:
   changeColors('#nuevoPrimario', '#nuevoAccent')

3. Ejemplos:
   changeColors('#1a1a1a', '#ff69b4') // Rosa
   changeColors('#1a1a1a', '#4a90e2') // Azul
   changeColors('#1a1a1a', '#50c878') // Verde

💡 RECUERDA:
- Edita los textos directamente en index.html
- Crea carpetas /music y /fotos para tus archivos
- Los estilos están en styles.css
- Más instrucciones en la sección final de la página
`);

// ==================== ANIMACIÓN DE ENTRADA ====================
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease-in';
