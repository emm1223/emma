'use client'

import Link from 'next/link'
import { ShoppingCart, Menu, X, Zap, Clock, Heart } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { useCart } from '@/context/CartContext'

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { items } = useCart()
  const cartCount = items.length

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-neutral-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-3 lg:px-8">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2 hover:scale-105 transition-transform">
              <div className="w-10 h-10">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <circle cx="100" cy="100" r="95" fill="#fff5f5" stroke="#dc2626" strokeWidth="2"/>
                  <g>
                    <path d="M 60 70 Q 100 40, 140 70" stroke="#dc2626" strokeWidth="4" fill="none" strokeLinecap="round"/>
                    <rect x="50" y="75" width="100" height="70" rx="5" fill="none" stroke="#dc2626" strokeWidth="3"/>
                    <circle cx="70" cy="155" r="8" fill="none" stroke="#dc2626" strokeWidth="3"/>
                    <circle cx="130" cy="155" r="8" fill="none" stroke="#dc2626" strokeWidth="3"/>
                    <line x1="78" y1="155" x2="122" y2="155" stroke="#dc2626" strokeWidth="2"/>
                  </g>
                  <g>
                    <ellipse cx="75" cy="110" rx="12" ry="15" fill="#f97316" opacity="0.8"/>
                    <path d="M 75 95 Q 82 105, 75 125" stroke="#ea580c" strokeWidth="1" fill="none"/>
                    <ellipse cx="100" cy="105" rx="12" ry="15" fill="#f97316" opacity="0.8"/>
                    <path d="M 100 90 Q 107 100, 100 120" stroke="#ea580c" strokeWidth="1" fill="none"/>
                    <rect x="115" y="100" width="18" height="20" rx="2" fill="#fbbf24" opacity="0.8"/>
                    <path d="M 115 100 L 124 90 L 133 100" fill="#f59e0b" opacity="0.8"/>
                  </g>
                </svg>
              </div>
              <span className="hidden sm:inline text-xl font-bold text-red-700">El Carrito Rojo</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-neutral-900 hover:text-red-700 transition-colors font-medium">
                Inicio
              </Link>
              <Link href="/productos" className="text-neutral-900 hover:text-red-700 transition-colors font-medium">
                Productos
              </Link>
              <Link href="/about" className="text-neutral-900 hover:text-red-700 transition-colors font-medium">
                Nosotros
              </Link>
              <Link href="/admin" className="text-neutral-900 hover:text-red-700 transition-colors font-medium">
                Administración
              </Link>
              <Link href="/carrito" className="relative group">
                <ShoppingCart className="text-red-700 group-hover:scale-110 transition-transform" size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-700 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-neutral-900"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {menuOpen && (
            <div className="md:hidden bg-white border-t border-neutral-200 p-4 space-y-4 animate-slide-in-up">
              <Link href="/" className="block text-neutral-900 hover:text-red-700 transition-colors font-medium">
                Inicio
              </Link>
              <Link href="/productos" className="block text-neutral-900 hover:text-red-700 transition-colors font-medium">
                Productos
              </Link>
              <Link href="/about" className="block text-neutral-900 hover:text-red-700 transition-colors font-medium">
                Nosotros
              </Link>
              <Link href="/admin" className="block text-neutral-900 hover:text-red-700 transition-colors font-medium">
                Administración
              </Link>
              <Link href="/carrito" className="block text-neutral-900 hover:text-red-700 transition-colors font-medium flex items-center gap-2">
                <ShoppingCart size={20} /> Carrito
              </Link>
            </div>
          )}
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-28">
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/5 via-transparent to-red-900/10 pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <div className="inline-block mb-6 px-4 py-2 bg-red-100 text-red-700 rounded-full font-semibold text-sm">
                  ✨ Comidas Caseras Auténticas
                </div>
                
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  Comidas Caseras de Calidad
                </h1>

                <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                  Cada receta preparada con dedicación. Empandas, pasteles, bandejas y especialidades caseras que te traeremos en la fecha que prefieras.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/productos"
                    className="btn-primary inline-flex items-center justify-center gap-2 hover:shadow-2xl"
                  >
                    <Zap size={20} />
                    Ver Menú
                  </Link>
                  <Link
                    href="/admin"
                    className="btn-secondary inline-flex items-center justify-center gap-2 hover:scale-105"
                  >
                    Panel de Administración
                  </Link>
                </div>
              </div>

              <div className="hidden md:block relative h-96">
                <div className="absolute inset-0 bg-gradient-to-br from-red-700/20 to-red-900/20 rounded-2xl blur-3xl animate-pulse" />
                <div className="relative h-full bg-gradient-to-br from-red-600 to-red-900 rounded-2xl shadow-2xl flex items-center justify-center text-white text-6xl font-bold animate-bounce-in">
                  🍲
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="section-header text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                <span>¿Por qué elegirnos?</span>
              </h2>
              <p className="text-neutral-600 max-w-2xl mx-auto text-lg">
                Nos especializamos en comidas caseras de excelente calidad, preparadas con ingredientes frescos y entregas puntuales.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: 'Productos Frescos',
                  description: 'Preparamos cada producto el mismo día. Sin conservantes, sin preservantes. Solo ingredientes de calidad.',
                  delay: 'delay-1'
                },
                {
                  icon: Clock,
                  title: 'Entrega Puntual',
                  description: 'Agendamos entregas según tu disponibilidad. Llegamos en la fecha y hora acordada sin excusas.',
                  delay: 'delay-2'
                },
                {
                  icon: Heart,
                  title: 'Recetas Tradicionales',
                  description: 'Heredamos las mejores recetas. Preparadas con dedicación, como en casa, con amor.',
                  delay: 'delay-3'
                },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className={`feature-box group animate-slide-in-up ${feature.delay}`}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="text-white" size={28} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-red-700 transition-colors">{feature.title}</h3>
                  <p className="text-neutral-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-700 via-red-800 to-red-900 opacity-95" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2760%27%20height=%2760%27%20viewBox=%270%200%2060%2060%27%20xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg%20fill=%27none%27%20fill-rule=%27evenodd%27%3E%3Cg%20fill=%27%23ffffff%27%20fill-opacity=%270.05%27%3E%3Cpath%20d=%27M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%27/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-10" />
          
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Haz tu pedido ahora
            </h2>
            <p className="text-xl text-white/90 mb-10">
              Explora nuestro menú y elige los productos que deseas. Agendamos la entrega para cuando más te convenga.
            </p>
            <Link
              href="/productos"
              className="inline-block px-10 py-4 bg-white text-red-700 font-semibold rounded-lg hover:bg-neutral-100 hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              Explorar Menú Completo
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div className="animate-fade-in delay-1">
              <h3 className="text-xl font-bold mb-4 text-red-400">El Carrito Rojo</h3>
              <p className="text-neutral-400">
                Comidas caseras de calidad, entregadas en tu puerta.
              </p>
            </div>

            <div className="animate-fade-in delay-2">
              <h3 className="text-xl font-bold mb-4 text-red-400">Navegación</h3>
              <ul className="space-y-2 text-neutral-400">
                <li><Link href="/" className="hover:text-red-400 transition-colors">Inicio</Link></li>
                <li><Link href="/productos" className="hover:text-red-400 transition-colors">Productos</Link></li>
                <li><Link href="/admin" className="hover:text-red-400 transition-colors">Admin</Link></li>
              </ul>
            </div>

            <div className="animate-fade-in delay-3">
              <h3 className="text-xl font-bold mb-4 text-red-400">Información</h3>
              <p className="text-neutral-400">
                Operamos de lunes a sábado
              </p>
            </div>
          </div>

          <div className="border-t border-neutral-800 pt-8">
            <p className="text-center text-neutral-500">
              © 2024 El Carrito Rojo. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
