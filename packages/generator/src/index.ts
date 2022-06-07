#!/usr/bin/node

import { jsTasks, tsTasks } from './config'
import { runTasks } from './utils'

runTasks(process.env.GENERATOR_STYLE === 'tsTasks' ? tsTasks : jsTasks)
  .then(() => process.stdout.write(`\n\x1b[42m DONE \x1b[49m\n`))
  .catch((err: unknown) => {
    if (err instanceof Error) {
      console.error(`${err.name} ${err.message}`)
    }
  })
