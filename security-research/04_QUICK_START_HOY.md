# ⚡ QUICK START - HOY MISMO (30 minutos)

**Objetivo:** Hacer tu primer test de seguridad en 30 minutos  
**No requiere:** Experiencia previa

---

## 🚀 PASO 1: Preparar Ambiente (5 min)

### 1.1 Verificar PROYECTOCARRO está corriendo

```bash
# Terminal 1
cd c:\Proyectos\emma\web-projects\PROYECTOCARRO
npm run dev
# Espera a ver: "Local: http://localhost:3000"
```

### 1.2 Abrir otra terminal

```bash
# Terminal 2 (para tests)
cd c:\Proyectos\emma\web-projects\PROYECTOCARRO
```

---

## 🔍 PASO 2: Test Simple de Validación (10 min)

Este es el test más fácil y te mostrará cómo funciona la seguridad:

### Test: "¿Rechaza emails inválidos?"

```bash
# PROYECTOCARRO tiene validación de email en el login
# Vamos a enviar un email inválido

curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "noesemail",
    "password": "Password123"
  }'
```

**¿Qué debería pasar?**
- ✅ Respuesta: Error 400 con mensaje "usuario solo puede contener letras, números, guiones"
- ❌ Respuesta: Procesa el login sin error = VULNERABLE

**¿Qué significa?**
- Si rechaza = Validación funciona ✓
- Si acepta = Validación no funciona ✗

---

## 📋 PASO 3: Test de Tipo de Dato (10 min)

### Test: "¿Rechaza objetos en lugar de strings?"

```bash
# En lugar de enviar un string, envía un objeto
# Esto es un ataque NoSQL Injection

curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": {"$ne": null},
    "password": "Password123"
  }'
```

**¿Qué debería pasar?**
- ✅ Respuesta: Error 400 "Usuario debe ser un string"
- ❌ Respuesta: Te devuelve un token = VULNERABLE (NoSQL Injection)

**¿Qué significa?**
- Si rechaza = Zod valida tipo correcto ✓
- Si acepta = Validación débil ✗

---

## 📊 PASO 4: Test de Rate Limiting (5 min)

### Test: "¿Protege contra fuerza bruta?"

```bash
# Intenta 15 logins rápido
for i in {1..15}; do
  echo "Intento $i"
  curl -X POST http://localhost:3000/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"username":"admin","password":"wrongpass"}' \
    -s -o /dev/null -w "Status: %{http_code}\n"
  sleep 0.1
done
```

**¿Qué debería pasar?**
- ✅ Después de ~5 intentos: Status 429 (Too Many Requests)
- ❌ Todos devuelven Status 400 = SIN RATE LIMITING

**¿Qué significa?**
- Si devuelve 429 = Hay protección contra ataques ✓
- Si permite todos = Vulnerable a fuerza bruta ✗

---

## 📝 REGISTRA TUS RESULTADOS

Crea archivo `c:\Proyectos\emma\security-research\MIS_PRIMEROS_TESTS.md`:

```markdown
# Mis Primeros Tests de Seguridad

**Fecha:** 16 de Julio 2026
**Usuario:** Emmanuel Munayar

## TEST 1: Validación de Email

**Comando:**
\`\`\`bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "noesemail","password": "Password123"}'
\`\`\`

**Resultado Esperado:** Error 400

**Resultado Actual:** [COMPLETA AQUI]

**Conclusión:** ✅ PROTEGIDO / ❌ VULNERABLE

---

## TEST 2: NoSQL Injection

**Resultado Actual:** [COMPLETA AQUI]

**Conclusión:** ✅ PROTEGIDO / ❌ VULNERABLE

---

## TEST 3: Rate Limiting

**Resultado Actual:** [COMPLETA AQUI]

**Conclusión:** ✅ PROTEGIDO / ❌ VULNERABLE

---

## Resumen

Total de tests: 3
✅ Protegidos: ?
❌ Vulnerables: ?
```

---

## 💡 LO QUE ESTÁS APRENDIENDO AHORA

1. **Validación:** ¿El servidor rechaza datos malos?
2. **Type Safety:** ¿Zod asegura tipo correcto?
3. **Rate Limiting:** ¿Protege contra ataques automatizados?

---

## ❓ PREGUNTAS MIENTRAS TESTEAS

```
¿Por qué la validación es importante?
→ Porque previene ataques inyectando código malicioso

¿Por qué rechaza mi objeto JSON?
→ Porque Zod requiere string, no objeto
  El servidor es "estricto" = BUENO

¿Por qué el status 429?
→ 429 = "Too Many Requests" = servidor dice "para, ataquista"
```

---

## 🎯 SIGUIENTES PASOS (Después de los 30 min)

1. ✅ Completar 3 tests básicos
2. 📝 Documentar resultados
3. 🔍 Revisar logs en DevTools (F12)
4. 📊 Crear reporte (MIS_PRIMEROS_TESTS.md)
5. 🚀 Tests más complejos (XSS, CSRF, IDOR)

---

## 🆘 ERRORES COMUNES

### "command not found: curl"

```bash
# En Windows 11+, curl viene incluido
# Si no funciona, descarga Git Bash:
https://git-scm.com/download/win

# O instala:
choco install curl
```

### "Connection refused"

```bash
# ¿PROYECTOCARRO está corriendo?
# Verifica:
1. Terminal 1 → `npm run dev`
2. ¿Ves "Local: http://localhost:3000"?
3. Abre http://localhost:3000 en navegador
```

### "JSON malformed"

```bash
# Verifica quotes en JSON
# MAL:  {"username": noesemail}
# BIEN: {"username": "noesemail"}
```

---

## ✨ Al Terminar

Habrás ejecutado tests REALES contra tu e-commerce y entendido:
- ✅ Cómo testear seguridad
- ✅ Qué buscar en respuestas
- ✅ Cómo documentar hallazgos
- ✅ Base para tests más avanzados

**Bonus:** ¡Sin necesidad de Burp Suite ni software complicado! Solo curl + lógica

---

## 🚀 ¿LISTO? 

**Abre la terminal y comienza con TEST 1** 👇
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "noesemail",
    "password": "Password123"
  }'
```

**¿Qué viste? Cuéntame el resultado 📝**
