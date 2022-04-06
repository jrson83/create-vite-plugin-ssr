#!/usr/bin/env node

// @ts-check

import { inputPrompt, selectPrompt } from './prompts.js'
import colorize from './colorize.js'

async function init() {
  let targetDir = await inputPrompt({ question: `${colorize.green('ℹ ')} Please select a project name: ` })

  console.log(`\n${colorize.green('✔ ')} Scaffolding project in ${targetDir} ...\n`)

  let targetFramework = await selectPrompt({
    question: `${colorize.green('?')} Please select a UI Framework:`,
    options: ['vue', 'react', 'preact'],
    pointer: '>'
  })

  console.log(`\nYour selected Framework: ${targetFramework}`)
}

init().catch(e => {
  console.error(e)
})
