# 💝 Tu Carta Premium

Una página web elegante y premium para expresar tu amor. Perfecta para compartir en Instagram y que todos tus seguidores (y ella) la vean.

---

## 🎨 Características

✨ **Diseño Premium**
- Tipografía elegante y moderna
- Animaciones suaves al hacer scroll
- Efectos de parallax
- Colores sofisticados (dorado, rosa, blanco)

🎵 **Integración de Música**
- Soporte para archivos locales
- Fácil de configurar
- Spotify embed disponible

📸 **Galería de Fotos**
- Espacio dedicado para vuestras mejores fotos
- Diseño elegante

📱 **Responsive**
- Se ve perfecto en celular, tablet y desktop
- Optimizado para compartir en Instagram

---

## 🚀 Cómo Empezar

### 1. **Ver la Página**
Simplemente abre `index.html` en tu navegador. ¡Eso es todo!

### 2. **Personalizar los Mensajes**
Edita `index.html` y busca estos textos para cambiarlos:
- "Para Ti" → Cambia el título principal
- "Quería decirte algo" → Cambia el mensaje de introducción
- "Te amo" → Cambia el mensaje principal
- Las razones 01, 02, 03, 04
- Todos los párrafos

### 3. **Agregar tu Canción**

**Opción A: Archivo de Audio Local (MP3)**
1. Crea una carpeta llamada `music` en la misma carpeta que `index.html`
2. Pon tu archivo de audio ahí (ej: `cancion.mp3`)
3. Abre `script.js` y busca la función `initMusicPlayer()`
4. Descomenta la línea:
   ```javascript
   const audioSrc = './music/cancion.mp3';
   ```
5. O simplemente usa en la consola:
   ```javascript
   addAudio('./music/cancion.mp3')
   ```

**Opción B: Spotify Embed**
1. Ve a Spotify y copia el enlace de la canción
2. En `index.html`, reemplaza el contenido de `.audio-player` con un iframe de Spotify
3. Ejemplo:
   ```html
   <iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/..." width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
   ```

**Opción C: YouTube**
1. Copia el embed de YouTube
2. Pégalo en la sección de música

### 4. **Agregar Fotos**
1. Crea una carpeta llamada `fotos` en la misma carpeta que `index.html`
2. Pon tus fotos de ustedes ahí
3. El JavaScript las detectará automáticamente

### 5. **Cambiar Colores**
Si quieres cambiar los colores principales, edita `styles.css` y busca esta sección:

```css
:root {
    --primary-color: #2c2c2c;
    --secondary-color: #f5f5f5;
    --accent-gold: #d4af37;
    --accent-rose: #e8b4c4;
    --text-dark: #1a1a1a;
    --text-light: #666;
}
```

Cambia los valores hex por los colores que quieras.

**Paletas sugeridas:**
- Romántica: `--accent-gold: #ff69b4` (rosa)
- Moderna: `--accent-gold: #4a90e2` (azul)
- Natural: `--accent-gold: #50c878` (verde)

O desde la consola del navegador:
```javascript
changeColors('#1a1a1a', '#ff69b4')
```

---

## 📱 Para Compartir en Instagram

### Paso 1: Subir la página
1. Sube esta carpeta (`cartaPremium`) a un servidor web (Netlify, GitHub Pages, Vercel, etc.)
2. Obtendrás un link como: `https://tu-dominio.com`

### Paso 2: Preparar el post
1. Sube una foto hermosa de ustedes dos
2. En la descripción, escribe algo como:
   ```
   "Te amo 💝
   Lee mi mensaje completo en el enlace 👆
   #TeamNosotros #TeAmo #MensajeEspecial"
   ```

### Paso 3: Agregar el enlace
1. En la "Historia" agrega el link directo a tu página
2. Los seguidores podrán clickear y ver el mensaje completo

---

## 🛠️ Estructura de Archivos

```
cartaPremium/
├── index.html          ← La página principal (edita aquí los mensajes)
├── styles.css          ← Los estilos y diseño (cambia colores aquí)
├── script.js           ← Las animaciones e interactividad
├── README.md           ← Este archivo
├── music/              ← Crea esta carpeta y pon tu canción aquí
│   └── cancion.mp3
└── fotos/              ← Crea esta carpeta y pon tus fotos aquí
    ├── foto1.jpg
    ├── foto2.jpg
    └── foto3.jpg
```

---

## 💻 Comandos de Consola (F12)

Abre la consola del navegador (F12) y prueba estos comandos:

```javascript
// Agregar audio
addAudio('./music/tu-cancion.mp3')

// Cambiar colores
changeColors('#1a1a1a', '#ff69b4')

// Más combinaciones:
changeColors('#1a1a1a', '#4a90e2') // Azul elegante
changeColors('#1a1a1a', '#50c878') // Verde natural
changeColors('#1a1a1a', '#ffd700') // Oro puro
```

---

## 🎯 Secciones de la Página

1. **Hero** - Título principal impactante
2. **Introducción** - "Quería decirte algo"
3. **Música** - Tu canción especial
4. **Mensaje Principal** - "Te amo"
5. **Razones** - Por qué la amas (puedes cambiar las 4 razones)
6. **Galería** - Vuestras fotos juntos
7. **Cierre** - Despedida romántica
8. **Instrucciones** - Guía para personalizar

---

## 📝 Ejemplos de Personalización

### Cambiar el título hero
En `index.html`, busca:
```html
<h1 class="hero-title">Para Ti</h1>
```
Y cámbialo por:
```html
<h1 class="hero-title">Te Amo</h1>
```

### Cambiar una razón
En `index.html`, busca:
```html
<div class="reason-item">
    <span class="reason-number">01</span>
    <p>Eres real, auténtica, sin filtros.</p>
</div>
```
Y personaliza el texto.

### Cambiar mensaje principal
En `index.html`, busca:
```html
<p class="main-message">
    Y no es algo que diga solo porque suene bien...
</p>
```
Y escribe tu propio mensaje.

---

## 🌐 Cómo Subir a Internet

### Opción 1: Netlify (RECOMENDADO - Gratis y fácil)
1. Ve a https://netlify.com
2. Arrastra la carpeta `cartaPremium`
3. ¡Listo! Tendrás un enlace en segundos

### Opción 2: GitHub Pages (Gratis)
1. Sube los archivos a un repositorio de GitHub
2. Activa GitHub Pages en Settings
3. Tu página estará en `https://tu-usuario.github.io/cartaPremium`

### Opción 3: Vercel (Gratis)
1. Ve a https://vercel.com
2. Conecta tu repositorio de GitHub
3. Automáticamente se despliega

---

## 🎬 Tips para Hacerlo Viral

1. **Foto atractiva** - Elige una buena foto para el post
2. **Descripción corta** - Sé breve pero emotivo
3. **Llama a la acción** - "Lee el mensaje completo"
4. **Mejor hora** - Publica cuando sabes que ella está en Instagram
5. **Música pegajosa** - Elige una canción que ambos amen
6. **Colores coordinados** - Haz que la página tenga los colores de la foto

---

## 🐛 Si Algo No Funciona

1. **La página no se ve** - Asegúrate de haber abierto `index.html` en el navegador
2. **No reproduce la música** - Verifica que el archivo esté en la carpeta `/music`
3. **Los colores no cambian** - Limpia el cache (Ctrl+Shift+R)
4. **Las fotos no salen** - Crea la carpeta `/fotos` y pon las imágenes ahí

---

## 💡 Ideas Adicionales

- Añade un contador regresivo a un viaje especial
- Agrega un video (YouTube embed)
- Esconde un mensaje sorpresa que aparezca al final
- Haz un formulario para que ella escriba una respuesta
- Añade un mapa con tu primer encuentro
- Crea una línea de tiempo de vuestra relación

---

## 🎁 Próximas Mejoras (si quieres)

- [ ] Galería con swiper/carrusel
- [ ] Contador de días juntos
- [ ] Fotos con efectos
- [ ] Video embebido
- [ ] Formulario de respuesta
- [ ] Tema oscuro/claro
- [ ] Múltiples idiomas

---

## 💬 ¿Preguntas?

Si algo no está claro, revisa:
1. La consola del navegador (F12)
2. Los comentarios en el código
3. Las instrucciones en la sección final de la página

---

**¡Que disfrutes haciéndola! Que ella lo ame 💝**

Hecha con ❤️ para ti.
