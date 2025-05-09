import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [preact()],
  server: {
    proxy: {
      '/companies': {
        target: 'https://kuali-new-backend.onrender.com',
        changeOrigin: true,
        secure: false
      },
      '/contacts': {
        target: 'https://kuali-new-backend.onrender.com',
        changeOrigin: true,
        secure: false
      },
      '/templates': {
        target: 'https://kuali-new-backend.onrender.com',
        changeOrigin: true,
        secure: false
      },
      '/leads': {
        target: 'https://kuali-new-backend.onrender.com',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
