/**
 * Brute Force Protection
 * Prevenir ataques de fuerza bruta en login
 */

interface BruteForceRecord {
  attempts: number
  lastAttempt: number
  locked: boolean
  lockUntil?: number
}

const bruteForceStore: Map<string, BruteForceRecord> = new Map()

const MAX_ATTEMPTS = parseInt(process.env.BRUTE_FORCE_MAX_ATTEMPTS || '5')
const LOCKOUT_DURATION_MS = parseInt(process.env.BRUTE_FORCE_LOCKOUT_DURATION_MS || '900000') // 15 min
const RESET_WINDOW_MS = parseInt(process.env.BRUTE_FORCE_RESET_WINDOW_MS || '3600000') // 1 hour

/**
 * Registrar intento de login fallido
 */
export const recordFailedAttempt = (identifier: string): void => {
  const now = Date.now()
  const record = bruteForceStore.get(identifier)

  if (!record) {
    bruteForceStore.set(identifier, {
      attempts: 1,
      lastAttempt: now,
      locked: false,
    })
    return
  }

  // Si pasó el reset window, reiniciar contador
  if (now - record.lastAttempt > RESET_WINDOW_MS) {
    bruteForceStore.set(identifier, {
      attempts: 1,
      lastAttempt: now,
      locked: false,
    })
    return
  }

  record.attempts++
  record.lastAttempt = now

  // Bloquear si se excedieron intentos
  if (record.attempts >= MAX_ATTEMPTS) {
    record.locked = true
    record.lockUntil = now + LOCKOUT_DURATION_MS
  }

  bruteForceStore.set(identifier, record)
}

/**
 * Registrar intento de login exitoso (limpiar récord)
 */
export const recordSuccessfulAttempt = (identifier: string): void => {
  bruteForceStore.delete(identifier)
}

/**
 * Verificar si cuenta está bloqueada
 */
export const isAccountLocked = (identifier: string): { locked: boolean; remainingTime: number } => {
  const record = bruteForceStore.get(identifier)

  if (!record || !record.locked) {
    return { locked: false, remainingTime: 0 }
  }

  const now = Date.now()
  const lockUntil = record.lockUntil || now

  if (now < lockUntil) {
    return { locked: true, remainingTime: lockUntil - now }
  }

  // Desbloquear si pasó el tiempo
  record.locked = false
  record.lockUntil = undefined
  bruteForceStore.set(identifier, record)

  return { locked: false, remainingTime: 0 }
}

/**
 * Obtener intentos restantes
 */
export const getAttemptsRemaining = (identifier: string): number => {
  const record = bruteForceStore.get(identifier)
  if (!record) return MAX_ATTEMPTS

  const now = Date.now()
  if (now - record.lastAttempt > RESET_WINDOW_MS) {
    return MAX_ATTEMPTS
  }

  return Math.max(0, MAX_ATTEMPTS - record.attempts)
}

/**
 * Limpiar registros expirados (ejecutar periódicamente)
 */
export const cleanupExpiredRecords = (): void => {
  const now = Date.now()
  const expiredKeys: string[] = []

  bruteForceStore.forEach((record, key) => {
    if (now - record.lastAttempt > RESET_WINDOW_MS && !record.locked) {
      expiredKeys.push(key)
    }
  })

  expiredKeys.forEach((key) => bruteForceStore.delete(key))
}

/**
 * Reset manual de contador
 */
export const resetBruteForce = (identifier: string): void => {
  bruteForceStore.delete(identifier)
}
