/**
 * API Route: Admin Logout
 * POST /api/auth/logout
 */

import { NextResponse } from 'next/server'
import { createSecureResponse } from '@/lib/securityHeaders'

export async function POST() {
  try {
    // Crear response
    const response = NextResponse.json({
      success: true,
      message: 'Logout exitoso',
    })

    // Eliminar cookie
    response.cookies.set({
      name: 'adminToken',
      value: '',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Error al desloguear',
      },
      { status: 500 }
    )
  }
}
