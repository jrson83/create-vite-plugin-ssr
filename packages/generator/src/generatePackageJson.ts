import { templateRootDir } from './config'
import { writeJson } from './utils'
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
} from '@create-vite-plugin-ssr/boilerplate/shared/_package.json'
import type { UIOptions } from '@create-vite-plugin-ssr/cli/src/types'

export async function generatePackageJson(uiOption: UIOptions, typescript: boolean) {
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
    await writeJson(`${templateRootDir}/${uiOption.toLowerCase()}${typescript ? `-ts` : ``}/package.json`, pkg)
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(`${err.name} ${err.message}`)
    }
  }
}
