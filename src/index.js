#!/usr/bin/env node

// @ts-check

import colorize from './colorize.js'

console.log(colorize.red('Test'))

console.log(colorize.red(colorize.underline('Test')))
