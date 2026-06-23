/**
 * API Route: Admin Login
 * POST /api/auth/login
 */

import { NextRequest, NextResponse } from 'next/server'
import { validateAdminCredentials, generateToken } from '@/lib/auth'
import { checkRateLimit, getClientIP } from '@/lib/rateLimit'
import { createSecureResponse, createErrorResponse } from '@/lib/securityHeaders'
import { logAuthAttempt, logRateLimit, logSecurityEvent } from '@/lib/logging'
import { validateData, AdminLoginSchema } from '@/lib/validation'
import { z } from 'zod'

// Schema de validación
const LoginSchema = AdminLoginSchema

export async function POST(request: NextRequest) {
  try {
    // Rate limiting por IP
    const clientIP = getClientIP(request)
    const { allowed, remaining } = checkRateLimit(`login-${clientIP}`)

    if (!allowed) {
      logRateLimit(clientIP, '/api/auth/login')
      return createErrorResponse(
        'Demasiados intentos de login. Intenta más tarde.',
        429,
        { 'X-RateLimit-Remaining': remaining.toString() }
      )
    }

    // Parsear y validar body
    let body
    try {
      body = await request.json()
    } catch {
      logSecurityEvent('/api/auth/login', 'Invalid JSON body', { ip: clientIP })
      return createErrorResponse('Body debe ser JSON válido', 400)
    }

    const validation = validateData(LoginSchema, body)
    if (!validation.valid) {
      logSecurityEvent('/api/auth/login', 'Validation failed', {
        ip: clientIP,
        errors: validation.errors,
      })
      return createErrorResponse('Datos inválidos: ' + validation.errors?.[0], 400)
    }

    const { username, password } = validation.data as any

    // Validar credenciales
    const isValid = await validateAdminCredentials(username, password)
    
    if (!isValid) {
      logAuthAttempt(username, false, clientIP)
      return createErrorResponse('Credenciales inválidas', 401)
    }

    // Login exitoso
    logAuthAttempt(username, true, clientIP)

    // Generar token
    const token = generateToken(username)

    // Crear response con NextResponse para poder usar cookies
    const response = NextResponse.json(
      {
        success: true,
        message: 'Login exitoso',
        token,
      },
      { status: 200 }
    )

    // Agregar cookie secure
    response.cookies.set({
      name: 'adminToken',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60, // 24 horas
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    logSecurityEvent('/api/auth/login', 'Unexpected error', {
      error: error instanceof Error ? error.message : 'Unknown error',
    })
    return createErrorResponse('Error interno del servidor', 500)
  }
}
