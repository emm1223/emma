import { useState, useEffect } from 'react'
import { Product } from '@/types'
import { mockProducts } from '@/lib/mockData'

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      // Cargar desde localStorage si existen productos guardados
      const saved = localStorage.getItem('products')
      if (saved) {
        setProducts(JSON.parse(saved))
      } else {
        // Usar mock data la primera vez
        setProducts(mockProducts)
        localStorage.setItem('products', JSON.stringify(mockProducts))
      }
    } catch (e) {
      console.error('Error loading products:', e)
      setError('Error al cargar productos')
      setProducts(mockProducts)
    } finally {
      setLoading(false)
    }
  }, [])

  const addProduct = (product: Product) => {
    const newProducts = [...products, { ...product, id: Date.now().toString() }]
    setProducts(newProducts)
    localStorage.setItem('products', JSON.stringify(newProducts))
  }

  const updateProduct = (id: string, updates: Partial<Product>) => {
    const newProducts = products.map((p) =>
      p.id === id ? { ...p, ...updates } : p
    )
    setProducts(newProducts)
    localStorage.setItem('products', JSON.stringify(newProducts))
  }

  const deleteProduct = (id: string) => {
    const newProducts = products.filter((p) => p.id !== id)
    setProducts(newProducts)
    localStorage.setItem('products', JSON.stringify(newProducts))
  }

  return { products, loading, error, addProduct, updateProduct, deleteProduct }
}

export function useOrders() {
  const [orders, setOrders] = useState<any[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('orders')
    if (saved) {
      try {
        setOrders(JSON.parse(saved))
      } catch (e) {
        console.error('Error loading orders:', e)
      }
    }
  }, [])

  const addOrder = (order: any) => {
    const newOrders = [
      ...orders,
      { ...order, id: Date.now().toString(), createdAt: new Date() },
    ]
    setOrders(newOrders)
    localStorage.setItem('orders', JSON.stringify(newOrders))
    return newOrders[newOrders.length - 1]
  }

  return { orders, addOrder }
}
