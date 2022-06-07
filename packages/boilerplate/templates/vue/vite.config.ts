import vue from '@vitejs/plugin-vue'
import ssr from 'vite-plugin-ssr/plugin'
import { resolve } from 'path'
import { UserConfig } from 'vite'

const config: UserConfig = {
  resolve: {
    alias: {
      '@create-vite-plugin-ssr/shared': resolve(__dirname, '../../shared')
    }
  },
  plugins: [vue(), ssr()]
}

export default config
