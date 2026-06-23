import re

# Leer el archivo
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# CSS mejoras visuales MÓVIL
mobile_visual = '''
        /* ==========================================
           MEJORAS VISUALES MÓVIL - DISEÑO
           ========================================== */

        @media (max-width: 768px) {
            /* Hero más limpio en móvil */
            .hero {
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                padding: clamp(20px, 5vh, 40px) clamp(15px, 3vw, 30px);
            }

            .hero-content {
                width: 100%;
            }

            /* Título más grande y legible */
            .hero-title {
                font-size: clamp(36px, 15vw, 80px);
                line-height: 1.2;
                margin-bottom: 15px;
                letter-spacing: 2px;
            }

            .hero-subtitle {
                font-size: clamp(14px, 3vw, 16px);
                margin-bottom: 12px;
                letter-spacing: 1px;
            }

            /* Descripción optimizada */
            .hero-description {
                background: rgba(60, 50, 35, 0.7);
                padding: clamp(15px, 3vw, 20px);
                border-radius: 16px;
                margin: 15px 0;
            }

            .hero-description p {
                font-size: clamp(14px, 2.5vw, 16px);
                line-height: 1.7;
                letter-spacing: 0.3px;
            }

            /* Botones más claros */
            .cta-buttons {
                display: flex;
                flex-direction: column;
                gap: 10px;
                margin-top: 20px;
            }

            .btn {
                padding: clamp(12px, 2vw, 16px) clamp(20px, 4vw, 30px);
                font-size: clamp(14px, 2.5vw, 15px);
                font-weight: 600;
                border-radius: 12px;
                width: 90%;
                max-width: 280px;
                margin: 0 auto;
                min-height: 48px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                border: 2px solid transparent;
            }

            .btn-primary {
                background: linear-gradient(135deg, #D4AF37, #E8C547);
                color: #1a1a2e;
            }

            .btn-secondary {
                background: transparent;
                border: 2px solid #D4AF37;
                color: #D4AF37;
            }

            /* Secciones más espaciadas */
            section {
                padding: clamp(25px, 6vw, 40px) clamp(15px, 3vw, 25px);
                margin-bottom: 10px;
            }

            /* Cards mejor presentadas */
            .card {
                padding: clamp(18px, 4vw, 25px);
                border-radius: 16px;
                background: rgba(60, 50, 35, 0.75);
                border: 1px solid rgba(212, 175, 55, 0.2);
                margin-bottom: 12px;
            }

            .card-icon {
                font-size: clamp(36px, 8vw, 48px);
                margin-bottom: 12px;
                display: block;
            }

            .card-title {
                font-size: clamp(16px, 3.5vw, 18px);
                margin-bottom: 10px;
                font-weight: 600;
            }

            .card-text {
                font-size: clamp(13px, 2.3vw, 15px);
                line-height: 1.7;
                color: rgba(255, 255, 255, 0.9);
            }

            /* Títulos de sección optimizados */
            .section-title {
                font-size: clamp(24px, 6vw, 32px);
                margin-bottom: 20px;
                text-align: center;
                letter-spacing: 0.5px;
            }

            /* Timer más visible */
            .timer-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 10px;
                margin-top: 20px;
            }

            .timer-item {
                background: rgba(212, 175, 55, 0.1);
                border: 1px solid rgba(212, 175, 55, 0.3);
                border-radius: 12px;
                padding: clamp(12px, 2.5vw, 18px);
                text-align: center;
                min-height: auto;
            }

            .timer-number {
                font-size: clamp(20px, 5vw, 28px);
                font-weight: 700;
                color: #D4AF37;
                margin-bottom: 4px;
            }

            .timer-label {
                font-size: clamp(12px, 2vw, 14px);
                color: rgba(255, 255, 255, 0.8);
                text-transform: uppercase;
                letter-spacing: 1px;
            }

            /* Mensaje principal mejorado */
            .message-section {
                background: rgba(0, 0, 0, 0.2);
                padding: clamp(20px, 5vw, 35px);
            }

            .message-title {
                font-size: clamp(28px, 7vw, 36px);
                text-align: center;
                margin-bottom: 20px;
                font-weight: 700;
                letter-spacing: 1px;
            }

            .message-box {
                background: rgba(60, 50, 35, 0.8);
                padding: clamp(18px, 4vw, 25px);
                border-radius: 16px;
                border: 1px solid rgba(212, 175, 55, 0.2);
                max-width: 100%;
            }

            .message-text {
                font-size: clamp(14px, 2.5vw, 16px);
                line-height: 1.8;
                margin-bottom: 12px;
                color: rgba(255, 255, 255, 0.95);
                text-align: justify;
            }

            .message-text:last-child {
                margin-bottom: 0;
            }

            /* Navbar mejorada */
            .navbar {
                padding: clamp(10px, 2vw, 15px) clamp(12px, 2.5vw, 20px);
                background: rgba(60, 50, 35, 0.95);
            }

            .navbar ul {
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                gap: clamp(8px, 1.5vw, 12px);
            }

            .navbar li a {
                font-size: clamp(12px, 2.2vw, 14px);
                padding: clamp(8px, 1.5vw, 10px) clamp(10px, 2vw, 15px);
                display: inline-block;
                border-radius: 8px;
                transition: all 0.2s ease;
            }

            .navbar li a:hover {
                background: rgba(212, 175, 55, 0.2);
            }

            /* Footer */
            footer {
                padding: clamp(15px, 3vw, 25px);
                font-size: clamp(12px, 2vw, 14px);
                text-align: center;
                background: rgba(60, 50, 35, 0.9);
            }

            /* Scroll indicator invisible en móvil */
            .scroll-indicator {
                display: none;
            }
        }

        /* Ultra-móvil (menos de 380px) */
        @media (max-width: 380px) {
            .hero-title {
                font-size: 32px;
            }

            .btn {
                width: 100%;
                max-width: none;
            }

            .cta-buttons {
                width: 100%;
            }

            .timer-grid {
                gap: 8px;
            }

            .timer-item {
                padding: 10px 8px;
            }

            .card {
                margin-bottom: 10px;
            }
        }

        /* Tabletas (600px - 768px) */
        @media (min-width: 600px) and (max-width: 768px) {
            .cards-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 15px;
            }

            .card {
                padding: 20px;
            }

            .cta-buttons {
                flex-direction: row;
                justify-content: center;
                gap: 12px;
            }

            .btn {
                width: auto;
                min-width: 140px;
            }
        }

        /* Mejoras de legibilidad general */
        @media (max-width: 768px) {
            body {
                word-wrap: break-word;
                overflow-wrap: break-word;
                hyphens: auto;
            }

            p, li, span, a {
                word-break: break-word;
            }
        }

        /* Touch targets accesibles */
        @media (max-width: 768px) {
            button,
            a,
            .btn {
                min-height: 44px;
                min-width: 44px;
                padding: 12px 16px;
            }
        }
'''

# Encontrar dónde insertar (antes del último </style>)
style_end = content.rfind('</style>')
if style_end != -1:
    content = content[:style_end] + mobile_visual + '\n    ' + content[style_end:]

# Guardar
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("✓ Diseño móvil mejorado - se ve mucho mejor en iPhone")
