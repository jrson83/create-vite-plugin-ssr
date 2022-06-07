import { delay } from '../utils'
import type { IConfig } from '../types'

// Existing frameworks
const uiOptions = ['Preact', 'React', 'Vue'] as const

// Existing options for a vote
const voteOptions = ['No', 'Yes'] as const

// Default installer directory
const defaultTargetDir = 'vite-app' as const

const Config: IConfig = Object.freeze({
  // CLI options to select
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
    // Shared directories to include when generating `ts` templates
    copySharedDirectories: ['pages', 'renderer', 'server'],
    // UI directories to include when generating `ts` templates
    copyUiDirectories: ['pages/about', 'pages/index', 'renderer'],
    // Files to exclude when generating `js` templates
    filesToExclude: ['package.json', 'tsconfig.json', 'types.ts'],
    // File extensions to include when generating `js` templates
    extensionsToProcess: /\.(ts|tsx|vue)$/,
    // File extensions to copy when generating `js` templates
    extensionsToCopy: /\.(css|svg|json)$/,
    // File extensions to rename when generating `js` templates
    extensionsToRename: /\.(ts|tsx)$/
  },
  taskList: [
    {
      id: 1,
      title: 'Just a placeholder, not done yet!',
      async task() {
        await delay(5)
      }
    }
  ]
})

export { uiOptions, voteOptions, defaultTargetDir }
export const { selectOptions, boilerplateConfig, taskList } = Config
export default Config
