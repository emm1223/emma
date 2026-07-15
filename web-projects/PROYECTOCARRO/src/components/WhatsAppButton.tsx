'use client'

import React from 'react'
import { MessageCircle } from 'lucide-react'
import { openWhatsApp, WHATSAPP_NUMBERS } from '@/lib/whatsapp'

interface WhatsAppButtonProps {
  message: string
  phoneNumber?: 'principal' | 'backup'
  className?: string
  variant?: 'primary' | 'secondary' | 'icon'
  text?: string
}

export function WhatsAppButton({
  message,
  phoneNumber = 'principal',
  className = '',
  variant = 'primary',
  text = 'Contactar por WhatsApp',
}: WhatsAppButtonProps) {
  const phone = WHATSAPP_NUMBERS[phoneNumber]

  const handleClick = () => {
    openWhatsApp(phone, message)
  }

  if (variant === 'icon') {
    return (
      <button
        onClick={handleClick}
        className={`p-3 bg-green-500 hover:bg-green-600 text-white rounded-full transition duration-300 shadow-lg hover:shadow-xl ${className}`}
        aria-label="Contactar por WhatsApp"
        title="Contactar por WhatsApp"
      >
        <MessageCircle size={24} />
      </button>
    )
  }

  if (variant === 'secondary') {
    return (
      <button
        onClick={handleClick}
        className={`px-6 py-3 border-2 border-green-500 text-green-700 hover:bg-green-50 font-semibold rounded-lg transition duration-300 flex items-center gap-2 justify-center ${className}`}
      >
        <MessageCircle size={20} />
        {text}
      </button>
    )
  }

  return (
    <button
      onClick={handleClick}
      className={`px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition duration-300 flex items-center gap-2 justify-center shadow-lg hover:shadow-xl ${className}`}
    >
      <MessageCircle size={20} />
      {text}
    </button>
  )
}
