import React from 'react'
import { Box, Text } from 'ink'
import figures from 'figures'
import type { FailureProps } from '../types'

export { Failure }

function Failure({ message }: FailureProps) {
  return (
    <Box marginBottom={1}>
      <Box marginRight={1}>
        <Text color="red" bold>
          {figures.cross}
        </Text>
      </Box>
      <Box flexDirection="column" marginLeft={1}>
        <Text color="red" bold underline>
          {message[0] && message[0]}
        </Text>
        {message[1] && <Text color="gray">{message[1]}</Text>}
      </Box>
    </Box>
  )
}
