import { useReducer } from 'react'
import { useApp } from 'ink'
import { useIsMounted } from './useIsMounted'
import { defaultTargetDir, selectOptions, taskList } from '../config'
import { isEmptyDir, sanitizePath, validateOptions } from '../utils'
import { ReducerAction, ReducerActionType, SelectedOptions, ReducerState, STEP, ValueOfSTEP } from '../types'

export function reducer(state: ReducerState, action: ReducerAction): ReducerState {
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
        selectedOptions: payload.selectedOptions,
        buildOptions: payload.buildOptions
      }
    case ReducerActionType.SET_START_BUILD:
      return {
        ...state,
        step: STEP.START_BUILD,
        isProcessingTask: true,
        processingTaskId: payload
      }
    case ReducerActionType.SET_SUCCESS_BUILD:
      return {
        ...state,
        isProcessingTask: false,
        completedTasks: [...state.completedTasks, state.processingTaskId],
        processingTaskId: 0
      }
    case ReducerActionType.SET_ERROR_BUILD:
      return {
        ...state,
        isProcessingTask: false,
        failedTasks: [...state.failedTasks, state.processingTaskId],
        processingTaskId: 0
      }
    case ReducerActionType.SET_ERROR:
      return {
        ...state,
        errors: payload ? true : false,
        errorMessages: payload ? payload : undefined
      }
    case ReducerActionType.SET_COMPLETED_BUILD:
      return {
        ...state,
        step: STEP.COMPLETED_BUILD
      }
    default:
      return state
  }
}

export function useCLI() {
  const { exit } = useApp()

  const isMounted = useIsMounted()

  const initialDirState = isEmptyDir(defaultTargetDir)

  const initialState: ReducerState = Object.freeze({
    step: initialDirState ? STEP.INIT : STEP.SELECT_DIR,
    targetDir: defaultTargetDir,
    selectedOptions: undefined,
    taskList,
    totalTasks: taskList.length,
    isProcessingTask: false,
    processingTaskId: 0,
    completedTasks: [],
    failedTasks: [],
    buildOptions: undefined,
    errors: false,
    errorMessages: undefined
  })

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

    let result: Record<string, any> = {}

    for (let i = 0; i < selectOptions.length; i++) {
      if (selectOptions[i].key === 'VITE_APP_FRAMEWORK') {
        result[selectOptions[i].key] = selectOptions[i].values[payload![i]]
      } else {
        result[selectOptions[i].key] = !!payload![i]
      }
    }

    dispatch({
      type: ReducerActionType.SET_SELECTED_OPTIONS,
      payload: {
        selectedOptions: payload,
        buildOptions: result
      }
    })
    setError()
  }

  const setStartBuild = async () => {
    if (taskList.length === 0) return

    for (const task of taskList) {
      if (isMounted()) {
        dispatch({
          type: ReducerActionType.SET_START_BUILD,
          payload: task.id
        })
      }
      try {
        await task.task().then(() => {
          if (isMounted()) {
            dispatch({
              type: ReducerActionType.SET_SUCCESS_BUILD,
              payload: task.id
            })
          }
        })
      } catch (error) {
        if (isMounted()) {
          dispatch({
            type: ReducerActionType.SET_ERROR_BUILD,
            payload: task.id
          })
        }
      }
    }
  }

  const setCompleted = () => {
    dispatch({
      type: ReducerActionType.SET_COMPLETED_BUILD,
      payload: null
    })
    exit()
  }

  const setError = (payload?: any) => {
    dispatch({
      type: ReducerActionType.SET_ERROR,
      payload
    })
  }

  return {
    setCompleted,
    setStartBuild,
    setSelectedOptions,
    setRenamedDir,
    setRenameDir,
    setSelectedDir,
    setStep,
    dispatch,
    state
  }
}
