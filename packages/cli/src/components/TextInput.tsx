import React, { FC, useState } from 'react'
import TextInput from 'ink-text-input'

// Fixes issue: https://github.com/vadimdemedes/ink-text-input/issues/72

interface Props {
  placeholder?: string
  focus?: boolean
  mask?: string
  showCursor?: boolean
  highlightPastedText?: boolean
  value: string
  onChange: (value: string) => void
  onSubmit?: (value: string) => void
}

interface FixedUncontrolledProps extends Omit<Props, 'value' | 'onChange'> {
  initialValue?: string
}

export const FixedTextInput: FC<FixedUncontrolledProps> = ({ initialValue = '', ...props }) => {
  const [value, setValue] = useState(initialValue)

  return <TextInput {...props} value={value} onChange={setValue} />
}
