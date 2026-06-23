content = open('linda.html', 'r', encoding='utf-8').read()

# Reemplazar todas las animaciones blurReveal con fadeInUp
content = content.replace('animation: blurReveal 0.8s ease-out backwards;', 'animation: fadeInUp 0.8s ease-out backwards;')
content = content.replace('animation: blurReveal 1s ease-out;', 'animation: fadeInUp 1s ease-out;')

open('linda.html', 'w', encoding='utf-8').write(content)
print("✓ Efecto blur removido - página clara ahora")
