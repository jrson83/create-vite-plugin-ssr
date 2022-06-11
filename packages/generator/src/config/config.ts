import path from 'path'
import { uiOptions } from '@create-vite-plugin-ssr/cli/src/config'
import { generatePackageJson } from '../generatePackageJson'
import { generateTsConfig } from '../generateTsConfig'
import { generateViteConfig } from '../generateViteConfig'
import {
  copyGitIgnore,
  copySharedDirs,
  copyUiDirs,
  createUiDirs,
  generateJsTemplates,
  removeExistingUiDirs,
  replaceES6Imports,
  replaceWorkspaceImports
} from '../generateFilesystem'
import type { IConfig } from '../types'

const cwd = process.cwd()

const boilerplateRootDir = path.join(cwd, '..', 'boilerplate', 'templates')
const sharedRootDir = path.join(cwd, '..', 'boilerplate', 'shared')
const templateRootDir = path.join(cwd, '..', 'templates')

const Config: IConfig = Object.freeze({
  tsTaskList: [
    {
      title: 'Remove existing UI directories',
      async task() {
        await removeExistingUiDirs()
      }
    },
    {
      title: 'Created UI directories',
      async task() {
        await createUiDirs()
      }
    },
    {
      title: 'Copied shared directories',
      async task() {
        await copySharedDirs()
      }
    },
    {
      title: 'Copied UI directories',
      async task() {
        await copyUiDirs()
      }
    },
    {
      title: 'Copied .gitignore',
      async task() {
        await copyGitIgnore(true)
      }
    },
    {
      title: 'Generated Package file',
      async task() {
        for (const ui of uiOptions) {
          await generatePackageJson(ui, true)
        }
      }
    },
    {
      title: 'Generated Typescript config',
      async task() {
        for (const ui of uiOptions) {
          await generateTsConfig(ui)
        }
      }
    },
    {
      title: 'Generated Vite config',
      async task() {
        for (const ui of uiOptions) {
          await generateViteConfig(ui)
        }
      }
    },
    {
      title: 'Replaced imports',
      async task() {
        await replaceWorkspaceImports()
      }
    }
  ],
  jsTaskList: [
    {
      title: 'Generated JavaScript templates',
      async task() {
        await generateJsTemplates()
      }
    },
    {
      title: 'Copied .gitignore',
      async task() {
        await copyGitIgnore(false)
      }
    },
    {
      title: 'Generated Package file',
      async task() {
        for (const ui of uiOptions) {
          await generatePackageJson(ui, false)
        }
      }
    },
    {
      title: 'Replaced imports',
      async task() {
        await replaceES6Imports()
      }
    }
  ]
})

export { Config, boilerplateRootDir, sharedRootDir, templateRootDir }
export const { jsTaskList, tsTaskList } = Config
