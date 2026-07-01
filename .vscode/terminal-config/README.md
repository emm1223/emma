# 🚀 TERMINAL INTELIGENTE GIT BASH

Tu terminal personalizada estilo **Kali Linux** con autocompletado contextual y menú de comandos.

## 📋 Contenido

- **`.bashrc`** - Configuración principal (¡COPIAR ESTO!)
- **`INSTRUCCIONES.md`** - Guía paso a paso
- **`VSCODE-SETUP.md`** - Configurar VS Code
- **`instalar.sh`** - Script automático (opcional)

---

## ⚡ INSTALACIÓN RÁPIDA (5 minutos)

### Opción 1: Automática (RECOMENDADO)

1. Abre Git Bash
2. Ejecuta:
```bash
bash /c/Proyectos/emma/.vscode/terminal-config/instalar.sh
```
3. ¡Listo! Cierra y reabre Git Bash

### Opción 2: Manual

1. Copia el contenido de `.bashrc`
2. En Git Bash ejecuta:
```bash
cat > ~/.bashrc
# (pega el contenido)
# Ctrl+D para guardar
```
3. Recarga:
```bash
source ~/.bashrc
```

---

## 🎯 Lo que conseguirás

### Terminal Inteligente
```
┌─[emma@PC]─[/c/Proyectos/emma/PROYECTOCARRO] main ✓
└─$ npm run dev
```

✅ **Prompt bonito** con rama Git  
✅ **Colores ANSI** para mejor legibilidad  
✅ **Autocompletado** inteligente con Tab  
✅ **Alias cortos** para comandos frecuentes  
✅ **Menú contextual** (escribe `menu`)  
✅ **Banner personalizado** al abrir  

### Alias Disponibles

**Navegación:**
- `carro` → `/c/Proyectos/emma/PROYECTOCARRO`
- `yellow` → `/c/Proyectos/emma/yellow`
- `emma` → `/c/Proyectos/emma`
- `..` → Subir una carpeta

**Git:**
- `gst` → `git status`
- `gadd` → `git add .`
- `gc "msg"` → `git commit -m`
- `gpush` → `git push`
- `glog` → `git log` (últimos 10)

**Desarrollo:**
- `npmstart` → `npm run dev`
- `serve` → Servidor HTTP local
- `menu` → Ver comandos contextuales

**Sistema:**
- `ls` → Listado colorido
- `recent` → Archivos recientes
- `sizedirs` → Tamaño de carpetas

---

## 🎨 Personalización

### Agregar alias personalizado

Edita `~/.bashrc` y agrega:
```bash
alias tucomando='comando real'
```

Recarga:
```bash
source ~/.bashrc
```

### Cambiar prompt

Busca en `.bashrc` la línea `PS1=` y personaliza los colores.

---

## 🔍 Troubleshooting

**P:** Git Bash no se abre  
**R:** Reinicia VS Code completamente

**P:** Los alias no funcionan  
**R:** Ejecuta `source ~/.bashrc`

**P:** El prompt se ve raro  
**R:** Asegúrate que tienes UTF-8 en Git Bash

**P:** Quiero los valores por defecto  
**R:** `rm ~/.bashrc` y reabre Git Bash

---

## 📚 Archivos de Referencia

- **INSTRUCCIONES.md** - Instalación detallada
- **VSCODE-SETUP.md** - Configuración de VS Code
- **instalar.sh** - Script automático

---

## 🚀 Quick Start

```bash
# 1. Instalar
bash /c/Proyectos/emma/.vscode/terminal-config/instalar.sh

# 2. Cierra y reabre Git Bash

# 3. Prueba:
menu              # Ver comandos
carro             # Ir a PROYECTOCARRO
gst               # Ver estado Git
npm run dev       # Iniciar proyecto
```

---

## ✨ Tips Pro

- **Ctrl+R** - Buscar en historial
- **Tab** - Autocompletar
- **Arriba/Abajo** - Navegar historial
- **Ctrl+L** - Limpiar pantalla
- Escribe `menu` en cualquier carpeta de proyecto

---

**¡Disfruta tu terminal inteligente!** 🚀

Actualizado: 1 de Julio, 2026
