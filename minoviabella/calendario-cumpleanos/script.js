// Obtener todos los elementos de las casillas
const dayBoxes = document.querySelectorAll('.day-box');

// Añadir evento click a cada casilla
dayBoxes.forEach(box => {
    box.addEventListener('click', function() {
        // Toggle de la clase opened
        this.classList.toggle('opened');
        
        // Efecto de sonido (opcional)
        playClickSound();
        
        // Efecto de confeti (casilla final)
        if (this.dataset.day === '19') {
            createConfetti();
        }
    });
});

// Función para crear confeti
function createConfetti() {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#ff6600', '#00ff00', '#ffff00'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = '50%';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.zIndex = '9999';
        
        document.body.appendChild(confetti);
        
        // Animación del confeti
        const duration = 2000 + Math.random() * 1000;
        const xMove = (Math.random() - 0.5) * 200;
        
        const start = Date.now();
        const animate = () => {
            const elapsed = Date.now() - start;
            const progress = elapsed / duration;
            
            if (progress >= 1) {
                confetti.remove();
                return;
            }
            
            confetti.style.top = (progress * window.innerHeight) + 'px';
            confetti.style.left = (parseFloat(confetti.style.left) + xMove * 0.01) + 'px';
            confetti.style.opacity = 1 - progress;
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }
}

// Función para sonido de click
function playClickSound() {
    // Crear un sonido simple usando Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gain.gain.setValueAtTime(0.3, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// Añadir animación de entrada a las casillas
window.addEventListener('load', () => {
    dayBoxes.forEach((box, index) => {
        setTimeout(() => {
            box.style.animation = `slideIn 0.5s ease-out forwards`;
        }, index * 50);
    });
});

// Animar casillas al entrar
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
        }
        to {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
    }
    
    .day-box {
        animation-fill-mode: both;
    }
`;
document.head.appendChild(style);

// Inicializar casillas con datos
console.log('✅ Calendario de Cumpleaños Nickelodeon iniciado');
console.log(`Total de casillas: ${dayBoxes.length}`);
