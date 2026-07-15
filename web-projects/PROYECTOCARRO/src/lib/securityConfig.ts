/**
 * Security Configuration Validation
 * Validar que todas las variables de seguridad estén configuradas correctamente
 */

export interface SecurityConfig {
  jwtSecret: string
  jwtRefreshSecret: string
  adminUsername: string
  adminPasswordHash: string
  isProduction: boolean
  rateLimitRequests: number
  rateLimitWindow: number
  bruteForceMaxAttempts: number
  bruteForceLockedDuration: number
}

/**
 * Validar y obtener configuración de seguridad
 */
export const getSecurityConfig = (): SecurityConfig => {
  const isProduction = process.env.NODE_ENV === 'production'

  // Validar JWT_SECRET
  const jwtSecret = process.env.JWT_SECRET
  if (!jwtSecret || jwtSecret === 'fallback-secret-key-change-in-production') {
    if (isProduction) {
      throw new Error('JWT_SECRET debe estar configurado en producción')
    }
    console.warn('⚠️  JWT_SECRET no está configurado, usando valor por defecto')
  }

  // Validar JWT_REFRESH_SECRET
  const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET
  if (!jwtRefreshSecret || jwtRefreshSecret === 'fallback-refresh-secret-change-in-production') {
    if (isProduction) {
      throw new Error('JWT_REFRESH_SECRET debe estar configurado en producción')
    }
    console.warn('⚠️  JWT_REFRESH_SECRET no está configurado, usando valor por defecto')
  }

  // Validar ADMIN_USERNAME
  const adminUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'admin'
  if (adminUsername === 'admin') {
    console.warn('⚠️  Usando username admin por defecto, considera cambiarlo')
  }

  // Validar ADMIN_PASSWORD_HASH
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH || ''
  if (!adminPasswordHash && isProduction) {
    throw new Error('ADMIN_PASSWORD_HASH debe estar configurado en producción')
  }
  if (!adminPasswordHash && !isProduction) {
    console.warn('⚠️  ADMIN_PASSWORD_HASH no configurado, usando password por defecto')
  }

  return {
    jwtSecret: jwtSecret || 'fallback-secret-key-change-in-production',
    jwtRefreshSecret: jwtRefreshSecret || 'fallback-refresh-secret-change-in-production',
    adminUsername,
    adminPasswordHash,
    isProduction,
    rateLimitRequests: parseInt(process.env.RATE_LIMIT_REQUESTS || '100'),
    rateLimitWindow: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
    bruteForceMaxAttempts: parseInt(process.env.BRUTE_FORCE_MAX_ATTEMPTS || '5'),
    bruteForceLockedDuration: parseInt(process.env.BRUTE_FORCE_LOCKOUT_DURATION_MS || '900000'),
  }
}

/**
 * Validar configuración de seguridad (ejecutar al iniciar)
 */
export const validateSecurityConfig = (): { valid: boolean; errors: string[]; warnings: string[] } => {
  const errors: string[] = []
  const warnings: string[] = []
  const isProduction = process.env.NODE_ENV === 'production'

  // Validar JWT_SECRET
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET === 'fallback-secret-key-change-in-production') {
    if (isProduction) {
      errors.push('JWT_SECRET no está configurado')
    } else {
      warnings.push('JWT_SECRET está usando valor por defecto')
    }
  } else if (process.env.JWT_SECRET.length < 32) {
    warnings.push('JWT_SECRET debería tener al menos 32 caracteres')
  }

  // Validar JWT_REFRESH_SECRET
  if (!process.env.JWT_REFRESH_SECRET || process.env.JWT_REFRESH_SECRET === 'fallback-refresh-secret-change-in-production') {
    if (isProduction) {
      errors.push('JWT_REFRESH_SECRET no está configurado')
    } else {
      warnings.push('JWT_REFRESH_SECRET está usando valor por defecto')
    }
  }

  // Validar ADMIN_PASSWORD_HASH en producción
  if (isProduction && !process.env.ADMIN_PASSWORD_HASH) {
    errors.push('ADMIN_PASSWORD_HASH no está configurado en producción')
  }

  // Validar que NO haya secrets en el código
  if (process.env.NEXT_PUBLIC_JWT_SECRET) {
    errors.push('NEVER usar NEXT_PUBLIC_JWT_SECRET - esto expone los secrets')
  }

  // Validar HTTPS en producción
  if (isProduction && process.env.NEXTAUTH_URL && !process.env.NEXTAUTH_URL.startsWith('https://')) {
    warnings.push('En producción se debería usar HTTPS')
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  }
}

/**
 * Imprimir reporte de seguridad
 */
export const printSecurityReport = (): void => {
  const validation = validateSecurityConfig()
  const isProduction = process.env.NODE_ENV === 'production'

  console.log('\n' + '='.repeat(60))
  console.log('🔒 SECURITY CONFIGURATION REPORT')
  console.log('='.repeat(60))
  console.log(`Environment: ${isProduction ? '🔴 PRODUCTION' : '🟢 DEVELOPMENT'}`)
  console.log(`Node Version: ${process.versions.node}`)

  if (validation.errors.length > 0) {
    console.log('\n❌ ERRORS:')
    validation.errors.forEach((error) => console.log(`   - ${error}`))
  }

  if (validation.warnings.length > 0) {
    console.log('\n⚠️  WARNINGS:')
    validation.warnings.forEach((warning) => console.log(`   - ${warning}`))
  }

  if (validation.errors.length === 0 && validation.warnings.length === 0) {
    console.log('\n✅ Security configuration looks good!')
  }

  console.log('='.repeat(60) + '\n')
}
