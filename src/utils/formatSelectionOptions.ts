import { state } from '../core/state'
import { camelize } from './camelize'
import { Templates, SelectedOptions } from '../types'

export { formatSelectionOptions }

function formatSelectionOptions(templates: Templates, selectedOptions: SelectedOptions) {
  for (let i = 0; i < templates.length; i++) {
    state.optionsResult[camelize(templates[i].label)] =
      i == 0 ? templates[i].values[selectedOptions[i]].toLowerCase() : selectedOptions[i]
  }
  return state.optionsResult
}
