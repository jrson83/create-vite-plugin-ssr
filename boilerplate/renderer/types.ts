import { PreactNode } from '../types'

export type PageProps = {}
// The `pageContext` that are available in both on the server-side and browser-side
export type PageContext = {
  Page?: (pageProps: PageProps) => any //React.ReactElement | PreactNode
  pageProps?: PageProps
  urlPathname?: string
  documentProps?: {
    title?: string
    description?: string
  }
}
