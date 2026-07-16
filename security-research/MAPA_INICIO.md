# 🗺️ MAPA DE INICIO - SEGURIDAD WEB

**Hoy:** 16 Julio 2026 - Emmanuel Munayar  
**Objetivo:** Web Security Learning + Auditoría PROYECTOCARRO  
**Estado:** 🟢 LISTO PARA EMPEZAR

---

## 📁 ARCHIVOS CREADOS (en `security-research/`)

```
9 ARCHIVOS GUÍA + 3 SCRIPTS
├── 📖 GUÍAS DE APRENDIZAJE
│   ├── README.md ⭐ EMPIEZA AQUÍ (Índice)
│   ├── 00_GUIA_APRENDIZAJE_OWASP.md (Conceptos)
│   ├── 01_AUDIT_PROYECTOCARRO.md (Estado actual)
│   ├── 02_LAB_PRACTICO_TESTING.md (10 tests)
│   ├── 03_PAYLOADS_BANCO_PRUEBAS.md (Banco payloads)
│   ├── 04_QUICK_START_HOY.md (30 min rápido)
│   ├── 05_BURP_SUITE_SETUP.md (Herramientas)
│   └── 06_TESTS_EN_VIVO.md (Tests ejecutables)
│
├── 🔧 INSTALACIÓN
│   ├── HERRAMIENTAS_INSTALACION.md (Guía manual)
│   ├── RESUMEN_INSTALACION.md (Estado + próximos pasos)
│   ├── INSTALAR_HERRAMIENTAS.bat (Script Windows)
│   └── INSTALAR_HERRAMIENTAS.ps1 (Script PowerShell)
│
└── 🚀 EJECUCIÓN
    └── INICIAR_PROYECTOCARRO.bat (Script start)
```

---

## 🎯 FLUJO RECOMENDADO

### AHORA MISMO (15 min)

1. **Lee este archivo** (lo estás leyendo)
2. **Abre:** `README.md`
   - Es el índice de todo
   - Te orientará por todo

### INMEDIATO (30 min)

3. **Instala herramientas**
   - Opción 1: PowerShell script (automático)
   - Opción 2: Manual paso-a-paso
   - Ver: `RESUMEN_INSTALACION.md`

4. **Inicia PROYECTOCARRO**
   ```bash
   cd c:\Proyectos\emma\web-projects\PROYECTOCARRO
   npm run dev
   ```

### APRENDIZAJE (1-2 horas)

5. **Lee guías en orden:**
   - `00_GUIA_APRENDIZAJE_OWASP.md` (10 min)
   - `01_AUDIT_PROYECTOCARRO.md` (10 min)
   - `05_BURP_SUITE_SETUP.md` (10 min)

6. **Ejecuta tests:**
   - `06_TESTS_EN_VIVO.md` (5 tests prácticos)
   - Documenta resultados

---

## 📊 ESTADO ACTUAL

### Herramientas que YA tienes ✅

```bash
✅ curl 8.15.0     - HTTP requests
✅ Node.js 22.20   - JavaScript
✅ npm 10.9.3      - Gestor paquetes
✅ Git             - Control versiones
✅ Chocolatey 2.5  - Gestor paquetes Windows
```

**Puedes:** Hacer requests HTTP, testing básico

### Herramientas que NECESITAS instalar ❌

```
🔴 Burp Suite Community  (PRIORITARIO - herramienta profesional)
🟡 jq                    (RECOMENDADO - parsear JSON)
🟢 OWASP ZAP            (OPCIONAL - alternativa Burp)
🟢 Postman              (OPCIONAL - UI testing)
```

---

## ⚡ OPCIÓN RÁPIDA: 30 MINUTOS

Si tienes prisa, haz ESTO:

```bash
# 1. Abre terminal PowerShell COMO ADMINISTRADOR
# 2. Ejecuta:
cd c:\Proyectos\emma\security-research
powershell -ExecutionPolicy Bypass -File INSTALAR_HERRAMIENTAS.ps1

# 3. Responde "s" a las preguntas (instala todo)
# 4. Espera ~10 min
# 5. Luego abre Burp Suite

# 6. En otra terminal:
cd c:\Proyectos\emma\web-projects\PROYECTOCARRO
npm run dev

# 7. Lee: 06_TESTS_EN_VIVO.md
# 8. Ejecuta los tests
```

**Total: 30 min instalación + 30 min aprendizaje = 1 hora listo**

---

## 📚 RUTAS DE APRENDIZAJE

### RUTA 1: Rápida (1-2 horas)
```
Instalar Herramientas
    ↓
Abre QUICK_START_HOY.md
    ↓
Ejecuta 3 tests fáciles
    ↓
Documenta resultados
    ↓
✅ Listo
```

### RUTA 2: Completa (4-6 horas)
```
Instalar Herramientas
    ↓
Lee GUIA_APRENDIZAJE_OWASP.md
    ↓
Entiende OWASP Top 10
    ↓
Lee AUDIT_PROYECTOCARRO.md
    ↓
Configura Burp Suite
    ↓
Ejecuta 06_TESTS_EN_VIVO.md
    ↓
Haz Lab Completo (02_LAB_PRACTICO_TESTING.md)
    ↓
Documenta todos hallazgos
    ↓
✅ Experto en pentesting web
```

### RUTA 3: Profesional (1-2 semanas)
```
Ruta 2 + todo lo anterior
    ↓
Lee cada guía profundamente
    ↓
Estudia payloads (03_PAYLOADS_BANCO_PRUEBAS.md)
    ↓
Crea reportes profesionales
    ↓
Implementa fixes
    ↓
Aprende Burp Suite avanzado
    ↓
Toma curso online (PortSwigger Academy)
    ↓
✅ Profesional en ciberseguridad
```

---

## 🎯 SIGUIENTE PASO (ELIGE UNO)

### OPCIÓN A: Instalación Automática (Recomendado)

```powershell
# Terminal COMO ADMINISTRADOR:
cd c:\Proyectos\emma\security-research
powershell -ExecutionPolicy Bypass -File INSTALAR_HERRAMIENTAS.ps1
```

✅ Instala todo automáticamente  
✅ Solo responde preguntas (s/n)  
✅ 10-15 minutos

---

### OPCIÓN B: Lectura Primero

```
1. Abre: README.md
2. Lee: 00_GUIA_APRENDIZAJE_OWASP.md
3. Luego instala herramientas
```

✅ Entiende todo antes  
✅ Decisiones informadas  
✅ 30 minutos lectura

---

### OPCIÓN C: Tests Inmediatos (Sin Burp)

```bash
cd c:\Proyectos\emma\web-projects\PROYECTOCARRO
npm run dev

# En otra terminal:
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"pass"}'
```

✅ Puedes probar AHORA  
✅ Sin esperar instalaciones  
✅ 5 minutos

---

## 📖 DÓNDE EMPEZAR

**Si no sabes qué hacer:**

```
1. Abre: c:\Proyectos\emma\security-research\README.md
2. Lee la sección "FLUJO RECOMENDADO"
3. Sigue instrucción por instrucción
4. Pregunta si algo no está claro
```

---

## 💬 ANTES DE EMPEZAR

### Preguntas frecuentes:

**¿Es seguro hacer esto?**
→ SÍ, todo es local en tu máquina. No hacemos nada malicioso.

**¿Es legal?**
→ SÍ, es educativo. Solo funciona en TU proyecto.

**¿Necesito permisos especiales?**
→ Sí, ejecutar como Administrador para instalar Burp/jq.

**¿Cuánto tarda?**
→ Instalación: 15 min | Aprendizaje: 1-4 horas

**¿Qué aprenderé?**
→ OWASP Top 10, pentesting, uso de Burp Suite, seguridad web.

---

## ✨ AL TERMINAR

Tendrás:
✅ Ambiente profesional de pentesting
✅ Conocimiento de OWASP Top 10
✅ Capacidad de auditar tu proyecto
✅ Herramientas usadas por hackers (legalmente)
✅ Skills de ciberseguridad

**Potencial:** Empleo en ciberseguridad, consultoría, bug bounty

---

## 🚀 ¡VAMOS!

### AHORA:

1. **Lee:** `c:\Proyectos\emma\security-research\README.md`

2. **Elige ruta de aprendizaje** (arriba)

3. **Instala herramientas** (automático o manual)

4. **Comienza tests** (06_TESTS_EN_VIVO.md)

---

## 📞 DURANTE EL PROCESO

Si algo no funciona:

1. **Error de instalación?**
   → Lee: `RESUMEN_INSTALACION.md`

2. **¿No entiende concepto?**
   → Lee: `00_GUIA_APRENDIZAJE_OWASP.md`

3. **¿Test no funciona?**
   → Lee: `06_TESTS_EN_VIVO.md` (solución de problemas)

4. **¿Burp no funciona?**
   → Lee: `05_BURP_SUITE_SETUP.md` (troubleshooting)

---

## 🎉 ¡LISTO!

Hemos preparado TODO lo necesario.

Tienes:
- ✅ 9 guías completas
- ✅ 3 scripts automatizados
- ✅ Paso-a-paso detallado
- ✅ Lab completo de seguridad
- ✅ Herramientas profesionales

**¡Solo falta EMPEZAR! 🚀**

---

**Próximo archivo a leer:**
```
c:\Proyectos\emma\security-research\README.md
```

¡Vamos! 💪
