import { STEPS } from '../constants'
import { State } from '../types'

export const state: State = {
  step: STEPS.NAME,
  directory: '',
  selectedOptions: [],
  optionsResult: {}
}
