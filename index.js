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
      msgQuestion: chalk.bold('Please select a UI Framework:'),
      msgCancel: 'Installer has been canceled!',
      iconQuestion: chalk.green.bold('?'),
      iconPointer: chalk.green('>'),
      iconCheck: chalk.green('✓'),
      iconUnchecked: chalk.grey('✓')
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
    this.keypress = this.keypress.bind(this)
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    stream.on('keypress', this.keypress)
  }
}

Boilerplate.prototype.exit = function () {
  this.rl.close()
  stream.removeListener('keypress', this.keypress)
  readline.clearScreenDown(process.stdout)
}

Boilerplate.prototype.cancel = function () {
  this.exit()
  processOut.write(`\n\n${this.config.msgCancel}\n`)
}

Boilerplate.prototype.keypress = function (ch, key) {
  key = key || {}

  switch (key.name) {
    case 'up':
      console.log(key.name)
      break
    case 'down':
      console.log(key.name)
      break
    case 'left':
      console.log(key.name)
      break
    case 'right':
      console.log(key.name)
      break
    case 'space':
      console.log(key.name)
      break
    case 'return':
      console.log(key.name)
      break
    case 'escape':
      this.cancel()
      break
    default:
      break
  }
}

async function init() {
  const bp = new Boilerplate()

  processOut.write(blank)
  readline.cursorTo(process.stdout, 0, 0)
  readline.clearScreenDown(process.stdout)

  processOut.write(`${chalk.blue.bgMagenta.bold(pkg.name)} v${pkg.version}\n\n`)
  processOut.write(`${bp.config.iconQuestion} ${bp.config.msgQuestion}\n\n`)

  processOut.write(bp.config.iconPointer)
}

init().catch(e => {
  throw new Error(e)
})
