/**
 * API Route: Admin Login
 * POST /api/auth/login
 * 
 * Mejoras de seguridad:
 * - Brute force protection (máximo 5 intentos en 15 minutos)
 * - Rate limiting por IP
 * - Refresh tokens (access token 15min, refresh token 7 días)
 * - Audit logging
 * - Validación Zod
 */

import { NextRequest, NextResponse } from 'next/server'
import { validateAdminCredentials, generateTokenPair } from '@/lib/auth'
import { checkRateLimit, getClientIP } from '@/lib/rateLimit'
import { recordFailedAttempt, recordSuccessfulAttempt, isAccountLocked, getAttemptsRemaining } from '@/lib/bruteForce'
import { logAuditEvent } from '@/lib/auditLog'
import { validateData, AdminLoginSchema } from '@/lib/validation'
import { logSecurityEvent, logAuthAttempt } from '@/lib/logging'

export async function POST(request: NextRequest) {
  try {
    // Obtener IP del cliente
    const clientIP = getClientIP(request)
    const userAgent = request.headers.get('user-agent') || 'unknown'

    // 1. Rate limiting por IP
    const { allowed: rateLimitAllowed, remaining: rateLimitRemaining } = checkRateLimit(`login-${clientIP}`)

    if (!rateLimitAllowed) {
      logSecurityEvent('/api/auth/login', 'Rate limit exceeded', { ip: clientIP })
      logAuditEvent('RATE_LIMIT_EXCEEDED', 
        { endpoint: '/api/auth/login', ip: clientIP },
        { ip: clientIP, userAgent, severity: 'WARNING' }
      )

      return NextResponse.json(
        {
          success: false,
          message: 'Demasiados intentos. Intenta más tarde.',
          error: 'RATE_LIMIT',
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Remaining': rateLimitRemaining.toString(),
            'Retry-After': '900',
          },
        }
      )
    }

    // 2. Parsear y validar body
    let body
    try {
      body = await request.json()
    } catch {
      logSecurityEvent('/api/auth/login', 'Invalid JSON body', { ip: clientIP })
      logAuditEvent('INVALID_INPUT',
        { reason: 'Invalid JSON', endpoint: '/api/auth/login' },
        { ip: clientIP, userAgent, severity: 'WARNING' }
      )

      return NextResponse.json(
        {
          success: false,
          message: 'Body debe ser JSON válido',
          error: 'INVALID_JSON',
        },
        { status: 400 }
      )
    }

    // 3. Validar con Zod
    const validation = validateData(AdminLoginSchema, body)
    if (!validation.valid) {
      logSecurityEvent('/api/auth/login', 'Validation failed', {
        ip: clientIP,
        errors: validation.errors,
      })
      logAuditEvent('INVALID_INPUT',
        { reason: 'Validation failed', errors: validation.errors },
        { ip: clientIP, userAgent, severity: 'WARNING' }
      )

      return NextResponse.json(
        {
          success: false,
          message: 'Datos inválidos',
          error: 'VALIDATION_ERROR',
        },
        { status: 400 }
      )
    }

    const { username, password } = validation.data as any
    const bruteForceKey = `login-${username}`

    // 4. Verificar brute force lock
    const lockStatus = isAccountLocked(bruteForceKey)
    if (lockStatus.locked) {
      const remainingMinutes = Math.ceil(lockStatus.remainingTime / 60000)
      
      logSecurityEvent('/api/auth/login', 'Account locked due to brute force', {
        ip: clientIP,
        username,
        remainingTime: lockStatus.remainingTime,
      })
      logAuditEvent('LOGIN_BRUTE_FORCE',
        { username, ip: clientIP, remainingMinutes },
        { userId: username, ip: clientIP, userAgent, severity: 'CRITICAL' }
      )

      return NextResponse.json(
        {
          success: false,
          message: `Cuenta bloqueada. Intenta en ${remainingMinutes} minutos.`,
          error: 'ACCOUNT_LOCKED',
        },
        {
          status: 429,
          headers: {
            'Retry-After': lockStatus.remainingTime.toString(),
          },
        }
      )
    }

    // 5. Validar credenciales
    const isValid = await validateAdminCredentials(username, password)

    if (!isValid) {
      // Registrar intento fallido
      recordFailedAttempt(bruteForceKey)
      const attemptsRemaining = getAttemptsRemaining(bruteForceKey)

      logAuthAttempt(username, false, clientIP)
      logAuditEvent('LOGIN_FAILED',
        { username, ip: clientIP, attemptsRemaining },
        { userId: username, ip: clientIP, userAgent, severity: 'WARNING' }
      )

      return NextResponse.json(
        {
          success: false,
          message: 'Credenciales inválidas',
          error: 'INVALID_CREDENTIALS',
          attemptsRemaining: attemptsRemaining > 0 ? attemptsRemaining : 0,
        },
        { status: 401 }
      )
    }

    // 6. Login exitoso - limpiar intentos fallidos
    recordSuccessfulAttempt(bruteForceKey)

    // 7. Generar tokens (access + refresh)
    const { accessToken, refreshToken } = generateTokenPair(username)

    logAuthAttempt(username, true, clientIP)
    logAuditEvent('LOGIN_SUCCESS',
      { username, ip: clientIP },
      { userId: username, ip: clientIP, userAgent, severity: 'INFO' }
    )

    // 8. Crear response con cookies seguras
    const response = NextResponse.json(
      {
        success: true,
        message: 'Login exitoso',
        accessToken,
        refreshToken,
      },
      { status: 200 }
    )

    // 9. Agregar cookies HTTP-only y secure
    // Access token cookie (corta duración)
    response.cookies.set({
      name: 'adminToken',
      value: accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60, // 15 minutos
      path: '/',
    })

    // Refresh token cookie (larga duración)
    response.cookies.set({
      name: 'refreshToken',
      value: refreshToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 días
      path: '/api/auth/refresh',
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    
    logSecurityEvent('/api/auth/login', 'Unexpected error', {
      error: error instanceof Error ? error.message : 'Unknown error',
    })
    logAuditEvent('API_ERROR',
      { 
        endpoint: '/api/auth/login',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { severity: 'ERROR' }
    )

    return NextResponse.json(
      {
        success: false,
        message: 'Error interno del servidor',
        error: 'INTERNAL_ERROR',
      },
      { status: 500 }
    )
  }
}
