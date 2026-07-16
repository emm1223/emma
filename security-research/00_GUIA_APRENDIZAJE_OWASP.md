# 🔒 Web Security & OWASP Top 10 - Guía Completa

**Fecha:** 16 de Julio 2026  
**Objetivo:** Aprender seguridad web + auditar PROYECTOCARRO  
**Nivel:** Intermedio → Avanzado

---

## 📚 OWASP Top 10 2024 (Priorizado para ti)

### 1. 🔴 **Injection** (SQL, NoSQL, Command)
**¿Qué es?** Insertar código malicioso en campos de entrada que se ejecutan en BD.

**Ejemplos:**
```javascript
// ❌ VULNERABLE
const query = `SELECT * FROM users WHERE email='${email}'`
// Si email = "' OR '1'='1", se devuelve todo

// ✅ SEGURO
const query = db.collection('users').findOne({ email: sanitize(email) })
```

**En PROYECTOCARRO:** Revisar rutas API de productos y admin

---

### 2. 🔴 **Broken Authentication** (JWT, Sesiones)
**¿Qué es?** Implementación débil de autenticación.

**Riesgos:**
- Contraseñas sin hash o salt débil
- JWT sin expiración
- Tokens en localStorage sin protección
- Sin rate limiting en login

**En PROYECTOCARRO:** 
- ✅ Usas bcryptjs (bien)
- ✅ JWT con expiración (bien)
- ⚠️ Revisar rate limiting

---

### 3. 🔴 **Broken Access Control** (AuthZ)
**¿Qué es?** Usuarios acceden a recursos que no deben.

**Riesgos:**
- Admin routes sin validación
- Modificar IDs en requests (`/user/1` → `/user/2`)
- IDOR (Insecure Direct Object Reference)

**En PROYECTOCARRO:** 
- Validar que solo admins accedan a `/admin`
- Validar ownership en carrito

---

### 4. 🔴 **Cross-Site Scripting (XSS)**
**¿Qué es?** Inyectar scripts maliciosos que se ejecutan en navegadores.

**Tipos:**
- **Stored:** Script guardado en BD se ejecuta para todos
- **Reflected:** Script en URL se ejecuta al visitarla
- **DOM-based:** Manipulación del DOM

**En PROYECTOCARRO:**
- ✅ Tienes `sanitizeString()` (bien)
- ⚠️ Revisar si se usa en TODOS los inputs
- ⚠️ Componentes React están protegidos por defecto

---

### 5. 🔴 **Cross-Site Request Forgery (CSRF)**
**¿Qué es?** Forzar a usuario a hacer acciones sin consentimiento.

**Ejemplo:**
```
Usuario en tutienda.com y malicioso.com en otra pestaña
Malicioso.com envía: POST /carrito/eliminar?id=1
El navegador incluye cookies automáticamente ❌
```

**Solución:** CSRF tokens

**En PROYECTOCARRO:**
- ⚠️ ¿Hay validación CSRF? Revisar middleware

---

### 6. 🔴 **Vulnerable Components** (Dependencias)
**¿Qué es?** Librerías con CVEs sin parchear.

**Tools:**
```bash
npm audit      # Detecta vulnerabilidades
npm update     # Actualiza dependencias
```

**En PROYECTOCARRO:** Verificar package.json

---

### 7. 🔴 **Security Misconfiguration**
**¿Qué es?** Configuración insegura por defecto.

**Riesgos:**
- Headers HTTP débiles (X-Frame-Options, CSP)
- Debug mode en producción
- Secrets en código fuente
- Directorios expuestos

**En PROYECTOCARRO:**
- ✅ Tienes `securityHeaders.ts`
- Revisar si se aplican a TODAS las rutas

---

### 8. 🔴 **Data Exposure** (Sensitive Info)
**¿Qué es?** Exponer datos sensibles sin cifrar.

**Riesgos:**
- Contraseñas en localStorage
- Datos de tarjeta sin cifrar
- Logs con tokens
- HTTPS deshabilitado

**En PROYECTOCARRO:**
- ⚠️ ¿Qué se guarda en localStorage?
- ⚠️ ¿Cómo se manejan pagos?

---

### 9. 🔴 **Logging & Monitoring**
**¿Qué es?** No registrar eventos de seguridad.

**Qué debe loguear:**
- Intentos de login fallidos
- Cambios de contraseña
- Acceso a admin
- Errores raros

**En PROYECTOCARRO:**
- ✅ Tienes `auditLog.ts`
- Revisar si se loguea todo lo necesario

---

### 10. 🔴 **Server-Side Template Injection (SSTI)**
**¿Qué es?** Inyectar código en templates del servidor.

**En PROYECTOCARRO:**
- Menos crítico (usas React/Next.js)
- Pero revisar email templates

---

## 🎯 Tu Plan de Aprendizaje (4 Semanas)

### **Semana 1: Fundamentos**
- [ ] Leer OWASP Top 10 (este archivo)
- [ ] Ver videos: "OWASP Top 10 Explained" (YouTube)
- [ ] Entender flujos: Auth → Request → Response → Logs
- [ ] Instalar Burp Suite Community (gratis)

### **Semana 2: Herramientas & Labs**
- [ ] Burp Suite: Interceptar requests en PROYECTOCARRO
- [ ] OWASP WebGoat: Ejercicios interactivos
- [ ] Postman: Testear APIs con payloads
- [ ] Crear laboratorio local

### **Semana 3: Audit PROYECTOCARRO**
- [ ] Ejecutar `npm audit`
- [ ] Revisar cada ruta API
- [ ] Testear inputs maliciosos
- [ ] Documentar hallazgos

### **Semana 4: Fix & Hardening**
- [ ] Implementar fixes
- [ ] Agregar tests de seguridad
- [ ] Documentar mejoras
- [ ] Desplegar con HTTPS

---

## 🛠️ Herramientas Recomendadas

| Tool | Uso | Instalación |
|------|-----|-------------|
| **Burp Suite** | Interceptar/modificar requests | [portswigger.net](https://portswigger.net) |
| **OWASP ZAP** | Escaneo automático | `apt install zaproxy` |
| **Postman** | Testing APIs | [postman.com](https://postman.com) |
| **npm audit** | Vulnerabilidades | Incluido en npm |
| **Snyk** | CI/CD security | [snyk.io](https://snyk.io) |

---

## 📋 Checklist de Seguridad (Próximo archivo)

Vamos a revisar cada punto específico en PROYECTOCARRO.

---

## 🔗 Recursos Adicionales

- [OWASP.org](https://owasp.org)
- [OWASP Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [PortSwigger Academy](https://portswigger.net/academy) (GRATIS)
- [HackTheBox](https://hackthebox.com) (Labs prácticos)

---

**Próximo paso:** ¿Empezamos con el audit de PROYECTOCARRO?
