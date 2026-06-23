import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/context/CartContext'

export const metadata: Metadata = {
  title: 'El Carrito Rojo - Comidas Caseras',
  description: 'Comidas caseras de calidad: empandas, pasteles de yuca, bandejas, chorizos y más. Agendá tu pedido hoy.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-neutral-50">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
