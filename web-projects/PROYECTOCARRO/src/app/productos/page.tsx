'use client'

import { mockCategories } from '@/lib/mockData'
import { useState } from 'react'
import { Search } from 'lucide-react'
import { sanitizeString, isSafeString } from '@/lib/security'
import { useCart } from '@/context/CartContext'
import { useProducts } from '@/hooks/useProducts'
import { ProductCard } from '@/components/ProductCard'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { generateOrderMessage } from '@/lib/whatsapp'

export default function ProductosPage() {
  const { products } = useProducts()
  const { addItem } = useCart()
  const [filteredProducts, setFilteredProducts] = useState(products.length > 0 ? products : [])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [addedNotification, setAddedNotification] = useState<string | null>(null)

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
    let filtered = products

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

  const handleAddToCart = (productId: string, productName: string, price: number) => {
    addItem({ productId, quantity: 1, price })
    setAddedNotification(productName)
    setTimeout(() => setAddedNotification(null), 2000)
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

        {/* Notification */}
        {addedNotification && (
          <div className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-slide-in-up">
            ✅ {addedNotification} agregado al carrito
          </div>
        )}

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={sanitizeString(product.name)}
              description={sanitizeString(product.description)}
              price={product.price}
              category={product.category}
              stock={product.stock}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <p className="text-neutral-500 text-lg">No se encontraron productos</p>
          </div>
        )}

        {/* WhatsApp CTA */}
        <div className="mt-16 bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-300 rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">¿Necesitas algo especial?</h2>
          <p className="text-neutral-600 mb-8 max-w-2xl mx-auto">
            Contacta con nosotros directamente por WhatsApp para consultas personalizadas, pedidos especiales o más información.
          </p>
          <WhatsAppButton 
            message={generateOrderMessage('Hola, tengo una consulta sobre los productos de El Carrito Rojo.')}
            text="Consultar por WhatsApp"
            className="mx-auto"
          />
        </div>
      </div>
    </div>
  )
}
