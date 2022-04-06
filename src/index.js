#!/usr/bin/env node

// @ts-check

import { packagePrompt, inputPrompt, selectPrompt } from './prompts.js'
import colorize from './colorize.js'

async function init() {
  let pkgPromt = await packagePrompt()

  console.log(`${colorize.bgMagenta(colorize.bold(pkgPromt.name))} v${pkgPromt.version}\n`)

  let targetDir = await inputPrompt({
    question: `${colorize.cyan('ℹ ')} ${colorize.bold('Please select a project name:')} `
  })

  console.log(`\n${colorize.green('✔ ')} Scaffolding project in ${targetDir} ...\n`)

  let targetFramework = await selectPrompt({
    question: `${colorize.green('? ')} ${colorize.bold('Please select a UI Framework:')} `,
    options: ['vue', 'react', 'preact'],
    pointer: '> '
  })

  console.log(`\n\n${colorize.green('✔ ')} Selected Framework: ${targetFramework} ...\n`)
}

init().catch(e => {
  console.error(e)
})
