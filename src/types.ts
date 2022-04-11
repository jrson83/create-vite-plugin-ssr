export type Templates = {
  label: string
  values: string[]
}[]

export interface OptionsResult {
  [key: string]: string | number
}

export type Steps = {
  NAME: number
  SELECT: number
  CONFIRM: number
  LOADING: number
  END: number
}

export type TemplateOptions = {
  label: string
  values: string[]
}

export type SelectedOptions = number[]

export type State = {
  step: any
  directory: string
  selectedOptions: SelectedOptions
  optionsResult: OptionsResult
}

export enum ReducerActionType {
  SET_SELECTED_OPTIONS,
  SET_STEP,
  SET_NAME_DIRECTORY
}

export type SetSelectedOptionsAction = {
  type: ReducerActionType.SET_SELECTED_OPTIONS
  payload: Required<SelectedOptions>
}

export type SetStepAction = {
  type: ReducerActionType.SET_STEP
  payload: Required<Steps>
}

export type SateNameDirectoryAction = {
  type: ReducerActionType.SET_NAME_DIRECTORY
  payload: Required<string>
}

export type ReducerAction = SetSelectedOptionsAction | SetStepAction | SateNameDirectoryAction
