'use client'

import { useState } from 'react'
import { useProducts } from '@/hooks/useProducts'
import { useOrders } from '@/hooks/useProducts'
import { Plus, Trash2, AlertCircle, CheckCircle, ShoppingBag, Package } from 'lucide-react'
import { AddProductFormSchema } from '@/lib/validations'
import { sanitizeString, isSafeString } from '@/lib/security'

export default function AdminDashboard() {
  const { products, addProduct, deleteProduct } = useProducts()
  const { orders } = useOrders()
  const [tab, setTab] = useState<'products' | 'orders'>('products')
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    const maxLengths: { [key: string]: number } = {
      name: 100,
      description: 500,
      price: 10,
      category: 50,
      stock: 5,
    }

    if (maxLengths[name] && value.length > maxLengths[name]) {
      return
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      const validatedData = AddProductFormSchema.parse(formData)

      if (!isSafeString(validatedData.name) || !isSafeString(validatedData.description)) {
        setError('El producto contiene caracteres no permitidos')
        return
      }

      addProduct({
        name: sanitizeString(validatedData.name),
        description: sanitizeString(validatedData.description),
        price: parseFloat(validatedData.price),
        category: sanitizeString(validatedData.category),
        stock: parseInt(validatedData.stock),
        image: '',
      })

      setFormData({ name: '', description: '', price: '', category: '', stock: '' })
      setShowForm(false)
      setSuccess('✅ Producto agregado exitosamente')

      setTimeout(() => setSuccess(''), 3000)
    } catch (err: any) {
      if (err.errors && Array.isArray(err.errors)) {
        setError(err.errors[0]?.message || 'Error en la validación')
      } else {
        setError('Error al procesar el formulario')
      }
    }
  }

  const handleDeleteProduct = (productId: string) => {
    if (confirm('¿Eliminar este producto?')) {
      deleteProduct(productId)
      setSuccess('🗑️ Producto eliminado')
      setTimeout(() => setSuccess(''), 3000)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-bold text-neutral-900 mb-2">Panel de Administración</h1>
              <p className="text-neutral-600">
                Gestiona productos y órdenes de El Carrito Rojo
              </p>
            </div>
            {tab === 'products' && (
              <button
                onClick={() => {
                  setShowForm(!showForm)
                  setError('')
                }}
                className="px-6 py-3 bg-red-700 hover:bg-red-800 text-white font-semibold rounded-lg flex items-center gap-2 transition"
              >
                <Plus size={20} />
                Nuevo Producto
              </button>
            )}
          </div>

          {/* Tabs */}
          <div className="flex gap-4 border-b border-neutral-300">
            <button
              onClick={() => setTab('products')}
              className={`px-6 py-3 font-semibold flex items-center gap-2 transition-colors ${
                tab === 'products'
                  ? 'text-red-700 border-b-2 border-red-700'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Package size={20} />
              Productos ({products.length})
            </button>
            <button
              onClick={() => setTab('orders')}
              className={`px-6 py-3 font-semibold flex items-center gap-2 transition-colors ${
                tab === 'orders'
                  ? 'text-red-700 border-b-2 border-red-700'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <ShoppingBag size={20} />
              Órdenes ({orders.length})
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
            <AlertCircle className="text-red-700 flex-shrink-0" size={20} />
            <div>
              <h3 className="font-semibold text-red-900">Error</h3>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex gap-3">
            <CheckCircle className="text-green-700 flex-shrink-0" size={20} />
            <p className="text-green-700 font-semibold">{success}</p>
          </div>
        )}

        {/* PRODUCTOS TAB */}
        {tab === 'products' && (
          <>
            {/* Form */}
            {showForm && (
              <div className="bg-white rounded-lg border border-neutral-300 p-8 mb-12">
                <h2 className="text-2xl font-bold text-neutral-900 mb-6">Agregar Nuevo Producto</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-neutral-900 mb-2">
                      Nombre del Producto
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Ej: Empandas de Pollo"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      maxLength={100}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-red-700"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-neutral-900 mb-2">
                      Descripción
                    </label>
                    <textarea
                      name="description"
                      placeholder="Describe el producto..."
                      required
                      value={formData.description}
                      onChange={handleInputChange}
                      maxLength={500}
                      rows={4}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-red-700"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-neutral-900 mb-2">
                        Precio ($)
                      </label>
                      <input
                        type="number"
                        name="price"
                        placeholder="0.00"
                        required
                        step="0.01"
                        min="0"
                        max="9999"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-red-700"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-neutral-900 mb-2">
                        Stock
                      </label>
                      <input
                        type="number"
                        name="stock"
                        placeholder="0"
                        required
                        min="0"
                        max="99999"
                        value={formData.stock}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-red-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-neutral-900 mb-2">
                      Categoría
                    </label>
                    <input
                      type="text"
                      name="category"
                      placeholder="Ej: Empanadas"
                      required
                      value={formData.category}
                      onChange={handleInputChange}
                      maxLength={50}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-red-700"
                    />
                  </div>

                  <div className="flex gap-3 pt-6">
                    <button
                      type="submit"
                      className="px-8 py-3 bg-red-700 hover:bg-red-800 text-white font-semibold rounded-lg transition"
                    >
                      Guardar Producto
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false)
                        setError('')
                      }}
                      className="px-8 py-3 border border-neutral-300 text-neutral-900 hover:bg-neutral-100 font-semibold rounded-lg transition"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Products Table */}
            <div className="bg-white rounded-lg border border-neutral-300 overflow-hidden">
              {products.length === 0 ? (
                <div className="p-12 text-center">
                  <Package size={48} className="mx-auto text-neutral-300 mb-4" />
                  <p className="text-neutral-600">No hay productos. Crea uno para empezar.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-neutral-50 border-b border-neutral-300">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">
                          Producto
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">
                          Categoría
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">
                          Precio
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">
                          Stock
                        </th>
                        <th className="px-6 py-4 text-right text-sm font-semibold text-neutral-900">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id} className="border-b border-neutral-200 hover:bg-neutral-50 transition">
                          <td className="px-6 py-4">
                            <p className="font-semibold text-neutral-900">{sanitizeString(product.name)}</p>
                            <p className="text-sm text-neutral-600 mt-1 line-clamp-1">
                              {sanitizeString(product.description)}
                            </p>
                          </td>
                          <td className="px-6 py-4 text-neutral-700">
                            {sanitizeString(product.category)}
                          </td>
                          <td className="px-6 py-4 font-semibold text-neutral-900">
                            ${product.price.toFixed(2)}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                product.stock > 10
                                  ? 'bg-green-100 text-green-800'
                                  : product.stock > 0
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {product.stock} unidades
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="text-red-700 hover:text-red-800 font-semibold flex items-center gap-1 ml-auto"
                            >
                              <Trash2 size={18} />
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}

        {/* ÓRDENES TAB */}
        {tab === 'orders' && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="bg-white rounded-lg border border-neutral-300 p-12 text-center">
                <ShoppingBag size={48} className="mx-auto text-neutral-300 mb-4" />
                <p className="text-neutral-600">No hay órdenes aún.</p>
              </div>
            ) : (
              orders.map((order: any) => (
                <div
                  key={order.id}
                  className="bg-white rounded-lg border border-neutral-300 p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-bold text-lg text-neutral-900 mb-4">
                        Orden #{order.id.slice(-6)}
                      </h3>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="font-semibold text-neutral-700">Cliente:</span>{' '}
                          {order.customerName}
                        </p>
                        <p>
                          <span className="font-semibold text-neutral-700">Email:</span>{' '}
                          {order.customerEmail}
                        </p>
                        <p>
                          <span className="font-semibold text-neutral-700">Teléfono:</span>{' '}
                          {order.customerPhone}
                        </p>
                        <p>
                          <span className="font-semibold text-neutral-700">Fecha de Entrega:</span>{' '}
                          {order.scheduledDate}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="mb-4">
                        <p className="text-sm text-neutral-600 mb-1">Total</p>
                        <p className="text-3xl font-bold text-red-700">
                          ${order.totalPrice.toFixed(2)}
                        </p>
                      </div>
                      <span
                        className={`px-4 py-2 rounded-full font-semibold text-sm inline-block ${
                          order.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {order.status === 'pending' ? '⏳ Pendiente' : '✅ Completada'}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-neutral-200">
                    <h4 className="font-semibold text-neutral-900 mb-3">Artículos</h4>
                    <div className="space-y-2">
                      {order.items.map((item: any) => (
                        <div
                          key={item.productId}
                          className="flex justify-between text-sm text-neutral-700"
                        >
                          <span>
                            {item.quantity}x {sanitizeString(item.productName || 'Producto')}
                          </span>
                          <span className="font-semibold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
