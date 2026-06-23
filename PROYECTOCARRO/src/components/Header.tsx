'use client'

import Link from 'next/link'
import { ShoppingCart, Menu, X, Heart, Search } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import Image from 'next/image'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { items } = useCart()
  const cartCount = items.length

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b-2 border-red-100 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-orange-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">🍕</span>
              </div>
              <span className="hidden sm:inline text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">
                Carrito Rojo
              </span>
            </Link>

            {/* Navegación Desktop */}
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-gray-700 hover:text-red-600 font-semibold transition-colors">
                Inicio
              </Link>
              <Link href="/productos" className="text-gray-700 hover:text-red-600 font-semibold transition-colors">
                Productos
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-red-600 font-semibold transition-colors">
                Nosotros
              </Link>
            </nav>

            {/* Acciones Derecha */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <button 
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                aria-label="Search"
              >
                <Search className="w-6 h-6 text-gray-700" />
              </button>

              {/* Carrito */}
              <Link href="/carrito" className="relative p-2 hover:bg-red-50 rounded-lg transition-colors">
                <ShoppingCart className="w-6 h-6 text-gray-700" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 w-6 h-6 bg-red-600 text-white rounded-full text-xs flex items-center justify-center font-bold animate-pulse-ring">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Menú Mobile */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-red-50 rounded-lg transition-colors"
                aria-label="Menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-gray-700" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>

          {/* Barra de búsqueda expandible */}
          {searchOpen && (
            <div className="pb-4 animate-slide-in-up">
              <input
                type="text"
                placeholder="Buscar productos..."
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-red-600 focus:outline-none"
              />
            </div>
          )}
        </div>

        {/* Menú Mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t-2 border-red-100 bg-gray-50 animate-slide-in-up">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-3">
              <Link href="/" className="block px-4 py-2 hover:bg-red-50 rounded-lg font-semibold text-gray-700">
                Inicio
              </Link>
              <Link href="/productos" className="block px-4 py-2 hover:bg-red-50 rounded-lg font-semibold text-gray-700">
                Productos
              </Link>
              <Link href="/about" className="block px-4 py-2 hover:bg-red-50 rounded-lg font-semibold text-gray-700">
                Nosotros
              </Link>
              <Link href="/carrito" className="block px-4 py-2 hover:bg-red-50 rounded-lg font-semibold text-gray-700">
                Carrito
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
