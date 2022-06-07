import preact from '@preact/preset-vite'
import ssr from 'vite-plugin-ssr/plugin'
import { resolve } from 'path'
import { UserConfig } from 'vite'

const config: UserConfig = {
  resolve: {
    alias: {
      '@create-vite-plugin-ssr/shared': resolve(__dirname, '../../shared')
    }
  },
  plugins: [preact(), ssr()]
}

export default config
