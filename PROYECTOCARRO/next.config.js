/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Prevenir clickjacking
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          // Prevenir MIME type sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // XSS Protection para navegadores antiguos
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          // Referrer Policy
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // Content Security Policy
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' https: wss:; frame-ancestors 'none'; base-uri 'self'; form-action 'self';",
          },
          // Permissions Policy
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()',
          },
          // HSTS - Strict Transport Security
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          // Cache control para no cachear contenido sensible
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
          },
        ],
      },
    ]
  },

  // Redireccionamientos de seguridad
  async redirects() {
    return [
      // Redirigir HTTP a HTTPS en producción
      process.env.NODE_ENV === 'production' ? {
        source: '/:path*',
        destination: 'https://:host/:path*',
        permanent: true,
      } : null,
    ].filter(Boolean)
  },

  // Configuración experimental para mejor seguridad
  experimental: {
    // Habilitar instrumentation hook para validación de seguridad
    instrumentationHook: true,
  },

  // Webpack configuration para seguridad
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Optimizaciones del lado del cliente
      config.optimization.minimize = true
    }
    return config
  },
}

module.exports = nextConfig
