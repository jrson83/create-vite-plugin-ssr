export { Page }

let Page: any

if (import.meta.env.VITE_APP_FRAMEWORK === 'Preact') {
  Page = (await import('./indexJSX')).Page
}

if (import.meta.env.VITE_APP_FRAMEWORK === 'React') {
  Page = (await import('./indexJSX')).Page
}

if (import.meta.env.VITE_APP_FRAMEWORK === 'Vue') {
  Page = (await import('./index.vue')).default
}
