import { promises as fs } from 'fs'
import { transformFile } from 'detype'
import { copyFilesEnsure, copyFile, listFilesRecursive, pathExists } from './utils'
import { boilerplateRootDir, sharedRootDir, templateRootDir } from './config'
import { boilerplateConfig, uiOptions } from '@create-vite-plugin-ssr/cli/src/config'
import type { UIOptions, UIOption } from '@create-vite-plugin-ssr/cli/src/types'

const uiDirectories = getUiDirs()

export function getUiDirs() {
  return uiOptions.map(getUiDir)
}

function getUiDir(ui: UIOptions) {
  const uiDir = ui.toLowerCase()
  return uiDir
}

export async function removeExistingUiDirs() {
  for (const dir of uiDirectories) {
    await Promise.all(
      ['', '-ts'].map(async (suffix) => {
        const dirPath = `${templateRootDir}/${dir}${suffix}`
        await fs.rm(dirPath, { recursive: true, force: true })
      })
    )
  }
}

export async function createUiDirs() {
  for (const dir of uiDirectories) {
    await fs.mkdir(`${templateRootDir}/${dir}-ts`, { recursive: true })
  }
}

export async function copySharedDirs() {
  const { copySharedDirectories } = boilerplateConfig

  for (const uiDir of uiDirectories) {
    for (const dir of copySharedDirectories) {
      await copyFilesEnsure(`${sharedRootDir}/${dir}`, `${templateRootDir}/${uiDir}-ts/${dir}`)
    }
  }
}

export async function copyUiDirs() {
  const { copyUiDirectories } = boilerplateConfig

  for (const uiDir of uiDirectories) {
    for (const dir of copyUiDirectories) {
      await copyFilesEnsure(`${boilerplateRootDir}/${uiDir}/${dir}`, `${templateRootDir}/${uiDir}-ts/${dir}`)
    }
  }
}

export async function copyGitIgnore(typescript: boolean) {
  for (const uiDir of uiDirectories) {
    await copyFile(`${sharedRootDir}/_gitignore`, `${templateRootDir}/${uiDir}${typescript ? `-ts` : ``}/.gitignore`)
  }
}

export async function generateJsTemplates() {
  const { extensionsToCopy, extensionsToProcess, extensionsToRename, filesToExclude } = boilerplateConfig

  const uiDirectories = getUiDirs()

  for (const uiDir of uiDirectories) {
    const regexp = new RegExp(`${uiDir}\-ts`, 'gi')

    const files = (await listFilesRecursive(`${templateRootDir}/${uiDir}-ts`))
      .filter((file) => !filesToExclude.includes(file.name))
      .map((file) => {
        return { ...file, dest: file.filePath.replace(regexp, uiDir), path: file.path.replace(regexp, uiDir) }
      })

    const filesToProcess = files.filter((file) => file.name.match(extensionsToProcess))
    const filesToCopy = files.filter((file) => file.name.match(extensionsToCopy))

    for (const file of filesToCopy) {
      const dirExists = await pathExists(file.path)
      if (!dirExists) {
        await fs.mkdir(file.path, { recursive: true })
      }
      await copyFile(file.filePath, file.dest)
    }

    for (const file of filesToProcess) {
      const dirExists = await pathExists(file.path)
      if (!dirExists) {
        await fs.mkdir(file.path, { recursive: true })
      }
      await transformFile(file.filePath, file.dest.replace(extensionsToRename, '.js'))
    }
  }
}

export const replaceWorkspaceImports = async () => {
  const { workspaceImportsToReplace } = boilerplateConfig

  for (const [ui, files] of Object.entries(workspaceImportsToReplace) as any) {
    for (const file of files) {
      await replaceWorkspaceImport(ui, file)
    }
  }
}

export const replaceWorkspaceImport = async (ui: UIOption, file: string) => {
  const uiDir = getUiDir(ui)
  let content = await fs.readFile(`${templateRootDir}/${uiDir}-ts/${file}`, { encoding: 'utf-8' })

  content = content.replace(
    /^import\s\{?\s?(?<import>[a-zA-Z]+)\s?\}?\sfrom\s['"]@create-vite-plugin-ssr\/shared\/[a-zA-Z\.\/-]+\/(?<lib>[a-zA-Z\.\/-]+)['"].*/gm,
    `import $<import> from './$<lib>'`
  )

  content = content.replace(
    /^import\s['"]@create-vite-plugin-ssr\/shared\/[a-zA-Z\.\/-]+\/(?<lib>[a-zA-Z\.\/-]+)['"].*/gm,
    `import './$<lib>'`
  )

  await fs.writeFile(`${templateRootDir}/${uiDir}-ts/${file}`, content, { encoding: 'utf-8' })
}

export const replaceES6Imports = async () => {
  const { es6ImportsToReplace } = boilerplateConfig

  for (const uiDir of uiDirectories) {
    for (const file of es6ImportsToReplace) {
      await replaceES6Import(uiDir, file)
    }
  }
}

export const replaceES6Import = async (uiDir: string, file: string) => {
  let content = await fs.readFile(`${templateRootDir}/${uiDir}/${file}`, { encoding: 'utf-8' })

  content = content.replace(
    /^import\s\{?\s?(?<import>[a-zA-Z]+)\s?\}?\sfrom\s['"](?<lib>[a-zA-Z\.\/-]+)['"].*/gm,
    `const $<import> = require('$<lib>')`
  )

  await fs.writeFile(`${templateRootDir}/${uiDir}/${file}`, content, { encoding: 'utf-8' })
}
