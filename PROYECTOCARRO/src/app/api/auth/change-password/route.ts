/**
 * API Route: Change Password
 * POST /api/auth/change-password
 * Requiere estar autenticado
 */

import { NextRequest } from 'next/server'
import { hashPassword, verifyPassword, extractTokenFromHeader, verifyToken } from '@/lib/auth'
import { createSecureResponse, createErrorResponse } from '@/lib/securityHeaders'
import { z } from 'zod'

const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(6),
  newPassword: z.string().min(8),
  confirmPassword: z.string().min(8),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
})

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticación
    const authHeader = request.headers.get('authorization')
    const token = extractTokenFromHeader(authHeader)

    if (!token || !verifyToken(token)) {
      return createErrorResponse('No autorizado', 401)
    }

    // Parsear body
    let body
    try {
      body = await request.json()
    } catch {
      return createErrorResponse('Body debe ser JSON válido', 400)
    }

    const parsed = ChangePasswordSchema.safeParse(body)
    if (!parsed.success) {
      return createErrorResponse('Datos inválidos', 400)
    }

    const { currentPassword, newPassword } = parsed.data

    // Verificar contraseña actual
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH || ''
    
    if (adminPasswordHash) {
      const isValid = await verifyPassword(currentPassword, adminPasswordHash)
      if (!isValid) {
        return createErrorResponse('Contraseña actual incorrecta', 401)
      }
    }

    // Hashear nueva contraseña
    const newHash = await hashPassword(newPassword)

    // En producción, guardar en base de datos
    // Por ahora, solo retornar instrucción
    console.log('Nueva contraseña hasheada:', newHash)

    return createSecureResponse({
      success: true,
      message: 'Contraseña actualizada. Guarda este hash en ADMIN_PASSWORD_HASH en .env.local',
      newHash: newHash,
    })
  } catch (error) {
    console.error('Change password error:', error)
    return createErrorResponse('Error interno', 500)
  }
}
