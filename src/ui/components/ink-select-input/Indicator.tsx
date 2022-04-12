import React, { FC } from 'react'
import { Box, Text } from 'ink'
import figures from 'figures'

export interface Props {
  isSelected?: boolean
  selectedItemColor?: string
}

const Indicator: FC<Props> = ({ isSelected = false, selectedItemColor }) => (
  <Box marginRight={1}>{isSelected ? <Text color={selectedItemColor}>{figures.pointer}</Text> : <Text> </Text>}</Box>
)

export default Indicator
