# 🔧 INSTALACIÓN DE HERRAMIENTAS - Guía Rápida

**Objetivo:** Instalar todas las herramientas necesarias para pentesting  
**Tiempo:** 15-30 minutos  
**Requisitos:** Windows 10/11, Administrador

---

## ✅ CHECK: Herramientas Disponibles Actualmente

```bash
# Ejecuta esto en terminal para verificar
curl --version        # ✅ Tienes
node --version        # ✅ Tienes  
npm --version         # ✅ Tienes
```

**Resultado esperado:** Deberías ver versiones de todo ✅

---

## 📥 OPCIÓN 1: Instalación AUTOMÁTICA (Recomendado)

### Paso 1: Ejecutar script

1. **Busca** en Windows: `cmd`
2. **Click derecho** → "Ejecutar como administrador"
3. **Copia y pega:**

```cmd
cd c:\Proyectos\emma\security-research
INSTALAR_HERRAMIENTAS.bat
```

**¿Qué hace?**
- ✅ Instala Chocolatey (si no existe)
- ✅ Instala curl
- ✅ Instala jq
- ✅ Instala Burp Suite Community
- ✅ Instala OWASP ZAP (opcional)
- ✅ Instala Postman (opcional)

**Tiempo:** ~10 minutos (depende de internet)

---

## 📥 OPCIÓN 2: Instalación MANUAL (Sin Chocolatey)

### 1. Burp Suite Community (⭐ LO MÁS IMPORTANTE)

**Descarga directa:**
1. Ve a: https://portswigger.net/burp/community
2. Haz click en **"Download"**
3. Elige **"Windows"** (64-bit)
4. Descarga el `.exe` (~150 MB)
5. Ejecuta el instalador
6. Sigue los pasos (Next → Next → Install)

**Verificar instalación:**
```cmd
# En terminal:
dir "C:\Program Files\BurpSuiteCommunity"
```

---

### 2. jq (parser JSON)

**Opción A: Descargar directo**
1. Ve a: https://stedolan.github.io/jq/download/
2. Descarga `jq-win64.exe`
3. Guarda en: `C:\Windows\System32`
4. Renombra a `jq.exe`

**Verificar:**
```cmd
jq --version
```

**Opción B: Chocolatey (si lo tienes)**
```cmd
choco install jq -y
```

---

### 3. OWASP ZAP (Alternativa a Burp)

**Descarga directa:**
1. Ve a: https://owasp.org/www-project-zap/
2. Click en **"Download"**
3. Descarga `.exe` para Windows
4. Ejecuta instalador

**Es opcional** (Burp Suite es suficiente)

---

### 4. Postman (Opcional - Testing API)

**Descarga directa:**
1. Ve a: https://postman.com/download
2. Elige **"Download"** para Windows
3. Ejecuta instalador

---

## 🎯 HERRAMIENTAS MÍNIMAS REQUERIDAS

| Herramienta | Requerida | Uso |
|---|---|---|
| curl | ✅ **SÍ** | Hacer HTTP requests |
| jq | ⚠️ Opcional | Parsear JSON |
| Burp Suite | ✅ **SÍ** | Interceptar/modificar requests |
| OWASP ZAP | ⚠️ Opcional | Alternativa a Burp |
| Postman | ⚠️ Opcional | UI para testing API |

---

## 🔍 VERIFICAR INSTALACIÓN

```bash
# Terminal (cmd o PowerShell)

# 1. curl (debería mostrar versión)
curl --version

# 2. jq (debería mostrar versión)
jq --version

# 3. Node.js
node --version
npm --version

# 4. Burp Suite
dir "C:\Program Files\BurpSuiteCommunity"

# ✅ Si ves versiones en todo, estamos listos!
```

---

## 🛠️ SOLUCIONAR PROBLEMAS

### "command not found: curl"

```bash
# Opción 1: Instalar con Chocolatey
choco install curl -y

# Opción 2: Usar PowerShell
Invoke-WebRequest -Uri "..." -OutFile "..."
```

### "command not found: jq"

```bash
# Descarga manual desde:
# https://stedolan.github.io/jq/download/
# Guarda en C:\Windows\System32 como jq.exe
```

### "Burp Suite no se abre"

```bash
# Verifica que Java esté instalado
java -version

# Burp Suite requiere Java 11+
# Si no lo tienes, descárgalo de: java.com
```

### "No tengo permisos de Administrador"

```
Pide a tu admin que instale Burp Suite en:
C:\Program Files\BurpSuiteCommunity

O usa la versión portable sin instalador
```

---

## 🚀 DESPUÉS DE INSTALAR

### 1. Abre Burp Suite

```
Start Menu → Busca "Burp Suite Community"
O ejecuta: C:\Program Files\BurpSuiteCommunity\BurpSuiteCommunity.exe
```

**Primer inicio:**
- Tarda ~30 segundos (normal)
- Verás interfaz de Burp
- Acepta la licencia

### 2. Configura el Proxy

**Sigue:** `c:\Proyectos\emma\security-research\05_BURP_SUITE_SETUP.md`

### 3. Inicia PROYECTOCARRO

```bash
cd c:\Proyectos\emma\web-projects\PROYECTOCARRO
npm run dev
```

### 4. Comienza Testing

**Lee:** `c:\Proyectos\emma\security-research\06_TESTS_EN_VIVO.md`

---

## 📊 ESTADO DE HERRAMIENTAS

### Tienes AHORA ✅
- curl
- Node.js
- npm

### Necesitas INSTALAR 🔧
- **Burp Suite Community** (prioritario)
- jq (complementario)
- OWASP ZAP (alternativa)
- Postman (complementario)

---

## ⏱️ TIEMPO ESTIMADO

| Tarea | Tiempo |
|-------|--------|
| Instalación automática | 10 min |
| Instalación manual | 20-30 min |
| Configurar proxy | 5 min |
| Primer test | 10 min |
| **TOTAL** | **45 min - 1 hora** |

---

## 📞 NOTAS IMPORTANTES

⚠️ **Windows Defender:**
- Puede pedir confirmación para curl/jq
- Haz click "Permitir"

⚠️ **UAC (User Account Control):**
- Se pedirá que confirmes instalación
- Haz click "Sí"

⚠️ **Primer Start Burp Suite:**
- Tarda 30-60 segundos
- Es normal, tiene muchos componentes
- NO cierres

---

## ✨ LISTO

Cuando hayas completado esto:
1. ✅ Tienes todas las herramientas
2. ✅ Puedes hacer requests con curl
3. ✅ Puedes interceptar con Burp Suite
4. ✅ Listo para los tests

---

## 🎯 EJECUTAR AHORA

### Para instalación AUTOMÁTICA:
```cmd
REM Terminal como Administrador:
cd c:\Proyectos\emma\security-research
INSTALAR_HERRAMIENTAS.bat
```

### Para instalación MANUAL:
1. Descarga Burp Suite (prioritario)
2. Descarga jq
3. Sigue pasos arriba

---

**¿Empezamos? 🚀**
