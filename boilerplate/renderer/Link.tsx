import { usePageContext } from './usePageContext'
import type { PageContext } from './types'

// @if: FRAMEWORK === 'Preact'
import type { PreactNode } from '../types'

export { Link }

function Link(props: { href?: string; className?: string; children: React.ReactNode | PreactNode }) {
  const pageContext: PageContext = usePageContext()
  const className = [props.className, pageContext.urlPathname === props.href && 'is-active'].filter(Boolean).join(' ')
  return <a {...props} className={className} />
}
