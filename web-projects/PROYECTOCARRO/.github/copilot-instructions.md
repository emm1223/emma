# Instrucciones Personalizadas - El Carrito Rojo 🍽️

## Descripción del Proyecto

Plataforma de e-commerce profesional y segura para **El Carrito Rojo**, tienda de comidas caseras.

**Productos:**

- Empandas de Pollo con Champiñones ($3.50)
- Pasteles de Yuca ($4.00)
- Bandeja de Gallina ($18.99)
- Sobrebarriga ($16.99)
- Chorizos Caseros ($8.99)

**Características:**

- ✅ Catálogo dinámico con búsqueda y filtros
- ✅ Carrito de compras funcional
- ✅ Agendamiento de pedidos
- ✅ Panel de administración para gestión de productos
- ✅ Diseño responsive y moderno
- ✅ Validaciones robustas y sanitización de inputs
- 📋 Autenticación lista para integrar

## Stack Tecnológico

- **Frontend**: Next.js 13.5 + React 18 + TypeScript
- **Estilos**: Tailwind CSS + Lucide React Icons
- **Backend**: API Routes de Next.js (listo para expandir)
- **Base de Datos**: MongoDB (lista para conectar via Mongoose)
- **Autenticación**: NextAuth.js (configurado, listo para implementar)
- **Validación**: Zod
- **Estado**: React Hooks (listo para Context API / Zustand)

## Estructura de Carpetas

```
src/
├── app/                    # App Router de Next.js
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página de inicio
│   ├── productos/         # Página de catálogo
│   ├── carrito/           # Página del carrito
│   ├── admin/             # Panel de administración
│   └── globals.css        # Estilos globales
├── components/            # Componentes React reutilizables
├── lib/                   # Utilidades y datos mock
├── types/                 # Tipos TypeScript
└── hooks/                 # Custom React hooks
```

## Características Principales

1. **Página de Inicio**: Hero section, características destacadas, CTA
2. **Catálogo**: Búsqueda por nombre, filtros por categoría, grid responsive
3. **Carrito**: Estructura lista para implementar carrito persistente
4. **Panel Admin**: CRUD de productos, tabla interactiva, formulario de agregar
5. **Navegación**: Header responsive con menú móvil, footer
6. **Responsive Design**: Mobile first, optimizado para todos los tamaños

## Convenciones de Código

- TypeScript stricto en todos los archivos
- Componentes funcionales con hooks
- Tailwind CSS para estilos
- Estructura de carpetas por feature
- Variables de entorno en .env.local
- ESLint + Prettier pre-configurados

## Comandos Principales

- `npm run dev`: Inicia servidor en http://localhost:3000
- `npm run build`: Compila para producción
- `npm start`: Inicia servidor de producción
- `npm run lint`: Verifica código con ESLint
- `npm test`: Ejecuta tests (cuando se agreguen)

## Estado del Proyecto

✅ **Completado**: Estructura base, UI funcional, navegación

📋 **Próximas fases**:

- Conectar MongoDB para persistencia
- Implementar autenticación completa
- Carrito persistente en localStorage
- Calendario interactivo para agendamiento
- Pasarela de pagos
- Notificaciones por email
- Dashboard de estadísticas
