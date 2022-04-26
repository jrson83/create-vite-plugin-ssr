#!/usr/bin/env node

import React from 'react'
import { render } from 'ink'
import { exit } from 'process'
import { clearConsole } from './utils'
import { App } from './App'

async function init() {
  await clearConsole().then(async () => {
    const { waitUntilExit } = render(<App />)

    try {
      await waitUntilExit()
    } catch (error) {
      exit(1)
    }
  })
}

init().catch((err: unknown) => {
  if (err instanceof Error) {
    console.error(`${err.name} ${err.message}`)
  }
})
