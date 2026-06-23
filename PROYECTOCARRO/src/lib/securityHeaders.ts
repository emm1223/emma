/**
 * Security Headers Configuration
 * Headers HTTP para protección contra ataques comunes
 */

/**
 * Headers de seguridad recomendados por OWASP
 */
export const securityHeaders = {
  // Prevenir clickjacking
  'X-Frame-Options': 'DENY',

  // Prevenir MIME type sniffing
  'X-Content-Type-Options': 'nosniff',

  // Habilitar XSS protection en navegadores antiguos
  'X-XSS-Protection': '1; mode=block',

  // Referrer policy - limitar información de referrer
  'Referrer-Policy': 'strict-origin-when-cross-origin',

  // Content Security Policy - prevenir inyecciones de scripts
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net",
    "font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net",
    "img-src 'self' data: https:",
    "connect-src 'self' https: wss:",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; '),

  // Feature policy / Permissions policy
  'Permissions-Policy': [
    'geolocation=()',
    'microphone=()',
    'camera=()',
    'payment=()',
    'usb=()',
    'magnetometer=()',
    'gyroscope=()',
    'accelerometer=()',
  ].join(', '),

  // Strict Transport Security (HTTPS)
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
}

/**
 * Headers de CORS para API routes
 */
export const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
  'Access-Control-Allow-Credentials': 'true',
}

/**
 * Headers para API responses
 */
export const apiResponseHeaders = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0',
}

/**
 * Crear response con headers de seguridad
 */
export const createSecureResponse = (
  data: any,
  status = 200,
  customHeaders: Record<string, string> = {}
): Response => {
  const headers = {
    ...apiResponseHeaders,
    ...customHeaders,
  }

  return new Response(JSON.stringify(data), {
    status,
    headers,
  })
}

/**
 * Crear response de error con headers de seguridad
 */
export const createErrorResponse = (
  message: string,
  status = 400,
  customHeaders: Record<string, string> = {}
): Response => {
  return createSecureResponse(
    {
      error: true,
      message,
      timestamp: new Date().toISOString(),
    },
    status,
    customHeaders
  )
}
