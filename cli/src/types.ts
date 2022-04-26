export type Frameworks = 'Preact' | 'React' | 'Vue'

export type Framework = Partial<Frameworks>

export const defaultTargetDir = 'vite-app'

export const selectOptions = [
  {
    label: 'UI Framework',
    key: 'framework',
    values: ['React', 'Vue', 'Preact']
  },
  {
    label: 'TypeScript',
    key: 'typescript',
    values: ['No', 'Yes']
  },
  {
    label: 'Client Routing',
    key: 'routing',
    values: ['No', 'Yes']
  },
  {
    label: 'Eject Renderer',
    key: 'renderer',
    values: ['No', 'Yes']
  },
  {
    label: 'RPC',
    key: 'rpc',
    values: ['No', 'Yes']
  },
  {
    label: 'Pre-rendering',
    key: 'prerender',
    values: ['No', 'Yes']
  }
] as const

export const STEP = {
  INIT: 1,
  SELECT_DIR: 2,
  SELECTED_DIR: 3,
  RENAME_DIR: 4,
  RENAMED_DIR: 5,
  SELECTED_OPTIONS: 6,
  BUILD: 7
} as const

type ValueOf<T> = T[keyof T]

export type ValueOfSTEP = ValueOf<typeof STEP>

export type SelectedOptions = number[] | undefined

export type State = {
  step: ValueOfSTEP
  targetDir: string
  selectedOptions: SelectedOptions
  errors: boolean
  errorMessages: string[] | undefined
}

export enum ReducerActionType {
  SET_STEP,
  SET_RENAMED_DIR,
  SET_SELECTED_OPTIONS,
  SET_ERROR
}

export type SetStepAction = {
  type: ReducerActionType.SET_STEP
  payload: Required<ValueOfSTEP>
}

export type SetRenamedDirAction = {
  type: ReducerActionType.SET_RENAMED_DIR
  payload: Required<string>
}

export type SetSelectedOptionsAction = {
  type: ReducerActionType.SET_SELECTED_OPTIONS
  payload: Required<SelectedOptions>
}

export type setErrorAction = {
  type: ReducerActionType.SET_ERROR
  payload: string[] | undefined
}

export type ReducerAction = SetStepAction | SetRenamedDirAction | SetSelectedOptionsAction | setErrorAction

// will be changed to VITE_APP import.meta stuff
export type Result = {
  framework: Frameworks
  typescript: boolean
  routing: boolean
  renderer: boolean
  rpc: boolean
  prerender: boolean
}

export interface FailureProps {
  message: Array<string[] | string>
}
