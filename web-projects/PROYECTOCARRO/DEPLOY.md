# 🚀 Deploy a Vercel - Guía Segura

## Paso 1: Preparar Vercel CLI

```bash
npm install -g vercel
vercel login
```

## Paso 2: Generar Secrets Nuevos para Producción

### Generar nuevo JWT_SECRET
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Generar nuevo ADMIN_PASSWORD_HASH
```bash
node -e "const bcrypt = require('bcryptjs'); (async () => { const hash = await bcrypt.hash('TU_NUEVA_CONTRASEÑA_SEGURA_AQUI', 10); console.log(hash); })();"
```

### Generar nueva contraseña (recomendación)
- Mínimo 12 caracteres
- Incluir mayúsculas, minúsculas, números, símbolos
- Ejemplo: `P@ssw0rd!2026#Secure`

## Paso 3: Configurar Variables en Vercel Dashboard

1. Ir a [vercel.com/dashboard](https://vercel.com/dashboard)
2. Seleccionar proyecto "tienda-en-linea"
3. Ir a **Settings > Environment Variables**
4. Agregar las siguientes variables:

### Variables Requeridas (Production)

| Variable | Valor | Tipo |
|----------|-------|------|
| `NEXT_PUBLIC_ADMIN_USERNAME` | `admin` (o personalizado) | Public |
| `ADMIN_PASSWORD_HASH` | bcrypt hash generado | Secret |
| `JWT_SECRET` | random de 32 chars | Secret |
| `NODE_ENV` | `production` | Public |
| `NEXT_PUBLIC_API_URL` | `https://tu-dominio.vercel.app` | Public |
| `RATE_LIMIT_REQUESTS` | `100` | Public |
| `RATE_LIMIT_WINDOW_MS` | `900000` | Public |

### Ejemplo de Configuración
```env
# Después de cambiar contraseña en prod, actualiza:
# ADMIN_PASSWORD_HASH=$2b$10$... (tu nuevo hash)
# JWT_SECRET=abc123def456... (tu nuevo secret)
```

## Paso 4: Desplegar a Vercel

### Opción A: Desde CLI
```bash
cd c:\Proyectos\emma\PROYECTOCARRO
vercel
```

### Opción B: Desde GitHub
```bash
git push origin main
# Vercel se despliega automáticamente en push a main
```

## Paso 5: Verificar Deployment

### 1. Comprobar que el sitio está en línea
```bash
curl https://tu-proyecto.vercel.app/
```

### 2. Probar autenticación en producción
```bash
curl -X POST https://tu-proyecto.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"TU_NUEVA_CONTRASEÑA"}'
```

### 3. Verificar headers de seguridad
```bash
curl -i https://tu-proyecto.vercel.app/
```
Debe mostrar:
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Strict-Transport-Security: max-age=31536000`
- `Content-Security-Policy: ...`

## Paso 6: Configurar Dominio Personalizado (Opcional)

1. En Vercel Dashboard > Settings > Domains
2. Agregar tu dominio (ej: `carrito.ejemplo.com`)
3. Seguir instrucciones de DNS
4. HTTPS se configura automáticamente

## Paso 7: Monitoreo en Producción

### Ver logs en tiempo real
```bash
vercel logs https://tu-proyecto.vercel.app
```

### Monitorear errores
- Ir a Vercel Dashboard > Deployments > Logs
- Ver errores de runtime en tiempo real

### Verificar ambiente de API
```bash
curl https://tu-proyecto.vercel.app/api/admin/logs \
  -H "Authorization: Bearer TU_JWT_TOKEN"
```

## 🔒 Checklist de Seguridad Pre-Deploy

- [ ] JWT_SECRET generado aleatoriamente (32+ chars)
- [ ] ADMIN_PASSWORD_HASH es bcrypt válido (no plaintext)
- [ ] NODE_ENV configurado como `production`
- [ ] HTTPS habilitado (Vercel por defecto)
- [ ] Cookies con `Secure` y `HttpOnly` flags
- [ ] Rate limiting configurado
- [ ] Security headers en todas las respuestas
- [ ] No hay secretos en `.env.local` versionado
- [ ] .gitignore incluye `.env.local`
- [ ] Database credentials (futuro) seguros

## 🚨 Problemas Comunes

### Error: Environment variable not defined
**Solución**: Verify variable is set in Vercel dashboard. Puede tardar 1-2 min en replicarse.

### Auth devuelve 401 en prod pero funciona en dev
**Solución**: Verificar que `ADMIN_PASSWORD_HASH` y `JWT_SECRET` están correctamente configurados en Vercel.

### Cookies no se guardan
**Solución**: `Secure` flag solo funciona con HTTPS. Vercel proporciona HTTPS automáticamente.

### Rate limiting no funciona
**Solución**: En Vercel serverless, rate limiting per-IP en memoria no persiste entre requests. Usar Redis para producción:
```bash
npm install redis ioredis
# Actualizar src/lib/rateLimit.ts para usar Redis
```

## 📊 Métricas a Monitorear

- Tiempo de respuesta de /api/auth/login
- Número de intentos fallidos por IP
- Rate limit hits por hora
- Errores 5xx en APIs
- Logs de seguridad (SECURITY level)

## 🔄 Actualizar Contraseña en Producción

1. Generar nuevo bcrypt hash
2. Actualizar `ADMIN_PASSWORD_HASH` en Vercel dashboard
3. Redeploy (automático al cambiar var)
4. Esperar 1-2 minutos
5. Probar nuevo login

## 📚 Recursos

- [Vercel Docs](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Environment Variables in Vercel](https://vercel.com/docs/projects/environment-variables)
- [Security Best Practices](https://vercel.com/blog/security)
