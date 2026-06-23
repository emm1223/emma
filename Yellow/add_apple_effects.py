import re

# Leer el archivo
with open('linda.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Mejorar hero-title
content = content.replace(
    '.hero-title {\n            font-family: \'Sacramento\', cursive;\n            font-size: clamp(2.5rem, 12vw, 7rem);\n            font-weight: 700;\n            line-height: 1.1;\n            margin-bottom: clamp(20px, 5vw, 30px);\n            background: linear-gradient(135deg, var(--light-cream), var(--gold-accent), var(--light-cream));\n            -webkit-background-clip: text;\n            -webkit-text-fill-color: transparent;\n            background-clip: text;\n            animation: float 6s ease-in-out infinite;\n            word-break: break-word;\n        }',
    '.hero-title {\n            font-family: \'Sacramento\', cursive;\n            font-size: clamp(2.5rem, 12vw, 7rem);\n            font-weight: 700;\n            line-height: 1.1;\n            margin-bottom: clamp(20px, 5vw, 30px);\n            background: linear-gradient(135deg, var(--light-cream), var(--gold-accent), var(--light-cream));\n            background-size: 200% 200%;\n            -webkit-background-clip: text;\n            -webkit-text-fill-color: transparent;\n            background-clip: text;\n            animation: float 6s ease-in-out infinite, highlight 4s ease-in-out infinite;\n            word-break: break-word;\n            position: relative;\n            filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1));\n        }'
)

# 2. Mejorar card-icon
content = content.replace(
    '.card-icon {\n            font-size: clamp(2.5rem, 8vw, 4rem);\n            margin-bottom: clamp(10px, 3vw, 20px);\n            animation: heartBeat 2s ease-in-out infinite;\n        }',
    '.card-icon {\n            font-size: clamp(2.5rem, 8vw, 4rem);\n            margin-bottom: clamp(10px, 3vw, 20px);\n            animation: pulse 3s ease-in-out infinite;\n            filter: drop-shadow(0 4px 15px rgba(212, 175, 55, 0.15));\n        }'
)

# 3. Agregar efecto ripple al botón
btn_old = '.btn {\n            padding: clamp(10px, 2vw, 15px) clamp(20px, 8vw, 50px);\n            border-radius: 50px;\n            border: none;\n            font-weight: 700;\n            text-transform: uppercase;\n            letter-spacing: 1px;\n            font-size: clamp(0.75rem, 2vw, 0.9rem);\n            cursor: pointer;\n            transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);\n            backdrop-filter: blur(10px);\n            white-space: nowrap;\n            min-height: 44px;\n        }'

btn_new = '.btn {\n            padding: clamp(10px, 2vw, 15px) clamp(20px, 8vw, 50px);\n            border-radius: 50px;\n            border: none;\n            font-weight: 700;\n            text-transform: uppercase;\n            letter-spacing: 1px;\n            font-size: clamp(0.75rem, 2vw, 0.9rem);\n            cursor: pointer;\n            transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);\n            backdrop-filter: blur(10px);\n            white-space: nowrap;\n            min-height: 44px;\n            position: relative;\n            overflow: hidden;\n        }\n\n        .btn::before {\n            content: \'\';\n            position: absolute;\n            top: 50%;\n            left: 50%;\n            width: 0;\n            height: 0;\n            border-radius: 50%;\n            background: rgba(255, 255, 255, 0.3);\n            transform: translate(-50%, -50%);\n            pointer-events: none;\n        }'

content = content.replace(btn_old, btn_new)

# 4. Mejorar btn-primary
content = content.replace(
    '.btn-primary {\n            background: linear-gradient(135deg, var(--primary-beige), var(--dark-taupe));\n            color: var(--white);\n            box-shadow: 0 12px 40px rgba(139, 123, 95, 0.25);\n            transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);\n        }\n\n        .btn-primary:hover {\n            transform: translateY(-3px) scale(1.02);\n            box-shadow: 0 20px 60px rgba(139, 123, 95, 0.4);\n        }\n\n        .btn-primary:active {\n            transform: translateY(-1px) scale(0.98);\n        }',
    '.btn-primary {\n            background: linear-gradient(135deg, var(--primary-beige), var(--dark-taupe));\n            background-size: 200% 200%;\n            color: var(--white);\n            box-shadow: 0 12px 40px rgba(139, 123, 95, 0.25);\n            transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);\n        }\n\n        .btn-primary:hover {\n            transform: translateY(-3px) scale(1.02);\n            box-shadow: 0 20px 60px rgba(139, 123, 95, 0.4);\n            background-position: 100% 0;\n        }\n\n        .btn-primary:active {\n            transform: translateY(-1px) scale(0.98);\n        }'
)

# 5. Mejorar card con glass effect mejorado
card_old = '.card {\n            background: rgba(230, 223, 197, 0.06);\n            backdrop-filter: blur(25px);\n            -webkit-backdrop-filter: blur(25px);\n            border: 1px solid rgba(212, 175, 55, 0.12);\n            border-radius: 32px;\n            padding: clamp(25px, 6vw, 50px) clamp(15px, 5vw, 40px);\n            text-align: center;\n            transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);\n            animation: fadeInUp 0.8s ease-out backwards;\n            cursor: pointer;\n            position: relative;\n            overflow: hidden;\n            min-height: auto;\n            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);\n        }'

card_new = '.card {\n            background: rgba(230, 223, 197, 0.06);\n            backdrop-filter: blur(25px);\n            -webkit-backdrop-filter: blur(25px);\n            border: 1px solid rgba(212, 175, 55, 0.12);\n            border-radius: 32px;\n            padding: clamp(25px, 6vw, 50px) clamp(15px, 5vw, 40px);\n            text-align: center;\n            transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);\n            animation: blurReveal 0.8s ease-out backwards;\n            cursor: pointer;\n            position: relative;\n            overflow: hidden;\n            min-height: auto;\n            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);\n            transform-style: preserve-3d;\n        }\n\n        .card::after {\n            content: \'\';\n            position: absolute;\n            top: -50%;\n            right: -50%;\n            width: 200%;\n            height: 200%;\n            background: linear-gradient(\n                135deg,\n                transparent 0%,\n                rgba(212, 175, 55, 0.1) 50%,\n                transparent 100%\n            );\n            transform: rotate(45deg);\n            opacity: 0;\n            transition: opacity 0.6s ease;\n            pointer-events: none;\n        }'

content = content.replace(card_old, card_new)

# 6. Actualizar card delays
content = content.replace(
    '.card:nth-child(1) { animation-delay: 0s; }\n        .card:nth-child(2) { animation-delay: 0.15s; }\n        .card:nth-child(3) { animation-delay: 0.3s; }',
    '.card:nth-child(1) { animation-delay: 0s; }\n        .card:nth-child(2) { animation-delay: 0.15s; }\n        .card:nth-child(3) { animation-delay: 0.3s; }'
)

# 7. Mejorar card hover
content = content.replace(
    '.card:hover {\n            transform: translateY(-12px) scale(1.02);\n            background: rgba(230, 223, 197, 0.15);\n            border-color: var(--gold-accent);\n            box-shadow: 0 30px 60px rgba(212, 175, 55, 0.2),\n                       inset 0 0 40px rgba(212, 175, 55, 0.1);\n        }\n\n        .card:hover::after {\n            opacity: 1;\n        }\n\n        .card:active {\n            transform: translateY(-8px) scale(1.01);\n        }',
    '.card:hover {\n            transform: translateY(-12px) scale(1.02) perspective(1000px);\n            background: rgba(230, 223, 197, 0.15);\n            border-color: var(--gold-accent);\n            box-shadow: 0 30px 60px rgba(212, 175, 55, 0.2),\n                       inset 0 0 40px rgba(212, 175, 55, 0.1);\n        }\n\n        .card:hover::after {\n            opacity: 1;\n        }\n\n        .card:active {\n            transform: translateY(-8px) scale(1.01);\n        }'
)

# 8. Mejorar timer-item
timer_old = '.timer-item {\n            background: rgba(230, 223, 197, 0.06);\n            backdrop-filter: blur(25px);\n            -webkit-backdrop-filter: blur(25px);\n            border: 1px solid rgba(212, 175, 55, 0.12);\n            border-radius: 28px;\n            padding: clamp(20px, 5vw, 40px) clamp(12px, 3vw, 20px);\n            text-align: center;\n            transition: all 0.45s ease;\n            animation: none;\n            min-height: auto;\n            box-shadow: 0 8px 28px rgba(0, 0, 0, 0.1);\n        }\n\n        .timer-item:hover {'

timer_new = '.timer-item {\n            background: rgba(230, 223, 197, 0.06);\n            backdrop-filter: blur(25px);\n            -webkit-backdrop-filter: blur(25px);\n            border: 1px solid rgba(212, 175, 55, 0.12);\n            border-radius: 28px;\n            padding: clamp(20px, 5vw, 40px) clamp(12px, 3vw, 20px);\n            text-align: center;\n            transition: all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);\n            animation: blurReveal 0.8s ease-out backwards;\n            min-height: auto;\n            box-shadow: 0 8px 28px rgba(0, 0, 0, 0.1);\n            position: relative;\n            overflow: hidden;\n        }\n\n        .timer-item::before {\n            content: \'\';\n            position: absolute;\n            top: 0;\n            left: 0;\n            right: 0;\n            height: 1px;\n            background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3), transparent);\n        }\n\n        .timer-item:nth-child(1) { animation-delay: 0s; }\n        .timer-item:nth-child(2) { animation-delay: 0.1s; }\n        .timer-item:nth-child(3) { animation-delay: 0.2s; }\n        .timer-item:nth-child(4) { animation-delay: 0.3s; }\n\n        .timer-item:hover {'

content = content.replace(timer_old, timer_new)

# 9. Mejorar timer-number
content = content.replace(
    '.timer-number {\n            font-size: clamp(1.8rem, 6vw, 3.5rem);\n            font-weight: 700;\n            color: var(--gold-accent);\n            font-family: \'Courier New\', monospace;\n            text-shadow: 0 0 20px rgba(255, 215, 0, 0.4);\n            word-break: break-all;\n        }',
    '.timer-number {\n            font-size: clamp(1.8rem, 6vw, 3.5rem);\n            font-weight: 700;\n            color: var(--gold-accent);\n            font-family: \'Courier New\', monospace;\n            text-shadow: 0 0 20px rgba(212, 175, 55, 0.3);\n            word-break: break-all;\n            animation: glow 3s ease-in-out infinite;\n        }'
)

# 10. Mejorar message-box
msgbox_old = '.message-box {\n            background: rgba(230, 223, 197, 0.06);\n            backdrop-filter: blur(30px);\n            -webkit-backdrop-filter: blur(30px);\n            border: 1px solid rgba(212, 175, 55, 0.12);\n            border-radius: 40px;\n            padding: clamp(35px, 10vw, 80px) clamp(25px, 8vw, 60px);\n            max-width: 800px;\n            width: 100%;\n            text-align: center;\n            animation: fadeInUp 1s ease-out;\n            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);\n            position: relative;\n            overflow: hidden;\n        }\n\n        .message-box::before {\n            content: \'\';\n            position: absolute;\n            top: -50%;\n            right: -50%;\n            width: 200%;\n            height: 200%;\n            background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.05), transparent);\n            transform: rotate(45deg);\n            animation: shimmer 3s infinite;\n        }'

msgbox_new = '.message-box {\n            background: rgba(230, 223, 197, 0.06);\n            backdrop-filter: blur(30px);\n            -webkit-backdrop-filter: blur(30px);\n            border: 1px solid rgba(212, 175, 55, 0.12);\n            border-radius: 40px;\n            padding: clamp(35px, 10vw, 80px) clamp(25px, 8vw, 60px);\n            max-width: 800px;\n            width: 100%;\n            text-align: center;\n            animation: blurReveal 1s ease-out;\n            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15),\n                       inset 0 0 40px rgba(212, 175, 55, 0.05);\n            position: relative;\n            overflow: hidden;\n        }\n\n        .message-box::before {\n            content: \'\';\n            position: absolute;\n            top: -50%;\n            left: -50%;\n            width: 200%;\n            height: 200%;\n            background: linear-gradient(\n                135deg,\n                transparent 0%,\n                rgba(212, 175, 55, 0.08) 50%,\n                transparent 100%\n            );\n            animation: shimmer 4s infinite ease-in-out;\n            pointer-events: none;\n        }\n\n        .message-box::after {\n            content: \'\';\n            position: absolute;\n            bottom: -50%;\n            right: -50%;\n            width: 200%;\n            height: 200%;\n            background: radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%);\n            animation: glow 5s ease-in-out infinite;\n            pointer-events: none;\n        }'

content = content.replace(msgbox_old, msgbox_new)

# 11. Actualizar message-text con delays
content = content.replace(
    '.message-text {\n            font-size: clamp(0.9rem, 2vw, 1.2rem);\n            line-height: 1.8;\n            color: rgba(255, 255, 255, 0.85);\n            font-weight: 300;\n            margin-bottom: clamp(10px, 2vw, 20px);\n            position: relative;\n            z-index: 2;\n            overflow-wrap: break-word;\n        }',
    '.message-text {\n            font-size: clamp(0.9rem, 2vw, 1.2rem);\n            line-height: 1.9;\n            color: rgba(255, 255, 255, 0.85);\n            font-weight: 300;\n            margin-bottom: clamp(10px, 2vw, 20px);\n            position: relative;\n            z-index: 2;\n            overflow-wrap: break-word;\n            animation: fadeInUp 1.2s ease-out backwards;\n        }\n\n        .message-text:nth-of-type(1) { animation-delay: 0.2s; }\n        .message-text:nth-of-type(2) { animation-delay: 0.4s; }\n        .message-text:nth-of-type(3) { animation-delay: 0.6s; }'
)

# Guardar el archivo
with open('linda.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("✓ Efectos Apple agregados exitosamente")
