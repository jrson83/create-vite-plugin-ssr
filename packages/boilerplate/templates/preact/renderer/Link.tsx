import { usePageContext } from './usePageContext'
import type { ComponentChildren } from 'preact'

export { Link }

function Link(props: { href?: string; className?: string; children: ComponentChildren }) {
  const pageContext = usePageContext()
  const className = [props.className, pageContext.urlPathname === props.href && 'is-active'].filter(Boolean).join(' ')
  return <a {...props} className={className} />
}
