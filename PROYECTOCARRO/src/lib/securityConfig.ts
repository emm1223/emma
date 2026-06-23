// Configuración de seguridad para El Carrito Rojo

export const SECURITY_CONFIG = {
  // Rate limiting
  RATE_LIMIT: {
    windowMs: 15 * 60 * 1000, // 15 minutos
    maxRequests: 100, // máximo de requests
    enabled: true,
  },

  // Validación de entrada
  INPUT_VALIDATION: {
    maxStringLength: 500,
    maxArrayLength: 100,
    maxNumberValue: 999999,
  },

  // CSRF Protection
  CSRF: {
    enabled: true,
    sameSite: 'strict' as const,
  },

  // Headers de seguridad
  SECURITY_HEADERS: {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  },

  // Content Security Policy
  CSP: {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'"], // Next.js requiere esto
    'style-src': ["'self'", "'unsafe-inline'"],
    'img-src': ["'self'", 'data:', 'https:'],
    'font-src': ["'self'"],
    'connect-src': ["'self'"],
  },

  // Palabras clave peligrosas a bloquear
  DANGEROUS_PATTERNS: [
    /javascript:/i,
    /onerror=/i,
    /onclick=/i,
    /<script/i,
    /iframe/i,
    /alert\(/i,
    /eval\(/i,
    /setTimeout\(/i,
    /setInterval\(/i,
  ],
}

// Logging de seguridad
export function logSecurityEvent(event: string, details: any) {
  const timestamp = new Date().toISOString()
  console.warn(`[SECURITY] ${timestamp}: ${event}`, details)

  // En producción, enviar a servicio de logging
  if (process.env.NODE_ENV === 'production') {
    // sendToLoggingService({ event, details, timestamp })
  }
}
