import { z } from 'zod'

// Validación de productos
export const ProductSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(3).max(100),
  description: z.string().min(10).max(500),
  price: z.number().positive().max(1000),
  category: z.string().min(2).max(50),
  stock: z.number().int().min(0),
  image: z.string().optional(),
})

// Validación de items del carrito
export const CartItemSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().min(1).max(100),
  price: z.number().positive(),
})

// Validación de órdenes
export const OrderSchema = z.object({
  items: z.array(CartItemSchema).min(1),
  totalPrice: z.number().positive(),
  customerName: z.string().min(2).max(100),
  customerEmail: z.string().email(),
  customerPhone: z.string().regex(/^[0-9\-\+\(\)\s]+$/, 'Teléfono inválido'),
  scheduledDate: z.date().min(new Date()),
  status: z.enum(['pending', 'confirmed', 'completed', 'cancelled']),
})

// Validación de formulario de agregar producto (Admin)
export const AddProductFormSchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().min(10).max(500),
  price: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: 'El precio debe ser un número positivo',
  }),
  category: z.string().min(2).max(50),
  stock: z.string().refine((val) => !isNaN(parseInt(val)) && parseInt(val) >= 0, {
    message: 'El stock debe ser un número no negativo',
  }),
})

// Validación de búsqueda
export const SearchSchema = z.object({
  query: z.string().max(100).optional(),
  category: z.string().max(50).optional(),
})

export type Product = z.infer<typeof ProductSchema>
export type CartItem = z.infer<typeof CartItemSchema>
export type Order = z.infer<typeof OrderSchema>
export type AddProductForm = z.infer<typeof AddProductFormSchema>
