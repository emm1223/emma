'use client'

import React from 'react'
import { ShoppingCart, Heart, Star } from 'lucide-react'
import Image from 'next/image'

interface ProductCardProps {
  product?: {
    id: string
    name: string
    description?: string
    price: number
    category?: string
    stock: number
    image?: string
  }
  id?: string
  name?: string
  description?: string
  price?: number
  category?: string
  stock?: number
  onAddToCart?: (productId: string, productName: string, price: number) => void
  isLoading?: boolean
  image?: string
}

export function ProductCard({
  product,
  id: propId,
  name: propName,
  description: propDesc,
  price: propPrice,
  stock: propStock,
  onAddToCart,
  isLoading = false,
  image: propImage,
}: ProductCardProps) {
  // Soportar ambos formatos: producto como prop o propiedades individuales
  const id = product?.id || propId || ''
  const name = product?.name || propName || ''
  const description = product?.description || propDesc || ''
  const price = product?.price || propPrice || 0
  const stock = product?.stock || propStock || 0
  const image = product?.image || propImage

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(id, name, price)
    }
  }

  return (
    <div className="card card-hover group animate-scale-in">
      {/* Image Container */}
      <div className="card-image relative">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/10 z-10 group-hover:opacity-0 transition-opacity duration-300" />
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            priority={false}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={(e) => {
              e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"%3E%3Crect fill="%23f3f4f6" width="300" height="200"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%239ca3af" font-size="16" font-family="sans-serif"%3E🍕 Producto%3C/text%3E%3C/svg%3E'
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <span className="text-5xl">🍕</span>
          </div>
        )}
        
        {/* Stock Badge */}
        {stock > 0 && (
          <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            ✓ {stock} disponibles
          </div>
        )}
        {stock === 0 && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-white font-bold text-lg">AGOTADO</span>
          </div>
        )}

        {/* Heart Icon */}
        <button className="absolute top-3 left-3 bg-white rounded-full p-2 shadow-lg hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100 duration-300">
          <Heart className="w-5 h-5 text-red-600" />
        </button>
      </div>

      {/* Content */}
      <div className="space-y-3">
        <div>
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-red-600 transition-colors">
            {name}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
            />
          ))}
          <span className="text-xs text-gray-600 ml-2">(42 reviews)</span>
        </div>

        {/* Price */}
        <div className="flex items-end gap-2">
          <span className="text-3xl font-bold text-red-600">${price.toFixed(2)}</span>
          <span className="text-sm text-gray-500 line-through">$25.00</span>
        </div>

        {/* Button */}
        <button
          onClick={handleAddToCart}
          disabled={stock === 0 || isLoading}
          className="btn btn-primary w-full justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ShoppingCart className="w-5 h-5" />
          {stock > 0 ? 'Agregar' : 'Agotado'}
        </button>
      </div>
    </div>
  )
}

export default ProductCard
