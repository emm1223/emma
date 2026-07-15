'use client'

import React from 'react'
import { Trash2, Plus, Minus } from 'lucide-react'

interface CartItemProps {
  productId: string
  productName: string
  price: number
  quantity: number
  onUpdateQuantity: (quantity: number) => void
  onRemove: () => void
}

export function CartItem({
  productName,
  price,
  quantity,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  const subtotal = price * quantity

  return (
    <div className="bg-white border border-neutral-300 rounded-lg p-6 flex gap-6 items-start hover:shadow-lg transition-shadow">
      {/* Image Placeholder */}
      <div className="w-24 h-24 bg-gradient-to-br from-neutral-200 to-neutral-300 rounded-lg flex items-center justify-center text-neutral-400 text-sm flex-shrink-0">
        Imagen
      </div>

      {/* Product Info */}
      <div className="flex-1">
        <h3 className="font-semibold text-neutral-900 text-lg mb-2">{productName}</h3>
        <p className="text-2xl font-bold text-red-700 mb-4">${price.toFixed(2)}</p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onUpdateQuantity(Math.max(1, quantity - 1))}
            className="p-1 hover:bg-neutral-200 rounded transition"
            aria-label="Decrease quantity"
          >
            <Minus size={18} className="text-neutral-700" />
          </button>
          <span className="px-4 py-1 bg-neutral-100 rounded font-semibold text-neutral-900 min-w-[50px] text-center">
            {quantity}
          </span>
          <button
            onClick={() => onUpdateQuantity(quantity + 1)}
            className="p-1 hover:bg-neutral-200 rounded transition"
            aria-label="Increase quantity"
          >
            <Plus size={18} className="text-neutral-700" />
          </button>
        </div>
      </div>

      {/* Subtotal & Remove */}
      <div className="text-right">
        <p className="text-sm text-neutral-600 mb-2">Subtotal</p>
        <p className="text-2xl font-bold text-neutral-900 mb-4">${subtotal.toFixed(2)}</p>
        <button
          onClick={onRemove}
          className="text-red-700 hover:text-red-800 font-semibold flex items-center gap-2 hover:bg-red-50 px-3 py-2 rounded transition"
        >
          <Trash2 size={18} />
          Eliminar
        </button>
      </div>
    </div>
  )
}
