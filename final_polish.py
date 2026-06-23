import re

# Leer el archivo
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# ÚLTIMO TOQUE - Polish final premium
final_polish = '''
        /* ==========================================
           ÚLTIMO TOQUE - POLISH FINAL PREMIUM
           ========================================== */

        /* TRANSICIONES SUAVES GLOBALES */
        * {
            transition: color 0.3s ease, border-color 0.3s ease, background 0.3s ease;
        }

        /* FOCUS STATES ACCESIBLES */
        button:focus,
        a:focus {
            outline: 2px solid #D4AF37;
            outline-offset: 2px;
            border-radius: 4px;
        }

        /* MEJOR CONTRASTE DE TEXTO */
        @media (max-width: 768px) {
            .hero-description p {
                color: #FFFFFF;
                font-weight: 400;
            }

            .card-text {
                color: rgba(255, 255, 255, 0.95);
            }

            .message-text {
                color: rgba(255, 255, 255, 0.98);
                font-weight: 400;
            }

            .timer-label {
                color: #E6DFC5;
                font-weight: 700;
            }
        }

        /* PROFUNDIDAD CON SOMBRAS ESTRATÉGICAS */
        @media (max-width: 768px) {
            .navbar {
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
            }

            .hero {
                position: relative;
            }

            .hero-title {
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3),
                           0 2px 10px rgba(212, 175, 55, 0.2);
            }

            .card {
                box-shadow: 0 6px 16px rgba(0, 0, 0, 0.18);
                position: relative;
            }

            .card:hover {
                box-shadow: 0 10px 28px rgba(0, 0, 0, 0.25),
                           0 0 1px rgba(212, 175, 55, 0.5);
            }

            .timer-item {
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }

            .message-box {
                box-shadow: 0 8px 28px rgba(0, 0, 0, 0.2),
                           0 1px 0 rgba(212, 175, 55, 0.15) inset;
            }
        }

        /* ANIMACIONES DE ENTRADA ELEGANTES */
        @media (max-width: 768px) {
            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .hero-content {
                animation: slideUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            }

            .card {
                animation: slideUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            }

            .timer-item {
                animation: slideUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            }

            .message-box {
                animation: slideUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            }

            .card:nth-child(1) { animation-delay: 0.1s; }
            .card:nth-child(2) { animation-delay: 0.2s; }
            .card:nth-child(3) { animation-delay: 0.3s; }

            .timer-item:nth-child(1) { animation-delay: 0.1s; }
            .timer-item:nth-child(2) { animation-delay: 0.15s; }
            .timer-item:nth-child(3) { animation-delay: 0.2s; }
            .timer-item:nth-child(4) { animation-delay: 0.25s; }
        }

        /* MICRO-INTERACCIONES EN BOTONES */
        @media (max-width: 768px) {
            .btn {
                position: relative;
                overflow: visible;
            }

            .btn-primary {
                box-shadow: 0 4px 12px rgba(212, 175, 55, 0.2);
            }

            .btn-primary:active {
                box-shadow: 0 2px 6px rgba(212, 175, 55, 0.15);
            }

            .btn-secondary {
                box-shadow: inset 0 0 0 2px #D4AF37;
            }

            .btn-secondary:active {
                background: rgba(212, 175, 55, 0.08);
            }

            /* Efecto ripple en botones */
            .btn::after {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.2);
                transform: translate(-50%, -50%);
                pointer-events: none;
            }
        }

        /* BRILLO SUTIL EN ELEMENTOS KEY */
        @media (max-width: 768px) {
            @keyframes gentleGlow {
                0%, 100% { 
                    text-shadow: 0 0 10px rgba(212, 175, 55, 0);
                }
                50% { 
                    text-shadow: 0 0 20px rgba(212, 175, 55, 0.4);
                }
            }

            .timer-number {
                animation: gentleGlow 3s ease-in-out infinite;
            }

            .message-title {
                animation: gentleGlow 4s ease-in-out infinite;
            }
        }

        /* BORDES SUTILES CON VIDA */
        @media (max-width: 768px) {
            .card {
                border: 1px solid rgba(212, 175, 55, 0.15);
                transition: border-color 0.4s ease;
            }

            .card:hover {
                border-color: rgba(212, 175, 55, 0.35);
            }

            .timer-item {
                border: 1px solid rgba(212, 175, 55, 0.12);
                transition: border-color 0.4s ease;
            }

            .timer-item:hover {
                border-color: rgba(212, 175, 55, 0.25);
            }
        }

        /* SCROLL SUAVE SIN JITTER */
        @media (max-width: 768px) {
            html {
                scroll-behavior: smooth;
            }

            /* Prevenir jitter en scroll */
            body {
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                text-rendering: optimizeLegibility;
            }
        }

        /* CONSISTENCIA EN ESPACIADO VISUAL */
        @media (max-width: 768px) {
            section {
                margin: 0;
                padding-top: 32px;
                padding-bottom: 32px;
            }

            section:first-of-type {
                padding-top: 0;
            }

            section:last-of-type {
                padding-bottom: 24px;
            }
        }

        /* MEJORA DE LEGIBILIDAD EN TEXTOS LARGOS */
        @media (max-width: 768px) {
            .message-text,
            .card-text,
            .hero-description p {
                text-align: center;
                letter-spacing: 0.4px;
                word-spacing: 2px;
            }
        }

        /* HOVER STATE ELEGANTE PARA ELEMENTOS */
        @media (min-width: 768px) {
            .card,
            .timer-item {
                position: relative;
                overflow: hidden;
            }

            .card::before,
            .timer-item::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.1), transparent);
                transition: left 0.6s ease;
            }

            .card:hover::before,
            .timer-item:hover::before {
                left: 100%;
            }
        }

        /* FINAL TOUCH - Subtle reflection effect */
        @media (max-width: 768px) {
            @keyframes subtleReflection {
                0% {
                    box-shadow: 0 0 0 0 rgba(212, 175, 55, 0);
                }
                50% {
                    box-shadow: 0 0 8px 2px rgba(212, 175, 55, 0.1);
                }
                100% {
                    box-shadow: 0 0 0 0 rgba(212, 175, 55, 0);
                }
            }

            .hero-title {
                animation: slideUp 0.8s ease-out, subtleReflection 4s ease-in-out 1s infinite;
            }
        }

        /* ACCESIBILIDAD - Textos más legibles */
        @media (prefers-contrast: more) {
            .card-text,
            .message-text,
            .hero-description p {
                color: #FFFFFF;
            }

            body {
                color: #FFFFFF;
            }
        }

        /* PERFORMANCE - Usar will-change estratégicamente */
        .btn:active {
            will-change: transform;
        }

        .card:hover {
            will-change: transform, box-shadow;
        }

        /* Resetear will-change cuando no se use */
        .btn,
        .card {
            will-change: auto;
        }

        /* ÚLTIMO DETALLE - Scroll indicators suave */
        @media (max-width: 768px) {
            /* Entrada suave de elementos al scroll */
            .card,
            .timer-item,
            .message-box {
                opacity: 0.95;
                transition: opacity 0.3s ease;
            }

            .card:hover,
            .timer-item:hover,
            .message-box:hover {
                opacity: 1;
            }
        }

        /* Paleta de colores perfecta para móvil */
        @media (max-width: 768px) {
            --primary-beige: #DAD4BC;
            --dark-taupe: #8B7B5F;
            --light-cream: #E6DFC5;
            --gold-accent: #D4AF37;
        }
'''

# Encontrar dónde insertar (antes del último </style>)
style_end = content.rfind('</style>')
if style_end != -1:
    content = content[:style_end] + final_polish + '\n    ' + content[style_end:]

# Guardar
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("✓ Último toque aplicado - página PERFECTA y PULIDA")
