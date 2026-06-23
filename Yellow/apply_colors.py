content = open('linda.html', 'r', encoding='utf-8').read()

# Reemplazar nombres de variables
replacements = {
    '--light-pink': '--light-cream',
    '--dark-pink': '--dark-taupe',
    '--primary-pink': '--primary-beige',
    '--gold': '--gold-accent'
}

for old, new in replacements.items():
    content = content.replace(old, new)

open('linda.html', 'w', encoding='utf-8').write(content)
print("✓ Paleta de colores aplicada exitosamente")
