// Utilidades de seguridad

/**
 * Sanitiza strings para prevenir XSS
 * Escapa caracteres especiales de HTML
 */
export function sanitizeString(str: string): string {
  if (typeof str !== 'string') return ''

  const htmlEscapeMap: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
  }

  return str.replace(/[&<>"'\/]/g, (char) => htmlEscapeMap[char] || char)
}

/**
 * Valida que una entrada sea segura
 */
export function isSafeString(str: string): boolean {
  if (typeof str !== 'string') return false
  // Previene scripts y patrones maliciosos comunes
  const dangerousPatterns = [
    /javascript:/i,
    /onerror=/i,
    /onclick=/i,
    /<script/i,
    /iframe/i,
    /alert\(/i,
  ]

  return !dangerousPatterns.some((pattern) => pattern.test(str))
}

/**
 * Valida un email de forma segura
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length <= 255
}

/**
 * Valida un teléfono
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\-\+\(\)]{7,20}$/
  return phoneRegex.test(phone)
}

/**
 * Crea un hash simple (NO para producción, usar bcrypt)
 * Solo para uso educativo
 */
export function simpleHash(str: string): string {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36)
}

/**
 * Rate limiting simple en memoria
 */
const requestCounts = new Map<string, { count: number; resetTime: number }>()

export function isRateLimited(identifier: string, maxRequests: number = 10, windowMs: number = 60000): boolean {
  const now = Date.now()
  const record = requestCounts.get(identifier)

  if (!record || now > record.resetTime) {
    requestCounts.set(identifier, { count: 1, resetTime: now + windowMs })
    return false
  }

  if (record.count >= maxRequests) {
    return true
  }

  record.count++
  return false
}

/**
 * Genera un token CSRF simple
 */
export function generateCSRFToken(): string {
  const randomBytes = new Uint8Array(32)
  crypto.getRandomValues(randomBytes)
  return Array.from(randomBytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

/**
 * Valida entrada numérica
 */
export function isValidNumber(value: unknown, min?: number, max?: number): boolean {
  if (typeof value !== 'number' || isNaN(value)) return false
  if (min !== undefined && value < min) return false
  if (max !== undefined && value > max) return false
  return true
}
