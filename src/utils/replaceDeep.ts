import { isObject } from './isObject'
import { PkgJson, PkgUpdates } from '../update/types'

export { replaceDeep }

let pkgUpdates: PkgUpdates = []

function replaceDeep(obj: PkgJson, keyToMatch: string, valueToReplace: string) {
  if (!isObject(obj)) return obj

  Object.keys(obj).map(function (key) {
    if (
      key === keyToMatch &&
      valueToReplace.localeCompare(obj[key].replace('^', ''), undefined, {
        numeric: true,
        sensitivity: 'base'
      }) === 1
    ) {
      let bla = {
        label: key,
        current: obj[key].replace('^', ''),
        wanted: valueToReplace
      }
      pkgUpdates.push(bla)

      obj[key] = valueToReplace
    } else {
      replaceDeep(obj[key], keyToMatch, valueToReplace)
    }
  })
  return pkgUpdates
}
