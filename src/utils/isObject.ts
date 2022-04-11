export { isObject }

function isObject(value: unknown): value is Record<string, unknown>[any] {
  return typeof value === 'object' && value !== null
}
