import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => {
  const isProduction = command === 'build'
  return {
    plugins: [react()],
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      emptyOutDir: true,
    },
    server: {
      port: 3000,
      open: true,
      proxy: {
        '/graphql': {
          target: isProduction ? 'https://branches-bv83.onrender.com' : 'http://localhost:3001',
          changeOrigin: true,
          secure: isProduction,
        },
        '/assets': {
          target: isProduction ? 'https://branches-bv83.onrender.com' : 'http://localhost:3001',
          changeOrigin: true,
          secure: isProduction,
        }
      }
    }
  }
})