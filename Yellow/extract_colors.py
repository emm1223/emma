from PIL import Image
from collections import Counter
import colorsys

# Abrir imagen
img = Image.open('./imaganes/IMG_2991.jpg')
img.thumbnail((300, 300))

# Obtener píxeles
pixels = list(img.getdata())

# Contar colores más frecuentes
color_counts = Counter(pixels)
most_common = color_counts.most_common(15)

print("Top 15 colores dominantes:")
print("=" * 60)
for i, (color, count) in enumerate(most_common, 1):
    if len(color) >= 3:
        r, g, b = color[0], color[1], color[2]
        hex_color = f"#{r:02x}{g:02x}{b:02x}".upper()
        print(f"{i}. {hex_color} | RGB({r}, {g}, {b}) | Freq: {count}")
