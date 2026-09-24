import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks: {
          charts: ['recharts'],
          twin: ['three', '@react-three/fiber', '@react-three/drei']
        }
      }
    }
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['govinda.svg'],
      manifest: {
        name: 'Pushkara Command — Godavari Digital Twin',
        short_name: 'Pushkara Command',
        description: 'Operational digital twin for the 2027 Godavari Pushkaralu',
        theme_color: '#082c2b',
        background_color: '#f4f1e9',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: '/govinda.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' }
        ]
      },
      workbox: {
        navigateFallbackDenylist: [/^\/api/],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'font-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 31536000 }
            }
          }
        ]
      }
    })
  ]
})
