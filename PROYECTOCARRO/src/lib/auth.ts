/**
 * Auth & Security Utilities
 * Manejo de autenticación, JWT, hashing de contraseñas
 */

import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import type { SignOptions, JwtPayload } from 'jsonwebtoken'

const JWT_SECRET: string = process.env.JWT_SECRET || 'fallback-secret-key-change-in-production'
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || ''

/**
 * Generar hash de contraseña (usar en setup inicial)
 */
export const hashPassword = async (password: string): Promise<string> => {
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
 * Generar JWT token para admin
 */
export const generateToken = (username: string, expiresIn: string | number = '24h'): string => {
  return jwt.sign(
    { username, iat: Date.now() },
    JWT_SECRET,
    { expiresIn: expiresIn as any }
  )
}

/**
 * Verificar y decodificar JWT token
 */
export const verifyToken = (token: string): { username: string; iat: number } | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload
    return {
      username: (decoded.username as string) || '',
      iat: (decoded.iat as number) || 0,
    }
  } catch {
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
