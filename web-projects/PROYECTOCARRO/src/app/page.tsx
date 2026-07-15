'use client'

import Link from 'next/link'
import Header from '@/components/Header'
import { ChevronRight, Star, Truck, Shield, Zap } from 'lucide-react'
import { useProducts } from '@/hooks/useProducts'

export default function Home() {
  const { products } = useProducts()
  const featuredProducts = products.slice(0, 3)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* ==================== HERO SECTION ==================== */}
      <section className="relative overflow-hidden pt-20 md:pt-32 pb-12 md:pb-24">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-orange-50 -z-10" />
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10 transform -translate-x-1/2" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left content */}
            <div className="animate-fade-in-left space-y-6 md:space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-red-100 text-red-700 text-sm font-semibold">
                  <Zap className="w-4 h-4" />
                  Comidas Caseras Auténticas
                </div>
                
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold">
                  <span className="block text-gray-900">Delicious</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">Food Delivery</span>
                </h1>

                <p className="text-lg md:text-xl text-gray-600 max-w-lg">
                  La mejor comida casera de tu ciudad, entregada en la fecha que prefieras. Empandas, pasteles, bandejas y más.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/productos">
                  <button className="btn btn-primary btn-lg w-full sm:w-auto hover:shadow-2xl">
                    Ver Menú
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </Link>
                <button className="btn btn-secondary btn-lg w-full sm:w-auto hover:bg-red-50">
                  Contactar
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 md:gap-6 pt-8">
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-red-600">1000+</div>
                  <div className="text-sm text-gray-600">Clientes</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-red-600">500+</div>
                  <div className="text-sm text-gray-600">Productos</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-red-600">5.0</div>
                  <div className="text-sm text-gray-600">Estrellas</div>
                </div>
              </div>
            </div>

            {/* Right image */}
            <div className="relative animate-fade-in-right">
              <div className="relative h-96 md:h-96 rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                <span className="text-9xl">🍲</span>
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl p-4 shadow-xl animate-float hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center">
                    <Truck className="w-8 h-8 text-red-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Envío Gratis</div>
                    <div className="text-sm text-gray-600">En tu fecha</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FEATURES ==================== */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Truck className="w-8 h-8" />,
                title: 'Entrega Puntual',
                desc: 'Agendamos según tu disponibilidad. Llegamos en la fecha acordada.',
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: 'Comida Fresca',
                desc: 'Sin conservantes. Solo ingredientes frescos de calidad.',
              },
              {
                icon: <Star className="w-8 h-8" />,
                title: 'Recetas Tradicionales',
                desc: 'Preparadas con dedicación y amor. Como en casa.',
              },
            ].map((feature, i) => (
              <div key={i} className="card text-center hover:shadow-xl transition-all duration-300 animate-scale-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center text-white">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FEATURED PRODUCTS ==================== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="section-header">
            <h2 className="mb-4">Productos Destacados</h2>
            <p className="text-lg text-gray-600">Descubre nuestros favoritos</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product, i) => (
              <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="card card-hover group">
                  <div className="card-image relative bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-5xl">
                    🍕
                  </div>
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-red-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, j) => (
                        <Star
                          key={j}
                          className={`w-4 h-4 ${j < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <div className="flex items-end gap-2">
                      <span className="text-3xl font-bold text-red-600">${product.price.toFixed(2)}</span>
                    </div>
                    <button className="btn btn-primary w-full justify-center gap-2">
                      Agregar al carrito
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/productos">
              <button className="btn btn-primary btn-lg hover:shadow-2xl">
                Ver Todos
                <ChevronRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-red-600 to-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center space-y-8 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold">
            ¿Listo para ordenar?
          </h2>
          <p className="text-lg text-red-100 max-w-2xl mx-auto">
            Únete a miles de clientes satisfechos que disfrutan de la mejor comida casera.
          </p>
          <Link href="/productos">
            <button className="btn btn-lg bg-white text-red-600 hover:bg-gray-100 font-bold shadow-lg">
              Hacer Pedido Ahora
            </button>
          </Link>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="bg-gray-900 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-red-400">El Carrito Rojo</h3>
              <p className="text-gray-400">
                Comidas caseras de calidad, entregadas con dedicación.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-red-400">Navegación</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/" className="hover:text-red-400 transition-colors">Inicio</Link></li>
                <li><Link href="/productos" className="hover:text-red-400 transition-colors">Productos</Link></li>
                <li><Link href="/about" className="hover:text-red-400 transition-colors">Nosotros</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-red-400">Contacto</h3>
              <p className="text-gray-400">
                📞 +1 (555) 000-0000<br />
                📧 info@carritorrojo.com
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2024 El Carrito Rojo. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
