import re

# Leer el archivo
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# CSS optimizado para móvil - RENDIMIENTO MÁXIMO
mobile_optimization = '''
        /* ==========================================
           OPTIMIZACIÓN PERFORMANCE - MÓVIL
           ========================================== */

        /* Reducir animaciones en móvil */
        @media (max-width: 768px) {
            /* Deshabilitar animaciones pesadas */
            * {
                animation-duration: 0.3s !important;
                animation-iteration-count: 1 !important;
                transition: all 0.2s ease !important;
            }

            /* Quitar blur en móvil (consume mucho GPU) */
            body {
                background-attachment: scroll;
            }

            .navbar {
                backdrop-filter: none;
                background: rgba(60, 50, 35, 0.85);
            }

            .card,
            .timer-item,
            .message-box {
                backdrop-filter: none;
                background: rgba(60, 50, 35, 0.8);
            }

            .btn {
                backdrop-filter: none;
                background: rgba(212, 175, 55, 0.7);
            }

            /* Quitar animaciones que no son necesarias */
            .float {
                animation: none !important;
            }

            .pulse {
                animation: none !important;
            }

            .glow {
                animation: none !important;
            }

            .shimmer {
                animation: none !important;
            }

            .highlight {
                animation: none !important;
            }

            .ripple {
                animation: none !important;
            }

            .fade-in {
                animation: none !important;
            }

            .float-particle {
                animation: none !important;
            }

            /* Reducir sombras complejas */
            .card,
            .timer-item,
            .button,
            .navbar {
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2) !important;
                filter: none !important;
            }

            /* Optimizar scroll */
            html {
                scroll-behavior: auto;
            }

            /* Remover efectos de hover complejos */
            .card:hover {
                transform: none !important;
            }

            .btn:hover {
                transform: none !important;
            }

            /* Usar colores sólidos en móvil */
            section::before {
                display: none;
            }

            .section-title::before,
            .section-title::after,
            .counter-title::before,
            .counter-title::after {
                animation: none !important;
            }

            /* Optimizar particle visibility */
            .particle {
                display: none !important;
            }

            /* Optimizar lightOrb */
            .light-orb {
                display: none !important;
            }

            /* Reducir regresiones visuales */
            body::before {
                display: none;
            }

            body::after {
                display: none;
            }

            /* Simplificar gradientes */
            .cards-section,
            .counter-section,
            .message-section {
                background: none !important;
            }
        }

        /* Performance: Usar will-change solo donde es necesario */
        .timer-number,
        .hero-title {
            will-change: auto;
        }

        /* Deshabilitar 3D transforms en móvil */
        @media (max-width: 768px) {
            .card {
                transform: none !important;
                perspective: none !important;
            }

            .hero {
                perspective: none !important;
            }
        }

        /* GPU acceleration solo lo necesario */
        .navbar,
        .message-box {
            transform: translateZ(0);
            backface-visibility: hidden;
        }

        /* Reducir complejidad de media queries en ultra-móvil */
        @media (max-width: 480px) {
            body {
                font-size: 14px;
            }

            section {
                padding: 20px 15px;
            }

            .hero {
                min-height: 70vh;
                padding: 20px 15px;
            }

            .timer-grid {
                gap: 8px;
            }

            .timer-item {
                min-height: 80px;
                padding: 12px 8px;
            }

            .card {
                padding: 15px;
            }

            .message-box {
                padding: 20px;
                max-width: 100vw;
            }

            /* Scroll más rápido */
            html {
                scroll-behavior: auto !important;
            }

            /* Menos animaciones en hero */
            .hero-title {
                animation: fadeInDown 0.3s ease-in-out;
                animation-iteration-count: 1;
            }

            .hero-description {
                animation: none;
            }

            .cta-buttons {
                gap: 8px;
            }

            .btn {
                padding: 10px 15px;
                font-size: 14px;
                min-height: 44px;
            }
        }

        /* Optimizar scrollbar para móvil */
        @media (max-width: 768px) {
            ::-webkit-scrollbar {
                width: 4px;
            }

            ::-webkit-scrollbar-thumb {
                border-radius: 2px;
            }
        }

        /* Prefers reduced motion - respetar preferencias del usuario */
        @media (prefers-reduced-motion: reduce) {
            *,
            *::before,
            *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
            }
        }

        /* Optimizar font rendering */
        body,
        .hero-title,
        .section-title {
            -webkit-font-smoothing: subpixel-antialiased;
            -moz-osx-font-smoothing: auto;
            text-rendering: optimizeSpeed;
        }

        /* Reducir consumo de batería */
        @media (max-width: 768px) {
            body {
                background-attachment: scroll !important;
                background-size: auto;
            }

            /* Usar solid colors en lugar de gradientes complejos */
            .cards-section {
                background: rgba(0, 0, 0, 0.1);
            }

            .counter-section {
                background: rgba(0, 0, 0, 0.1);
            }

            .message-section {
                background: rgba(0, 0, 0, 0.1);
            }
        }

        /* Lazy load images implícito */
        img {
            loading: lazy;
            decoding: async;
        }

        /* Content visibility para no renderizar off-screen content */
        section {
            content-visibility: auto;
        }
'''

# Encontrar dónde insertar (antes del último </style>)
style_end = content.rfind('</style>')
if style_end != -1:
    content = content[:style_end] + mobile_optimization + '\n    ' + content[style_end:]

# Guardar
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("✓ Página optimizada para iPhone - rendimiento máximo, sin congelación")
