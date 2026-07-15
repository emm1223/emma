/**
 * API Route: Refresh Access Token
 * POST /api/auth/refresh
 * 
 * Intercambiar refresh token por nuevo access token
 * Usado cuando el access token expira (después de 15 minutos)
 */

import { NextRequest, NextResponse } from 'next/server'
import { refreshAccessToken } from '@/lib/auth'
import { getClientIP } from '@/lib/rateLimit'
import { logAuditEvent } from '@/lib/auditLog'
import { logSecurityEvent } from '@/lib/logging'

export async function POST(request: NextRequest) {
  try {
    const clientIP = getClientIP(request)
    const userAgent = request.headers.get('user-agent') || 'unknown'

    // Obtener refresh token del body o cookie
    let refreshToken: string | null = null

    // Intentar obtener del body (formato JSON)
    try {
      const body = await request.json()
      refreshToken = body.refreshToken
    } catch {
      // Si falla JSON, es OK
    }

    // Si no está en body, intentar de la cookie
    if (!refreshToken) {
      refreshToken = request.cookies.get('refreshToken')?.value || null
    }

    if (!refreshToken) {
      logSecurityEvent('/api/auth/refresh', 'Missing refresh token', { ip: clientIP })
      logAuditEvent('TOKEN_INVALID',
        { reason: 'Missing refresh token', endpoint: '/api/auth/refresh' },
        { ip: clientIP, userAgent, severity: 'WARNING' }
      )

      return NextResponse.json(
        {
          success: false,
          message: 'Refresh token requerido',
          error: 'MISSING_REFRESH_TOKEN',
        },
        { status: 401 }
      )
    }

    // Generar nuevo access token
    const newAccessToken = refreshAccessToken(refreshToken)

    if (!newAccessToken) {
      logSecurityEvent('/api/auth/refresh', 'Invalid refresh token', { ip: clientIP })
      logAuditEvent('TOKEN_INVALID',
        { reason: 'Invalid refresh token', endpoint: '/api/auth/refresh' },
        { ip: clientIP, userAgent, severity: 'WARNING' }
      )

      const response = NextResponse.json(
        {
          success: false,
          message: 'Refresh token inválido o expirado',
          error: 'INVALID_REFRESH_TOKEN',
        },
        { status: 401 }
      )

      // Limpiar cookies inválidas
      response.cookies.delete('adminToken')
      response.cookies.delete('refreshToken')

      return response
    }

    logAuditEvent('TOKEN_GENERATED',
      { type: 'refresh', endpoint: '/api/auth/refresh' },
      { ip: clientIP, userAgent, severity: 'INFO' }
    )

    // Crear response con nuevo access token
    const response = NextResponse.json(
      {
        success: true,
        message: 'Token refrescado',
        accessToken: newAccessToken,
      },
      { status: 200 }
    )

    // Actualizar access token cookie
    response.cookies.set({
      name: 'adminToken',
      value: newAccessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60, // 15 minutos
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Refresh token error:', error)

    logSecurityEvent('/api/auth/refresh', 'Unexpected error', {
      error: error instanceof Error ? error.message : 'Unknown error',
    })
    logAuditEvent('API_ERROR',
      { endpoint: '/api/auth/refresh', error: String(error) },
      { severity: 'ERROR' }
    )

    return NextResponse.json(
      {
        success: false,
        message: 'Error al refrescar token',
        error: 'INTERNAL_ERROR',
      },
      { status: 500 }
    )
  }
}
