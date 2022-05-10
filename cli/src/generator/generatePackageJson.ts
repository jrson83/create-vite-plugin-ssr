import { writeJson } from './utils'
import { defaultTargetDir } from '../config'
import type { UIOptions } from '../types'
import {
  defaultScripts,
  jsScripts,
  tsScripts,
  defaultDependencies,
  preactDependencies,
  reactDependencies,
  vueDependencies,
  tsDependencies,
  tsReactDependencies
  //@ts-ignore
} from '../../../boilerplate/_package.json'

export async function generatePackageJson(uiOption: UIOptions, typescript: any = true) {
  const dependencies = {
    ...defaultDependencies,
    ...(typescript && tsDependencies),
    ...(uiOption === 'Preact' && preactDependencies),
    ...(uiOption === 'React' && (typescript ? { ...reactDependencies, ...tsReactDependencies } : reactDependencies)),
    ...(uiOption === 'Vue' && vueDependencies)
  }

  Object.keys(dependencies)
    .sort()
    .forEach(function (key) {
      let value = dependencies[key]
      delete dependencies[key]
      dependencies[key] = value
    })

  const pkg = {
    scripts: {
      ...defaultScripts,
      ...(typescript ? tsScripts : jsScripts)
    },
    dependencies
  }

  try {
    await writeJson(`${defaultTargetDir}/package.json`, pkg)
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(`${err.name} ${err.message}`)
    }
  }
}
