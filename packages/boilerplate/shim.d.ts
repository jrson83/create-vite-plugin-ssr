/// <reference types="preact" />
/// <reference types="react" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_FRAMEWORK: string
  readonly VITE_APP_TYPESCRIPT: boolean
  readonly VITE_APP_CLIENT_ROUTING: boolean
  readonly VITE_APP_EJECT_RENDERER: boolean
  readonly VITE_APP_RPC: boolean
  readonly VITE_APP_PRERENDERING: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
