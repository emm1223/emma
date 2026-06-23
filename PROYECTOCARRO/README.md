# 🍽️ El Carrito Rojo - Comidas Caseras

Una plataforma de e-commerce moderna y segura para vender empandas, pasteles de yuca, bandejas, chorizos y más comidas caseras.

## 🚀 Características

- **Catálogo de Productos**: Gestiona todos tus productos con categorías, descripciones y precios
- **Carrito de Compras**: Sistema de carrito funcional y responsive
- **Agendamiento de Pedidos**: Permite a los clientes agendar sus compras en fechas específicas
- **Panel de Administración**: Dashboard profesional para gestionar productos y pedidos
- **Diseño Responsivo**: Se adapta perfectamente a móviles, tablets y desktop
- **Seguridad Mejorada**: Validaciones robustas, sanitización de inputs y protección contra ataques

## 🛠️ Stack Tecnológico

- **Frontend**: Next.js 13.5 + React 18 + TypeScript
- **Estilos**: Tailwind CSS + Lucide React Icons
- **Backend**: API Routes de Next.js
- **Validación**: Zod con esquemas robustos
- **Seguridad**: Sanitización de inputs, validaciones exhaustivas
- **Base de Datos**: MongoDB (opcional, lista para conectar)

## 📋 Requisitos

- Node.js 18+
- npm o yarn

## 🚀 Instalación y Ejecución

1. Clona el repositorio:
```bash
git clone [tu-repo]
cd PROYECTOCARRO
```

2. Instala las dependencias:
```bash
npm install
```

3. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador

## 📁 Estructura del Proyecto

```
src/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Layout principal
│   ├── page.tsx             # Página de inicio
│   ├── productos/           # Página de catálogo
│   ├── carrito/             # Página del carrito
│   ├── admin/               # Panel de administración
│   └── globals.css          # Estilos globales
├── components/              # Componentes React reutilizables
├── lib/
│   ├── mockData.ts         # Datos de productos
│   ├── validations.ts      # Esquemas de validación con Zod
│   ├── security.ts         # Funciones de seguridad
│   └── securityConfig.ts   # Configuración de seguridad
├── types/                  # Tipos TypeScript
└── hooks/                  # Custom React hooks
```

## 🛡️ Características de Seguridad

- ✅ **Validaciones Robustas**: Esquemas Zod en todos los formularios
- ✅ **Sanitización de Inputs**: Escapa caracteres especiales para prevenir XSS
- ✅ **Límites de Longitud**: Máximos caracteres en campos de texto
- ✅ **Detección de Patrones Maliciosos**: Bloquea scripts e inyecciones
- ✅ **Validación de Email y Teléfono**: Formatos seguros
- ✅ **Rate Limiting**: Previene abuso de solicitudes

## 📦 Productos Disponibles

| Producto | Precio | Categoría |
|----------|--------|-----------|
| Empandas de Pollo con Champiñones | $3.50 | Empanadas |
| Pasteles de Yuca | $4.00 | Pasteles |
| Bandeja de Gallina | $18.99 | Bandejas |
| Sobrebarriga | $16.99 | Carnes |
| Chorizos Caseros | $8.99 | Embutidos |

## 📝 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Compila la aplicación para producción
- `npm start` - Inicia el servidor de producción
- `npm run lint` - Verifica el código con ESLint
- `npm test` - Ejecuta los tests

## 🎯 Próximas Mejoras

- [ ] Integración completa con MongoDB
- [ ] Sistema de autenticación de clientes y administradores
- [ ] Carrito persistente en localStorage
- [ ] Calendario interactivo para agendamiento
- [ ] Pasarela de pagos (Stripe/Mercado Pago)
- [ ] Notificaciones por email de pedidos
- [ ] Dashboard de estadísticas de ventas
- [ ] Sistema de comentarios y reseñas

## 🔐 Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Configuración de la aplicación
NEXT_PUBLIC_STORE_NAME=El Carrito Rojo

# Base de datos (cuando se integre)
MONGODB_URI=mongodb://...

# Autenticación (cuando se configure)
NEXTAUTH_SECRET=tu-secret-aqui
NEXTAUTH_URL=http://localhost:3000
```

## 📄 Licencia

Este proyecto es privado y está hecho para tus papás ❤️

## 🤝 Soporte

Para reportar problemas o sugerencias, contacta al desarrollador.

---

**Hecho con ❤️ para El Carrito Rojo**
