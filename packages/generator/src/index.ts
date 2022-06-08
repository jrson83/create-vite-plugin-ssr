#!/usr/bin/env ts-node

import { runTasks } from './utils'

async function generate() {
  const codeStyle = process.env.CODE_STYLE

  if (!codeStyle) throw new Error('Wrong usage of `process.env.CODE_STYLE`')

  runTasks(codeStyle).then(() => process.stdout.write(`\n\x1b[42m DONE \x1b[49m\n`))
}

generate().catch((err: unknown) => {
  if (err instanceof Error) {
    console.error(`${err.name} ${err.message}`)
  }
})
