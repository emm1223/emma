/**
 * Audit Logging
 * Registrar eventos de seguridad para auditoría
 */

export type AuditEventType =
  | 'LOGIN_SUCCESS'
  | 'LOGIN_FAILED'
  | 'LOGIN_BRUTE_FORCE'
  | 'LOGOUT'
  | 'PASSWORD_CHANGE'
  | 'TOKEN_GENERATED'
  | 'TOKEN_INVALID'
  | 'RATE_LIMIT_EXCEEDED'
  | 'UNAUTHORIZED_ACCESS'
  | 'API_ERROR'
  | 'PRODUCT_CREATED'
  | 'PRODUCT_DELETED'
  | 'ORDER_CREATED'
  | 'INVALID_INPUT'
  | 'SECURITY_HEADER_APPLIED'

export interface AuditLog {
  timestamp: Date
  eventType: AuditEventType
  userId?: string
  ip?: string
  userAgent?: string
  details: Record<string, unknown>
  severity: 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL'
}

const auditLogs: AuditLog[] = []
const MAX_LOGS = parseInt(process.env.AUDIT_LOG_MAX_SIZE || '5000')

/**
 * Registrar evento de auditoría
 */
export const logAuditEvent = (
  eventType: AuditEventType,
  details: Record<string, unknown>,
  options?: {
    userId?: string
    ip?: string
    userAgent?: string
    severity?: 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL'
  }
): void => {
  const severity = options?.severity || 'INFO'

  const logEntry: AuditLog = {
    timestamp: new Date(),
    eventType,
    userId: options?.userId,
    ip: options?.ip,
    userAgent: options?.userAgent,
    details,
    severity,
  }

  auditLogs.push(logEntry)

  // Mantener tamaño máximo
  if (auditLogs.length > MAX_LOGS) {
    auditLogs.shift()
  }

  // Log en consola para CRITICAL y ERROR
  if (severity === 'CRITICAL') {
    console.error(`[${eventType}] CRÍTICO:`, logEntry)
  } else if (severity === 'ERROR') {
    console.warn(`[${eventType}] ERROR:`, logEntry)
  } else if (process.env.DEBUG_AUDIT === 'true') {
    console.log(`[${eventType}]`, logEntry)
  }
}

/**
 * Obtener logs de auditoría
 */
export const getAuditLogs = (
  filter?: {
    eventType?: AuditEventType
    severity?: 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL'
    userId?: string
    limit?: number
  }
): AuditLog[] => {
  let filtered = [...auditLogs]

  if (filter?.eventType) {
    filtered = filtered.filter((log) => log.eventType === filter.eventType)
  }

  if (filter?.severity) {
    filtered = filtered.filter((log) => log.severity === filter.severity)
  }

  if (filter?.userId) {
    filtered = filtered.filter((log) => log.userId === filter.userId)
  }

  // Ordenar por más reciente primero
  filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())

  if (filter?.limit) {
    filtered = filtered.slice(0, filter.limit)
  }

  return filtered
}

/**
 * Limpiar logs de auditoría
 */
export const clearAuditLogs = (): void => {
  auditLogs.length = 0
}

/**
 * Obtener resumen de seguridad
 */
export const getSecuritySummary = (): {
  totalEvents: number
  criticalEvents: number
  errorEvents: number
  recentLoginFailures: number
  recentUnauthorizedAccess: number
} => {
  const critical = auditLogs.filter((log) => log.severity === 'CRITICAL').length
  const errors = auditLogs.filter((log) => log.severity === 'ERROR').length
  const loginFailures = auditLogs.filter(
    (log) => log.eventType === 'LOGIN_FAILED' || log.eventType === 'LOGIN_BRUTE_FORCE'
  ).length
  const unauthorized = auditLogs.filter((log) => log.eventType === 'UNAUTHORIZED_ACCESS').length

  return {
    totalEvents: auditLogs.length,
    criticalEvents: critical,
    errorEvents: errors,
    recentLoginFailures: loginFailures,
    recentUnauthorizedAccess: unauthorized,
  }
}
