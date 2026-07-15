/**
 * Rate Limiting & DDoS Protection
 * Prevenir abuso de APIs
 */

interface RateLimitStore {
  [key: string]: { count: number; resetTime: number }
}

const rateLimitStore: RateLimitStore = {}

const RATE_LIMIT_REQUESTS = parseInt(process.env.RATE_LIMIT_REQUESTS || '100')
const RATE_LIMIT_WINDOW_MS = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000') // 15 min

/**
 * Verificar y aplicar rate limit por IP/identificador
 */
export const checkRateLimit = (identifier: string): { allowed: boolean; remaining: number } => {
  const now = Date.now()
  const record = rateLimitStore[identifier]

  // Si no existe registro o ha expirado, crear nuevo
  if (!record || now > record.resetTime) {
    rateLimitStore[identifier] = {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS,
    }
    return { allowed: true, remaining: RATE_LIMIT_REQUESTS - 1 }
  }

  // Incrementar contador
  record.count++

  // Verificar si se excedió el límite
  const allowed = record.count <= RATE_LIMIT_REQUESTS
  const remaining = Math.max(0, RATE_LIMIT_REQUESTS - record.count)

  return { allowed, remaining }
}

/**
 * Obtener IP del cliente desde request
 */
export const getClientIP = (request: Request): string => {
  const headers = request.headers

  // Intentar obtener IP desde headers proxy
  const forwarded = headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  const realIP = headers.get('x-real-ip')
  if (realIP) {
    return realIP
  }

  // Fallback: usar IP del cliente directo (o localhost en desarrollo)
  return '127.0.0.1'
}

/**
 * Reset rate limit (admin - limpiar si hay falsos positivos)
 */
export const resetRateLimit = (identifier?: string): void => {
  if (identifier) {
    delete rateLimitStore[identifier]
  } else {
    // Limpiar todo el store
    Object.keys(rateLimitStore).forEach((key) => {
      delete rateLimitStore[key]
    })
  }
}

/**
 * Limpiar rate limits expirados (ejecutar periodicamente)
 */
export const cleanupExpiredLimits = (): void => {
  const now = Date.now()
  Object.keys(rateLimitStore).forEach((key) => {
    if (now > rateLimitStore[key].resetTime) {
      delete rateLimitStore[key]
    }
  })
}
