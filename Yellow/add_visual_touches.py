content = open('linda.html', 'r', encoding='utf-8').read()

# 1. Agregar estilos CSS adicionales antes del cierre de </style>
css_adicional = '''
        /* ==========================================
           TOQUES VISUALES APPLE - PREMIUM
           ========================================== */

        /* 1. LÍNEAS DIVISORAS DORADAS */
        section::before {
            content: '';
            display: block;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3), transparent);
            margin-bottom: 40px;
        }

        .cards-section::before,
        .counter-section::before,
        .message-section::before {
            content: '';
            display: block;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.4), transparent);
            margin-bottom: 60px;
        }

        /* 2. EFECTO DE LUZ MÓVIL */
        body::after {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 300px;
            height: 300px;
            background: radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%);
            pointer-events: none;
            z-index: 500;
            border-radius: 50%;
            display: none;
        }

        /* 3. BACKGROUNDS MEJORADOS */
        .cards-section {
            background: radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.05) 0%, transparent 50%),
                        radial-gradient(circle at 80% 80%, rgba(218, 212, 188, 0.03) 0%, transparent 50%);
        }

        .counter-section {
            background: radial-gradient(circle at 80% 20%, rgba(212, 175, 55, 0.05) 0%, transparent 50%),
                        radial-gradient(circle at 20% 80%, rgba(218, 212, 188, 0.03) 0%, transparent 50%);
        }

        .message-section {
            background: radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.08) 0%, transparent 60%);
        }

        /* 4. BADGES DECORATIVOS */
        .section-title::before,
        .counter-title::before {
            content: '';
            display: inline-block;
            width: 8px;
            height: 8px;
            background: var(--gold-accent);
            border-radius: 50%;
            margin-right: 12px;
            animation: pulse 3s ease-in-out infinite;
            vertical-align: middle;
        }

        .section-title::after,
        .counter-title::after {
            content: '';
            display: inline-block;
            width: 8px;
            height: 8px;
            background: var(--gold-accent);
            border-radius: 50%;
            margin-left: 12px;
            animation: pulse 3s ease-in-out infinite;
            animation-delay: 0.5s;
            vertical-align: middle;
        }

        /* 5. SOMBRAS DRAMÁTICAS MEJORADAS */
        .hero-title {
            filter: drop-shadow(0 15px 40px rgba(0, 0, 0, 0.5))
                    drop-shadow(0 8px 20px rgba(212, 175, 55, 0.4));
        }

        .card {
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15),
                       0 0 60px rgba(212, 175, 55, 0.08),
                       inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .card:hover {
            box-shadow: 0 25px 60px rgba(0, 0, 0, 0.25),
                       0 0 80px rgba(212, 175, 55, 0.2),
                       inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .message-box {
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2),
                       0 0 80px rgba(212, 175, 55, 0.1),
                       inset 0 1px 0 rgba(255, 255, 255, 0.08);
        }

        /* 6. COLORES MÁS VIBRANTES */
        .timer-number {
            filter: drop-shadow(0 0 15px rgba(212, 175, 55, 0.6))
                    drop-shadow(0 0 30px rgba(212, 175, 55, 0.3));
        }

        .card-icon {
            filter: drop-shadow(0 8px 25px rgba(212, 175, 55, 0.3));
        }

        .message-title {
            filter: drop-shadow(0 10px 30px rgba(212, 175, 55, 0.3));
        }

        /* 7. BORDES LUMINOSOS */
        .card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.4), transparent);
            opacity: 0;
            transition: opacity 0.6s ease;
        }

        .card:hover::before {
            opacity: 1;
        }

        .timer-item::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3), transparent);
        }

        /* 8. EFECTOS DE PARTÍCULAS */
        @keyframes float-particle {
            0% {
                transform: translateY(100vh) translateX(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(100px) rotate(360deg);
                opacity: 0;
            }
        }

        .particle {
            position: fixed;
            width: 2px;
            height: 2px;
            background: rgba(212, 175, 55, 0.5);
            border-radius: 50%;
            pointer-events: none;
            animation: float-particle 8s ease-in linear infinite;
            z-index: 1;
        }

        /* Divisores de sección luminosos */
        .cards-section::after,
        .counter-section::after,
        .message-section::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, 
                transparent, 
                rgba(212, 175, 55, 0.2) 50%, 
                transparent);
            box-shadow: 0 0 20px rgba(212, 175, 55, 0.1);
        }
'''

# Encontrar donde insertar antes de </style>
style_end = content.rfind('</style>')
content = content[:style_end] + css_adicional + content[style_end:]

# Guardar el archivo
with open('linda.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("✓ Estilos visuales Apple agregados")
