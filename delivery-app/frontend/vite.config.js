import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    port: 5173, // Frontend aquí (NO choca con backend)

    proxy: {
      // App Service (restaurants, orders, etc.)
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },

      // Auth Service
      '/api/auth': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },

  resolve: {
    alias: {
      '@': '/src',
    },
  },
})