# 🎯 Setup de Ejecución y Depuración para Emma

Aquí está todo configurado para que **F5** funcione perfecto en tu workspace.

## 📦 Qué se instaló

- **launch.json** — Configuración de depuración
- **tasks.json** — Tareas personalizadas
- **settings.json** — Configuración del editor

## 🚀 Cómo usar

### Para Python
1. Abre cualquier archivo `.py`
2. Presiona **F5**
3. Selecciona "Python: Current File"
4. ¡Listo! Se ejecuta y puedes depurar

**Para pausar en un punto:** Haz click a la izquierda del número de línea (aparece un punto rojo)

### Para JavaScript/Node
1. Abre cualquier archivo `.js`
2. Presiona **F5**
3. Selecciona "Node.js: Current File"
4. Se ejecuta con depuración habilitada

### Para margarita.installer
1. Presiona **F5**
2. Selecciona "Node.js: margarita.installer"
3. Ejecuta npm start con depuración

## 🔴 Breakpoints (puntos de parada)

- Click a la **izquierda del número de línea** → aparece un punto rojo
- Cuando el código llegue ahí, se pausa
- Ves todas las variables en el panel izquierdo
- Presiona F10 para ir línea por línea

## 💡 Atajos útiles

| Atajo | Qué hace |
|-------|----------|
| F5 | Inicia depuración |
| F10 | Siguiente línea |
| F11 | Entra en función |
| Shift+F11 | Sale de función |
| Ctrl+Shift+D | Abre panel de depuración |

## ✅ Requisitos previos

**Para Python:**
- Tener Python instalado (`python --version`)
- Extensión Python de Microsoft en VS Code

**Para Node.js:**
- Tener Node.js instalado (`node --version`)
- Extensión Debugger for Chrome o directa de Node

## 🎮 Próximos pasos

1. Crea un archivo de prueba: `test.py` o `test.js`
2. Escribe código simple
3. Presiona F5 y prueba

¡Ya está listo para depurar!
