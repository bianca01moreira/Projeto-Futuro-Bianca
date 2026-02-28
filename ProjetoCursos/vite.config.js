import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@fortawesome/fontawesome-svg-core': '@fortawesome/fontawesome-svg-core',
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      supported: {
        bigint: true,
      },
    },
  },
})
