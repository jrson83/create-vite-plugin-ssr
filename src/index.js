#!/usr/bin/env node

// @ts-check

import util from 'util'
import createPromt from './prompt.js'

console.log(util.inspect.colors)

async function init() {
  const promt = new createPromt()

  promt.welcome()

  const targetDir = await promt.package()

  console.log(`\n${promt.config.iconSuccess} Scaffolding project in ${targetDir} ...\n`)

  const framework = await promt.framework()
}

init().catch(e => {
  console.error(e)
})
