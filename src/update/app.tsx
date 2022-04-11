import React, { FC } from 'react'
import { Box, Text } from 'ink'
import { AppProps, PkgUpdates } from './types'

export { App }

const App: FC<AppProps> = (props: PkgUpdates) => {
  const { pkgUpdates } = props

  return (
    <>
      <Box marginBottom={1}>
        <Text bold>{Object.keys(pkgUpdates).length} outdated dependencies found:</Text>
      </Box>
      <Box flexDirection="column" marginBottom={1}>
        <Box>
          <Box width={40}>
            <Text bold underline>
              Packages
            </Text>
          </Box>
          <Box width={30}>
            <Text bold underline>
              Current
            </Text>
          </Box>
          <Box width={30}>
            <Text bold underline>
              Wanted
            </Text>
          </Box>
        </Box>
      </Box>
      <Box flexDirection="column">
        {Object.keys(pkgUpdates).map((item, i) => (
          <Box key={i}>
            <Box width={40}>
              <Text>{pkgUpdates[item].label}</Text>
            </Box>
            <Box width={30}>
              <Text>{pkgUpdates[item].current}</Text>
            </Box>
            <Box width={30}>
              <Text>{pkgUpdates[item].wanted}</Text>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  )
}
