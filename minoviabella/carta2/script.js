// ============================================================
// Actualizar fecha actual
// ============================================================
function updateDate() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date().toLocaleDateString('es-ES', options);
    const dateEl = document.getElementById('currentDate');
    if (dateEl) {
        dateEl.textContent = today.charAt(0).toUpperCase() + today.slice(1);
    }
}

// ============================================================
// Contador de tiempo juntos
// ============================================================
class Timer {
    constructor() {
        this.startDate = new Date('2025-10-17'); // CAMBIAR FECHA
    }

    update() {
        const now = new Date();
        const diff = now - this.startDate;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds };
    }

    render() {
        const timerEl = document.getElementById('timer');
        if (!timerEl) return;
        
        const { days, hours, minutes, seconds } = this.update();

        timerEl.innerHTML = `
            <div class="timer-item">
                <div class="timer-value">${String(days).padStart(2, '0')}</div>
                <div class="timer-label">Días</div>
            </div>
            <div class="timer-item">
                <div class="timer-value">${String(hours).padStart(2, '0')}</div>
                <div class="timer-label">Horas</div>
            </div>
            <div class="timer-item">
                <div class="timer-value">${String(minutes).padStart(2, '0')}</div>
                <div class="timer-label">Minutos</div>
            </div>
            <div class="timer-item">
                <div class="timer-value">${String(seconds).padStart(2, '0')}</div>
                <div class="timer-label">Segundos</div>
            </div>
        `;
    }
}

// ============================================================
// Confeti
// ============================================================
function createConfetti() {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#ff6b6b', '#ffd700'];
    
    for (let i = 0; i < 80; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 0.3 + 's';
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 3000);
    }
}

// ============================================================
// Controlador de música
// ============================================================
class MusicController {
    constructor() {
        this.audio = document.getElementById('bgMusic');
        this.isPlaying = false;
    }

    toggle() {
        const btn = document.getElementById('musicBtn');
        if (this.audio.paused) {
            this.audio.play();
            this.isPlaying = true;
            btn.style.opacity = '0.8';
        } else {
            this.audio.pause();
            this.isPlaying = false;
            btn.style.opacity = '1';
        }
    }
}

// ============================================================
// Inicialización
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('%c💌 CARTA ESPECIAL PARA MI AMOR 💌', 'font-size: 20px; color: #667eea; font-weight: bold;');

    // Actualizar fecha
    updateDate();

    // Contador
    const timer = new Timer();
    timer.render();
    setInterval(() => timer.render(), 1000);

    // Música
    const music = new MusicController();
    const musicBtn = document.getElementById('musicBtn');
    if (musicBtn) {
        musicBtn.addEventListener('click', () => music.toggle());
    }

    // Sorpresa
    const surpriseBtn = document.getElementById('surpriseBtn');
    if (surpriseBtn) {
        surpriseBtn.addEventListener('click', function() {
            createConfetti();
            gsap.to(this, { rotation: 360, duration: 0.6 });
        });
    }
});
