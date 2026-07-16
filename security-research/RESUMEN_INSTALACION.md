# ✅ RESUMEN DE INSTALACIÓN - HERRAMIENTAS PROFESIONALES

**Fecha:** 16 Julio 2026  
**Estado:** 🟡 Parcialmente Completado  
**Siguiente:** Instalar lo que falta

---

## ✅ YA TIENES INSTALADO

| Herramienta | Versión | Estado |
|---|---|---|
| **curl** | 8.15.0 | ✅ Listo |
| **Node.js** | 22.20.0 | ✅ Listo |
| **npm** | 10.9.3 | ✅ Listo |
| **Chocolatey** | 2.5.1 | ✅ Listo |
| **Git/Git Bash** | ✅ | ✅ Listo |

**Puedes hacer:** Requests HTTP, Testing básico, Desarrollo Node.js

---

## ❌ AÚN NO TIENES (Necesitan Admin)

| Herramienta | Prioritaria | Estado | Acción |
|---|---|---|---|
| **jq** | ⚠️ Opcional | ❌ | Ver abajo |
| **Burp Suite** | 🔴 **IMPORTANTE** | ❌ | Ver abajo |
| **OWASP ZAP** | ⚠️ Opcional | ❌ | Ver abajo |
| **Postman** | ⚠️ Opcional | ❌ | Ver abajo |

---

## 🔧 CÓMO INSTALAR LO QUE FALTA

### OPCIÓN 1: Script Automático (RECOMENDADO)

**En terminal COMO ADMINISTRADOR:**

```powershell
# Abre PowerShell como Administrador (click derecho)
# Luego ejecuta:

cd c:\Proyectos\emma\security-research
powershell -ExecutionPolicy Bypass -File INSTALAR_HERRAMIENTAS.ps1
```

**¿Qué hace?**
- ✅ Instala jq (JSON parser)
- ✅ Instala Burp Suite Community
- ✅ Instala OWASP ZAP (opcional)
- ✅ Instala Postman (opcional)
- ✅ Verifica todo al final

**Tiempo:** ~10-15 minutos

---

### OPCIÓN 2: Instalación Manual Paso-a-Paso

#### PASO 1: Instalar jq

```powershell
# Como Administrador en PowerShell:
choco install jq -y
```

**O descargar manual:**
1. Ve a: https://stedolan.github.io/jq/download/
2. Descarga `jq-win64.exe`
3. Guarda en `C:\Windows\System32`
4. Renombra a `jq.exe`

**Verificar:**
```bash
jq --version
```

---

#### PASO 2: Instalar Burp Suite Community ⭐ **IMPORTANTE**

**Opción A: Con Chocolatey (Como Admin)**
```powershell
choco install burpsuite-community -y
```

**Opción B: Descarga Manual**
1. Ve a: https://portswigger.net/burp/community/download
2. Haz click en "Download"
3. Elige "Windows" (64-bit)
4. Ejecuta el `.exe` descargado
5. Sigue los pasos del instalador

**Verificar:**
```cmd
dir "C:\Program Files\BurpSuiteCommunity"
```

Deberías ver: `BurpSuiteCommunity.exe`

---

#### PASO 3: Instalar OWASP ZAP (Opcional)

```powershell
# Como Administrador
choco install zaproxy -y
```

O descarga manual: https://owasp.org/www-project-zap/

---

#### PASO 4: Instalar Postman (Opcional)

```powershell
# Como Administrador
choco install postman -y
```

O descarga manual: https://postman.com/download

---

## 📋 VERIFICAR INSTALACIÓN

```bash
# En terminal normal (no necesita admin):
curl --version
node --version
npm --version
jq --version
git --version

# En PowerShell (verificar Burp):
dir "C:\Program Files\BurpSuiteCommunity"
```

**¿Ves versiones en todo? ✅ Estamos listos!**

---

## 🚀 UNA VEZ INSTALADO TODO

### 1. Inicia PROYECTOCARRO

```bash
cd c:\Proyectos\emma\web-projects\PROYECTOCARRO
npm run dev

# Espera a ver: "Local: http://localhost:3000"
```

### 2. Abre Burp Suite Community

```
Windows Start Menu → Busca "Burp Suite Community"
O: C:\Program Files\BurpSuiteCommunity\BurpSuiteCommunity.exe
```

**Primer inicio tarda 30-60 segundos (normal)**

### 3. Configura proxy en navegador

**Lee:** `c:\Proyectos\emma\security-research\05_BURP_SUITE_SETUP.md`

### 4. Comienza los tests

**Lee:** `c:\Proyectos\emma\security-research\06_TESTS_EN_VIVO.md`

---

## ⏱️ TIEMPO ESTIMADO

| Tarea | Tiempo | Notas |
|-------|--------|-------|
| Script automático | 10-15 min | Recomendado |
| Manual paso-a-paso | 20-30 min | Si prefiero control |
| Configurar Burp | 5-10 min | Por primera vez |
| Primer test | 10 min | En PROYECTOCARRO |
| **TOTAL** | **45-65 min** | Listo para pentesting |

---

## 📊 ESTADO ACTUAL

```
Estado Herramientas:
├── ✅ Desarrollo
│   ├── Node.js v22.20.0 ✓
│   ├── npm 10.9.3 ✓
│   ├── Git ✓
│   └── curl 8.15.0 ✓
│
├── ❌ Testing (Necesita Admin)
│   ├── jq ✗ (FÁCIL INSTALAR)
│   ├── Burp Suite ✗ (PRIORITARIO)
│   ├── OWASP ZAP ✗ (OPCIONAL)
│   └── Postman ✗ (OPCIONAL)
│
└── ✅ Guías Completadas
    ├── README.md ✓
    ├── 00_GUIA_APRENDIZAJE_OWASP.md ✓
    ├── 01_AUDIT_PROYECTOCARRO.md ✓
    ├── 02_LAB_PRACTICO_TESTING.md ✓
    ├── 03_PAYLOADS_BANCO_PRUEBAS.md ✓
    ├── 04_QUICK_START_HOY.md ✓
    ├── 05_BURP_SUITE_SETUP.md ✓
    ├── 06_TESTS_EN_VIVO.md ✓
    └── HERRAMIENTAS_INSTALACION.md ✓
```

---

## 🎯 PRÓXIMO PASO

### ¿Qué hacer AHORA?

**OPCIÓN A: Usar Script (Recomendado)**
```powershell
# Terminal PowerShell COMO ADMINISTRADOR:
cd c:\Proyectos\emma\security-research
powershell -ExecutionPolicy Bypass -File INSTALAR_HERRAMIENTAS.ps1
```

**OPCIÓN B: Instalar Burp Manualmente**
1. Ve a: https://portswigger.net/burp/community/download
2. Descarga `.exe` para Windows
3. Ejecuta instalador
4. Sigue pasos

**OPCIÓN C: Esperar y hacer tests sin Burp**
- Puedes hacer tests con `curl` de inmediato
- Instala Burp después si quieres

---

## 💡 RECOMENDACIÓN

**Prioridad de Instalación:**

1. 🔴 **Burp Suite Community** (DEBE TENER)
   - Herramienta profesional #1
   - Permite ver/modificar TODAS las requests
   - Gratis y legal

2. 🟡 **jq** (Muy útil pero opcional)
   - Parsear JSON en terminal
   - Hace testing más fácil

3. 🟢 **OWASP ZAP** (Alternativa a Burp)
   - Si no quieres Burp
   - Similar pero más simple

4. 🟢 **Postman** (Complementario)
   - UI para testing de APIs
   - Buena para guardar requests

---

## ✨ CUANDO HAYAS INSTALADO TODO

✅ Tendrás: **Ambiente profesional de pentesting**

Podrás:
- 🔍 Interceptar TODAS las requests HTTP
- 📝 Modificar requests antes de enviar
- 🧪 Automatizar ataques
- 📊 Ver respuestas detalladas
- 💾 Guardar y repetir tests

---

## 🆘 PROBLEMAS COMUNES

**"Permiso denegado"**
- Abre terminal como Administrador (click derecho)
- Luego ejecuta los comandos

**"No veo Burp Suite después de instalar"**
- Cierra y reabre terminal
- Reinicia Windows (a veces necesario)

**"Command not found: jq"**
- Verifica que esté en `C:\Windows\System32`
- Abre nueva terminal después de instalar

**"Descarga lenta"**
- Es normal (Burp Suite = ~150 MB)
- La descarga más lenta, luego rápido

---

## 📞 ¿NECESITAS AYUDA?

Cuéntame:
1. Qué estás intentando instalar
2. Qué error ves
3. ¿Estás como Administrador?

**¡Te ayudaré a fixearlo! 🚀**

---

## 🎉 LISTO PARA EMPEZAR

Una vez instalado todo:

```bash
# Terminal 1: PROYECTOCARRO
cd c:\Proyectos\emma\web-projects\PROYECTOCARRO
npm run dev

# Terminal 2: Ejecuta tests
cd c:\Proyectos\emma\security-research
# Lee: 06_TESTS_EN_VIVO.md

# Burp Suite: Abre y configura proxy
```

---

**¿Empezamos la instalación? 🚀**
