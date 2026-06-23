from PIL import Image
from pillow_heif import register_heif_opener
import os

register_heif_opener()

input_path = r'c:\Proyectos\emma\Yellow\imaganes\IMG_2991.HEIC'
output_path = r'c:\Proyectos\emma\Yellow\imaganes\IMG_2991.jpg'

try:
    img = Image.open(input_path)
    img = img.convert('RGB')
    img.save(output_path, 'JPEG', quality=95)
    print(f'✅ Imagen convertida exitosamente a JPG')
    print(f'Guardada en: {output_path}')
except Exception as e:
    print(f'❌ Error: {e}')
