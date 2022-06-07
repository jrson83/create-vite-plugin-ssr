import React from 'react'
import { Box, Text } from 'ink'
import { Task } from './Task'
import figures from 'figures'
import { TaskProgressState, ReducerActionType, TaskListProps } from '../types'

export { TaskList }

function TaskList({ state }: TaskListProps) {
  const { processingTaskId, taskList, totalTasks } = state

  const getState = (id: number): TaskProgressState => {
    if (state.processingTaskId == id) {
      return 'processing'
    } else if (state.completedTasks.includes(id)) {
      return 'completed'
    } else if (state.failedTasks.includes(id)) {
      return 'failed'
    }
    return 'pending'
  }

  return (
    <>
      <Box marginRight={1}>
        <Text color="grey">{figures.pointerSmall}</Text>
        <Box marginLeft={2}>
          <Text bold>{`Generating boilerplate`}</Text>
        </Box>
        <Box marginLeft={1}>
          <Text color="gray">{`[${
            state.step === ReducerActionType.SET_COMPLETED_BUILD
              ? `Completed ${totalTasks}`
              : `Running ${processingTaskId}`
          }/${state.totalTasks} tasks]`}</Text>
        </Box>
      </Box>
      {taskList.map(({ title, id }, index: number) => {
        return <Task key={index} title={title} state={getState(id)} />
      })}
    </>
  )
}
