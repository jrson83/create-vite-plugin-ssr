import { ReducerAction, ReducerActionType, State } from '../types'

export function reducer(state: State, action: ReducerAction): State {
  const { type, payload } = action

  switch (type) {
    case ReducerActionType.SET_SELECTED_OPTIONS:
      return {
        ...state,
        selectedOptions: payload
      }
    case ReducerActionType.SET_STEP:
      return {
        ...state,
        step: payload
      }
    case ReducerActionType.SET_NAME_DIRECTORY:
      return {
        ...state,
        directory: payload
      }
    default:
      return state
  }
}
