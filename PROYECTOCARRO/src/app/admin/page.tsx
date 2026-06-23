'use client'

import { useState } from 'react'
import { mockProducts } from '@/lib/mockData'
import { X, Plus, AlertCircle, CheckCircle } from 'lucide-react'
import { AddProductFormSchema } from '@/lib/validations'
import { sanitizeString, isSafeString } from '@/lib/security'

export default function AdminPage() {
  const [products, setProducts] = useState(mockProducts)
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

      const newProduct = {
        id: String(Date.now()),
        name: sanitizeString(validatedData.name),
        description: sanitizeString(validatedData.description),
        price: parseFloat(validatedData.price),
        category: sanitizeString(validatedData.category),
        stock: parseInt(validatedData.stock),
        image: '',
      }

      setProducts([...products, newProduct])
      setFormData({ name: '', description: '', price: '', category: '', stock: '' })
      setShowForm(false)
      setSuccess('Producto agregado exitosamente')

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
      setProducts(products.filter((p) => p.id !== productId))
      setSuccess('Producto eliminado')
      setTimeout(() => setSuccess(''), 3000)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-neutral-900 mb-2">Administración</h1>
              <p className="text-neutral-600">
                Gestiona todos los productos de El Carrito Rojo
              </p>
            </div>
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

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-lg border border-neutral-300 p-8 mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-neutral-900">Agregar Nuevo Producto</h2>
              <button
                onClick={() => {
                  setShowForm(false)
                  setError('')
                }}
                className="text-neutral-500 hover:text-neutral-900"
              >
                <X size={24} />
              </button>
            </div>

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
                {products.map((product, index) => (
                  <tr key={product.id} className={`border-b border-neutral-200 ${index === products.length - 1 ? 'border-b-0' : ''}`}>
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
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        product.stock > 10
                          ? 'bg-green-100 text-green-800'
                          : product.stock > 0
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="px-4 py-2 text-red-700 hover:bg-red-50 rounded-lg transition font-medium text-sm"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {products.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-neutral-500 text-lg">No hay productos agregados</p>
            </div>
          )}
        </div>

        <p className="text-neutral-600 text-sm mt-6">
          Total de productos: <span className="font-semibold text-neutral-900">{products.length}</span>
        </p>
      </div>
    </div>
  )
}
