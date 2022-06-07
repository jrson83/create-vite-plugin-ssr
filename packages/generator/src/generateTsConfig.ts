import { templateRootDir } from './config'
import { writeJson } from './utils'
import type { UIOptions } from '@create-vite-plugin-ssr/cli/src/types'

export async function generateTsConfig(uiOption: UIOptions) {
  const file = `tsconfig.json`

  const tsConfig = {
    compilerOptions: {
      strict: true,
      module: 'ES2020',
      moduleResolution: 'Node',
      target: 'ES2017',
      lib: ['DOM', 'DOM.Iterable', 'ESNext'],
      ...(uiOption === 'React' && { jsx: 'react' }),
      ...(uiOption === 'Preact' && { jsx: 'react-jsx', jsxImportSource: 'preact' }),
      types: ['vite/client'],
      skipLibCheck: true,
      esModuleInterop: true
    },
    'ts-node': {
      transpileOnly: true,
      compilerOptions: {
        module: 'CommonJS'
      }
    }
  } as const

  try {
    await writeJson(`${templateRootDir}/${uiOption.toLowerCase()}-ts/${file}`, tsConfig)
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(`${err.name} ${err.message}`)
    }
  }
}
