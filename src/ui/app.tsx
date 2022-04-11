#!/usr/bin/env node
import React, { FC, useEffect, useMemo, useState } from 'react'
import { useInput, useApp, Box, Text } from 'ink'
import TextInput from 'ink-text-input'
import SelectInput from 'ink-select-input'
import figures from 'figures'
import { HELP, STEPS, TEMPLATES } from '../constants'
import useGenerator from '../generator/useGenerator'
import { name, version } from '../../package.json'

const handleSelect = (item: any) => {
  // `item` = { label: 'First', value: 'first' }
}

const items = [
  {
    label: 'Yes',
    value: true
  },
  {
    label: 'Restart',
    value: false
  }
]

export const App: FC = () => {
  const cliArgs: string[] = process.argv.slice(2)

  const { exit } = useApp()
  const { state, setDirectory, setSelectedOptions, onCompleteTypingDirectory, onCompleteSelectedOptions } =
    useGenerator()

  const [selectedRow, setSelectedRow] = useState<number>(0)

  const rawOptions = TEMPLATES.map(() => 0)
  const selectOptions = useMemo(
    () =>
      state.selectedOptions.map(option => {
        return option
      }),
    [state.selectedOptions]
  )

  useInput(
    (input, key) => {
      if (key.escape) {
        process.stdout.write(`\nInstallation cancelled.\n`)
        return exit()
      }
    },
    { isActive: true }
  )

  useInput(
    (input, key) => {
      if (key.return) {
        return onCompleteSelectedOptions()
      }
      if (key.leftArrow) {
        selectOptions[selectedRow] = Math.max(0, selectOptions[selectedRow] - 1)
        setSelectedOptions(selectOptions.slice())
      }

      if (key.rightArrow) {
        selectOptions[selectedRow] = Math.min(TEMPLATES[selectedRow].values.length - 1, selectOptions[selectedRow] + 1)
        setSelectedOptions(selectOptions.slice())
      }

      if (key.upArrow) {
        setSelectedRow(Math.max(0, selectedRow - 1))
      }

      if (key.downArrow) {
        setSelectedRow(Math.min(TEMPLATES.length - 1, selectedRow + 1))
      }
    },
    { isActive: true }
  )

  useEffect(() => {
    setSelectedOptions(rawOptions)

    let targetDir = cliArgs[0]

    if (typeof targetDir !== 'undefined') {
      setDirectory(targetDir)
      onCompleteTypingDirectory()
    }
  }, [])

  return (
    <>
      <Box marginBottom={1}>
        <Box marginRight={1}>
          <Text backgroundColor="magenta">{name}</Text>
        </Box>
        <Text color="gray">v{version}</Text>
      </Box>
      <Box>
        {state.step === STEPS.NAME && (
          <Box marginRight={1}>
            <Text color="cyanBright">{figures.questionMarkPrefix}</Text>
            <Box marginX={1}>
              <Text bold>Please select a project name:</Text>
            </Box>
            <TextInput
              placeholder="vite-plugin-ssr"
              value={state.directory}
              onChange={setDirectory}
              onSubmit={onCompleteTypingDirectory}
            />
          </Box>
        )}
        {state.step === STEPS.SELECT && (
          <Box flexDirection="column">
            <Box marginBottom={1} marginRight={1}>
              <Text color="cyanBright">{figures.questionMarkPrefix}</Text>
              <Box marginX={1}>
                <Text bold>Please select the project features:</Text>
              </Box>
            </Box>
            <Box flexDirection="column">
              {TEMPLATES.map(({ label, values }: any, i: any) => {
                const cursor = <>{i === selectedRow ? figures.pointerSmall : ' '}</>
                return (
                  <Box key={i}>
                    <Box width={20} paddingBottom={i === 0 ? 1 : 0}>
                      <Text bold color="cyanBright">
                        {cursor}{' '}
                      </Text>
                      <Text>{label}:</Text>
                    </Box>
                    {values.map((val: string, j: number) => {
                      const padding = Math.abs(val.length - 9)
                      return (
                        <Box key={j} paddingRight={padding}>
                          <Text {...(j === state.selectedOptions[i] && { color: 'cyanBright', underline: true })}>
                            {val}
                          </Text>
                        </Box>
                      )
                    })}
                  </Box>
                )
              })}
              <Text color="gray">{HELP}</Text>
            </Box>
          </Box>
        )}
        {state.step === STEPS.CONFIRM && (
          <Box flexDirection="column">
            <Box marginBottom={1} marginRight={1}>
              <Text color="cyanBright">{figures.info}</Text>
              <Box marginX={1}>
                <Text bold>You selected the following setup. Continue installation?</Text>
              </Box>
            </Box>
            <Box paddingLeft={2} marginBottom={1} flexDirection="row">
              <Text>{JSON.stringify(state.optionsResult)}</Text>
            </Box>
            <Box paddingLeft={2} marginBottom={1} flexDirection="row">
              <Box marginRight={1}>
                <Text bold>Directory:</Text>
              </Box>
              <Box>
                <Text>{state.directory}</Text>
              </Box>
            </Box>
            <Box flexDirection="column">
              <SelectInput items={items} onSelect={handleSelect} />
            </Box>
          </Box>
        )}
        {state.step === STEPS.LOADING && (
          <Box>
            <Text color="yellowBright">
              {/* <Loading type="dots" />
            <Loading type="dots" />
            <Loading type="dots" /> */}
            </Text>
            <Text color="yellow">Creando proyecto...</Text>
          </Box>
        )}
        {state.step === STEPS.END && (
          <Box paddingY={2}>
            <Text color="rgb(50,220,230)">Done. Now run:</Text>
          </Box>
        )}
      </Box>
    </>
  )
}
