'use client'

import Link from 'next/link'
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useProducts } from '@/hooks/useProducts'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CarritoPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart()
  const { products } = useProducts()
  const router = useRouter()
  const [isCheckout, setIsCheckout] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    scheduledDate: '',
  })

  const getProductName = (productId: string) => {
    return products.find((p) => p.id === productId)?.name || 'Producto'
  }

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity)
    }
  }

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.phone || !formData.scheduledDate) {
      alert('Por favor completa todos los campos')
      return
    }

    // Guardar orden
    const order = {
      id: Date.now().toString(),
      items: items,
      totalPrice: total,
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      scheduledDate: formData.scheduledDate,
      status: 'pending',
      createdAt: new Date(),
    }

    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    orders.push(order)
    localStorage.setItem('orders', JSON.stringify(orders))

    alert('¡Pedido confirmado! Te contactaremos pronto para confirmar los detalles.')
    clearCart()
    router.push('/')
  }

  if (items.length === 0 && !isCheckout) {
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
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-neutral-900">Tu Carrito</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="bg-white border border-neutral-300 rounded-lg p-6 flex gap-6 items-start hover:shadow-lg transition-shadow"
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-neutral-200 to-neutral-300 rounded-lg flex items-center justify-center text-neutral-400 text-sm">
                    Imagen
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-neutral-900 text-lg">
                      {getProductName(item.productId)}
                    </h3>
                    <p className="text-2xl font-bold text-red-700 my-2">
                      ${item.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                        className="p-1 hover:bg-neutral-200 rounded transition"
                      >
                        <Minus size={18} />
                      </button>
                      <span className="px-4 py-1 bg-neutral-100 rounded">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                        className="p-1 hover:bg-neutral-200 rounded transition"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-neutral-600 mb-2">Subtotal</p>
                    <p className="text-2xl font-bold text-neutral-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="mt-4 text-red-700 hover:text-red-800 font-semibold flex items-center gap-2"
                    >
                      <Trash2 size={18} /> Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/productos"
              className="block mt-6 text-center px-6 py-3 bg-white border-2 border-neutral-300 hover:border-red-700 text-neutral-900 font-semibold rounded-lg transition"
            >
              Continuar Comprando
            </Link>
          </div>

          {/* Checkout */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-neutral-300 rounded-lg p-8 sticky top-20">
              <h2 className="text-2xl font-bold text-neutral-900 mb-6">Resumen</h2>

              {!isCheckout ? (
                <>
                  <div className="mb-6 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Subtotal:</span>
                      <span className="font-semibold">${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Envío:</span>
                      <span className="font-semibold">Gratis</span>
                    </div>
                    <div className="border-t border-neutral-300 pt-3 flex justify-between">
                      <span className="font-bold text-neutral-900">Total:</span>
                      <span className="font-bold text-2xl text-red-700">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsCheckout(true)}
                    className="w-full bg-gradient-to-r from-red-700 to-red-800 text-white font-bold py-3 rounded-lg hover:shadow-lg transition-all"
                  >
                    Proceder a Pagar
                  </button>
                </>
              ) : (
                <form onSubmit={handleCheckout} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Nombre completo"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-red-700"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-red-700"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Teléfono"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-red-700"
                    required
                  />
                  <input
                    type="date"
                    value={formData.scheduledDate}
                    onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-red-700"
                    required
                  />

                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition"
                  >
                    Confirmar Pedido
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsCheckout(false)}
                    className="w-full bg-neutral-300 hover:bg-neutral-400 text-neutral-900 font-bold py-2 rounded-lg transition"
                  >
                    Volver
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
