// `usePageContext` allows us to access `pageContext` in any React component.
// More infos: https://vite-plugin-ssr.com/pageContext-anywhere

let createContext: <T>(defaultValue: T) => any /* <T>(defaultValue: T,) => PageContext<T> */
let useContext: <T>(context: any) => T /* <T>(context: PageContext<T>) => T */

// @if: FRAMEWORK === 'Preact'
import type { PreactNode } from '../types'

if (import.meta.env.VITE_APP_FRAMEWORK === 'Preact') {
  createContext = (await import('preact')).createContext
  useContext = (await import('preact/hooks')).useContext
}

if (import.meta.env.VITE_APP_FRAMEWORK === 'React') {
  createContext = (await import('react')).createContext
  useContext = (await import('react')).useContext
}

import type { PageContext } from './types'

export { PageContextProvider }
export { usePageContext }

const Context = createContext<PageContext>(undefined as any)

function PageContextProvider({
  pageContext,
  children
}: {
  pageContext: PageContext
  children: any //React.ReactNode | PreactNode
}) {
  return <Context.Provider value={pageContext}>{children}</Context.Provider>
}

function usePageContext() {
  const pageContext = useContext(Context)
  return pageContext
}
