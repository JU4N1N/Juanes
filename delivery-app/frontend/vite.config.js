import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Puerto fijo 
    proxy: {
      // Configuración de proxy para evitar problemas de CORS con microservicios
      '/api/auth': {
        target: 'http://localhost:4000', // El puerto donde corra auth-service
        changeOrigin: true,
      },
      '/api/app': {
        target: 'http://localhost:4001', // El puerto de app-service
        changeOrigin: true,
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})