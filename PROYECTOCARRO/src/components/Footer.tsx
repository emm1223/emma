'use client'

import React from 'react'
import { Facebook, Instagram, Clock, MapPin, PhoneIcon } from 'lucide-react'
import { WhatsAppButton } from './WhatsAppButton'
import { generateOrderMessage } from '@/lib/whatsapp'

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-white mt-16 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-red-500 mb-4">El Carrito Rojo</h3>
            <p className="text-neutral-400 text-sm mb-4">
              Comidas rápidas y deliciosas, entregas directas a tu hogar en las fechas que prefieras.
            </p>
            <div className="flex gap-4">
              <a
                href="#facebook"
                className="text-neutral-400 hover:text-red-500 transition"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#instagram"
                className="text-neutral-400 hover:text-red-500 transition"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-bold text-lg mb-4">Horarios</h4>
            <div className="space-y-2 text-sm text-neutral-400">
              <div className="flex gap-3">
                <Clock size={18} className="text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-white font-semibold">Lunes - Viernes</p>
                  <p>10:00 AM - 8:00 PM</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock size={18} className="text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-white font-semibold">Sábado - Domingo</p>
                  <p>11:00 AM - 9:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <h4 className="font-bold text-lg mb-4">Ubicación</h4>
            <div className="flex gap-3">
              <MapPin size={20} className="text-red-500 flex-shrink-0 mt-1" />
              <div className="text-sm text-neutral-400">
                <p className="text-white font-semibold mb-2">Bogotá, Colombia</p>
                <p>Realizamos entregas en toda la ciudad según la fecha que solicites.</p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contacto</h4>
            <div className="space-y-3 text-sm">
              <div className="flex gap-3">
                <PhoneIcon size={20} className="text-red-500 flex-shrink-0 mt-1" />
                <a
                  href="https://wa.me/3157449441?text=Hola%20El%20Carrito%20Rojo"
                  className="text-neutral-400 hover:text-red-500 transition"
                >
                  +57 315 7449441
                </a>
              </div>
              <div className="flex gap-3">
                <PhoneIcon size={20} className="text-red-500 flex-shrink-0 mt-1" />
                <a
                  href="https://wa.me/3502453726?text=Hola%20El%20Carrito%20Rojo"
                  className="text-neutral-400 hover:text-red-500 transition"
                >
                  +57 350 2453726
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-red-700/20 to-red-800/20 border border-red-700/50 rounded-lg p-8 mb-8 text-center">
          <h3 className="text-2xl font-bold mb-3">¿Preguntas? Escríbenos</h3>
          <p className="text-neutral-300 mb-6">
            Estamos disponibles en WhatsApp para resolver tus dudas y tomar tu pedido
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <WhatsAppButton
              message={generateOrderMessage('¿Cuáles son tus productos disponibles?')}
              phoneNumber="principal"
              text="Contactar (Principal)"
            />
            <WhatsAppButton
              message={generateOrderMessage('¿Cuáles son tus productos disponibles?')}
              phoneNumber="backup"
              variant="secondary"
              text="Contactar (Backup)"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-800 pt-8">
          <div className="grid md:grid-cols-2 gap-4 text-sm text-neutral-400">
            <div>
              <p>
                © 2024 El Carrito Rojo. Todos los derechos reservados.
              </p>
            </div>
            <div className="text-right md:text-left">
              <a href="#privacy" className="hover:text-red-500 transition mr-6">
                Privacidad
              </a>
              <a href="#terms" className="hover:text-red-500 transition">
                Términos
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
