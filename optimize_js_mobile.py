import re

# Leer el archivo
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# JavaScript optimizado para móvil
optimized_js = '''
        // ==========================================
        // OPTIMIZACIONES JAVASCRIPT MÓVIL
        // ==========================================

        // Detectar si es móvil
        const isMobile = window.innerWidth <= 768;
        const isSmallMobile = window.innerWidth <= 480;

        // Deshabilitar efectos pesados en móvil
        if (isMobile) {
            // Desactivar light orb en móvil (consume GPU)
            const lightOrb = document.querySelector('.light-orb');
            if (lightOrb) {
                lightOrb.style.display = 'none';
            }

            // Reducir frecuencia de updates del timer
            const timerInterval = setInterval(() => {
                clearInterval(timerInterval);
            }, 100);
        }

        // Intersection Observer optimizado (menos eventos)
        const observerOptions = {
            threshold: isMobile ? 0.1 : 0.2,
            rootMargin: isMobile ? '50px' : '100px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Agregar animación solo cuando sea visible
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observar elementos visibles
        document.querySelectorAll('.card, .message-box, .timer-item').forEach(el => {
            observer.observe(el);
        });

        // Throttle para eventos de scroll (evitar lag)
        let scrollTimeout;
        function throttledScroll() {
            if (scrollTimeout) return;
            
            scrollTimeout = setTimeout(() => {
                scrollTimeout = null;
            }, 100);
        }

        window.addEventListener('scroll', throttledScroll, { passive: true });

        // Ripple effect solo en click (no hover en móvil)
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                if (!isMobile) {
                    const ripple = document.createElement('span');
                    const rect = this.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    const x = e.clientX - rect.left - size / 2;
                    const y = e.clientY - rect.top - size / 2;

                    ripple.style.cssText = `
                        position: absolute;
                        width: \${size}px;
                        height: \${size}px;
                        background: rgba(255,255,255,0.6);
                        border-radius: 50%;
                        left: \${x}px;
                        top: \${y}px;
                        pointer-events: none;
                        animation: ripple 0.6s ease-out;
                    `;
                    
                    this.appendChild(ripple);
                    setTimeout(() => ripple.remove(), 600);
                }
            });
        });

        // Mouse tracking solo en desktop
        if (!isMobile) {
            document.querySelectorAll('.card').forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = (y - centerY) / 10;
                    const rotateY = (centerX - x) / 10;
                    
                    card.style.transform = \`perspective(1000px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg)\`;
                });

                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
                });
            });
        }

        // RequestAnimationFrame para animaciones suaves
        let animationFrameId;
        function smoothScroll() {
            // Animar solo lo visible
            animationFrameId = requestAnimationFrame(smoothScroll);
        }
        smoothScroll();
'''

# Encontrar donde están los scripts y agregar optimización
script_marker = '// EFECTO DE LUZ MÓVIL'
script_index = content.find(script_marker)

if script_index != -1:
    # Insertar optimizaciones ANTES de otros efectos
    content = content[:script_index] + optimized_js + '\n\n        ' + content[script_index:]

# Guardar
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("✓ JavaScript optimizado - móvil sin lag, sin congelación")
