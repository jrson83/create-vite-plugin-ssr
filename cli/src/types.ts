import { defaultTargetDir, uiOptions, voteOptions, taskList } from './config'

export type UIOptions = typeof uiOptions[number]

export type UIOption = Partial<UIOptions>

export interface ITask {
  id: number
  title: string
  task: () => Promise<void>
}

export interface IConfig {
  selectOptions: Array<{
    label: string
    key: string
    values: typeof uiOptions | typeof voteOptions
  }>
  defaultTargetDir: typeof defaultTargetDir
  boilerplateConfig: {
    createDirectories: Array<string>
    copyFiles: Array<{
      src: string
      output: string
    }>
    buildTemplates: Array<{
      [key in UIOption]: {
        files: Array<{
          src: string
          output: string
        }>
      }
    }>
  }
  taskList: Array<ITask>
}

export const STEP = {
  INIT: 1,
  SELECT_DIR: 2,
  SELECTED_DIR: 3,
  RENAME_DIR: 4,
  RENAMED_DIR: 5,
  SELECTED_OPTIONS: 6,
  START_BUILD: 7,
  COMPLETED_BUILD: 8
} as const

type ValueOf<T> = T[keyof T]

export type ValueOfSTEP = ValueOf<typeof STEP>

export type SelectedOptions = number[] | undefined

export type ReducerState = {
  step: ValueOfSTEP
  targetDir: string
  selectedOptions: SelectedOptions
  taskList: typeof taskList
  totalTasks: number
  isProcessingTask: boolean
  processingTaskId: number
  completedTasks: number[]
  failedTasks: number[]
  buildOptions: Record<string, any> | undefined
  errors: boolean
  errorMessages: string[] | undefined
}

export enum ReducerActionType {
  SET_STEP,
  SET_RENAMED_DIR,
  SET_SELECTED_OPTIONS,
  SET_START_BUILD,
  SET_SUCCESS_BUILD,
  SET_ERROR_BUILD,
  SET_COMPLETED_BUILD,
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
  payload: {
    selectedOptions: Required<SelectedOptions>
    buildOptions: Required<Record<string, any>>
  }
}

export type setStartBuildAction = {
  type: ReducerActionType.SET_START_BUILD
  payload: Required<number>
}

export type setSuccessBuildAction = {
  type: ReducerActionType.SET_SUCCESS_BUILD
  payload: Required<number>
}

export type setErrorBuildAction = {
  type: ReducerActionType.SET_ERROR_BUILD
  payload: Required<number>
}

export type setCompletedBuildAction = {
  type: ReducerActionType.SET_COMPLETED_BUILD
  payload: null
}

export type setErrorAction = {
  type: ReducerActionType.SET_ERROR
  payload: string[] | undefined
}

export type ReducerAction =
  | SetStepAction
  | SetRenamedDirAction
  | SetSelectedOptionsAction
  | setStartBuildAction
  | setSuccessBuildAction
  | setErrorBuildAction
  | setCompletedBuildAction
  | setErrorAction

export type FailureProps = {
  message: Array<string[] | string>
}

export type TaskListProps = {
  state: ReducerState
}

export type TaskProgressState = 'pending' | 'processing' | 'completed' | 'failed'

export type TaskProps = {
  title: string
  state: TaskProgressState
}
