content = open('linda.html', 'r', encoding='utf-8').read()

# Reducir backdrop-filter blur para que sea más claro
content = content.replace('backdrop-filter: blur(30px);', 'backdrop-filter: blur(15px);')
content = content.replace('backdrop-filter: blur(25px);', 'backdrop-filter: blur(12px);')
content = content.replace('backdrop-filter: blur(20px);', 'backdrop-filter: blur(10px);')

open('linda.html', 'w', encoding='utf-8').write(content)
print("✓ Backdrop filters optimizados - mayor claridad")
