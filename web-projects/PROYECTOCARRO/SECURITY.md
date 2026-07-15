# � Guía de Seguridad - El Carrito Rojo

**Última actualización:** 2026-06-23  
**Versión:** 2.0 (Completa)

---

## 📋 Tabla de Contenidos

1. [Validaciones de Entrada](#validaciones-de-entrada)
2. [Autenticación & JWT](#autenticación--jwt)
3. [API Security](#api-security)
4. [Configuración de Ambiente](#configuración-de-ambiente)
5. [Headers de Seguridad](#headers-de-seguridad)
6. [Deployment](#deployment)
7. [Checklist de Producción](#checklist-de-producción)

---

## Validaciones de Entrada

### 1. Esquemas Zod
Todos los formularios utilizan validaciones robustas con Zod:

- **Productos**: Validación de nombre, descripción, precio y stock
- **Órdenes**: Validación de datos del cliente, email, teléfono y fechas
- **Búsqueda**: Límites de longitud y caracteres permitidos
- **Login**: Username y password con longitud límite

### 2. Sanitización de Strings
Función `sanitizeString()` que escapa caracteres especiales:
- `&` → `&amp;`
- `<` → `&lt;`
- `>` → `&gt;`
- `"` → `&quot;`
- `'` → `&#39;`

Esto previene ataques XSS (Cross-Site Scripting).

### 3. Detección de Patrones Maliciosos
La función `isSafeString()` bloquea:
- `javascript:` - Intentos de inyectar código
- `onerror=` - Event handlers maliciosos
- `onclick=` - Event handlers maliciosos
- `<script` - Etiquetas de script
- `iframe` - Iframes inyectados
- `alert(` - Ataques de alerta
- `eval(` - Ejecución dinámica de código

### 4. Validaciones de Email/Teléfono

**Email**
- Formato válido con expresión regular
- Máximo 255 caracteres
- Uso de `isValidEmail()`

**Teléfono**
- Formato: solo dígitos, espacios, guiones y paréntesis
- Longitud: 7 a 20 caracteres
- Uso de `isValidPhone()`

**Números**
- Validación con `isValidNumber()`
- Comprobación de mín/máx valores
- Prevención de NaN

---

## Autenticación & JWT

### 🔐 Flujo de Autenticación

1. **Login** → POST `/api/auth/login`
   - Usuario envía `username` y `password`
   - Se valida contra hash seguro con bcrypt
   - Si es correcto, se genera JWT token

2. **Token Storage** 
   - JWT se almacena en cookie `HttpOnly` 
   - Cookie tiene flags: `Secure`, `SameSite=Strict`
   - No es accesible desde JavaScript (previene XSS)

3. **Protected Routes**
   - Middleware verifica token en todas las rutas `/admin`
   - Sin token válido, redirige a login

4. **Logout** → POST `/api/auth/logout`
   - Limpia cookie `adminToken`
   - Invalida la sesión del lado del servidor

### 🔑 Hash de Contraseña

Usamos **bcryptjs** para hashing seguro:

```bash
# Generar hash (una sola vez)
node -e "require('bcryptjs').hash('tu_password', 10).then(h => console.log(h))"

# Resultado: $2b$10$... (hash de 60 caracteres)
```

**Jamás:** almacenar contraseñas en texto plano

### 🎫 JWT Token

Token JWT incluye:
- `username`: usuario autenticado
- `iat`: timestamp de emisión
- `exp`: expiración (24 horas)

Firmado con `JWT_SECRET` (mínimo 32 caracteres)

---

## API Security

### Rate Limiting

**Configuración:**
```env
RATE_LIMIT_REQUESTS=100                  # Máximo de requests
RATE_LIMIT_WINDOW_MS=900000              # Ventana: 15 minutos
```

**Comportamiento:**
- Se cuenta por IP del cliente
- Después de 100 requests en 15 min → respuesta 429
- Headers informativos: `X-RateLimit-*`

**Endpoints protegidos:**
- `/api/products` - Rate limit por lectura
- `/api/auth/login` - Rate limit por IP para prevenir brute force
- `/api/orders` - Rate limit por usuario

### Validación de Requests

1. **Content-Type**
   - Solo `application/json` permitido en POST
   - Se rechaza content type inválido

2. **Body Size**
   - Máximo 1MB por request
   - Previene ataques de body grande

3. **Schema Validation**
   - Todos los requests se validan con Zod
   - Errores retornan `400 Bad Request`

### CORS Configuration

```
Access-Control-Allow-Origin: https://elcarritorojo.com  (producción)
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
```

---

## Headers de Seguridad

### Headers Implementados

```
✅ X-Frame-Options: DENY
   Previene clickjacking
   
✅ X-Content-Type-Options: nosniff
   Previene MIME sniffing
   
✅ X-XSS-Protection: 1; mode=block
   XSS protection en navegadores antiguos
   
✅ Content-Security-Policy: [políticas]
   CSP restrictivo para scripts y recursos
   
✅ Strict-Transport-Security: max-age=31536000; includeSubDomains
   HTTPS obligatorio (HSTS) - 1 año
   
✅ Referrer-Policy: strict-origin-when-cross-origin
   Limita información de referrer
   
✅ Permissions-Policy: [restricciones]
   Deniega permisos de cámara, micrófono, geolocalización, etc.
```

### Content Security Policy Detallado

```
default-src 'self'                    # Solo recursos del mismo origen
script-src 'self' 'unsafe-inline'     # Scripts de origen propio
style-src 'self' 'unsafe-inline'      # Estilos de origen propio + inline
img-src 'self' data: https:           # Imágenes locales y https
connect-src 'self' https: wss:        # Conexiones a mismo origen y https
frame-ancestors 'none'                # No permitir embedding en iframes
base-uri 'self'                       # Restringir <base> href
form-action 'self'                    # Formularios solo al mismo origen
```

---

## Configuración de Ambiente

### 🔐 Variables Críticas (SECRETAS)

```env
# NUNCA compartir ni commitear
ADMIN_PASSWORD_HASH=$2b$10$...        # Hash bcrypt de contraseña
JWT_SECRET=abc123def456...            # Secret para firmar JWTs (32+ chars)
API_KEY_SECRET=...                    # Para APIs externas futuras
```

### 📝 Variables Públicas (OK en código)

```env
NEXT_PUBLIC_ADMIN_USERNAME=admin      # Username visible
NEXT_PUBLIC_API_URL=https://...       # URL pública de API
```

### ⚙️ Variables de Configuración

```env
NODE_ENV=production                   # production o development
RATE_LIMIT_REQUESTS=100
RATE_LIMIT_WINDOW_MS=900000
```

### Generación de Variables

**JWT Secret (32+ caracteres aleatorios):**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Password Hash:**
```bash
node -e "require('bcryptjs').hash('password_segura', 10).then(h => console.log(h))"
```

---

## Deployment

### Vercel Deployment

**1. Push código:**
```bash
git push origin main
```

**2. Configurar Environment Variables en Vercel:**
- Dashboard → Settings → Environment Variables
- Agregar todas las variables de `.env.local`
- Vercel las encripta automáticamente

**3. Vercel automáticamente:**
- ✅ Configura HTTPS/TLS
- ✅ Configura headers de seguridad
- ✅ Habilita HTTP/2
- ✅ Cachea recursos estáticos

**4. Verificar Deploy:**
```bash
# Headers de seguridad
curl -i https://elcarritorojo.vercel.app/

# Verificar HTTPS
curl https://elcarritorojo.vercel.app/
```

---

## Checklist de Producción

### ✅ Antes de Desplegar

- [ ] Generar `ADMIN_PASSWORD_HASH` con bcrypt (password segura)
- [ ] Generar `JWT_SECRET` de 32+ caracteres aleatorios
- [ ] Cambiar `NEXT_PUBLIC_ADMIN_USERNAME` de "admin"
- [ ] Verificar `.env.local` no está commiteado
- [ ] Revisar `.gitignore` incluye `*.env.local`
- [ ] No hay secretos en código visible
- [ ] Todas las rutas `/admin` requieren token
- [ ] Rate limiting activo en endpoints
- [ ] CORS configurado para dominio correcto
- [ ] Build exitoso sin warnings: `npm run build`
- [ ] Test de autenticación en staging

### 🚀 En Producción

- [ ] HTTPS forzado (HTTP → HTTPS redirect)
- [ ] HSTS habilitado (`Strict-Transport-Security`)
- [ ] CSP header activo y probado
- [ ] Monitorear logs de autenticación
- [ ] Alertas de intentos de login fallidos
- [ ] Backup diario de datos
- [ ] Auditoría mensual de acceso admin
- [ ] Actualizar dependencias regularmente
- [ ] Ejecutar `npm audit` mensualmente
- [ ] Rotar `JWT_SECRET` cada 90 días

---

## Testing de Seguridad

### Test de Login

```bash
# Login correcto
curl -X POST https://elcarritorojo.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password_segura"}'

# Login incorrecto (debe fallar)
curl -X POST https://elcarritorojo.com/api/auth/login \
  -d '{"username":"admin","password":"wrong"}'

# Sin JSON (debe fallar)
curl -X POST https://elcarritorojo.com/api/auth/login
```

### Test de Rate Limiting

```bash
# Ejecutar 150 requests rápidamente
for i in {1..150}; do
  curl https://elcarritorojo.com/api/products
done

# Respuestas:
# 1-100: 200 OK
# 101-150: 429 Too Many Requests
```

### Test de Headers

```bash
# Verificar headers de seguridad
curl -i https://elcarritorojo.com/

# Buscar:
# X-Frame-Options: DENY
# X-Content-Type-Options: nosniff
# Strict-Transport-Security: max-age=31536000
# Content-Security-Policy: ...
```

### Test de XSS

```bash
# Intentar inyectar script
curl -X POST https://elcarritorojo.com/api/orders \
  -d '{"name":"<script>alert(1)</script>"}'

# Resultado esperado: sanitizado o rechazado
```

---

## Vulnerabilidades Reportadas

### Next.js 13.5.11

Hay 24 vulnerabilidades reportadas. Para actualizar:

```bash
npm install next@latest react@latest react-dom@latest
npm audit fix
```

⚠️ Puede haber breaking changes. Probar primero en staging.

---

## Contacto de Seguridad

Para reportar vulnerabilidades de forma responsable:

📧 **Email:** seguridad@example.com  
🔐 **Forma segura:** [Bug bounty program] (si aplica)

---

## Límites de Longitud

| Campo | Máximo | Razón |
|-------|--------|-------|
| name | 100 chars | Evita strings gigantes |
| description | 500 chars | Límite razonable |
| category | 50 chars | Categorías simples |
| search | 100 chars | Búsquedas moderadas |
| phone | 20 chars | Teléfono estándar |
| email | 255 chars | Límite RFC estándar |

## Rate Limiting

Implementación simple en memoria para prevenir abuso:
- Máximo: 10 solicitudes
- Ventana: 15 minutos
- Identificador: IP o ID del usuario

```typescript
if (isRateLimited(userIdentifier, 10, 15 * 60 * 1000)) {
  // Rechazar solicitud
}
```

## CSRF Protection (Base)

Configuración de SameSite en cookies:
```typescript
CSRF: {
  enabled: true,
  sameSite: 'strict'
}
```

## Security Headers

Encabezados HTTP implementados:
- `X-Content-Type-Options: nosniff` - Previene MIME-sniffing
- `X-Frame-Options: DENY` - Previene clickjacking
- `X-XSS-Protection: 1; mode=block` - Protección XSS en navegadores antiguos

## Validaciones en Formularios

### Panel Admin
1. Validación con Zod antes de procesar
2. Sanitización de entrada del usuario
3. Comprobación de patrones maliciosos
4. Mensajes de error descriptivos
5. Confirmación antes de eliminar

### Búsqueda de Productos
1. Límite de 100 caracteres
2. Sanitización automática
3. Detección de patrones peligrosos
4. Filtrado seguro en cliente

## Datos Sensibles

### NO Almacenados (actualmente)
- Contraseñas (NextAuth.js las maneja encriptadas)
- Números de tarjeta
- Datos de pago

### Almacenados Localmente
- ID de productos
- Carrito del cliente (localStorage)
- Preferencias de agendamiento

## Próximas Mejoras de Seguridad

- [ ] HTTPS obligatorio en producción
- [ ] CSRF tokens en formularios
- [ ] Protección de API con API keys
- [ ] Rate limiting basado en IP
- [ ] Logging y auditoría de acciones
- [ ] Validación de servidor adicional
- [ ] Encriptación de datos sensibles
- [ ] Validación de archivos subidos

## Mejores Prácticas

1. **Nunca confíes en entrada del cliente**
   - Siempre valida en el servidor
   - Usa Zod en backend

2. **Sanitiza siempre**
   - Escapa caracteres especiales
   - Verifica patrones maliciosos

3. **Limita tamaños**
   - Evita strings infinitos
   - Establece máximos realistas

4. **Usa HTTPS en producción**
   - Encripta datos en tránsito
   - Previene MITM attacks

5. **Mantén dependencias actualizadas**
   - `npm audit` regularmente
   - Actualiza packages críticos

## Testing

Para probar que las validaciones funcionan:

```bash
# Buscar con caracteres especiales
localhost:3001/productos?search=<script>alert('xss')</script>

# Resultado: Será sanitizado y no ejecutado
```

## Contacto

Si encuentras una vulnerabilidad, reporta inmediatamente al administrador.

---

**Seguridad es responsabilidad de todos** 🔐
