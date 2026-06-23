/**
 * API Route: Get Products
 * GET /api/products
 * Public - sin autenticación pero con rate limiting
 */

import { NextRequest } from 'next/server'
import { checkRateLimit, getClientIP } from '@/lib/rateLimit'
import { createSecureResponse, createErrorResponse } from '@/lib/securityHeaders'

export async function GET(request: NextRequest) {
  try {
    // Rate limiting por IP
    const clientIP = getClientIP(request)
    const { allowed, remaining } = checkRateLimit(`products-${clientIP}`)

    if (!allowed) {
      return createErrorResponse('Rate limit excedido', 429)
    }

    // Aquí irían los productos desde la base de datos
    // Por ahora, retornar datos del localStorage (en client)
    const products = [
      {
        id: 'empanada-carne',
        name: 'Empanada de Carne',
        description: 'Empanada al horno recién hecha',
        price: 5000,
        stock: 100,
        category: 'Empanadas',
      },
    ]

    const response = createSecureResponse({
      success: true,
      data: products,
      total: products.length,
    })

    // Agregar headers de rate limit
    response.headers.set('X-RateLimit-Limit', String(100))
    response.headers.set('X-RateLimit-Remaining', String(remaining))
    response.headers.set('X-RateLimit-Reset', String(new Date().getTime() + 15 * 60 * 1000))

    return response
  } catch (error) {
    console.error('Get products error:', error)
    return createErrorResponse('Error al obtener productos', 500)
  }
}
