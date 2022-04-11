#!/usr/bin/env node

import React from 'react'
import { render } from 'ink'
import { clearConsole } from './utils'
import { App } from './ui/app'

async function init(): Promise<void> {
  await clearConsole().then(() => {
    render(<App />)
  })
}

init().catch((err: unknown) => {
  if (err instanceof Error) {
    console.error(`${err.name} ${err.message}`)
  }
})
