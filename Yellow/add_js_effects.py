content = open('linda.html', 'r', encoding='utf-8').read()

# JavaScript adicional para efectos visuales
js_adicional = '''
        // EFECTO DE LUZ MÓVIL
        const lightOrb = document.createElement('div');
        lightOrb.style.cssText = `
            position: fixed;
            width: 400px;
            height: 400px;
            background: radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 5;
            filter: blur(60px);
            display: none;
        `;
        document.body.appendChild(lightOrb);

        document.addEventListener('mousemove', (e) => {
            lightOrb.style.left = (e.clientX - 200) + 'px';
            lightOrb.style.top = (e.clientY - 200) + 'px';
            lightOrb.style.display = 'block';
        });

        // CREAR PARTÍCULAS FLOTANTES
        function createParticles() {
            const particleCount = 20;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * window.innerWidth + 'px';
                particle.style.bottom = '-10px';
                particle.style.width = Math.random() * 3 + 1 + 'px';
                particle.style.height = particle.style.width;
                particle.style.animationDelay = Math.random() * 8 + 's';
                particle.style.animationDuration = (Math.random() * 8 + 10) + 's';
                document.body.appendChild(particle);
                
                // Crear nuevas partículas cuando terminen
                setTimeout(() => {
                    particle.remove();
                    createParticles();
                }, (Math.random() * 8 + 10) * 1000);
            }
        }

        createParticles();

        // OCULTAR LUZ MÓVIL AL DEJAR VENTANA
        document.addEventListener('mouseleave', () => {
            lightOrb.style.display = 'none';
        });

        // EFECTO DE BRILLO AL SCROLL EN ELEMENTOS
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.background = 'rgba(230, 223, 197, 0.12)';
                card.style.boxShadow = '0 25px 60px rgba(0, 0, 0, 0.25), 0 0 100px rgba(212, 175, 55, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.background = '';
                card.style.boxShadow = '';
            });
        });
'''

# Encontrar el script tag final y antes de su cierre
script_end = content.rfind('</script>')
content = content[:script_end] + '\n' + js_adicional + '\n' + content[script_end:]

# Guardar
with open('linda.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("✓ Efectos JavaScript agregados - Página premium lista")
