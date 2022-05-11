import { delay } from '../utils'
import {
  generateFileCopies,
  generateBoilerplateDirs,
  generatePackageJson,
  generateTsConfig,
  generateViteConfig,
  removeDir,
  templateRootDir
} from '../generator'
import type { IConfig } from '../types'

const uiOptions = ['Preact', 'React', 'Vue'] as const

const voteOptions = ['No', 'Yes'] as const

const defaultTargetDir = 'vite-app' as const

const Config: IConfig = Object.freeze({
  selectOptions: [
    {
      label: 'UI Framework',
      key: 'VITE_APP_FRAMEWORK',
      values: uiOptions
    },
    {
      label: 'TypeScript',
      key: 'VITE_APP_TYPESCRIPT',
      values: voteOptions
    },
    {
      label: 'Client Routing',
      key: 'VITE_APP_CLIENT_ROUTING',
      values: voteOptions
    },
    {
      label: 'Eject Renderer',
      key: 'VITE_APP_EJECT_RENDERER',
      values: voteOptions
    },
    {
      label: 'RPC',
      key: 'VITE_APP_RPC',
      values: voteOptions
    },
    {
      label: 'Pre-rendering',
      key: 'VITE_APP_PRERENDERING',
      values: voteOptions
    }
  ],
  defaultTargetDir,
  boilerplateConfig: {
    createDirectories: ['pages/about', 'pages/index', 'renderer', 'server'],
    copyFiles: {
      defaultFiles: [
        {
          src: 'renderer/logo.svg',
          output: 'renderer/logo.svg'
        },
        {
          src: 'renderer/types.ts',
          output: 'renderer/types.ts'
        },
        {
          src: 'server/index.ts',
          output: 'server/index.ts'
        },
        {
          src: '_gitignore',
          output: '.gitignore'
        }
      ],
      uiFiles: {
        Vue: {
          files: [
            {
              src: '_vue.d.ts_',
              output: 'vue.d.ts'
            }
          ]
        }
      }
    },
    // NOT DONE YET (JUST EXAMPLE STUFF HERE)
    buildTemplates: [
      {
        Preact: {
          files: [
            {
              src: 'pages/about/index.page.ts',
              output: 'pages/about/index.page.tsx'
            }
          ]
        },
        React: {
          files: [
            {
              src: 'pages/about/index.page.ts',
              output: 'pages/about/index.page.tsx'
            }
          ]
        },
        Vue: {
          files: [
            {
              src: 'pages/about/index.vue',
              output: 'pages/about/index.page.vue'
            },
            {
              src: 'pages/index/index.vue',
              output: 'pages/index/index.page.vue'
            },
            {
              src: 'pages/index/Counter.vue',
              output: 'pages/index/Counter.vue'
            }
          ]
        }
      }
    ]
  },
  taskList: [
    {
      id: 1,
      title: 'Cleaning up directories',
      async task() {
        await removeDir(`${templateRootDir}`)
      }
    },
    {
      id: 2,
      title: 'Creating directories',
      async task() {
        await generateBoilerplateDirs()
      }
    },
    {
      id: 3,
      title: 'Copying static files',
      async task() {
        // NOT DONE YET
        await generateFileCopies('Vue')
        await delay(1)
      }
    },
    {
      id: 4,
      title: 'Creating config files',
      async task() {
        await generatePackageJson('Vue')
        await generateTsConfig('Vue')
        await generateViteConfig('Vue')
        await delay(1)
      }
    },
    {
      id: 5,
      title: 'Creating template files',
      async task() {
        // TODO
        await delay(1)
      }
    }
  ]
})

export { uiOptions, voteOptions, defaultTargetDir }
export const { selectOptions, boilerplateConfig, taskList } = Config
export default Config
