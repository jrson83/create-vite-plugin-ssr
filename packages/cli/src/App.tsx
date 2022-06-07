import React, { useEffect, useState } from 'react'
import { useInput, useApp, Box, Text } from 'ink'
import figures from 'figures'

import { selectOptions } from './config'
import { useCLI } from './hooks'
import { Failure, FixedTextInput, TaskList } from './components'
import { STEP } from './types'

export { App }

function App() {
  const { exit } = useApp()

  const { state, setSelectedDir, setRenameDir, setRenamedDir, setSelectedOptions, setStartBuild, setCompleted } =
    useCLI()

  const { errors, errorMessages, isProcessingTask, selectedOptions, step, targetDir } = state

  const [selectedRow, setSelectedRow] = useState<number>(0)
  const [selectedValues, setSelectedValues] = useState(selectOptions.map(() => 0))

  useEffect(() => {
    if (step === STEP.SELECTED_OPTIONS && targetDir != '' && typeof selectedOptions !== 'undefined') {
      setStartBuild().finally(() => {
        setCompleted()
      })
    }
  })

  useInput(
    (input, key) => {
      if (key.escape) {
        exit()
      }

      if (step === STEP.SELECT_DIR) {
        if (input === 'r') {
          setRenameDir()
        }

        if (key.return) {
          setSelectedDir()
        }

        return null
      }

      if (step === STEP.RENAME_DIR) {
        /* if (key.return) {
          setRenamedDir('test')
        } 

        return null*/
      }

      if (step === STEP.INIT || step === STEP.SELECTED_DIR || step === STEP.RENAMED_DIR) {
        if (key.return) {
          if (isProcessingTask) return
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
        <Text color="gray">v{process.env.npm_package_version}</Text>
      </Box>
      {/* Display warning when `vite-app` dir exist & is not empty */}
      {step === STEP.SELECT_DIR && (
        <Failure
          message={[
            'Target directory <vite-app> is not empty.',
            'Press <r> to rename the directory, <return> to remove existing files and continue.'
          ]}
        />
      )}
      {/* Display errors messages when useReducer validation fails */}
      {errors && errorMessages && <Failure message={[errorMessages]} />}
      {/* Input prompt for dir */}
      {step == STEP.RENAME_DIR && (
        <Box marginBottom={1} marginRight={1}>
          <Text color="cyanBright">{figures.questionMarkPrefix}</Text>
          <Box marginX={1}>
            <Text bold>Please select a project directory:</Text>
          </Box>
          <FixedTextInput initialValue={targetDir} onSubmit={setRenamedDir} />
        </Box>
      )}
      {/* Message when alternative dir is set */}
      {step === STEP.RENAMED_DIR && (
        <Box marginBottom={1} marginRight={1}>
          <Text color="green">{figures.tick}</Text>
          <Box marginLeft={2}>
            <Text>{`New project directory set to <${targetDir}>`}. Please continue with setup.</Text>
          </Box>
        </Box>
      )}
      {/* Message when dir accepted */}
      {step === STEP.SELECTED_DIR && (
        <Box marginBottom={1} marginRight={1}>
          <Text color="green">{figures.tick}</Text>
          <Box marginLeft={2}>
            <Text>{`Existing dir <${targetDir}>`} will be removed.</Text>
          </Box>
        </Box>
      )}
      {/* Tasklist when build starts */}
      {step === STEP.START_BUILD && <TaskList state={state} />}
      {/* Message when build is completed */}
      {step === STEP.COMPLETED_BUILD && (
        <>
          <Box marginBottom={1} marginRight={1}>
            <Text backgroundColor="green"> DONE </Text>
            <Box marginLeft={2}>
              <Text color="green">{`Boilerplate successfully generated in <${targetDir}> directory`}.</Text>
            </Box>
          </Box>
          <Box marginBottom={1}>
            <Text>Get started:</Text>
          </Box>
          <Box>
            <Box marginBottom={1} marginLeft={3} flexDirection="column">
              <Box flexDirection="row">
                <Text>1. cd </Text>
                <Text color="cyanBright">{targetDir}</Text>
              </Box>
              <Box flexDirection="row">
                <Text>2. </Text>
                <Text color="cyanBright">npm install</Text>
                <Text> or </Text>
                <Text color="cyanBright">yarn install</Text>
              </Box>
              <Box flexDirection="row">
                <Text>3. </Text>
                <Text color="cyanBright">npm run dev</Text>
                <Text> or </Text>
                <Text color="cyanBright">yarn dev</Text>
              </Box>
            </Box>
          </Box>
          <Box marginBottom={1}>
            <Text color="gray">Please visit the documentation for more information: https://vite-plugin-ssr.com/</Text>
          </Box>
        </>
      )}
      {/* Initial selector */}
      {step != STEP.START_BUILD && step != STEP.COMPLETED_BUILD && (
        <Box flexDirection="column">
          <Box marginBottom={1} marginRight={1}>
            <Text color="cyanBright">{figures.questionMarkPrefix}</Text>
            <Box marginLeft={1}>
              <Text {...(!targetDir ? { color: 'grey' } : { bold: true })}>Please select the project features:</Text>
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
      )}
    </React.Fragment>
  )
}
