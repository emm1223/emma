# 🧪 LAB PRÁCTICO: Web Security Testing

**Objetivo:** Aprender ejecutando ataques contra PROYECTOCARRO (localmente)  
**Requisitos:** PROYECTOCARRO corriendo en http://localhost:3000

---

## 🚀 PARTE 1: Setup del Lab

### 1. Instalar Herramientas

```bash
# Postman (para testing de APIs)
# Descarga: https://postman.com

# OWASP ZAP (escaneo automático)
# Windows:
choco install zaproxy

# O descarga: https://owasp.org/www-project-zap/

# curl (ya incluido en Windows 10+)
curl --version

# jq (para parsear JSON)
choco install jq
```

### 2. Iniciar PROYECTOCARRO

```bash
cd c:\Proyectos\emma\web-projects\PROYECTOCARRO
npm install
npm run dev
# Debe estar en http://localhost:3000
```

---

## 🎯 PARTE 2: Tests de Seguridad

### TEST 1: 🔴 SQL Injection (NoSQL)

**Objetivo:** Intentar acceso sin autenticación a admin

```bash
# Endpoint: POST /api/auth/login

# ❌ Intento malicioso: Inyectar operador NoSQL
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": {"$ne": null},
    "password": {"$ne": null}
  }'

# Explicación: En MongoDB vulnerable, esto significa:
# "username" != null AND "password" != null
# Devolvería el primer usuario sin validar contraseña

# ✅ Si devuelve error 400, está protegido ✓
# ❌ Si devuelve token, es vulnerable ✗
```

**Test esperado:** Debería rechazar porque validación de Zod requiere string, no objeto

---

### TEST 2: 🔴 XSS (Cross-Site Scripting)

**Objetivo:** Inyectar script malicioso

**Ubicación:** Nombre de producto o comentario

```bash
# Payload XSS clásico
PAYLOAD='<img src=x onerror="alert(\'XSS\')">'

# En una búsqueda (si existe)
curl "http://localhost:3000/productos?search=${PAYLOAD}"

# O en carrito (probar con DevTools)
# 1. Abre http://localhost:3000/carrito
# 2. Abre DevTools (F12)
# 3. En Console, ejecuta:
document.querySelector('.product-name').innerHTML = '<img src=x onerror="alert(\'XSS\')">'

# ✅ Si NO ejecuta alert(), está protegido ✓
# ❌ Si ejecuta alert(), es vulnerable ✗
```

---

### TEST 3: 🔴 Broken Access Control (IDOR)

**Objetivo:** Acceder a recursos de otro usuario

```bash
# Supongamos que tienes carrito con ID 1
# Intenta acceder al carrito del usuario 2

curl http://localhost:3000/api/carrito/2 \
  -H "Authorization: Bearer TU_TOKEN_AQUI"

# ✅ Si devuelve 403 Forbidden, está protegido ✓
# ❌ Si devuelve datos de otro usuario, es vulnerable ✗

# Verificación correcta: El servidor debe validar
# if (carrito.userId !== currentUser.id) {
#   throw new Error('Unauthorized')
# }
```

---

### TEST 4: 🔴 CSRF (Cross-Site Request Forgery)

**Objetivo:** Hacer que el servidor acepte request sin validación

```bash
# Simular request sin origen válido
curl -X POST http://localhost:3000/api/carrito/items \
  -H "Content-Type: application/json" \
  -H "Origin: http://malicious.com" \
  -d '{"productId": "1", "quantity": 100}'

# ✅ Si devuelve error CORS/CSRF, está protegido ✓
# ❌ Si procesa la request, es vulnerable ✗

# Verificación: Buscar en middleware CSRF token validation
```

---

### TEST 5: 🔴 Broken Authentication - Rate Limiting

**Objetivo:** Ataques de fuerza bruta en login

```bash
# Intenta 20 logins fallidos rápidamente
for i in {1..20}; do
  echo "Intento $i"
  curl -X POST http://localhost:3000/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"username":"admin","password":"wrongpass"}'
  echo ""
done

# ✅ Si después de X intentos devuelve 429 Too Many Requests, protegido ✓
# ❌ Si permite todos, es vulnerable ✗
```

**Verificación:** Buscar `rateLimit` en código

---

### TEST 6: 🔴 Validation Bypass

**Objetivo:** Enviar datos inválidos

```bash
# Intento 1: Email inválido
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"notanemail","password":"12345678"}'

# ✅ Si devuelve error de validación, está protegido ✓

# Intento 2: Contraseña débil
curl -X POST http://localhost:3000/api/auth/change-password \
  -H "Content-Type: application/json" \
  -d '{"currentPassword":"Securepass1","newPassword":"weak"}'

# ✅ Si devuelve error "Debe contener mayúscula", está protegido ✓
```

---

### TEST 7: 🔴 Sensitive Data Exposure

**Objetivo:** Encontrar datos sensibles

```bash
# En DevTools Console (F12), ejecuta:

// Verificar qué se guarda en localStorage
console.log(localStorage)

// Verificar si token está expuesto
console.log(sessionStorage)

// Verificar cookies
console.log(document.cookie)

# ✅ Si NO ves el token JWT, está bien protegido ✓
# ❌ Si ves el token, es vulnerable a XSS ✗
```

**Buena práctica:** Tokens en httpOnly cookies, no localStorage

---

### TEST 8: 🔴 Security Headers

**Objetivo:** Verificar headers de seguridad

```bash
# Ver headers HTTP response
curl -I http://localhost:3000

# O en navegador DevTools > Network > Response Headers

# Buscar estos headers:
# ✅ Content-Security-Policy
# ✅ X-Frame-Options: DENY
# ✅ X-Content-Type-Options: nosniff
# ✅ Strict-Transport-Security

# Verificación avanzada:
curl -I http://localhost:3000 | grep -i "security\|content-security\|x-frame"
```

---

### TEST 9: 🔴 Error Handling

**Objetivo:** Errores que exponen información

```bash
# Provocar error 500
curl http://localhost:3000/api/products/invalid-id

# ✅ Si devuelve: {"error": "Internal server error"}
#   Está bien protegido ✓
# 
# ❌ Si devuelve: {"error": "Cannot read property of undefined", "stack": "..."}
#   Expone información interna ✗
```

---

### TEST 10: 🔴 npm Vulnerabilities

**Objetivo:** Encontrar librerías vulnerables

```bash
cd c:\Proyectos\emma\web-projects\PROYECTOCARRO

# Escaneo rápido
npm audit

# Reporte detallado
npm audit --json > security-report.json

# Ver solo críticos
npm audit | grep -i critical
```

---

## 📊 PLANTILLA DE REPORTE

```markdown
# TEST: [Nombre del Test]

**Fecha:** 2026-07-16  
**Tester:** Emmanuel Munayar  
**Proyecto:** PROYECTOCARRO

## Descripción
[Qué probaste]

## Pasos para Reproducir
1. ...
2. ...

## Resultado Esperado
[Debería rechazar/validar/proteger]

## Resultado Actual
[Lo que pasó realmente]

## Severidad
🟢 Baja / 🟡 Media / 🔴 Alta / ⚫ Crítica

## Recomendación
[Cómo fixearlo]

## Status
- [ ] No revisado
- [ ] Confirmado
- [ ] En progreso
- [ ] Completado
```

---

## 🎓 Concepto Clave: Burp Suite

**Burp Suite Community** (GRATIS) es como "DevTools pero para hacking":

1. **Interceptor:** Ve TODAS las requests/responses
2. **Repeater:** Modifica y reenvía requests
3. **Intruder:** Ataca payloads en automatizado
4. **Scanner:** Detecta vulnerabilidades

**Setup rápido:**
1. Descarga: https://portswigger.net/burp/community
2. Instala certificado en navegador
3. Abre Burp + navegador
4. Haz requests normales
5. En Burp, modifica y reenvía

---

## 📝 Tu Primer Test (Ahora)

**TEST SIMPLE: Validación de Zod**

```bash
# PROYECTOCARRO está corriendo, ¿verdad?

# Intenta crear un producto con datos inválidos
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name": "","price": -100}'

# Debería rechazar porque:
# - name: string().min(1) 
# - price: number().positive()

# ¿Qué ves? ✅ Error 400 = protegido
```

---

## 🔗 Próximos Pasos

1. ✅ Lee esta guía
2. 📋 Ejecuta los 10 tests
3. 📝 Documenta resultados
4. 🔧 Implementa fixes
5. ✔️ Re-testa

**¿Empezamos? ¡Abre la terminal! 🚀**
