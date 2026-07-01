# 🚀 Instrucciones Personalizadas para GitHub Copilot & IA

## 👨‍💻 Tu Perfil Completo

**Nombre:** Emmanuel Munayar
**Email:** emmanuelmunayar@gmail.com
**GitHub:** [@emm1223](https://github.com/emm1223)
**Ubicación:** 🇨🇴 Colombia (UTC-5)
**Idioma:** Español (primario), Inglés (técnico)

**Redes Sociales:**
- 📘 Facebook: emmanuelmunayar
- 📸 Instagram: @emmanuelmunayar
- 💻 GitHub: emm1223

**Proyecto Principal:** Yellow 🌟
**Proyecto Activo:** PROYECTOCARRO (El Carrito Rojo) 🍽️

---

## 🎯 TUS OBJETIVOS

### Objetivo Principal
**Emprendimiento Propio:** Crear productos digitales que generen ingresos pasivos

### Objetivos Secundarios
- Aprendizaje continuo y mejora diaria
- Escalar El Carrito Rojo (PROYECTOCARRO)
- Convertirse en Full-Stack Developer experto
- Crear referencia en tecnología web

### Hitos Próximos
1. ✅ Completar PROYECTOCARRO
2. ✅ Lanzar El Carrito Rojo en producción
3. ✅ Mejorar portafolio (Yellow)
4. ✅ Generar primer ingreso pasivo

---

## 🏗️ TUS PROYECTOS

### Proyecto Activo: PROYECTOCARRO
```
Nombre: El Carrito Rojo 🍽️
Tipo: E-commerce Full-Stack
Stack: Next.js 13 + React 18 + TypeScript + MongoDB + Tailwind CSS
Objetivo: Plataforma de comidas caseras online
Estado: En desarrollo activo
Ruta: c:\Proyectos\emma\PROYECTOCARRO

ESTRUCTURA DEL PROYECTO:
├── src/
│   ├── app/                      # Rutas y pages Next.js
│   │   ├── api/                  # API Routes backend
│   │   │   ├── auth/             # Autenticación (login, logout, refresh)
│   │   │   ├── admin/            # Endpoints admin (logs, dashboard)
│   │   │   └── products/         # CRUD de productos
│   │   ├── admin/                # Dashboard administrativo (AdminDashboard.tsx)
│   │   ├── carrito/              # Página del carrito
│   │   ├── productos/            # Listado de productos
│   │   └── about/                # Página about
│   ├── components/               # Componentes React reutilizables
│   │   ├── CartItem.tsx          # Item del carrito
│   │   ├── ProductCard.tsx       # Tarjeta de producto
│   │   ├── Header.tsx            # Navegación
│   │   ├── Footer.tsx            # Pie de página
│   │   └── WhatsAppButton.tsx    # Botón de WhatsApp
│   ├── context/                  # Context API (CartContext)
│   ├── hooks/                    # Hooks personalizados (useProducts)
│   ├── lib/                      # Utilidades
│   │   ├── auth.ts               # Lógica de autenticación
│   │   ├── security.ts           # Funciones de seguridad
│   │   ├── bruteForce.ts         # Protección contra fuerza bruta
│   │   ├── rateLimit.ts          # Rate limiting
│   │   ├── auditLog.ts           # Logging de auditoría
│   │   ├── validation.ts         # Validaciones
│   │   ├── whatsapp.ts           # Integración WhatsApp
│   │   └── mockData.ts           # Datos de prueba
│   └── types/                    # TypeScript types globales
└── .vscode/                      # Configuración del workspace
    ├── settings.json             # Settings personalizados
    └── launch.json               # Debug configuration
```

FEATURES IMPLEMENTADOS:
- ✅ Autenticación con JWT
- ✅ Carrito de compras (Context API)
- ✅ Admin dashboard
- ✅ Seguridad: Rate limiting, Brute force protection, Audit logs
- ✅ Validación de datos
- ✅ Integración WhatsApp
- ✅ Responsive design (Tailwind)
```

### Proyecto Portafolio: Yellow
```
Nombre: Yellow
Tipo: Portfolio personal + Proyectos
Stack: HTML/CSS/JavaScript
Objetivo: Mostrar tus proyectos y habilidades
Estado: Activo
Ruta: c:\Proyectos\emma\yellow
```

### Proyectos de Referencia
- UEB (Ejercicios Java con GUI)
- EjerGUI1 & EjerGUI3
- Ventas (Sistema web)

---

## 💻 TU STACK TECNOLÓGICO

### Lenguajes que Dominas
- **JavaScript/TypeScript** ⭐⭐⭐⭐⭐ (Principal)
- **React & Next.js** ⭐⭐⭐⭐⭐ (Especialidad)
- **Tailwind CSS** ⭐⭐⭐⭐⭐
- **HTML/CSS** ⭐⭐⭐⭐
- **Java** ⭐⭐⭐⭐ (GUI, Swing)
- **MongoDB** ⭐⭐⭐⭐
- **Git & GitHub** ⭐⭐⭐⭐⭐

### Lenguajes en Aprendizaje
- Docker
- PostgreSQL
- Testing avanzado
- DevOps basics

### Tecnologías de Tu Preferencia
```
Frontend:  React, Next.js, TypeScript, Tailwind, HTML/CSS
Backend:   Node.js, Next.js API Routes, REST APIs
Database:  MongoDB (primaria), SQL (secundaria)
DevOps:    Git, GitHub, (Docker en aprendizaje)
Tools:     VS Code, npm, Prettier, ESLint
```

---

## 🎵 PREFERENCIAS PERSONALES

### Ambiente de Trabajo
- 🌙 **Tema:** Oscuro siempre (Emmanuel Custom Dark Pro)
- 🎧 **Música:** Escuchas música mientras codificas
- 🇨🇴 **Idioma:** Español como primera opción
- 🎯 **Modo:** Enfocado, sin distracciones
- 📱 **Dispositivos:** Windows, VS Code

### Estilo de Vida
- 📍 **Zona horaria:** UTC-5 (Colombia)
- ⏰ **Mejor horario:** Mañana/Tarde
- 🎯 **Sesiones típicas:** 2-4 horas de código
- 🚀 **Ritmo:** Ágil, pragmático

### Comunicación
- 💬 **Lenguaje:** Español
- 📝 **Documentación:** Concisa pero clara
- 🤝 **Feedback:** Abierto a sugerencias
- ⚡ **Velocidad:** Prefiere rapidez sobre perfección inicial

---

## 💪 TU FORMA DE PROGRAMAR

### Patrones que Usas

**React Components:**
```typescript
// Siempre funcionales con hooks
export const ComponentName: React.FC<Props> = ({ prop }) => {
  const [state, setState] = useState<Type>(initial);
  
  useEffect(() => {
    // efecto
  }, [deps]);
  
  return <div>{content}</div>;
};
```

**Next.js API Routes (CON SEGURIDAD):**
```typescript
// SIEMPRE con validación y error handling
import { NextRequest, NextResponse } from 'next/server';
import { validateInput } from '@/lib/validation';
import { logAudit } from '@/lib/auditLog';
import { rateLimitCheck } from '@/lib/rateLimit';

export async function GET(request: NextRequest) {
  try {
    // 1. Validar rate limit
    const isAllowed = await rateLimitCheck(request);
    if (!isAllowed) return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    
    // 2. Validar input
    const params = validateInput(request.url, schema);
    
    // 3. Ejecutar lógica
    const result = await db.collection.find(params);
    
    // 4. Auditar
    await logAudit('GET_RESOURCE', request, { success: true });
    
    return NextResponse.json({ data: result });
  } catch (error) {
    console.error('Error:', error);
    await logAudit('GET_RESOURCE', request, { error: error.message });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
```

**Validación de Datos:**
```typescript
// Siempre validar antes de procesar
const schema = {
  email: { type: 'string', required: true, pattern: 'email' },
  password: { type: 'string', required: true, minLength: 8 },
  age: { type: 'number', min: 18, max: 120 }
};

const validated = validateInput(input, schema);
```

**Error Handling:**
```typescript
try {
  // código
} catch (error) {
  console.error('Context: Error details', error);
  logAudit('OPERATION_NAME', request, { error: error.message });
  throw new Error('User-friendly message');
}
```

**Context API (CartContext pattern):**
```typescript
interface CartContextType {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  total: number;
}

export const CartContext = createContext<CartContextType>(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
```

---

## ✅ LO QUE QUIERES

### En Código
✅ TypeScript stricto
✅ Componentes pequeños (<50 líneas)
✅ Nombres descriptivos
✅ Funciones puras cuando sea posible
✅ Error handling explícito
✅ Código limpio y legible
✅ SOLID principles
✅ Performance optimizado

### En Sugerencias
✅ Prácticas recomendadas de industria
✅ Patrones de diseño modernos
✅ Mejoras de seguridad
✅ Optimizaciones de rendimiento
✅ Tests cuando sea relevante
✅ Explicaciones claras en español

---

## ❌ LO QUE NO QUIERES

❌ Código sin tipos (vanilla JS sin validación)
❌ Funciones muy largas (>20 líneas)
❌ Variables con nombres cortos (x, y, tmp)
❌ Código duplicado
❌ Magic strings/numbers
❌ Comentarios obvios
❌ Complejidad innecesaria
❌ Imports desordenados

---

## 📋 CONVENCIONES ESPECÍFICAS DE PROYECTOCARRO

### Nombres de Variables & Funciones
```typescript
// ✅ BIEN - Descriptivos y claros
const userEmail = 'user@example.com';
const isAuthenticated = true;
const cartItems: CartItem[] = [];
const calculateOrderTotal = (items: CartItem[]) => { };
const validateUserInput = async (data: unknown) => { };

// ❌ MAL - Ambiguos o genéricos
const x = 'user@example.com';
const auth = true;
const data = [];
const calc = () => { };
const check = async (d) => { };
```

### Estructura de Tipos
```typescript
// En src/types/index.ts
export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  inStock: boolean;
  createdAt: Date;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  _id: string;
  email: string;
  password?: string; // nunca enviar al cliente
  role: 'user' | 'admin';
  createdAt: Date;
}
```

### Nombres de Componentes
```typescript
// Componentes en PascalCase
export const ProductCard = () => { };        // OK
export const AdminDashboard = () => { };    // OK
export const CartItem = () => { };          // OK

// Propiedades en camelCase
interface ProductCardProps {
  productId: string;
  onAddToCart: (id: string) => void;
  isLoading: boolean;
}
```

### API Routes
```
src/app/api/
├── auth/
│   ├── login/route.ts              # POST /api/auth/login
│   ├── logout/route.ts             # POST /api/auth/logout
│   └── refresh/route.ts            # POST /api/auth/refresh
├── products/
│   └── route.ts                    # GET/POST /api/products
└── admin/
    └── logs/route.ts               # GET /api/admin/logs (solo admin)
```

### Seguridad (IMPORTANTE)
```typescript
// SIEMPRE validar entrada
const validated = validateInput(input, schema);

// SIEMPRE usar rate limiting
const allowed = await rateLimitCheck(request);

// SIEMPRE auditar operaciones críticas
await logAudit('ACTION', request, { details });

// SIEMPRE encriptar/hashear contraseñas
const hashedPassword = await hashPassword(plaintext);

// NUNCA exponer errores internos
return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
```

## 🔐 CARACTERÍSTICAS ESPECIALES DE PROYECTOCARRO

### Autenticación & Seguridad
- **JWT Tokens:** Implementados en `/lib/auth.ts`
- **Rate Limiting:** Prevenir fuerza bruta en login
- **Audit Logs:** Registrar acciones críticas
- **Brute Force Protection:** Bloquear intentos fallidos
- **Password Hashing:** Con bcrypt o similar
- **CORS:** Configurado en middleware

### Integración WhatsApp
```typescript
// En src/lib/whatsapp.ts
export const sendWhatsAppMessage = async (
  phoneNumber: string,
  message: string,
  orderDetails?: Order
) => {
  // Integración con API WhatsApp Business
};

// Uso en componentes
const handleOrder = async () => {
  await sendWhatsAppMessage(
    customer.whatsappNumber,
    `Tu orden #${order.id} está confirmada`,
    order
  );
};
```

### Carrito (Context API)
- Almacenado en Context y localStorage
- Sincronización automática
- Cálculo de totales
- Validación de stock

### Base de Datos
- MongoDB como principal
- Collections: users, products, orders, auditLogs
- Indexes para performance
- Validación JSON Schema

---

## 💡 TIPS PARA COPILOT SOBRE TI

### Velocidad vs Perfección
**Tu prioridad:** Funcional primero, perfeccionar después
- Haz sugerencias pragmáticas
- Proporciona código listo para usar
- Indica si hay deuda técnica después

### Documentación
**Tu estilo:** Código que se explica solo + comentarios en puntos críticos
```typescript
// ✅ BIEN - Código claro
const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// ❌ MAL - Exceso de documentación
/**
 * Valida que el email tenga formato correcto
 * @param email - El email a validar
 * @returns true si es válido, false si no
 * @throws Error si email es null
 * @example validateEmail('user@example.com') // true
 */
const validateEmail = (email: string): boolean => {
  // Usa regex para validar
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
```

### Testing
**Tu enfoque:** Tests para lógica crítica, no para todo
- ✅ Funciones de validación
- ✅ Cálculos de precio/totales
- ✅ Autenticación
- ⏸️ Componentes visuales (si es necesario)

---

### 1. Autocompletado (Codeium)
- Completa código mientras escribes
- Predice patrones comunes
- Aprende de tus estilos

### 2. Análisis (SonarLint)
- Detecta bugs potenciales
- Sugiere mejoras
- Identifica vulnerabilidades

### 3. Chat (Copilot Chat)
- Responde en español
- Entiende tu contexto
- Proporciona ejemplos

### 4. Refactorización (Continue)
- Mejora código automáticamente
- Convierte a TypeScript
- Optimiza rendimiento

### 5. Generación
- Tests unitarios
- Documentación
- Comentarios de código

### 6. Para PROYECTOCARRO Específicamente
Cuando preguntes sobre PROYECTOCARRO:
- ✅ Sigue la estructura de carpetas establecida
- ✅ Usa TypeScript strict
- ✅ Incluye validación y error handling
- ✅ Implementa rate limiting para APIs críticas
- ✅ Audita operaciones de admin
- ✅ Respeta la seguridad (nunca devuelvas passwords)
- ✅ Usa los tipos ya definidos en src/types/index.ts
- ✅ Integra con CartContext cuando sea necesario
- ✅ Considera la integración WhatsApp

---

## 🌟 CONTEXTO IMPORTANTE PARA COPILOT

### Tu Mentalidad
- 💡 **Pragmatista:** Prefiere soluciones que funcionan rápido
- 🚀 **Ágil:** Itera rápidamente, mejora constantemente
- 📚 **Aprendedor:** Siempre buscas mejorar y aprender
- 🎯 **Enfocado:** En objetivos claros de negocio

### Tu Prioridad
1. **Funcionalidad** - Que resuelva el problema
2. **Rendimiento** - Que sea eficiente
3. **Código limpio** - Que sea mantenible
4. **Tests** - Cuando sea crítico

### Tu Experiencia
- ✅ Full Stack con Next.js
- ✅ Frontend moderno (React)
- ✅ Bases de datos (MongoDB)
- ✅ APIs REST
- 📚 DevOps (en aprendizaje)

---

## 🔄 FLUJO DE TRABAJO IDEAL

```
1. ESCRIBES código
   ↓
2. CODEIUM sugiere (Tab para aceptar)
   ↓
3. SONARLINT detecta problemas (Ctrl+.)
   ↓
4. COPILOT arregla (Quick Fix)
   ↓
5. PRESIONAS Ctrl+I (Continue /refactor)
   ↓
6. CONTINUE mejora código
   ↓
7. PRESIONAS Ctrl+L (Copilot Chat /test)
   ↓
8. COPILOT genera tests
   ↓
9. COMMIT & PUSH a GitHub 🎉
```

---

## 🎓 DATOS PARA PERSONALIZACIÓN

### Zona Horaria
**UTC-5** (Colombia)
Mejor momento: Mañana (8am-12pm) y Tarde (2pm-6pm)

### Idioma
- **Primario:** Español
- **Código:** Inglés (convención)
- **Comentarios:** Español
- **Documentación:** Español

### Redes Sociales
- GitHub: github.com/emm1223
- Instagram: @emmanuelmunayar
- Facebook: emmanuelmunayar

### Email Contacto
emmanuelmunayar@gmail.com

---

## 🚀 OBJETIVO FINAL

Tu VS Code debe ser tu **Pair Programmer Invisible** que:

- ✅ Entiende tu mentalidad
- ✅ Conoce tu tech stack
- ✅ Respeta tus gustos
- ✅ Acelera tu desarrollo
- ✅ Mantiene tu calidad
- ✅ Te ayuda a alcanzar tus metas
- ✅ Está disponible 24/7

---

**Tu perfil está completamente integrado en VS Code ahora.** 🎉
Copilot y todas las herramientas IA te conocen y trabajan para ti.

**Actualizado:** 1 de Julio, 2026
**Status:** ✅ Completamente Personalizado
