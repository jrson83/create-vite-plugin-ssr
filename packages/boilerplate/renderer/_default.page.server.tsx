let renderToString: (element: any) => any
let PageShell: any
let createApp: (element: any) => any

if (import.meta.env.VITE_APP_FRAMEWORK === 'Preact') {
  renderToString = (await import('preact-render-to-string')).default
  PageShell = (await import('./PageShell.preact')).PageShell
}

if (import.meta.env.VITE_APP_FRAMEWORK === 'React') {
  renderToString = (await import('react-dom/server')).renderToString
  PageShell = (await import('./PageShell.react')).PageShell
}

if (import.meta.env.VITE_APP_FRAMEWORK === 'Vue') {
  renderToString = (await import('@vue/server-renderer')).renderToString
  createApp = (await import('./app')).createApp
  PageShell = await import('./PageShell.vue')
}

import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr'
import logoUrl from './logo.svg'
import type { PageContext } from './types'
import type { PageContextBuiltIn } from 'vite-plugin-ssr'

export { render }
// See https://vite-plugin-ssr.com/data-fetching
export const passToClient = ['pageProps', 'urlPathname']

async function render(pageContext: PageContextBuiltIn & PageContext) {
  let pageHtml: any

  const { Page, pageProps } = pageContext

  if (import.meta.env.VITE_APP_FRAMEWORK === 'Preact' || import.meta.env.VITE_APP_FRAMEWORK === 'React') {
    pageHtml = renderToString(
      <PageShell pageContext={pageContext}>
        <Page {...pageProps} />
      </PageShell>
    )
  } else if (import.meta.env.VITE_APP_FRAMEWORK === 'Vue') {
    const app = createApp(pageContext)
    pageHtml = await renderToString(app)
  }

  // See https://vite-plugin-ssr.com/head
  const { documentProps } = pageContext
  const title = (documentProps && documentProps.title) || 'Vite SSR app'
  const desc = (documentProps && documentProps.description) || 'App using Vite + vite-plugin-ssr'

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="${logoUrl}" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
      </head>
      <body>
        <div id="page-view">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`

  return {
    documentHtml,
    pageContext: {
      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vite-plugin-ssr.com/page-redirection
    }
  }
}

console.log(import.meta.env)
