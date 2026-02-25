# 📸 GUÍA: Galería Automática de Albani

## ¿Cómo funciona?

Este proyecto incluye un **sistema automático COMPLETO** que detecta tus fotos y las agrega solas a la galería.

---

## 🚀 Primeros Pasos (SUPER FÁCIL)

### 1️⃣ Setup Automático (una sola vez)
```bash
cd /home/emm/emma/albani
npm run setup
```

Esto:
- ✅ Verifica Node.js y npm
- ✅ Crea carpetas necesarias
- ✅ Instala dependencias
- ✅ Valida todo

### 2️⃣ Iniciar el Vigilante
```bash
npm run watch
```

Déjalo corriendo. Cada vez que agregues una foto, se actualiza automáticamente.

### 3️⃣ Agregar Tus Fotos
Copia tus fotos a `albani/images/` con este formato:
```
nombreFoto_categoria_ubicacion.jpg
```

**¡Y listo!** Se actualiza automáticamente en segundos.

---

## 📝 Formato de Nombres

```
nombreFoto_categoria_ubicacion.jpg
   ↓          ↓          ↓
 TÍTULO   CATEGORÍA   UBICACIÓN
```

### Categorías válidas:
- `parejas` - Fotos de ustedes dos
- `aventuras` - Viajes y aventuras  
- `momentos` - Momentos especiales

### Ejemplos correctos:
```
atardecer_momentos_playa.jpg     ✅
nosotros_parejas_cafe.jpg        ✅
excursion_aventuras_montana.jpg  ✅
viaje_aventuras_chile.jpg        ✅
```

---

## 🛠️ Todos los Comandos

### Instalación
```bash
npm run setup       # Setup automático (primera vez)
npm install         # Instalar dependencias
```

### Galería
```bash
npm run watch       # Monitoreo en tiempo real (RECOMENDADO)
npm run generate    # Generar una sola vez
npm run dev         # Generar y abrir en navegador
npm run open        # Abrir proyecto en navegador
```

### Diagnóstico y Reparación
```bash
npm run validate    # Verificar si todo está bien
npm run fix         # Reparar errores automáticamente
npm run fix -- --reset  # Reset completo
```

---

## 📊 Estructura de Carpetas

```
albani/
├── index.html                 ← Tu galería
├── config.json               ← Configuración
├── package.json              ← Scripts
│
├── css/
│   └── styles.css            ← Estilos bonitos
│
├── js/
│   ├── data.js              ← 🤖 Auto-generado
│   ├── gallery.js           ← Lógica galería
│   └── main.js              ← Control principal
│
├── images/                   ← 🎯 TUS FOTOS AQUÍ
│   ├── foto1_parejas_playa.jpg
│   ├── foto2_momentos_cafe.jpg
│   └── ...
│
└── scripts/                  ← Automatizaciones
    ├── setup.js             ← Setup inicial
    ├── generate-gallery.js  ← Genera datos
    ├── watch-gallery.js     ← Vigilante ⏱️
    ├── validate.js          ← Verifica errores
    ├── fix.js               ← Repara problemas
    └── open.js              ← Abre navegador
```

---

## 💡 Workflow Recomendado

### Día 1 (Setup)
```bash
npm run setup       # Configurar
npm run watch       # Iniciar vigilante
# Dejar abierto
```

### Días Siguientes
1. Copia fotos a `albani/images/`
2. Renómbralas: `nombreFoto_categoria_ubicacion.jpg`
3. ¡Se actualiza automáticamente! ✨
4. Abre `index.html` en navegador y presiona F5

### Terminar
```bash
Ctrl+C  # En la terminal de watch
```

---

## 🔧 Solucionar Problemas

### Las fotos no aparecen
```bash
npm run validate    # Ver qué está mal
npm run fix         # Intentar reparar
```

### Errores en la consola
```bash
npm run setup       # Resetear setup
npm install         # Reinstalar dependencias
npm run fix         # Reparar automáticamente
```

### Permisos denegados (Linux/Mac)
```bash
npm run fix         # Se reparan automáticamente
```

### Reset completo
```bash
npm run fix -- --reset  # Borra todo y empieza de nuevo
```

---

## 📝 Personalización

### Cambiar fecha de inicio
Edita `config.json`:
```json
{
  "startDate": "2024-01-15"  ← Tu fecha
}
```

### Cambiar colores de la galería
Edita `css/styles.css`:
```css
:root {
    --color-primary: #ff1493;  ← Color principal
    --color-secondary: #ff69b4; ← Color secundario
}
```

---

## 🎨 Tips & Trucos

### Agregar descripciones personalizadas
En `scripts/generate-gallery.js`, busca `getRandomDescription()` y agrega más textos.

### Ver cambios en tiempo real
```bash
npm run watch           # Terminal 1
npm run open            # Terminal 2 (abre navegador)
# Agrega fotos en explorador
# Presiona F5 en navegador
```

### Hacer backup
```bash
# El script automáticamente crea backups en:
js/data.backup.js
```

---

## 🚨 Errores Comunes

| Error | Solución |
|-------|----------|
| `node: command not found` | Instala Node.js desde nodejs.org |
| `npm: command not found` | Reinstala Node.js |
| `ENOENT: no such file` | Ejecuta: `npm run setup` |
| `Carpeta images no existe` | Se crea automáticamente |
| `Las fotos no aparecen` | Ejecuta: `npm run validate` |

---

## 🎯 Preguntas Frecuentes

**P: ¿Necesito conocer programación?**  
R: No. Solo copia fotos con el nombre correcto y ¡listo!

**P: ¿Puedo agregar más categorías?**  
R: Sí, en `config.json` agrega nuevas categorías.

**P: ¿Qué formatos de imagen funcionan?**  
R: JPG, PNG, GIF, WEBP, BMP

**P: ¿Puedo editar fotos después?**  
R: Sí, renómbralas nuevamente y se actualiza.

**P: ¿Funciona en móvil?**  
R: Sí, abre `index.html` en cualquier navegador.

---

## 📞 Ayuda Rápida

```bash
# Ver estado del proyecto
npm run validate

# Reparar todo
npm run fix

# Generar con última versión
npm run generate

# Abrir en navegador
npm run open

# Reiniciar todo
npm run setup && npm run watch
```

---

## 🎉 ¡Listo!

1. ✅ Ejecuta `npm run setup` (primera vez)
2. ✅ Ejecuta `npm run watch` (dejar abierto)
3. ✅ Copia fotos a `albani/images/`
4. ✅ Renómbralas: `foto_categoria_ubicacion.jpg`
5. ✅ ¡Disfruta! 💕

¡Cualquier problema, ejecuta `npm run validate` o `npm run fix`! 🚀