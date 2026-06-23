'use client'

import React from 'react'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'

interface ProductCardProps {
  id: string
  name: string
  description: string
  price: number
  category: string
  stock: number
  onAddToCart: (productId: string, productName: string, price: number) => void
  isLoading?: boolean
  image?: string
}

export function ProductCard({
  id,
  name,
  description,
  price,
  stock,
  onAddToCart,
  isLoading = false,
  image,
}: ProductCardProps) {
  return (
    <div className="bg-white border border-neutral-300 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      <div className="w-full h-48 bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center text-neutral-400 relative overflow-hidden group">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            priority={false}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="text-sm font-medium flex flex-col items-center gap-2">
            <span className="text-3xl">🍽️</span>
            <span>Imagen</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-neutral-900 mb-2 line-clamp-2">{name}</h3>
        <p className="text-sm text-neutral-600 mb-4 line-clamp-2">{description}</p>

        {/* Price & Stock */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-xs text-neutral-500 font-semibold mb-1">Precio</p>
            <p className="text-2xl font-bold text-red-700">${price.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-xs text-neutral-500 font-semibold mb-1">Disponible</p>
            <p
              className={`text-lg font-bold ${
                stock > 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {stock}
            </p>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={() => onAddToCart(id, name, price)}
          disabled={stock === 0 || isLoading}
          className="w-full py-3 bg-red-700 hover:bg-red-800 disabled:bg-neutral-300 text-white font-semibold rounded-lg transition duration-300 flex items-center justify-center gap-2"
        >
          <ShoppingCart size={18} />
          {stock > 0 ? 'Agregar al Carrito' : 'Agotado'}
        </button>
      </div>
    </div>
  )
}
