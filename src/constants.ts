import { Steps, Templates } from './types'

export const ROOT_DIR: string = process.cwd()
export const TEMPLATE_DIR: string = 'templates'

export const IGNORE_FILES: string[] = ['.prettierrc', '.test-dev.spec.ts', '.test-prod.spec.ts']
export const IGNORE_PACKAGE_JSON: string[] = []
export const RENAME_FILES = {
  _gitignore: '.gitignore'
}

export const TEMPLATES: Templates = [
  {
    label: 'UI Framework',
    values: ['React', 'Vue', 'Preact']
  },
  {
    label: 'TypeScript',
    values: ['No', 'Yes']
  },
  {
    label: 'Client Routing',
    values: ['No', 'Yes']
  },
  {
    label: 'Eject Renderer',
    values: ['No', 'Yes']
  },
  {
    label: 'RPC',
    values: ['No', 'Yes']
  },
  {
    label: 'Pre-rendering',
    values: ['No', 'Yes']
  }
]

export const HELP: string = `
Press <left-arrow> / <right-arrow> to select value
Press <up-arrow> / <down-arrow> to select row
Press <return> to confirm`

export const STEPS: Steps = {
  NAME: 1,
  SELECT: 2,
  CONFIRM: 3,
  LOADING: 4,
  END: 5
}
