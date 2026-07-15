/**
 * WhatsApp Integration
 * Números disponibles:
 * - 3157449441 (Principal)
 * - 3502453726 (Backup)
 */

export const WHATSAPP_NUMBERS = {
  principal: '3157449441',
  backup: '3502453726',
}

export const generateWhatsAppLink = (
  phone: string,
  message: string,
): string => {
  const cleanedPhone = phone.replace(/\D/g, '')
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${cleanedPhone}?text=${encoded}`
}

export const generateOrderMessage = (
  orderSummary?: string,
): string => {
  const base = `¡Hola! 👋 Me gustaría hacer un pedido a *El Carrito Rojo*`
  return orderSummary ? `${base}:\n\n${orderSummary}` : base
}

export const openWhatsApp = (phone: string, message: string): void => {
  const link = generateWhatsAppLink(phone, message)
  window.open(link, '_blank')
}
