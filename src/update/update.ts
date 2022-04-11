#!/usr/bin/env node

import fs from 'fs'
import latestVersion from '@badisi/latest-version'
import { ROOT_DIR } from '../constants'
import { replaceDeep } from '../utils'
import { PkgJson, PkgTemp, PkgUpdates } from './types'
import _PackageJson, {
  vitePluginSSRDependencies,
  preactDependencies,
  reactDependencies,
  vueDependencies,
  tsDependencies,
  tsReactDependencies
} from '../../templates/package.json'

const PackageJson = _PackageJson as PkgJson
let pkgUpdates: PkgUpdates = {}

export async function updatePkgDependencies(): Promise<PkgUpdates> {
  const pkg: PkgTemp = Object.assign(
    {},
    {
      dependencies: {
        ...vitePluginSSRDependencies,
        ...preactDependencies,
        ...reactDependencies,
        ...vueDependencies,
        ...tsDependencies,
        ...tsReactDependencies
      }
    }
  )

  Object.keys(pkg.dependencies)
    .sort()
    .forEach(function (key) {
      let value = pkg.dependencies[key]
      delete pkg.dependencies[key]
      pkg.dependencies[key] = value
    })

  const pkgs = await latestVersion(pkg, { useCache: true })

  for (let i = 0; i < pkgs.length; i += 1) {
    if (typeof pkgs[i].wanted !== 'undefined') {
      pkgUpdates = replaceDeep(PackageJson, pkgs[i].name, pkgs[i].wanted!)
    }
  }

  try {
    await fs.promises
      .writeFile(`${ROOT_DIR}/templates/package_new.json`, JSON.stringify(PackageJson, null, 2), {
        encoding: 'utf8'
      })
      .then(() => {
        //console.log(pkgUpdates)
      })
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(`${err.name} ${err.message}`)
    }
  }

  return pkgUpdates
}
