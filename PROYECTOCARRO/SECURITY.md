# 🛡️ Guía de Seguridad - El Carrito Rojo

Este documento describe las medidas de seguridad implementadas en la tienda en línea.

## Validaciones de Entrada

### 1. Esquemas Zod
Todos los formularios utilizan validaciones robustas con Zod:

- **Productos**: Validación de nombre, descripción, precio y stock
- **Órdenes**: Validación de datos del cliente, email, teléfono y fechas
- **Búsqueda**: Límites de longitud y caracteres permitidos

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

## Validaciones de Datos

### Email
- Formato válido con expresión regular
- Máximo 255 caracteres
- Uso de `isValidEmail()`

### Teléfono
- Formato: solo dígitos, espacios, guiones y paréntesis
- Longitud: 7 a 20 caracteres
- Uso de `isValidPhone()`

### Números
- Validación con `isValidNumber()`
- Comprobación de mín/máx valores
- Prevención de NaN

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
