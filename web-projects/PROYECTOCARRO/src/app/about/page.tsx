'use client'

import Link from 'next/link'
import { Heart, TrendingUp, Users } from 'lucide-react'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { generateOrderMessage } from '@/lib/whatsapp'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-700 to-red-800 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in">La Historia de El Carrito Rojo</h1>
          <p className="text-xl text-red-100 max-w-2xl animate-slide-in-left delay-1">
            Una pasión por la comida casera hecha con amor y entregada con cuidado.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* Main Story */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-3xl font-bold text-neutral-900 mb-6">¿Por Qué El Carrito Rojo?</h2>
            <div className="space-y-4 text-neutral-700 leading-relaxed">
              <p>
                El Carrito Rojo nace de la idea de llevar comida casera de calidad directamente a tu hogar. 
                Creemos que la mejor comida es aquella preparada con dedicación, usando ingredientes frescos 
                y recetas que han sido perfeccionadas con el tiempo.
              </p>
              <p>
                El nombre &quot;El Carrito Rojo&quot; representa movimiento, velocidad y la garantía de que tus pedidos 
                llegarán frescos y deliciosos. Es nuestro compromiso de estar siempre en movimiento para 
                servir mejor a nuestra comunidad en Bogotá.
              </p>
              <p>
                Cada empanada, cada pastel de yuca, y cada bandeja que preparamos refleja nuestro compromiso 
                con la excelencia. No solo vendemos comida: entregamos momentos de felicidad en la mesa de tu familia.
              </p>
            </div>
          </div>

          <div className="bg-white border-2 border-red-300 rounded-lg p-8 h-fit">
            <div className="aspect-square bg-gradient-to-br from-red-600/20 to-red-700/20 rounded-lg flex items-center justify-center text-red-600 mb-6">
              <div className="text-center">
                <p className="text-6xl font-bold mb-2">🚗</p>
                <p className="font-semibold">El Carrito Rojo</p>
              </div>
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-2">Nuestra Misión</h3>
            <p className="text-neutral-600">
              Llevar comida casera de excelente calidad a los hogares bogotanos, cumpliendo con los tiempos 
              acordados y superando expectativas en cada entrega.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-neutral-900 mb-12 text-center">Nuestros Valores</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border-l-4 border-red-700 rounded-lg p-8 hover:shadow-lg transition">
              <Heart className="text-red-700 mb-4" size={32} />
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Hecho con Amor</h3>
              <p className="text-neutral-600">
                Cada plato se prepara con dedicación y cuidado. No es solo comida, es el resultado de 
                una pasión por alimentar bien a nuestros clientes.
              </p>
            </div>

            <div className="bg-white border-l-4 border-orange-500 rounded-lg p-8 hover:shadow-lg transition">
              <TrendingUp className="text-orange-500 mb-4" size={32} />
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Calidad Consistente</h3>
              <p className="text-neutral-600">
                Mantenemos los más altos estándares en ingredientes, preparación y presentación. 
                Cada pedido es una promesa de excelencia.
              </p>
            </div>

            <div className="bg-white border-l-4 border-green-600 rounded-lg p-8 hover:shadow-lg transition">
              <Users className="text-green-600 mb-4" size={32} />
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Comunidad Primero</h3>
              <p className="text-neutral-600">
                Somos parte de Bogotá y nos importa servir a nuestra comunidad. Tu satisfacción es 
                nuestro éxito.
              </p>
            </div>
          </div>
        </div>

        {/* Menu Highlights */}
        <div className="bg-white border-2 border-neutral-200 rounded-lg p-12 mb-20">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">Lo Que Ofrecemos</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-red-700 mb-4">Especialidades Caseras</h3>
              <ul className="space-y-3 text-neutral-700">
                <li className="flex items-center gap-3">
                  <span className="text-red-700 font-bold">•</span> Empanadas al horno recién salidas
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-red-700 font-bold">•</span> Pasteles de yuca crujientes
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-red-700 font-bold">•</span> Bandeja Paisa auténtica
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-red-700 font-bold">•</span> Chorizos caseros
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-red-700 mb-4">Servicio Premium</h3>
              <ul className="space-y-3 text-neutral-700">
                <li className="flex items-center gap-3">
                  <span className="text-red-700 font-bold">•</span> Entregas en la fecha que elijas
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-red-700 font-bold">•</span> Pedidos personalizados
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-red-700 font-bold">•</span> Atención vía WhatsApp 24/7
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-red-700 font-bold">•</span> Empaque cuidado y fresco
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-red-700/10 to-orange-600/10 border-2 border-red-300 rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">¿Quieres probar nuestros productos?</h2>
          <p className="text-neutral-600 mb-8 max-w-2xl mx-auto">
            Visita nuestro menú y realiza tu pedido. Entregamos en toda Bogotá en la fecha que prefieras.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/productos"
              className="px-8 py-3 bg-red-700 hover:bg-red-800 text-white font-semibold rounded-lg transition transform hover:scale-105"
            >
              Ver Menú Completo
            </Link>
            <WhatsAppButton
              message={generateOrderMessage('Hola, quiero conocer más sobre El Carrito Rojo')}
              text="Contactar por WhatsApp"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
