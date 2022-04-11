#!/usr/bin/env node

import React from 'react'
import { render } from 'ink'
import { updatePkgDependencies } from './update'
import { App } from './app'

async function init(): Promise<void> {
  const pkgUpdates = await updatePkgDependencies()

  render(<App pkgUpdates={pkgUpdates} />)
}

init().catch((err: unknown) => {
  if (err instanceof Error) {
    console.error(`${err.name} ${err.message}`)
  }
})
