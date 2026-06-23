/**
 * Auth & Security Utilities
 * Manejo de autenticación, JWT, hashing de contraseñas, refresh tokens
 */

import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import type { SignOptions, JwtPayload } from 'jsonwebtoken'
import { logAuditEvent } from '@/lib/auditLog'

const JWT_SECRET: string = process.env.JWT_SECRET || 'fallback-secret-key-change-in-production'
const JWT_REFRESH_SECRET: string = process.env.JWT_REFRESH_SECRET || 'fallback-refresh-secret-change-in-production'
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || ''

// Token con expiración corta (15 minutos)
const ACCESS_TOKEN_EXPIRY = '15m'
// Refresh token con expiración larga (7 días)
const REFRESH_TOKEN_EXPIRY = '7d'

export interface TokenPair {
  accessToken: string
  refreshToken: string
}

/**
 * Generar hash de contraseña (usar en setup inicial)
 */
export const hashPassword = async (password: string): Promise<string> => {
  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters')
  }
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

/**
 * Verificar contraseña contra hash
 */
export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash)
}

/**
 * Generar par de tokens (access + refresh)
 */
export const generateTokenPair = (username: string): TokenPair => {
  const accessToken = jwt.sign(
    { username, type: 'access', iat: Date.now() },
    JWT_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRY } as any
  )

  const refreshToken = jwt.sign(
    { username, type: 'refresh', iat: Date.now() },
    JWT_REFRESH_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRY } as any
  )

  logAuditEvent('TOKEN_GENERATED', { username }, { severity: 'INFO' })

  return { accessToken, refreshToken }
}

/**
 * Generar nuevo access token desde refresh token
 */
export const refreshAccessToken = (refreshToken: string): string | null => {
  try {
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as JwtPayload

    if (decoded.type !== 'refresh') {
      logAuditEvent(
        'TOKEN_INVALID',
        { reason: 'Invalid token type', username: decoded.username },
        { userId: decoded.username as string, severity: 'WARNING' }
      )
      return null
    }

    const newAccessToken = jwt.sign(
      { username: decoded.username, type: 'access', iat: Date.now() },
      JWT_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRY } as any
    )

    return newAccessToken
  } catch (error) {
    logAuditEvent(
      'TOKEN_INVALID',
      { reason: 'Refresh token verification failed', error: String(error) },
      { severity: 'WARNING' }
    )
    return null
  }
}

/**
 * Verificar y decodificar JWT token
 */
export const verifyToken = (token: string): { username: string; iat: number; type: string } | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload
    return {
      username: (decoded.username as string) || '',
      iat: (decoded.iat as number) || 0,
      type: (decoded.type as string) || 'access',
    }
  } catch (error) {
    logAuditEvent(
      'TOKEN_INVALID',
      { reason: 'Token verification failed', error: String(error) },
      { severity: 'INFO' }
    )
    return null
  }
}

/**
 * Validar credenciales de admin
 */
export const validateAdminCredentials = async (
  username: string,
  password: string
): Promise<boolean> => {
  const envUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'admin'
  
  // Verificar username
  if (username !== envUsername) {
    return false
  }

  // Verificar password (si hay hash configurado)
  if (ADMIN_PASSWORD_HASH) {
    return await verifyPassword(password, ADMIN_PASSWORD_HASH)
  }

  // Fallback: contraseña por defecto (cambiar en producción)
  return password === 'admin123'
}

/**
 * Extraer token de header Authorization
 */
export const extractTokenFromHeader = (authHeader: string | null): string | null => {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  return authHeader.substring(7)
}

/**
 * Middleware: Verificar si usuario está autenticado
 */
export const isAuthenticatedRequest = (authHeader: string | null): boolean => {
  const token = extractTokenFromHeader(authHeader)
  if (!token) return false
  return verifyToken(token) !== null
}
