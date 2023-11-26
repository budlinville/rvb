import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: 'RVB',
        short_name: 'RVB',
        theme_color: '#272727',
        icons: [
          {
            src: '/rvb_512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: '/rvb_256.png',
            sizes: '256x256',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: '/rvb_128.png',
            sizes: '128x128',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: '/rvb_64.png',
            sizes: '64x64',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: '/rvb_32.png',
            sizes: '32x32',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        runtimeCaching: [{
          urlPattern: ({ url }) => url.pathname.startsWith('/master/rvb') || url.pathname.startsWith('/staging/rvb'),
          handler: 'NetworkFirst' as const,
          options: {
            cacheName: 'api-cache',
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        }]
      }
    }),
  ],
})
