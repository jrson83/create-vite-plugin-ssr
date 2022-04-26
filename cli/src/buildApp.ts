//import { format, Options as PrettierOptions } from 'prettier'
/* import { sortObject, writeFile } from './utils' */

import { exit } from 'process'
import { Result, selectOptions, State } from './types'

export async function buildApp(state: State) {
  const { selectedOptions } = state

  let result: Record<string, any> = {} as Result

  for (let i = 0; i < selectOptions.length; i++) {
    let key: string = selectOptions[i].key
    result[key] = i == 0 ? selectOptions[i].values[selectedOptions![i]] /* .toLowerCase() */ : selectedOptions![i]
  }

  const { framework } = result

  if (!selectOptions[0].values.includes(framework)) {
    process.stderr.write(`\n${framework} is not a valid Framework.`)
  }

  process.stdout.write(`\n${JSON.stringify(result)}\n\n now the build starts .... WIP`)
  exit(0)

  /* const pkg = buildPackage(framework, typescript)

  const writePackage = await writeFile(`${defaultTargetDir}/package.json`, JSON.stringify(pkg)) */
}

/* function buildPackage(framework: Framework, typescript: keyof Result) {
  const dependencies = {
    ...defaultDependencies,
    ...(typescript && tsDependencies),
    ...(framework === 'Preact' && preactDependencies),
    ...(framework === 'React' && (typescript ? { ...reactDependencies, ...tsReactDependencies } : reactDependencies)),
    ...(framework === 'Vue' && vueDependencies)
  }

  sortObject(dependencies)

  const pkg = {
    scripts: {
      ...defaultScripts,
      ...(typescript ? tsScripts : jsScripts)
    },
    dependencies
  }

  return pkg
}

function buildViteConfig() {}

function buildTsConfig() {}
 */
