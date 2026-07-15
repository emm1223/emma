/**
 * API Route: Logs & Security Monitoring
 * GET /api/admin/logs - Ver logs de seguridad (requiere token admin)
 */

import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'
import { extractTokenFromHeader } from '@/lib/auth'
import { getSecurityAlerts, getLogs, clearLogs } from '@/lib/logging'
import { createErrorResponse } from '@/lib/securityHeaders'

export async function GET(request: NextRequest) {
  try {
    // Verificar autenticación
    const authHeader = request.headers.get('Authorization')
    const token = extractTokenFromHeader(authHeader)

    if (!token || !verifyToken(token)) {
      return createErrorResponse('No autorizado', 401)
    }

    // Query parameters
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') // 'all', 'alerts', 'security'
    const limit = parseInt(searchParams.get('limit') || '50', 10)
    const endpoint = searchParams.get('endpoint')

    let logs = []

    if (type === 'alerts') {
      logs = getSecurityAlerts().slice(-limit)
    } else if (type === 'security') {
      logs = getLogs({
        level: 'SECURITY',
        limit,
      })
    } else {
      logs = getLogs({
        endpoint: endpoint || undefined,
        limit,
      })
    }

    return NextResponse.json({
      success: true,
      count: logs.length,
      logs,
    })
  } catch (error) {
    console.error('Logs error:', error)
    return createErrorResponse('Error al obtener logs', 500)
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Verificar autenticación
    const authHeader = request.headers.get('Authorization')
    const token = extractTokenFromHeader(authHeader)

    if (!token || !verifyToken(token)) {
      return createErrorResponse('No autorizado', 401)
    }

    clearLogs()

    return NextResponse.json({
      success: true,
      message: 'Logs cleared',
    })
  } catch (error) {
    console.error('Clear logs error:', error)
    return createErrorResponse('Error al limpiar logs', 500)
  }
}
