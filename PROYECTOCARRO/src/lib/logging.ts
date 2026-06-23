/**
 * Logging & Monitoring System
 * Registra eventos de seguridad y errores
 */

interface LogEntry {
  timestamp: string
  level: 'INFO' | 'WARN' | 'ERROR' | 'SECURITY'
  endpoint: string
  message: string
  metadata?: Record<string, unknown>
  statusCode?: number
  duration?: number
}

// In-memory log store (reemplazar con DB en producción)
const logs: LogEntry[] = []

// Max logs en memoria
const MAX_LOGS = 1000

export const logEvent = (entry: Omit<LogEntry, 'timestamp'>): void => {
  const logEntry: LogEntry = {
    timestamp: new Date().toISOString(),
    ...entry,
  }

  logs.push(logEntry)

  // Limpiar logs viejos si excede MAX_LOGS
  if (logs.length > MAX_LOGS) {
    logs.shift()
  }

  // En desarrollo, mostrar en console
  if (process.env.NODE_ENV === 'development') {
    const color =
      entry.level === 'ERROR' ? '\x1b[31m' : entry.level === 'SECURITY' ? '\x1b[33m' : '\x1b[36m'
    const reset = '\x1b[0m'
    console.log(`${color}[${entry.level}]${reset} ${entry.endpoint}: ${entry.message}`)
  }
}

export const logSecurityEvent = (
  endpoint: string,
  message: string,
  metadata?: Record<string, unknown>
): void => {
  logEvent({
    level: 'SECURITY',
    endpoint,
    message,
    metadata,
  })
}

export const logAuthAttempt = (
  username: string,
  success: boolean,
  ip: string
): void => {
  logEvent({
    level: success ? 'INFO' : 'WARN',
    endpoint: '/api/auth/login',
    message: `${success ? 'Successful' : 'Failed'} login attempt`,
    metadata: { username, ip, success },
  })
}

export const logRateLimit = (ip: string, endpoint: string): void => {
  logEvent({
    level: 'SECURITY',
    endpoint,
    message: 'Rate limit exceeded',
    metadata: { ip },
  })
}

export const logError = (endpoint: string, error: Error, statusCode: number = 500): void => {
  logEvent({
    level: 'ERROR',
    endpoint,
    message: error.message,
    statusCode,
    metadata: {
      stack: error.stack,
    },
  })
}

export const logApiRequest = (
  endpoint: string,
  method: string,
  statusCode: number,
  duration: number
): void => {
  logEvent({
    level: 'INFO',
    endpoint: `${method} ${endpoint}`,
    message: `API request completed`,
    statusCode,
    duration,
  })
}

export const getLogs = (
  filter?: {
    level?: string
    endpoint?: string
    limit?: number
  }
): LogEntry[] => {
  let filtered = [...logs]

  if (filter?.level) {
    filtered = filtered.filter((log) => log.level === filter.level)
  }

  if (filter?.endpoint) {
    filtered = filtered.filter((log) => log.endpoint.includes(filter.endpoint!))
  }

  if (filter?.limit) {
    filtered = filtered.slice(-filter.limit)
  }

  return filtered
}

export const clearLogs = (): void => {
  logs.length = 0
}

export const getSecurityAlerts = (): LogEntry[] => {
  return logs.filter((log) => log.level === 'SECURITY' || log.level === 'ERROR')
}

/**
 * Middleware: Registrar duración de requests
 */
export const logRequest = async (
  endpoint: string,
  method: string,
  fn: () => Promise<Response>
): Promise<Response> => {
  const startTime = Date.now()

  try {
    const response = await fn()
    const duration = Date.now() - startTime
    logApiRequest(endpoint, method, response.status, duration)
    return response
  } catch (error) {
    const duration = Date.now() - startTime
    logApiRequest(endpoint, method, 500, duration)
    throw error
  }
}
