import fs from 'fs'
import { defaultTargetDir } from '../config'
import type { UIOptions } from '../types'

const fsPromises = fs.promises

export async function generateViteConfig(uiOption: UIOptions, typescript: any = true) {
  const language = typescript ? 'ts' : 'js'
  const file = `vite.config.${language}`

  let importPkg
  if (uiOption === 'Preact') {
    importPkg = `@preact/preset-vite`
  } else if (uiOption === 'React') {
    importPkg = `@vitejs/plugin-react`
  } else if (uiOption === 'Vue') {
    importPkg = `@vitejs/plugin-vue`
  }

  const viteConfig = `import ${uiOption.toLowerCase()} from '${importPkg}'
import ssr from 'vite-plugin-ssr/plugin'
${typescript && `import { UserConfig } from 'vite'`}

${typescript ? `const config: UserConfig = {` : `export default {`}
  plugins: [${uiOption.toLowerCase()}(), ssr()]
}

${typescript && `export default config`}`

  try {
    await fsPromises.writeFile(`${defaultTargetDir}/${file}`, viteConfig)
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(`${err.name} ${err.message}`)
    }
  }
}
