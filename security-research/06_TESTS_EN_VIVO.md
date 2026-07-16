# 🎬 TESTS EN VIVO - Ejecución Paso a Paso

**Fecha:** 16 Julio 2026  
**Ejecutor:** Emmanuel Munayar  
**Proyecto:** PROYECTOCARRO  
**Estado:** 🔵 EN EJECUCIÓN

---

## 📋 PRE-CHECK: ¿Todo Listo?

```bash
# Terminal 1: ¿PROYECTOCARRO está corriendo?
curl http://localhost:3000

# Resultado esperado:
# HTML de la página (✅ OK)
# o "Connection refused" (❌ NO está corriendo)
```

**¿Qué hacer si no está corriendo?**
```bash
cd c:\Proyectos\emma\web-projects\PROYECTOCARRO
npm install  # Si no lo hiciste antes
npm run dev
# Espera a ver: "▲ Next.js..."
# Y "Local: http://localhost:3000"
```

---

## 🧪 TEST 1: Validación de Email (FÁCIL)

**Qué probamos:** ¿PROYECTOCARRO rechaza emails inválidos?

**Comando:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"notanemail","password":"Password123"}'
```

**Copia y pega esto en Terminal 2**

**Respuesta esperada:**
```json
{
  "error": "Usuario solo puede contener letras, números, guiones"
}
```

**Interpretación:**
- ✅ Si ves ese error = **PROTEGIDO**
  (Zod rechaza porque username debe ser válido)

- ❌ Si te devuelve un token = **VULNERABLE**
  (Aceptó un valor inválido)

- ❌ Si ves error 500 = **PROBLEMA**
  (Código tiene bug)

**Resultado:** 
```
[ ] Pendiente
[ ] ✅ PROTEGIDO
[ ] ❌ VULNERABLE
```

---

## 🧪 TEST 2: NoSQL Injection (MEDIO)

**Qué probamos:** ¿Rechaza objetos maliciosos en lugar de strings?

**Comando:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":{"$ne":null},"password":"Password123"}'
```

**Respuesta esperada:**
```json
{
  "error": "Usuario debe ser un string"
}
```

**Interpretación:**
- ✅ Si rechaza = **PROTEGIDO**
  (Zod requiere string, no objeto)

- ❌ Si te devuelve un token = **VULNERABLE**
  (Esto es NoSQL Injection grave!)

**Resultado:**
```
[ ] Pendiente
[ ] ✅ PROTEGIDO
[ ] ❌ VULNERABLE
```

---

## 🧪 TEST 3: Rate Limiting (MEDIO)

**Qué probamos:** ¿Protege contra ataques de fuerza bruta?

**Comando (cópia todo):**
```bash
echo "Iniciando 20 intentos de login fallido..."
for i in {1..20}; do
  echo "Intento $i:"
  curl -X POST http://localhost:3000/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"username":"admin","password":"wrongpass"}' \
    -s -w "Status: %{http_code}\n" -o /dev/null
  sleep 0.05  # Espera 50ms entre requests
done
```

**Qué buscar:**
- Status 400 = Login rechazado (normal)
- Status 429 = "Too Many Requests" (PROTEGIDO!)

**Interpretación:**
- ✅ Si ves varios 429 = **PROTEGIDO**
  (Rate limiting funciona después de X intentos)

- ❌ Si TODOS son 400 = **VULNERABLE**
  (Permite intentos infinitos)

**Resultado:**
```
[ ] Pendiente
[ ] ✅ PROTEGIDO
[ ] ❌ VULNERABLE
```

---

## 🧪 TEST 4: XSS en Búsqueda (AVANZADO)

**Qué probamos:** ¿Ejecuta scripts que inyectamos?

**Pasos:**
1. Abre http://localhost:3000 en navegador
2. F12 (abre DevTools)
3. Consola (Console tab)
4. Pega esto:

```javascript
// Intenta inyectar XSS
document.body.innerHTML += '<img src=x onerror="alert(\'XSS\')">'
```

**Qué pasa:**
- ✅ Si NO ejecuta alert = **PROTEGIDO**
  (React sanitiza el HTML)

- ❌ Si ejecuta alert = **VULNERABLE**
  (XSS funciona)

**Resultado:**
```
[ ] Pendiente
[ ] ✅ PROTEGIDO
[ ] ❌ VULNERABLE
```

---

## 🧪 TEST 5: localStorage - Tokens Expuestos (AVANZADO)

**Qué probamos:** ¿Guarda tokens en localStorage? (vulnerable a XSS)

**Pasos:**
1. Abre http://localhost:3000 en navegador
2. Login si es posible
3. F12 (DevTools)
4. Consola → pega:

```javascript
// Ver todo lo que hay en localStorage
console.log(localStorage)

// Ver si hay token JWT
console.log(localStorage.getItem('token'))
console.log(localStorage.getItem('accessToken'))
console.log(localStorage.getItem('jwt'))
```

**Qué buscar:**
- Si ves algo como `eyJhbGc...` = JWT expuesto
- Si ves `null` = No guarda en localStorage (bien)

**Interpretación:**
- ✅ Si no hay token = **BIEN**
  (Usa httpOnly cookies, seguro)

- ⚠️ Si hay token en localStorage = **RIESGO**
  (Vulnerable si hay XSS, pero puede ser OK)

**Resultado:**
```
[ ] Pendiente
[ ] ✅ BIEN - No hay token
[ ] ⚠️ RIESGO - Token visible
```

---

## 📊 RESUMEN DE RESULTADOS

Copia este template y completa:

```markdown
# Resultados de Tests - 16 Julio 2026

## TEST 1: Validación Email
Status: ✅ PROTEGIDO / ❌ VULNERABLE

## TEST 2: NoSQL Injection  
Status: ✅ PROTEGIDO / ❌ VULNERABLE

## TEST 3: Rate Limiting
Status: ✅ PROTEGIDO / ❌ VULNERABLE

## TEST 4: XSS
Status: ✅ PROTEGIDO / ❌ VULNERABLE

## TEST 5: localStorage
Status: ✅ BIEN / ⚠️ RIESGO

## Resumen General
Total Vulnerabilidades: X
Protecciones: X
Riesgos: X

## Próximos Pasos
[ ] Corregir vulnerabilidades encontradas
[ ] Implementar rate limiting si no existe
[ ] Revisar error handling
[ ] Hacer tests con Burp Suite
```

---

## 🎯 ORDEN DE EJECUCIÓN

1. ✅ Verifica PROYECTOCARRO corriendo
2. 🧪 TEST 1: Email validation (fácil, base)
3. 🧪 TEST 2: NoSQL injection (media, importante)
4. 🧪 TEST 3: Rate limiting (media, seguridad)
5. 🧪 TEST 4: XSS en navegador (avanzado)
6. 🧪 TEST 5: localStorage (investigación)
7. 📝 Documenta resultados

---

## 💡 TIPS MIENTRAS TESTEAS

**Si algo sale mal:**
```
"No conozco estos comandos"
→ Usa PowerShell o Git Bash, no CMD

"Error: ECONNREFUSED"
→ PROYECTOCARRO no está corriendo. Terminal 1: npm run dev

"JSON error"
→ Verifica comillas. MAL: {"username": notanemail}
                       BIEN: {"username": "notanemail"}
```

**Si curl no funciona:**
```bash
# Alternativa: Instala curl
choco install curl

# O usa PowerShell Invoke-WebRequest
Invoke-WebRequest -Uri 'http://localhost:3000/api/auth/login' `
  -Method POST `
  -Headers @{'Content-Type'='application/json'} `
  -Body '{"username":"test","password":"pass"}'
```

---

## 🎬 ¡EMPECEMOS!

**Abre Terminal 2 y ejecuta:**

```bash
# Primero verifica que todo funciona
curl http://localhost:3000

# Luego TEST 1
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"notanemail","password":"Password123"}'
```

---

## 📞 ¿NECESITAS AYUDA?

Cuéntame:
1. Qué test estás ejecutando
2. El comando exacto
3. El resultado que viste
4. El resultado esperado
5. El error (si hay)

**¡Vamos a hacerlo! 🚀**
