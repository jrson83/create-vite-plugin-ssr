import React from 'react'
import { Box, Text } from 'ink'
import { Spinner } from './Spinner'
import figures from 'figures'
import type { TaskProps } from '../types'

export { Task }

function Task({ title, state }: TaskProps) {
  return (
    <Box marginLeft={3} marginRight={1}>
      {state == 'processing' && (
        <Text color="yellow">
          <Spinner />
        </Text>
      )}
      {state == 'completed' && <Text color="green">{figures.tick}</Text>}
      {state == 'pending' && <Text color="grey">{figures.arrowRight}</Text>}
      {state == 'failed' && <Text color="red">{figures.cross}</Text>}
      <Box marginLeft={2}>
        <Text>{title}</Text>
      </Box>
    </Box>
  )
}
