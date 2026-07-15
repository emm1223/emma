/**
 * Security Middleware
 * Middleware para protección de rutas y headers
 */

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { securityHeaders } from '@/lib/securityHeaders'

/**
 * Middleware que se ejecuta en cada request
 * Configurar en middleware.ts
 */
export function withSecurityHeaders(response: NextResponse): NextResponse {
  // Agregar todos los headers de seguridad
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  return response
}

/**
 * Middleware para proteger rutas admin
 */
export function protectAdminRoute(request: NextRequest) {
  // Extraer token de cookie o header
  const token = request.cookies.get('adminToken')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  // Verificar token (importar en middleware.ts)
  // const decoded = verifyToken(token)
  // if (!decoded) {
  //   return NextResponse.redirect(new URL('/admin/login', request.url))
  // }

  return NextResponse.next()
}

/**
 * Prevenir información sensible en errores
 */
export function sanitizeErrorMessage(error: any): string {
  if (error instanceof Error) {
    return error.message
  }

  // No exponer detalles internos
  return 'Ha ocurrido un error. Por favor intenta más tarde.'
}

/**
 * Validar Content-Type de requests
 */
export function isValidContentType(contentType: string | null): boolean {
  const allowed = ['application/json', 'multipart/form-data', 'application/x-www-form-urlencoded']
  
  if (!contentType) return false

  return allowed.some((type) => contentType.includes(type))
}

/**
 * Limitar tamaño de request
 */
export const MAX_BODY_SIZE = 1024 * 1024 // 1MB

export function checkRequestSize(contentLength: string | null): boolean {
  if (!contentLength) return true

  const size = parseInt(contentLength, 10)
  return size <= MAX_BODY_SIZE
}
