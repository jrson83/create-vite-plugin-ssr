let hydrate: any
let PageShell: any
let createApp: (element: any) => any

if (import.meta.env.VITE_APP_FRAMEWORK === 'Preact') {
  hydrate = (await import('preact')).hydrate
  PageShell = (await import('./PageShell.preact')).PageShell
}

if (import.meta.env.VITE_APP_FRAMEWORK === 'React') {
  hydrate = (await import('react-dom')).hydrate
  PageShell = (await import('./PageShell.react')).PageShell
}

if (import.meta.env.VITE_APP_FRAMEWORK === 'Vue') {
  createApp = (await import('./app')).createApp
  PageShell = await import('./PageShell.vue')
}

import { getPage } from 'vite-plugin-ssr/client'
import type { PageContext } from './types'
import type { PageContextBuiltInClient } from 'vite-plugin-ssr/client'

hydrateClient()

async function hydrateClient() {
  // We do Server Routing, but we can also do Client Routing by using `useClientRouter()`
  // instead of `getPage()`, see https://vite-plugin-ssr.com/useClientRouter
  const pageContext = await getPage<PageContextBuiltInClient & PageContext>()

  if (import.meta.env.VITE_APP_FRAMEWORK === 'Preact' || import.meta.env.VITE_APP_FRAMEWORK === 'React') {
    const { Page, pageProps } = pageContext
    hydrate(
      <PageShell pageContext={pageContext}>
        <Page {...pageProps} />
      </PageShell>,
      document.getElementById('page-view')
    )
  } else if (import.meta.env.VITE_APP_FRAMEWORK === 'Vue') {
    const app = createApp(pageContext)
    app.mount('#page-view')
  }
}

console.log(import.meta.env)
