# 🔧 CONFIGURAR VS CODE CON GIT BASH

## Paso 1: Abrir settings.json de VS Code

**Opción A:** Ctrl+Shift+P → "Preferences: Open User Settings (JSON)"

**Opción B:** Ir a `C:\Users\Emman\AppData\Roaming\Code\User\settings.json`

## Paso 2: Agregar estas líneas

```json
{
  // ============ TERMINAL ============
  "terminal.integrated.defaultProfile.windows": "Git Bash",
  
  "terminal.integrated.profiles.windows": {
    "Git Bash": {
      "path": "C:\\Program Files\\Git\\bin\\bash.exe",
      "icon": "terminal-bash",
      "args": [
        "--login",
        "-i"
      ]
    }
  },
  
  // Tamaño y apariencia terminal
  "terminal.integrated.fontSize": 12,
  "terminal.integrated.fontFamily": "Consolas",
  "terminal.integrated.lineHeight": 1.4,
  "terminal.integrated.cursorBlinking": true,
  "terminal.integrated.scrollback": 5000,
  
  // Colores terminal
  "terminal.ansiBlack": "#1e1e1e",
  "terminal.ansiRed": "#ff5555",
  "terminal.ansiGreen": "#55ff55",
  "terminal.ansiYellow": "#ffff55",
  "terminal.ansiBlue": "#5555ff",
  "terminal.ansiMagenta": "#ff55ff",
  "terminal.ansiCyan": "#55ffff",
  "terminal.ansiWhite": "#ffffff"
}
```

## Paso 3: Reiniciar VS Code

Cierra completamente VS Code y abre nuevamente.

---

## ✅ Verificar configuración

1. Abre Nueva Terminal en VS Code: `Ctrl+Ñ` o Terminal → New Terminal
2. Debe abrirse Git Bash automáticamente
3. Debes ver el banner bonito con colores
4. Los alias deben funcionar

---

## 🎯 Si no funciona

**Problema:** "bash.exe not found"

**Solución:** Verifica la ruta de Git:
```bash
where git
# Debería mostrar: C:\Program Files\Git\bin\git.exe
# Entonces bash está en: C:\Program Files\Git\bin\bash.exe
```

---

## 📝 ARCHIVO SETTINGS COMPLETO (solo copia si quieres todo)

Ver archivo `settings-completo.json` en esta carpeta.

---

**Actualizado:** 1 de Julio, 2026
