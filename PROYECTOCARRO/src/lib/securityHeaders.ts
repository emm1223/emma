/**
 * Security Headers Configuration
 * Headers HTTP para protección contra ataques comunes
 * Basado en OWASP Top 10 y CWE/SANS Top 25
 */

/**
 * Headers de seguridad recomendados por OWASP
 */
export const securityHeaders = {
  // Prevenir clickjacking (proteger contra XClickjacking)
  'X-Frame-Options': 'DENY',

  // Prevenir MIME type sniffing
  'X-Content-Type-Options': 'nosniff',

  // Habilitar XSS protection en navegadores antiguos
  'X-XSS-Protection': '1; mode=block',

  // Referrer policy - limitar información de referrer
  'Referrer-Policy': 'strict-origin-when-cross-origin',

  // Content Security Policy - prevenir inyecciones de scripts
  // NOTA: Next.js Next.js 13.5 requiere algunos unsafe-inline para hydration
  // pero es lo más restrictivo posible
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net", // Next.js require esto
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net",
    "font-src 'self' data: https://fonts.gstatic.com https://cdn.jsdelivr.net",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' https: wss:",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "upgrade-insecure-requests",
  ].join('; '),

  // Permissions Policy (Feature Policy) - restricción de características del navegador
  'Permissions-Policy': [
    'geolocation=()',
    'microphone=()',
    'camera=()',
    'payment=()',
    'usb=()',
    'magnetometer=()',
    'gyroscope=()',
    'accelerometer=()',
    'vr=()',
    'xr-spatial-tracking=()',
    'interest-cohort=()',
  ].join(', '),

  // Strict Transport Security (HTTPS) - forzar HTTPS
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',

  // Evitar que el navegador cache contenido sensible
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
  'Pragma': 'no-cache',
  'Expires': '0',
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
