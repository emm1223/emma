'use client'

import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'

export default function CarritoPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-neutral-900">Tu Carrito</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Empty State */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg border border-neutral-300 p-12 text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-neutral-200 rounded-full flex items-center justify-center">
                <ShoppingCart className="text-neutral-400" size={32} />
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-3">
              Carrito Vacío
            </h2>
            <p className="text-neutral-600 mb-8">
              Aún no has agregado productos a tu carrito. Explora nuestro menú y agrega los productos que deseas.
            </p>
            <Link
              href="/productos"
              className="inline-block px-8 py-3 bg-red-700 hover:bg-red-800 text-white font-semibold rounded-lg transition"
            >
              Ver Menú Completo
            </Link>
          </div>

          {/* Help Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-neutral-900 mb-8">
              ¿Cómo hacer tu pedido?
            </h3>

            <div className="bg-white rounded-lg border border-neutral-300 p-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-red-700 text-white font-bold text-lg">
                    1
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-neutral-900 mb-2">
                    Explora el Menú
                  </h4>
                  <p className="text-neutral-600">
                    Navega a nuestro menú y conoce todos los productos que ofrecemos. Cada uno preparado con ingredientes frescos de calidad.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-neutral-300 p-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-red-700 text-white font-bold text-lg">
                    2
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-neutral-900 mb-2">
                    Agrega Productos
                  </h4>
                  <p className="text-neutral-600">
                    Selecciona la cantidad que necesitas y agrega los productos al carrito. Puedes agregar todo lo que quieras.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-neutral-300 p-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-red-700 text-white font-bold text-lg">
                    3
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-neutral-900 mb-2">
                    Agendar Entrega
                  </h4>
                  <p className="text-neutral-600">
                    Elige la fecha y hora que prefieras para que te entreguemos tus productos. Te llegará exactamente cuando lo pediste.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
