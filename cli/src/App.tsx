import React, { useEffect, useState } from 'react'
import { useInput, useApp, Box, Text } from 'ink'
import { FixedTextInput } from './components/TextInput'
import figures from 'figures'

import { useCLI } from './reducer'
import { Failure } from './components/Failure'
import { buildApp } from './buildApp'
import { selectOptions, STEP } from './types'

export { App }

function App() {
  const { exit } = useApp()

  const { state, setSelectedDir, setRenameDir, setRenamedDir, setSelectedOptions } = useCLI()

  const [selectedRow, setSelectedRow] = useState<number>(0)
  const [selectedValues, setSelectedValues] = useState(selectOptions.map(() => 0))

  useEffect(() => {
    if (state.step == STEP.SELECTED_OPTIONS && state.targetDir != '' && typeof state.selectedOptions !== 'undefined') {
      // Here we execute generator ...
      buildApp(state)
    }
  })

  useInput(
    (input, key) => {
      if (key.escape) {
        exit()
      }

      if (state.step === STEP.SELECT_DIR) {
        if (input === 'r') {
          setRenameDir()
        }

        if (key.return) {
          setSelectedDir()
        }

        return null
      }

      if (state.step === STEP.RENAME_DIR) {
        /* if (key.return) {
          setRenamedDir('test')
        } 

        return null*/
      }

      if (state.step === STEP.INIT || state.step === STEP.SELECTED_DIR || state.step === STEP.RENAMED_DIR) {
        if (key.return) {
          setSelectedOptions(selectedValues)
        }

        if (key.leftArrow) {
          selectedValues[selectedRow] = Math.max(0, selectedValues[selectedRow] - 1)
          setSelectedValues(selectedValues.slice())
        }

        if (key.rightArrow) {
          selectedValues[selectedRow] = Math.min(
            selectOptions[selectedRow].values.length - 1,
            selectedValues[selectedRow] + 1
          )
          setSelectedValues(selectedValues.slice())
        }

        if (key.upArrow) {
          setSelectedRow(Math.max(0, selectedRow - 1))
        }

        if (key.downArrow) {
          setSelectedRow(Math.min(selectOptions.length - 1, selectedRow + 1))
        }
      }
    },
    { isActive: true }
  )

  return (
    <React.Fragment>
      {/* Display name & version */}
      <Box marginBottom={1}>
        <Box marginRight={1}>
          <Text backgroundColor="magenta"> {process.env.npm_package_name} </Text>
        </Box>
        <Text>v{process.env.npm_package_version}</Text>
      </Box>
      {/* Display warning when `vite-app` dir exist & is not empty */}
      {state.step === STEP.SELECT_DIR && (
        <Failure
          message={[
            'Target directory <vite-app> is not empty.',
            'Press <r> to rename the directory, <return> to remove existing files and continue.'
          ]}
        />
      )}
      {/* Display errors messages when useReducer validation fails */}
      {state.errors && state.errorMessages && <Failure message={[state.errorMessages]} />}
      {/* Input prompt for dir */}
      {state.step == STEP.RENAME_DIR && (
        <Box marginBottom={1} marginRight={1}>
          <Text color="cyanBright">{figures.questionMarkPrefix}</Text>
          <Box marginX={1}>
            <Text bold>Please select a project directory:</Text>
          </Box>
          <FixedTextInput initialValue={state.targetDir} onSubmit={setRenamedDir} />
        </Box>
      )}
      {/* Message when alternative dir is set */}
      {state.step == STEP.RENAMED_DIR && (
        <Box marginBottom={1} marginRight={1}>
          <Text color="green">{figures.tick}</Text>
          <Box marginLeft={2}>
            <Text>{`New project directory set to <${state.targetDir}>`}. Please continue with setup.</Text>
          </Box>
        </Box>
      )}
      {/* Message when dir accepted */}
      {state.step == STEP.SELECTED_DIR && (
        <Box marginBottom={1} marginRight={1}>
          <Text color="green">{figures.tick}</Text>
          <Box marginLeft={2}>
            <Text>{`Existing dir <${state.targetDir}>`} will be removed.</Text>
          </Box>
        </Box>
      )}
      {/* Initial selector */}
      <Box flexDirection="column">
        <Box marginBottom={1} marginRight={1}>
          <Text color="cyanBright">{figures.questionMarkPrefix}</Text>
          <Box marginLeft={1}>
            <Text {...(!state.targetDir ? { color: 'grey' } : { bold: true })}>
              Please select the project features:
            </Text>
          </Box>
        </Box>
        <Box flexDirection="column" marginBottom={1}>
          {selectOptions.map(({ label, values }: any, i: any) => {
            const cursor = <>{i === selectedRow ? figures.pointerSmall : ' '}</>
            return (
              <Box key={i}>
                <Box width={20} paddingBottom={i === 0 ? 1 : 0}>
                  <Text bold color="cyanBright">
                    {cursor}
                    {'  '}
                  </Text>
                  <Text>{label}:</Text>
                </Box>
                {values.map((val: string, j: number) => {
                  const padding = Math.abs(val.length - 9)
                  return (
                    <Box key={j} paddingRight={padding}>
                      <Text
                        {...(j === selectedValues[i] && { color: 'cyanBright' })}
                        {...(j === selectedValues[i] && i === selectedRow && { underline: true })}
                      >
                        {val}
                      </Text>
                    </Box>
                  )
                })}
              </Box>
            )
          })}
        </Box>
        {/* Key hint */}
        <Box marginBottom={1}>
          <Text color="gray">
            {`Press <left-arrow> / <right-arrow> to select value\nPress <up-arrow> / <down-arrow> to select row\nPress <return> to confirm`}
          </Text>
        </Box>
      </Box>
    </React.Fragment>
  )
}
