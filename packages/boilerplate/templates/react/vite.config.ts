import react from '@vitejs/plugin-react'
import ssr from 'vite-plugin-ssr/plugin'
import { resolve } from 'path'
import { UserConfig } from 'vite'

const config: UserConfig = {
  resolve: {
    alias: {
      '@create-vite-plugin-ssr/shared': resolve(__dirname, '../../shared')
    }
  },
  plugins: [react(), ssr()]
}

export default config
