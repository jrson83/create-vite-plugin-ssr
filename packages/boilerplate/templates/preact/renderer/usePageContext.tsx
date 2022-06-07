// `usePageContext` allows us to access `pageContext` in any React component.
// More infos: https://vite-plugin-ssr.com/pageContext-anywhere

import { createContext } from 'preact'
import { useContext } from 'preact/hooks'
import type { PageContext } from './types'
import type { ComponentChildren } from 'preact'

export { PageContextProvider }
export { usePageContext }

const Context = createContext<PageContext>(undefined as any)

function PageContextProvider({ pageContext, children }: { pageContext: PageContext; children: ComponentChildren }) {
  return <Context.Provider value={pageContext}>{children}</Context.Provider>
}

function usePageContext() {
  const pageContext = useContext(Context)
  return pageContext
}
