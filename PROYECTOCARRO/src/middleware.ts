/**
 * Next.js Middleware
 * Se ejecuta en TODOS los requests (incluso estáticos)
 * Ubicado en src/middleware.ts
 */

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { securityHeaders } from '@/lib/securityHeaders'

export function middleware(request: NextRequest) {
  // Rutas protegidas que requieren admin
  const protectedPaths = ['/admin']
  const isProtectedPath = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))

  // Rutas de login (no protegidas)
  const loginPaths = ['/admin/login']
  const isLoginPath = loginPaths.some((path) => request.nextUrl.pathname === path)

  // Verificar autenticación si es ruta protegida
  if (isProtectedPath && !isLoginPath) {
    const token = request.cookies.get('adminToken')?.value

    if (!token) {
      // Redirigir a login si no hay token
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    // Aquí podrías verificar el token con verifyToken()
    // Si es inválido, redirigir a login
  }

  // Crear response (para poder agregar headers)
  let response = NextResponse.next()

  // Agregar headers de seguridad
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  // Headers adicionales para desarrollo
  if (process.env.NODE_ENV === 'development') {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
  }

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
