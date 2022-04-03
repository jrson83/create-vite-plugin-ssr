// @ts-check

import { readFile } from 'fs/promises'
import EventEmitter from 'events'
import readline from 'readline'
import colorize from './colorize.js'
import path from 'path'

const cwd = process.cwd()
const blank = '\n'.repeat(process.stdout.rows)

// @ts-ignore
const pkg = JSON.parse(await readFile(new URL(`../package.json`, import.meta.url)))

class Prompt extends EventEmitter {
  constructor() {
    super()

    this.config = {
      iconProject: colorize.green('ℹ '),
      msgProject: colorize.bold('Please select a project name: '),
      iconUI: colorize.green('? '),
      msgUI: colorize.bold('Please select a UI Framework:'),
      iconCancel: colorize.red('✖ '),
      msgCancel: 'Installer has been canceled!',
      iconPointer: colorize.green('> '),
      iconSuccess: colorize.green('✔ '),
      iconError: colorize.red('✖ '),
      msgKeys:
        'Press <enter> to confirm\nPress <up-arrow> / <down-arrow> to select field\nPress <space> / <left-arrow> / <right-arrow> to change value'
    }

    this.stream = process.stdin
    this.output = process.stdout

    this.options = []

    const rl = readline.createInterface({
      input: this.stream,
      output: this.output
    })
    readline.emitKeypressEvents(this.stream, rl)
    if (this.stream.isTTY) this.stream.setRawMode(true)

    /**
    * @param {any} _
    * @param {any} key
    */
    const keypress = (_, key) => {
      key = key || {}

      if (key.ctrl == true && key.name == 'c') {
        process.exit()
      }

      switch (key.name) {
        /* case 'up':
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
          break */
        case 'escape':
          this.cancel()
          break
        default:
          break
      }
    }

    this.welcome = () => {
      this.clearConsole()
      this.output.write(`${colorize.bgMagenta(pkg.name)} v${pkg.version}\n\n`)
    }

    this.package = () => {
      return (
        new Promise((resolve, reject) => {
          rl.question(`${this.config.iconProject} ${this.config.msgProject}`, answer => {
            resolve(answer)
          })
        })
          // runs when the promise is settled, doesn't matter successfully or not
          .finally(() => console.log('stop loading'))
      )
      // so the loading indicator is always stopped before we process the result/error
      //.then(result => show result, err => show error)
    }

    this.framework = () => {
      return new Promise((resolve, reject) => {
        console.log('start loading')
        rl.question(`${this.config.iconUI} ${this.config.msgUI}\n\n${this.config.msgKeys}`, answer => {
          resolve(answer)
        })
      })
      .finally(() => console.log('stop loading'))
    }

    this.close = () => {
      this.stream.removeListener('keypress', keypress)
      //readline.clearScreenDown(this.processOut)
      if (this.stream.isTTY) this.stream.setRawMode(false)
      rl.close()
    }

    this.cancel = () => {
      this.close()
      this.output.write(`\n${this.config.iconCancel} ${this.config.msgCancel}\n`)
    }

    this.stream.on('error', function (e) {
      console.error(`\n${this.config.iconError} ${e}\n`)
      process.exit()
    })

    this.stream.on('keypress', keypress)
  }

  clearConsole() {
    this.output.write(blank)
    readline.cursorTo(this.output, 0, 0)
    readline.clearScreenDown(this.output)
  }
}

export default Prompt
