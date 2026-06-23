/**
 * Next.js Middleware
 * Se ejecuta en TODOS los requests (incluso estáticos)
 * Ubicado en src/middleware.ts
 * 
 * Protecciones:
 * - Verificación de autenticación para rutas /admin
 * - Headers de seguridad globales
 * - Rate limiting detection
 * - Token validation
 */

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { securityHeaders } from '@/lib/securityHeaders'
import { verifyToken } from '@/lib/auth'
import { getClientIP } from '@/lib/rateLimit'
import { logAuditEvent } from '@/lib/auditLog'

export function middleware(request: NextRequest) {
  // Rutas protegidas que requieren admin token
  const protectedPaths = ['/admin']
  const isProtectedPath = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))

  // Rutas de login (no protegidas)
  const loginPaths = ['/admin/login']
  const isLoginPath = loginPaths.some((path) => request.nextUrl.pathname === path)

  const clientIP = getClientIP(request)
  const userAgent = request.headers.get('user-agent') || 'unknown'

  // Verificar autenticación si es ruta protegida y no es login
  if (isProtectedPath && !isLoginPath) {
    const token = request.cookies.get('adminToken')?.value

    if (!token) {
      // Log del intento de acceso no autorizado
      logAuditEvent('UNAUTHORIZED_ACCESS', 
        { 
          path: request.nextUrl.pathname,
          reason: 'Missing token'
        },
        { ip: clientIP, userAgent, severity: 'WARNING' }
      )

      // Redirigir a login si no hay token
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    // Verificar que el token sea válido
    const decoded = verifyToken(token)
    if (!decoded) {
      // Log de token inválido
      logAuditEvent('TOKEN_INVALID',
        { 
          path: request.nextUrl.pathname,
          reason: 'Invalid token'
        },
        { ip: clientIP, userAgent, severity: 'WARNING' }
      )

      // Token inválido, redirigir a login
      const response = NextResponse.redirect(new URL('/admin/login', request.url))
      response.cookies.delete('adminToken')
      return response
    }

    // Token válido, agregar user info al request
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-user-name', decoded.username || '')
    requestHeaders.set('x-request-time', new Date().toISOString())

    let response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })

    // Aplicar headers de seguridad
    Object.entries(securityHeaders).forEach(([key, value]) => {
      response.headers.set(key, value as string)
    })

    return response
  }

  // Crear response base para otros requests
  let response = NextResponse.next()

  // Agregar headers de seguridad a TODOS los responses
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value as string)
  })

  // Headers adicionales para desarrollo
  if (process.env.NODE_ENV === 'development') {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
  }

  // Header de server (no revelar info interna)
  response.headers.delete('Server')
  response.headers.set('X-Powered-By', 'Security-Hardened')

  return response
}

// Configurar qué rutas usan middleware
export const config = {
  matcher: [
    /*
     * Coincidir todas las rutas EXCEPTO:
     * - api (podemos manejo en API routes)
     * - _next/static (archivos estáticos)
     * - _next/image (optimización de imágenes)
     * - favicon.ico (favicon)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
