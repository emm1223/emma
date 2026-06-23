'use client'

import { mockProducts, mockCategories } from '@/lib/mockData'
import { useState } from 'react'
import { Search } from 'lucide-react'
import { sanitizeString, isSafeString } from '@/lib/security'

export default function ProductosPage() {
  const [filteredProducts, setFilteredProducts] = useState(mockProducts)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const handleCategoryFilter = (category: string) => {
    if (!isSafeString(category)) return
    setSelectedCategory(category)
    filterProducts(category, searchTerm)
  }

  const handleSearch = (term: string) => {
    const sanitizedTerm = sanitizeString(term).substring(0, 100)
    if (!isSafeString(sanitizedTerm)) return
    setSearchTerm(sanitizedTerm)
    filterProducts(selectedCategory, sanitizedTerm)
  }

  const filterProducts = (category: string, search: string) => {
    let filtered = mockProducts

    if (category && isSafeString(category)) {
      filtered = filtered.filter((p) => p.category === category)
    }

    if (search && isSafeString(search)) {
      const lowerSearch = search.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(lowerSearch) ||
          p.description.toLowerCase().includes(lowerSearch)
      )
    }

    setFilteredProducts(filtered)
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-neutral-900 mb-2 animate-fade-in">Nuestro Menú</h1>
          <p className="text-neutral-600 animate-slide-in-left delay-1">
            Selecciona los productos que deseas. Entregaremos en la fecha que prefieras.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Search and Filters */}
        <div className="mb-12 animate-fade-in delay-2">
          <div className="relative mb-8 group">
            <Search className="absolute left-4 top-3 text-neutral-400 group-focus-within:text-red-700 transition-colors" size={20} />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              maxLength={100}
              className="w-full pl-12 pr-4 py-3 border-2 border-neutral-300 rounded-lg focus:outline-none focus:border-red-700 focus:ring-0 bg-white hover:border-neutral-400 transition-all"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleCategoryFilter('')}
              className={`px-6 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                !selectedCategory
                  ? 'bg-gradient-to-r from-red-700 to-red-800 text-white shadow-lg hover:shadow-xl scale-105'
                  : 'bg-white text-neutral-900 border-2 border-neutral-300 hover:border-red-700 hover:shadow-lg'
              }`}
            >
              Todos
            </button>
            {mockCategories.map((cat, idx) => (
              <button
                key={cat}
                onClick={() => handleCategoryFilter(cat)}
                className={`px-6 py-2 rounded-lg font-medium text-sm transition-all duration-300 animate-slide-in-up ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-red-700 to-red-800 text-white shadow-lg hover:shadow-xl'
                    : 'bg-white text-neutral-900 border-2 border-neutral-300 hover:border-red-700 hover:shadow-lg'
                }`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, idx) => (
            <div key={product.id} className={`group card animate-scale-in`} style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="bg-gradient-to-br from-neutral-200 to-neutral-300 rounded-lg aspect-square mb-6 overflow-hidden flex items-center justify-center text-neutral-500 text-sm font-medium relative group-hover:shadow-inner transition-all">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/0 to-red-600/0 group-hover:from-red-600/10 group-hover:to-red-600/20 transition-all" />
                Imagen
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2 group-hover:text-red-700 transition-colors">
                  {sanitizeString(product.name)}
                </h3>
                <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
                  {sanitizeString(product.description)}
                </p>
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <p className="text-xs text-neutral-500 mb-1">Precio</p>
                    <p className="text-2xl font-bold bg-gradient-to-r from-red-700 to-red-600 bg-clip-text text-transparent">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-neutral-500 mb-1">Disponible</p>
                    <p className={`font-semibold ${product.stock > 5 ? 'text-green-600' : 'text-orange-600'}`}>
                      {product.stock > 0 ? `${product.stock}` : 'Sin stock'}
                    </p>
                  </div>
                </div>
                <button 
                  disabled={product.stock === 0}
                  className={`w-full py-3 rounded-lg font-semibold text-sm transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                    product.stock > 0
                      ? 'bg-gradient-to-r from-red-700 to-red-800 text-white shadow-lg hover:shadow-xl hover:-translate-y-1'
                      : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                  }`}
                >
                  {product.stock > 0 ? 'Agregar al Carrito' : 'Sin Stock'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <p className="text-neutral-500 text-lg">No se encontraron productos</p>
          </div>
        )}
      </div>
    </div>
  )
}
