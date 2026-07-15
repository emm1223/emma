/**
 * Product Images - Sistema de imágenes para productos
 * Las imágenes se almacenan en public/products/
 * Este archivo mapea productId a imagen
 */

export const productImages: Record<string, string> = {
  'empanada-carne': '/products/empanada-carne.jpg',
  'empanada-queso': '/products/empanada-queso.jpg',
  'pastel-yuca': '/products/pastel-yuca.jpg',
  'bandeja-paisa': '/products/bandeja-paisa.jpg',
  'chorizo-casero': '/products/chorizo-casero.jpg',
  'arepa-queso': '/products/arepa-queso.jpg',
}

/**
 * Obtener imagen de producto con fallback a placeholder
 */
export const getProductImage = (productId: string): string => {
  return productImages[productId] || '/products/placeholder.jpg'
}

/**
 * Verificar si existe imagen para producto
 */
export const hasProductImage = (productId: string): boolean => {
  return productId in productImages
}
