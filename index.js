import eventEmitter from 'events'
import readline from 'readline'
import chalk from 'chalk'
import { readFile } from 'fs/promises'

let stream = process.stdin
let processOut = process.stdout
const blank = '\n'.repeat(process.stdout.rows)

const pkg = JSON.parse(await readFile(new URL('./package.json', import.meta.url)))

const cwd = process.cwd()

class Boilerplate {
  constructor() {
    this.config = {
      questionIcon: chalk.green.bold('?'),
      question: chalk.bold('Please select a UI Framework:'),
      pointerIcon: chalk.green('>'),
      checkedIcon: chalk.green('✓'),
      uncheckedIcon: chalk.grey('✓')
    }
    this.frameworks = {
      vue: {
        name: 'vue'
      },
      react: {
        name: 'React'
      },
      preact: {
        name: 'Preact'
      }
    }
    this.options = {
      typescript: {
        name: 'Typescript'
      },
      routing: {
        name: 'Client Routing'
      },
      renderer: {
        name: 'Eject Renderer'
      },
      rpc: {
        name: 'RPC'
      },
      prerender: {
        name: 'Pre-rendering'
      }
    }
  }
}

async function init() {
  const bp = new Boilerplate()

  processOut.write(blank)
  readline.cursorTo(process.stdout, 0, 0)
  readline.clearScreenDown(process.stdout)

  processOut.write(`${chalk.blue.bgMagenta.bold(pkg.name)} v${pkg.version}\n\n`)
  processOut.write(`${bp.config.questionIcon} ${bp.config.question}\n\n`)

  processOut.write(bp.config.pointerIcon)
}

init().catch(e => {
  throw new Error(e)
})
