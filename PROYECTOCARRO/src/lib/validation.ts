/**
 * Advanced Data Validation & Sanitization
 * Validaciones exhaustivas para todos los inputs
 */

import { z } from 'zod'

/**
 * Schemas de validación
 */
export const AdminLoginSchema = z.object({
  username: z
    .string()
    .min(1, 'Usuario requerido')
    .max(50, 'Usuario muy largo')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Usuario solo puede contener letras, números, guiones'),
  password: z
    .string()
    .min(8, 'Contraseña mínimo 8 caracteres')
    .max(100, 'Contraseña muy larga'),
})

export const ChangePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, 'Contraseña actual requerida')
      .max(100),
    newPassword: z
      .string()
      .min(8, 'Nueva contraseña mínimo 8 caracteres')
      .max(100)
      .regex(/[A-Z]/, 'Debe contener mayúscula')
      .regex(/[a-z]/, 'Debe contener minúscula')
      .regex(/[0-9]/, 'Debe contener número'),
    confirmPassword: z
      .string()
      .min(8)
      .max(100),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: 'Nueva contraseña no puede ser igual a la actual',
    path: ['newPassword'],
  })

export const ProductSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(1, 'Nombre requerido')
    .max(200, 'Nombre muy largo')
    .regex(/^[a-zA-Z0-9\s\-áéíóú]+$/, 'Caracteres inválidos en nombre'),
  price: z
    .number()
    .positive('Precio debe ser positivo')
    .max(1000000, 'Precio máximo excedido'),
  stock: z
    .number()
    .int('Stock debe ser número entero')
    .nonnegative('Stock no puede ser negativo'),
  description: z
    .string()
    .max(1000, 'Descripción muy larga')
    .optional(),
  category: z
    .string()
    .max(100, 'Categoría muy larga')
    .optional(),
})

export const OrderSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z.number().int().positive(),
      })
    )
    .min(1, 'Debe haber al menos 1 producto'),
  customerName: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-zA-Z\s]+$/, 'Nombre solo puede contener letras'),
  customerEmail: z
    .string()
    .email('Email inválido')
    .max(255),
  customerPhone: z
    .string()
    .regex(/^\+?[0-9\s\-()]{7,20}$/, 'Teléfono inválido'),
  shippingAddress: z
    .string()
    .min(5)
    .max(255)
    .regex(/^[a-zA-Z0-9\s,#\-áéíóú.]+$/, 'Caracteres inválidos en dirección'),
})

export const SearchSchema = z.object({
  query: z
    .string()
    .max(100, 'Búsqueda muy larga')
    .regex(/^[a-zA-Z0-9\s\-áéíóú]*$/, 'Caracteres inválidos en búsqueda'),
  limit: z
    .number()
    .int()
    .min(1)
    .max(100)
    .default(10)
    .optional(),
  offset: z
    .number()
    .int()
    .nonnegative()
    .default(0)
    .optional(),
})

/**
 * Validación y sanitización genérica
 */
export const validateData = <T>(schema: z.ZodSchema, data: unknown): { valid: boolean; data?: T; errors?: string[] } => {
  try {
    const validated = schema.parse(data)
    return { valid: true, data: validated as T }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map((e) => `${e.path.join('.')}: ${e.message}`)
      return { valid: false, errors }
    }
    return { valid: false, errors: ['Error de validación desconocido'] }
  }
}

/**
 * Sanitización adicional
 */
export const sanitizeProductData = (data: unknown): Record<string, unknown> | null => {
  const result = validateData(ProductSchema, data)
  if (!result.valid) return null

  const product = result.data as any
  return {
    name: product.name.trim(),
    price: Math.round(product.price * 100) / 100,
    stock: Math.max(0, product.stock),
    description: product.description?.trim(),
    category: product.category?.trim(),
  }
}

export const sanitizeOrderData = (data: unknown): Record<string, unknown> | null => {
  const result = validateData(OrderSchema, data)
  if (!result.valid) return null

  const order = result.data as any
  return {
    items: order.items,
    customerName: order.customerName.trim(),
    customerEmail: order.customerEmail.toLowerCase().trim(),
    customerPhone: order.customerPhone.replace(/\s/g, ''),
    shippingAddress: order.shippingAddress.trim(),
  }
}

/**
 * Validación de rango de precios
 */
export const isValidPriceRange = (min: number, max: number): boolean => {
  return min >= 0 && max >= min && max <= 1000000
}

/**
 * Validación de stock
 */
export const isValidStock = (quantity: number, available: number): boolean => {
  return quantity > 0 && quantity <= available && Number.isInteger(quantity)
}
