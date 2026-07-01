# 🚀 VS Code - Guía de Personalización Completa

## ✅ Lo que hemos configurado

### 1. **Extensiones Instaladas** 📦
- ✅ **SQLite** - Gestor de bases de datos
- ✅ **Bookmarks** - Marca líneas importantes con `Ctrl+Alt+B`
- ✅ **Makefile Tools** - Soporte para Makefiles
- ✅ **MongoDB for VS Code** - Conexión directa a BD MongoDB
- ✅ **Thunder Client** - Prueba APIs sin salir del editor (ya estaba)
- ✅ **GitLens** - Git supercharged (ya estaba)
- ✅ **TODO Highlight** - Resalta TODOs y FIXMEs (ya estaba)

### 2. **Configuración Global Avanzada** ⚙️
**Archivo:** `C:\Users\Emman\AppData\Roaming\Code\User\settings.json`

- 🎨 Tema Dracula con animaciones suaves
- ✏️ Auto-formato en guardar y al pegar
- 🔍 Sugerencias inteligentes mejoradas
- 📊 Personalización de colores TODOs, FIXMEs, HANGs, NOTEs
- 🚀 Optimizaciones de performance para proyectos grandes
- 📁 Exclusiones inteligentes de carpetas (node_modules, .git, etc.)
- 🐛 Configuración de debug avanzada
- 🎯 Peacock para colorear workspaces por proyecto

### 3. **Keybindings Personalizados** ⌨️
**Archivo:** `C:\Users\Emman\AppData\Roaming\Code\User\keybindings.json`

#### Navegación
- `Ctrl+Shift+P` - Command Palette
- `Ctrl+Shift+F` - Búsqueda global
- `Ctrl+` ` - Abrir/cerrar terminal

#### Edición
- `Ctrl+Alt+↑/↓` - Mover líneas
- `Shift+Alt+↑/↓` - Copiar líneas
- `Ctrl+Shift+X` - Eliminar línea
- `Ctrl+/` - Comentar línea
- `Ctrl+Shift+/` - Comentar bloque

#### Refactorización
- `F2` - Renombrar símbolo
- `Ctrl+.` - Quick Fix
- `Ctrl+Shift+R` - Refactor

#### Git & Bookmarks
- `Alt+G` - Mostrar/ocultar blame de Git
- `Ctrl+Alt+B` - Toggle Bookmark
- `Ctrl+Alt+J/K` - Siguiente/anterior Bookmark
- `Ctrl+Shift+G` - Abrir Source Control

#### Debug
- `F5` - Iniciar debug
- `F6` - Continuar
- `F10` - Step Over
- `F11` - Step Into
- `Shift+F11` - Step Out

#### Vistas
- `Ctrl+B` - Toggle sidebar
- `Ctrl+J` - Toggle panel
- `Ctrl+Shift+E` - Explorer
- `Ctrl+Shift+D` - Debug
- `Ctrl+Shift+T` - Recently Used Files

### 4. **Snippets Personalizados** 📝

#### TypeScript/React
```
rfc         → React Functional Component
npage       → Next.js Page
napiRoute   → Next.js API Route
tsi         → TypeScript Interface
useState    → React useState Hook
useEffect   → React useEffect Hook
asyncfn     → Async/Await Function
cl          → Console.log
ce          → Console.error
```

#### Java
```
jclass      → Java Class
jint        → Java Interface
jmethod     → Java Method
jmain       → Java Main Method
jgs         → Getter/Setter
jcons       → Constructor
jtry        → Try-Catch
jfor        → For Loop
jforeach    → Enhanced For Loop
sout        → System.out.println
```

#### HTML
```
html5       → HTML5 Template
twtemplate  → Tailwind CSS Template
twgrid      → Responsive Grid
twflex      → Flexbox Container
twbtn       → Button
twcard      → Card
```

### 5. **Tasks Disponibles** 🔧

#### Global (`globalStorage/tasks.json`)
- `Compilar Java` - Compila archivos Java
- `Ejecutar Java Main` - Ejecuta clase main
- `npm - Instalar dependencias`
- `npm - Dev Next.js`
- `npm - Build Next.js`
- `npm - Lint`
- `Git - Agregar y Commit`
- `Git - Push`
- `Git - Pull`
- `MongoDB - Iniciar servidor`

#### PROYECTOCARRO
- `Dev Server` - Inicia servidor de desarrollo
- `Build` - Compila para producción
- `Lint` - Verifica código con ESLint
- `Format Code` - Formatea con Prettier
- `Type Check` - Verifica tipos TypeScript
- `Start Production` - Inicia servidor de producción

**Ejecutar tasks:**
- `Ctrl+Shift+B` - Ejecutar task por defecto
- `Ctrl+Shift+P` > "Tasks: Run Task"

### 6. **Debug Configurations** 🐛

#### Global (`globalStorage/launch.json`)
- **Debug Java** - Depura aplicaciones Java
- **Debug Node.js** - Depura scripts Node.js
- **Debug Next.js** - Depura Next.js + abre en navegador
- **Chrome - Attach** - Conecta Chrome
- **Chrome - Launch** - Inicia Chrome

#### PROYECTOCARRO
- **Debug Next.js** - Full Stack debugging
- **Debug Chrome** - Depura frontend
- **Full Stack Debug** - Depura servidor y cliente en paralelo

**Usar debug:**
- `F5` - Iniciar debug
- Establecer breakpoints con clic en número de línea

### 7. **Configuración por Proyecto** 📋

#### PROYECTOCARRO (`.vscode/settings.json`)
- Tema específico con color #FF6B9D
- Prettier + ESLint configurados
- Tailwind CSS intellisense
- MongoDB connection
- Exclusiones optimizadas

---

## 🎯 Casos de Uso

### Trabajar en PROYECTOCARRO
1. Abre la carpeta del proyecto
2. `Ctrl+Shift+P` > "Tasks: Run Task" > "Dev Server"
3. Presiona `F5` para activar Full Stack Debug
4. Usa snippets con `rfc`, `npage`, `napiRoute`
5. `Alt+G` para ver quién modificó cada línea

### Trabajar en Java
1. Abre proyecto Java
2. `Ctrl+Shift+B` para compilar
3. `Ctrl+Shift+P` > "Run Task" > "Ejecutar Java Main"
4. O presiona `F5` y selecciona "Debug Java"

### Revisar Código
1. `Ctrl+/` para comentar/descomentar
2. `F2` para renombrar símbolos
3. `Ctrl+.` para quick fixes
4. `Ctrl+Shift+P` > "Format Document"

### Navegar Rápidamente
1. `Ctrl+Shift+F` para buscar en todos los archivos
2. `Ctrl+Shift+P` para Command Palette
3. `Ctrl+P` para abrir archivo
4. `Ctrl+Alt+B` para marcar línea importante

---

## 📚 Próximas Mejoras (Opcionales)

- [ ] Prettier script en package.json
- [ ] ESLint rules personalizadas
- [ ] Husky + lint-staged para pre-commit
- [ ] VS Code Profiles para cambiar config rápidamente
- [ ] Workspace-specific themes

---

## 💡 Tips de Productividad

1. **Settings Sync** - Guarda tus configs en GitHub con `Ctrl+Shift+P` > "Settings: Upload"
2. **Profiles** - Crea perfiles diferentes para diferentes tipos de trabajo
3. **Custom Theme** - Modifica `ios-style.css` para tu tema personal
4. **Peacock** - `Ctrl+P` "Peacock: Enter Color" para cambiar color del workspace

---

¡Tu VS Code está completamente personalizado y listo para desarrollo profesional! 🚀
