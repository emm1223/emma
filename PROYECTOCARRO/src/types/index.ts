import { z } from 'zod'

// Esquemas de validación con Zod
export const ProductSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(3).max(100),
  description: z.string().min(10).max(500),
  price: z.number().positive().max(10000),
  category: z.string().min(2).max(50),
  stock: z.number().int().min(0),
  image: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export const CartItemSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().min(1).max(100),
  price: z.number().positive(),
})

export const OrderSchema = z.object({
  id: z.string().optional(),
  items: z.array(CartItemSchema).min(1),
  totalPrice: z.number().positive(),
  customerName: z.string().min(2).max(100),
  customerEmail: z.string().email(),
  customerPhone: z.string().regex(/^[\d\s\-\+\(\)]{7,20}$/, 'Teléfono inválido'),
  scheduledDate: z.date(),
  status: z.enum(['pending', 'confirmed', 'completed', 'cancelled']).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().min(2).max(100),
  role: z.enum(['admin', 'customer']),
  createdAt: z.date().optional(),
})

// Tipos derivados de los esquemas
export type Product = z.infer<typeof ProductSchema>
export type CartItem = z.infer<typeof CartItemSchema>
export type Order = z.infer<typeof OrderSchema>
export type User = z.infer<typeof UserSchema>
