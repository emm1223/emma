import re

# Leer el archivo
with open('linda.html', 'r', encoding='utf-8') as f:
    content = f.read()

# CSS ultra-responsivo para TODOS los tamaños de pantalla
responsive_css = '''
        /* ==========================================
           RESPONSIVE ULTRA-COMPLETO (MOBILE-FIRST)
           ========================================== */

        /* Base: Móvil muy pequeño (320px) */
        @media (min-width: 320px) {
            body {
                font-size: clamp(13px, 3vw, 16px);
            }

            .hero-title {
                font-size: clamp(32px, 12vw, 88px);
                margin-bottom: clamp(12px, 3vw, 20px);
            }

            .hero-subtitle {
                font-size: clamp(0.8rem, 2.5vw, 1rem);
                margin-bottom: clamp(10px, 2vw, 15px);
            }

            .hero-description p {
                font-size: clamp(0.85rem, 2.2vw, 1rem);
                line-height: 1.6;
            }

            .section-title {
                font-size: clamp(1.8rem, 6vw, 2.5rem);
                margin-bottom: clamp(20px, 4vw, 40px);
            }

            .counter-title {
                font-size: clamp(1.8rem, 6vw, 2.5rem);
            }

            .message-title {
                font-size: clamp(2rem, 7vw, 3rem);
            }

            .card-title {
                font-size: clamp(1.1rem, 3vw, 1.4rem);
            }

            .card-text {
                font-size: clamp(0.85rem, 2vw, 0.95rem);
                line-height: 1.7;
            }

            .timer-label {
                font-size: clamp(0.7rem, 1.8vw, 0.9rem);
            }

            .timer-number {
                font-size: clamp(1.5rem, 4vw, 2rem);
            }

            .message-text {
                font-size: clamp(0.85rem, 2.2vw, 1rem);
                line-height: 1.8;
            }

            .navbar {
                padding: clamp(10px, 2vw, 15px) clamp(15px, 3vw, 30px);
            }

            .navbar a {
                font-size: clamp(0.75rem, 2vw, 0.9rem);
                padding: clamp(6px, 1.5vw, 10px) clamp(8px, 2vw, 15px);
            }

            section {
                padding: clamp(30px, 8vw, 60px) clamp(15px, 3vw, 40px);
            }

            .hero {
                padding: clamp(40px, 10vw, 80px) clamp(15px, 3vw, 40px);
                min-height: clamp(60vh, 100vh, 100vh);
            }

            .card {
                padding: clamp(20px, 4vw, 35px);
            }

            .card-icon {
                font-size: clamp(2.5rem, 6vw, 4rem);
                margin-bottom: clamp(12px, 3vw, 20px);
            }

            .timer-item {
                padding: clamp(15px, 3vw, 25px);
                min-height: clamp(90px, 20vh, 140px);
            }

            .message-box {
                padding: clamp(25px, 5vw, 45px);
                max-width: 90vw;
            }

            .btn {
                padding: clamp(10px, 2.5vw, 15px) clamp(20px, 4vw, 35px);
                font-size: clamp(0.85rem, 2vw, 0.95rem);
            }

            .cta-buttons {
                gap: clamp(12px, 2vw, 20px);
            }
        }

        /* Tablets pequeñas (480px) */
        @media (min-width: 480px) {
            .cards-grid {
                grid-template-columns: 1fr;
            }

            .timer-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: clamp(15px, 3vw, 25px);
            }

            .navbar li {
                margin: 0 clamp(8px, 1.5vw, 15px);
            }
        }

        /* Tablets (600px) */
        @media (min-width: 600px) {
            .cards-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: clamp(20px, 3vw, 30px);
            }

            .cta-buttons {
                flex-direction: row;
                justify-content: center;
            }

            .btn {
                width: auto;
                min-width: 150px;
            }

            section {
                padding: clamp(40px, 8vw, 70px) clamp(25px, 4vw, 50px);
            }
        }

        /* Tablets medianas (768px) */
        @media (min-width: 768px) {
            .cards-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: clamp(20px, 3.5vw, 35px);
            }

            .timer-grid {
                grid-template-columns: repeat(4, 1fr);
                gap: clamp(15px, 2.5vw, 25px);
            }

            .navbar {
                padding: clamp(12px, 2vw, 18px) clamp(30px, 4vw, 50px);
            }

            section {
                padding: clamp(50px, 10vw, 80px) clamp(35px, 5vw, 60px);
            }

            .message-box {
                max-width: 85%;
            }
        }

        /* Tablets grandes (1024px) */
        @media (min-width: 1024px) {
            .cards-grid {
                grid-template-columns: repeat(3, 1fr);
                gap: clamp(25px, 4vw, 40px);
            }

            .timer-grid {
                grid-template-columns: repeat(4, 1fr);
                gap: clamp(20px, 3vw, 35px);
            }

            .navbar {
                padding: clamp(15px, 2vw, 20px) clamp(40px, 5vw, 70px);
            }

            section {
                padding: clamp(60px, 12vw, 100px) clamp(50px, 6vw, 80px);
            }

            .message-box {
                max-width: 75%;
            }

            .hero {
                min-height: 90vh;
            }
        }

        /* Pantallas grandes (1440px) */
        @media (min-width: 1440px) {
            .cards-grid {
                gap: 35px;
            }

            .timer-grid {
                gap: 30px;
            }

            section {
                padding: 100px 80px;
            }

            .message-box {
                max-width: 70%;
                margin: 0 auto;
            }

            .navbar li {
                margin: 0 20px;
            }
        }

        /* Ultra-wide (1920px+) */
        @media (min-width: 1920px) {
            body {
                max-width: 1920px;
                margin: 0 auto;
            }

            .cards-grid {
                gap: 40px;
            }

            .timer-grid {
                gap: 35px;
            }

            section {
                padding: 120px 100px;
            }

            .message-box {
                max-width: 60%;
                margin: 0 auto;
            }
        }

        /* Optimización para pantallas muy pequeñas (menos de 320px - algunos smartwatch) */
        @media (max-width: 319px) {
            .navbar li:nth-child(2),
            .navbar li:nth-child(3) {
                display: none;
            }

            .cta-buttons {
                flex-direction: column;
            }

            .btn {
                width: 90%;
            }
        }

        /* Landscape (Alto < Ancho) */
        @media (orientation: landscape) and (max-height: 600px) {
            .hero {
                min-height: 100vh;
                padding: 20px 30px;
            }

            .hero-title {
                font-size: clamp(28px, 8vw, 60px);
            }

            section {
                padding: 30px 20px;
            }

            .scroll-indicator {
                display: none;
            }
        }

        /* Landscape normal */
        @media (orientation: landscape) and (min-height: 600px) {
            .hero {
                min-height: 95vh;
            }
        }

        /* Ajustes de seguridad para no-overflow */
        @media (max-width: 480px) {
            body {
                overflow-x: hidden;
            }

            .cards-grid,
            .timer-grid,
            .navbar ul {
                overflow-x: hidden;
            }

            .message-box {
                max-width: 95vw;
                margin: 0 auto;
                word-wrap: break-word;
                overflow-wrap: break-word;
            }

            .card,
            .timer-item {
                min-width: 100%;
                max-width: 100%;
            }
        }

        /* Touch-friendly targets para móvil */
        @media (max-width: 768px) {
            button,
            a {
                min-height: 44px;
                min-width: 44px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .navbar a {
                padding: 12px 15px;
                min-height: 48px;
            }
        }

        /* Texto legible en todos lados */
        @media (min-width: 320px) {
            body {
                line-height: 1.6;
            }

            p, li, span {
                text-rendering: optimizeLegibility;
                -webkit-font-smoothing: antialiased;
            }
        }

        /* Imágenes de fondo responsivas */
        @media (max-width: 480px) {
            body {
                background-size: auto;
            }
        }

        @media (min-width: 1200px) {
            body {
                background-size: cover;
            }
        }
'''

# Encontrar dónde insertar el CSS (antes del último </style>)
style_end = content.rfind('</style>')
if style_end != -1:
    # Insertar el CSS responsivo
    content = content[:style_end] + responsive_css + '\n    ' + content[style_end:]

# Guardar
with open('linda.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("✓ CSS ultra-responsivo agregado - 100% adaptativo en todos los tamaños")
