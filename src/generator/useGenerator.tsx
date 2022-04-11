import { useReducer } from 'react'
import { state as initialState } from '../core/state'
import { reducer } from '../core/reducer'
import { ReducerActionType } from '../types'
import { STEPS, TEMPLATES } from '../constants'
import { formatSelectionOptions } from '../utils'

export default function useGenerator() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const setStep = (payload: any) => {
    dispatch({
      type: ReducerActionType.SET_STEP,
      payload
    })
  }

  const setDirectory = (payload: any) => {
    dispatch({
      type: ReducerActionType.SET_NAME_DIRECTORY,
      payload
    })
  }

  const onCompleteTypingDirectory = () => {
    setStep(STEPS.SELECT)
  }

  const setSelectedOptions = (payload: any) => {
    dispatch({
      type: ReducerActionType.SET_SELECTED_OPTIONS,
      payload
    })
  }

  const onCompleteSelectedOptions = () => {
    formatSelectionOptions(TEMPLATES, state.selectedOptions)
    setStep(STEPS.CONFIRM)
  }

  return {
    onCompleteTypingDirectory,
    onCompleteSelectedOptions,
    setSelectedOptions,
    setDirectory,
    setStep,
    dispatch,
    state
  }
}
