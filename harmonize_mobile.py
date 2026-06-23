import re

# Leer el archivo
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# CSS completo para armonía visual en móvil
harmony_css = '''
        /* ==========================================
           ARMONÍA VISUAL MÓVIL - COHERENCIA TOTAL
           ========================================== */

        @media (max-width: 768px) {
            /* Reset básico para coherencia */
            * {
                margin: 0;
                padding: 0;
            }

            html {
                font-size: 14px;
            }

            /* TIPOGRAFÍA ARMÓNICA */
            body {
                font-family: 'Poppins', sans-serif;
                line-height: 1.6;
                letter-spacing: 0.3px;
            }

            /* NAVBAR - Limpio y centrado */
            .navbar {
                background: rgba(60, 50, 35, 0.95);
                padding: 12px 0;
                position: sticky;
                top: 0;
                z-index: 1000;
                border-bottom: 1px solid rgba(212, 175, 55, 0.1);
            }

            .navbar ul {
                display: flex;
                justify-content: center;
                gap: 20px;
                flex-wrap: wrap;
                padding: 0 15px;
            }

            .navbar a {
                font-size: 12px;
                color: var(--light-cream);
                text-decoration: none;
                text-transform: uppercase;
                letter-spacing: 1px;
                font-weight: 500;
                transition: color 0.3s ease;
            }

            .navbar a:hover {
                color: var(--gold-accent);
            }

            /* HERO SECTION - Perfecto para móvil */
            .hero {
                min-height: 60vh;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 40px 20px;
                text-align: center;
            }

            .hero-content {
                width: 100%;
                max-width: 100%;
            }

            .hero-subtitle {
                font-size: 12px;
                letter-spacing: 2px;
                color: rgba(212, 175, 55, 0.9);
                margin-bottom: 12px;
                font-weight: 400;
            }

            .hero-title {
                font-family: 'Sacramento', cursive;
                font-size: 48px;
                font-weight: 700;
                color: #E6DFC5;
                margin-bottom: 16px;
                line-height: 1.2;
                text-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
                background: rgba(60, 50, 35, 0.4);
                padding: 20px 25px;
                border-radius: 16px;
                word-break: break-word;
            }

            .hero-description {
                background: rgba(60, 50, 35, 0.65);
                padding: 18px 20px;
                border-radius: 12px;
                margin: 16px 0;
                border: 1px solid rgba(212, 175, 55, 0.15);
            }

            .hero-description p {
                font-size: 14px;
                line-height: 1.7;
                color: rgba(255, 255, 255, 0.9);
                font-weight: 300;
            }

            /* BOTONES - Armónicos y accesibles */
            .cta-buttons {
                display: flex;
                flex-direction: column;
                gap: 10px;
                margin-top: 18px;
                align-items: center;
            }

            .btn {
                width: 85%;
                max-width: 280px;
                padding: 13px 24px;
                font-size: 13px;
                font-weight: 600;
                border-radius: 10px;
                border: none;
                cursor: pointer;
                text-transform: uppercase;
                letter-spacing: 1px;
                min-height: 44px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
            }

            .btn-primary {
                background: linear-gradient(135deg, #D4AF37, #E8C547);
                color: #1a1a2e;
            }

            .btn-primary:active {
                transform: scale(0.97);
            }

            .btn-secondary {
                background: transparent;
                border: 2px solid #D4AF37;
                color: #D4AF37;
            }

            .btn-secondary:active {
                background: rgba(212, 175, 55, 0.1);
            }

            /* DIVISOR VISUAL */
            .scroll-indicator {
                display: none;
            }

            /* SECCIONES - Espaciado armonico */
            section {
                padding: 32px 16px;
                margin: 0;
            }

            /* TÍTULOS DE SECCIÓN - Coherentes */
            .section-title,
            .counter-title,
            .message-title {
                font-family: 'Sacramento', cursive;
                font-size: 32px;
                color: #E6DFC5;
                text-align: center;
                margin-bottom: 24px;
                font-weight: 700;
                letter-spacing: 0.5px;
            }

            .section-title::before,
            .section-title::after,
            .counter-title::before,
            .counter-title::after {
                display: none !important;
            }

            /* CARDS - Bellas y funcionales */
            .cards-section {
                background: rgba(0, 0, 0, 0.1);
            }

            .cards-grid {
                display: grid;
                grid-template-columns: 1fr;
                gap: 14px;
                max-width: 100%;
            }

            .card {
                background: rgba(60, 50, 35, 0.7);
                border: 1px solid rgba(212, 175, 55, 0.2);
                border-radius: 14px;
                padding: 18px 16px;
                text-align: center;
                transition: all 0.3s ease;
                backdrop-filter: none;
            }

            .card:hover {
                transform: translateY(-4px);
                border-color: rgba(212, 175, 55, 0.4);
                background: rgba(60, 50, 35, 0.85);
            }

            .card-icon {
                font-size: 36px;
                margin-bottom: 10px;
            }

            .card-title {
                font-size: 16px;
                font-weight: 600;
                color: #E6DFC5;
                margin-bottom: 8px;
            }

            .card-text {
                font-size: 13px;
                line-height: 1.6;
                color: rgba(255, 255, 255, 0.85);
            }

            /* TIMER - Bien presentado */
            .counter-section {
                background: rgba(0, 0, 0, 0.08);
            }

            .timer-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 12px;
            }

            .timer-item {
                background: rgba(60, 50, 35, 0.65);
                border: 1px solid rgba(212, 175, 55, 0.2);
                border-radius: 12px;
                padding: 14px 12px;
                text-align: center;
                transition: all 0.3s ease;
                min-height: 100px;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }

            .timer-item:hover {
                border-color: rgba(212, 175, 55, 0.4);
                background: rgba(60, 50, 35, 0.8);
            }

            .timer-number {
                font-size: 24px;
                font-weight: 700;
                color: #D4AF37;
                margin-bottom: 6px;
                font-family: 'Courier New', monospace;
            }

            .timer-label {
                font-size: 11px;
                text-transform: uppercase;
                letter-spacing: 1px;
                color: #E6DFC5;
                font-weight: 600;
            }

            /* MENSAJE - Íntimo y claro */
            .message-section {
                background: rgba(0, 0, 0, 0.12);
            }

            .message-box {
                background: rgba(60, 50, 35, 0.75);
                border: 1px solid rgba(212, 175, 55, 0.2);
                border-radius: 14px;
                padding: 24px 18px;
                max-width: 100%;
                backdrop-filter: none;
            }

            .message-title {
                font-size: 28px;
                margin-bottom: 16px;
            }

            .message-text {
                font-size: 14px;
                line-height: 1.8;
                color: rgba(255, 255, 255, 0.9);
                margin-bottom: 10px;
                text-align: center;
            }

            .message-text:last-child {
                margin-bottom: 0;
            }

            /* FOOTER - Simple */
            footer {
                background: rgba(60, 50, 35, 0.8);
                padding: 20px 16px;
                text-align: center;
                border-top: 1px solid rgba(212, 175, 55, 0.1);
                font-size: 12px;
                color: rgba(255, 255, 255, 0.7);
            }

            /* CONSISTENCIA DE COLORES */
            body {
                --primary-beige: #DAD4BC;
                --dark-taupe: #8B7B5F;
                --light-cream: #E6DFC5;
                --gold-accent: #D4AF37;
            }

            /* ESPACIADO CONSISTENTE */
            section {
                margin-bottom: 0;
                margin-top: 0;
            }

            /* QUITAR EFECTOS COMPLEJOS */
            .card::after,
            .card::before,
            .message-box::before,
            .message-box::after,
            section::before,
            section::after,
            .cards-section::before,
            .counter-section::before,
            .message-section::before,
            .cards-section::after,
            .counter-section::after,
            .message-section::after,
            body::before,
            body::after {
                display: none !important;
            }

            /* ANIMACIONES SUAVES SOLO */
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .hero-content {
                animation: fadeInUp 0.6s ease-out;
            }

            /* OVERFLOW PROTECTION */
            body {
                overflow-x: hidden;
            }

            .message-box,
            .card,
            .timer-item {
                overflow: hidden;
                word-wrap: break-word;
            }

            /* CONSISTENT SHADOWS */
            .card,
            .timer-item,
            .message-box {
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }
        }

        /* ULTRA MÓVIL (menos de 380px) */
        @media (max-width: 380px) {
            html {
                font-size: 13px;
            }

            .hero {
                min-height: 55vh;
                padding: 30px 15px;
            }

            .hero-title {
                font-size: 40px;
                padding: 15px 18px;
            }

            .hero-description {
                padding: 14px 14px;
            }

            .btn {
                width: 90%;
                padding: 11px 18px;
                font-size: 12px;
            }

            .section-title,
            .counter-title,
            .message-title {
                font-size: 26px;
                margin-bottom: 18px;
            }

            .card {
                padding: 14px 12px;
            }

            .message-box {
                padding: 18px 14px;
            }

            section {
                padding: 24px 12px;
            }
        }
'''

# Encontrar dónde insertar (antes del último </style>)
style_end = content.rfind('</style>')
if style_end != -1:
    content = content[:style_end] + harmony_css + '\n    ' + content[style_end:]

# Guardar
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("✓ Diseño móvil COMPLETAMENTE ARMONICO - coherencia visual total")
