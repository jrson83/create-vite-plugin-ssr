import { useReducer } from 'react'
import { defaultTargetDir, ReducerAction, ReducerActionType, SelectedOptions, State, STEP, ValueOfSTEP } from './types'
import { isEmptyDir, sanitizePath, validateOptions } from './utils'

export function reducer(state: State, action: ReducerAction): State {
  const { type, payload } = action

  switch (type) {
    case ReducerActionType.SET_STEP:
      return {
        ...state,
        step: payload
      }
    case ReducerActionType.SET_RENAMED_DIR:
      return {
        ...state,
        step: STEP.RENAMED_DIR,
        targetDir: payload
      }
    case ReducerActionType.SET_SELECTED_OPTIONS:
      return {
        ...state,
        step: STEP.SELECTED_OPTIONS,
        selectedOptions: payload
      }
    case ReducerActionType.SET_ERROR:
      return {
        ...state,
        errors: payload ? true : false,
        errorMessages: payload ? payload : undefined
      }
    default:
      return state
  }
}

export function useCLI() {
  const initialDirState = isEmptyDir(defaultTargetDir)

  const initialState: State = {
    step: initialDirState ? STEP.INIT : STEP.SELECT_DIR,
    targetDir: defaultTargetDir,
    selectedOptions: undefined,
    errors: false,
    errorMessages: undefined
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const setStep = (payload: ValueOfSTEP) => {
    dispatch({
      type: ReducerActionType.SET_STEP,
      payload
    })
  }

  const setSelectedDir = () => {
    setStep(STEP.SELECTED_DIR)
  }

  const setRenameDir = () => {
    dispatch({
      type: ReducerActionType.SET_RENAMED_DIR,
      payload: ''
    })
    setStep(STEP.RENAME_DIR)
  }

  const setRenamedDir = (payload: string) => {
    if (typeof payload === 'undefined' || payload === '') {
      setError('Please specify a path. Path cannot be empty.')
      return
    }
    dispatch({
      type: ReducerActionType.SET_RENAMED_DIR,
      payload: sanitizePath(payload)
    })
    setError()
  }

  const setSelectedOptions = (payload: SelectedOptions) => {
    const validationErrors = validateOptions(payload)
    if (validationErrors) {
      setError(validationErrors)
      return
    }
    dispatch({
      type: ReducerActionType.SET_SELECTED_OPTIONS,
      payload: payload
    })
    setError()
  }

  const setError = (payload?: any) => {
    dispatch({
      type: ReducerActionType.SET_ERROR,
      payload
    })
  }

  return {
    setSelectedOptions,
    setRenamedDir,
    setRenameDir,
    setSelectedDir,
    setStep,
    dispatch,
    state
  }
}
