# 🚀 CONFIGURAR GIT BASH INTELIGENTE

## Paso 1: Ubicar tu carpeta de configuración de Git Bash

```bash
# La carpeta de perfil de Git Bash está aquí:
cd ~

# O si Git Bash está en:
cd "C:\Program Files\Git\etc\profile.d"
```

## Paso 2: Copiar el archivo .bashrc

**OPCIÓN A: Copiar automáticamente**

```bash
# Desde Git Bash:
cp /c/Proyectos/emma/.vscode/terminal-config/.bashrc ~/.bashrc
```

**OPCIÓN B: Copiar manualmente**

1. Copia el contenido del archivo `.bashrc`
2. Abre Git Bash
3. Escribe: `cat > ~/.bashrc` (enter)
4. Pega el contenido
5. Presiona: `Ctrl+D` (para guardar)

## Paso 3: Recargar la configuración

```bash
source ~/.bashrc
```

O cierra y vuelve a abrir Git Bash.

---

## 🎯 Comandos que tendrás disponibles

### Navegación Rápida
```bash
carro      # Ir a PROYECTOCARRO
yellow     # Ir a yellow
emma       # Ir a emma
..         # Subir una carpeta
...        # Subir dos carpetas
mkcd       # Crear carpeta y entrar
```

### Git (Alias)
```bash
gst        # git status
gco        # git checkout
gcb        # git checkout -b
gadd       # git add .
gc "msg"   # git commit
gpush      # git push
gpull      # git pull
glog       # git log (últimos 10)
gb         # git branch -all
```

### Desarrollo
```bash
npmstart   # npm run dev
npmtest    # npm test
serve      # Servidor web Python
menu       # Ver menú de comandos contextuales
```

### Sistema
```bash
ls         # Listado colorido
la         # Listado con ocultos
recent     # Archivos recientes
sizedirs   # Tamaño de carpetas
findf      # Buscar archivos
sysinfo    # Info del sistema
weather    # Ver clima
```

---

## 🎨 Características Especiales

✅ **Prompt inteligente** - Muestra:
- Usuario y hostname
- Carpeta actual
- Rama Git (si estás en un repo)
- Estado Git (✓ o ⚠)

✅ **Menú contextual** - Escribe `menu` y muestra comandos según proyecto

✅ **Autocompletado** - Tab funciona inteligentemente

✅ **Banner bonito** - Cuando abres la terminal

✅ **Colores ANSI** - Código limpio y legible

---

## 📝 Ejemplo de uso

```
┌─[emma@PC]─[/c/Proyectos/emma/PROYECTOCARRO] main
└─$ npm run dev

┌─[emma@PC]─[/c/Proyectos/emma/yellow]
└─$ serve

┌─[emma@PC]─[/c/Proyectos/emma]
└─$ menu
═══════════════════════════════════════
📦 PROYECTOCARRO - Comandos rápidos:
1) npm run dev      - Iniciar desarrollo
2) npm run build    - Build producción
3) npm run lint     - Revisar código
4) npm test         - Tests
═══════════════════════════════════════
```

---

## 🔧 PERSONALIZAR ALIAS

Si quieres agregar más alias, edita `~/.bashrc` y agrega:

```bash
alias tunombre='tu comando'
alias serve='python -m http.server 8000'
alias mongostart='mongod --dbpath ~/data/db'
```

Luego recarga con: `source ~/.bashrc`

---

## 💡 TIPS

1. **Autocomplete con Tab** - Funciona para archivos, carpetas y git
2. **Arriba/Abajo** - Busca en historial
3. **Ctrl+R** - Busca comando en historial
4. **Ctrl+L** - Limpia pantalla
5. **Enter dos veces** - Ejecuta último comando

---

## ✅ Verificar que funciona

Después de configurar, escribe:

```bash
git --version
npm --version
node --version
gst               # Debe ejecutar "git status"
```

Si todo funciona, ¡tu terminal está lista! 🚀

---

**Actualizado:** 1 de Julio, 2026
**Status:** ✅ Completamente configurado
