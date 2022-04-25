import preact from '@preact/preset-vite'
import react from '@vitejs/plugin-react'
import vue from '@vitejs/plugin-vue'
import ssr from 'vite-plugin-ssr/plugin'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const { VITE_APP_FRAMEWORK } = env

  return {
    esbuild: {
      exclude: './**/*.vue'
    },
    plugins: [
      VITE_APP_FRAMEWORK === 'Preact' && preact(),
      VITE_APP_FRAMEWORK === 'React' && react(),
      VITE_APP_FRAMEWORK === 'Vue' && vue(),
      ssr()
    ],
    build: {
      target: 'esnext',
      format: 'esm'
    }
  }
})
