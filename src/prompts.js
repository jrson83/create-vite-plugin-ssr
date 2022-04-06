// @ts-check

import readline from 'node:readline'

const stdin = process.stdin
const stdout = process.stdout

/**
 * Create a simple input prompt
 * @param {{question: string}} object - Options
 */
export async function inputPrompt({ question }) {
  const rl = readline.createInterface({ input: stdin, output: stdout })

  if (question === undefined) throw new Error('No question was specified.')

  /**
   * @param {string}  _ - Unknown
   * @param {{ name: string, ctrl: string }} object - Key.name & key.ctrl
   * @returns {any} Result
   */
  const onKeyPress = (_, { name, ctrl }) => {
    if (name === 'return') {
      stdin.removeListener('keypress', onKeyPress)
    }

    if (name === 'escape' || (name === 'c' && ctrl)) {
      console.log('process.end')
      rl.close()
      stdin.removeListener('keypress', onKeyPress)
    }
  }

  return new Promise((resolve, reject) => {
    stdin.on('keypress', onKeyPress)

    rl.question(question, answer => {
      rl.close()
      resolve(answer.trim())
    })
  })
}

/**
 * Create a simple select prompt
 * @param {{question: string, options: string[], pointer: any}} object - Options
 */
export async function selectPrompt({ question, options, pointer }) {
  const rl = readline.createInterface({ input: stdin, output: stdout })

  if (question === undefined) throw new Error('No question was specified.')
  if (options === undefined) throw new Error('No options were specified.')
  if (pointer === undefined) throw new Error('No pointer was specified.')

  let selectIndex = 0
  let selectedOption = undefined

  const createSelect = () => {
    stdout.moveCursor(0, -(options.length - 1))
    stdout.cursorTo(0)
    stdout.clearScreenDown()

    for (let opt = 0; opt < options.length; opt++) {
      let option = opt === selectIndex ? `\x1b[35m> ${options[opt]}` : options[opt]
      stdout.write(`${option}\x1b[0m${opt !== options.length - 1 ? '\n' : ''}`)
    }
    stdout.write('\x1B[?25l')
  }

  return new Promise((resolve, reject) => {
    stdout.write(`${question}\n\n`)

    readline.emitKeypressEvents(stdin)
    if (stdin.isTTY) {
      stdin.setRawMode(true)
      stdin.resume()
      stdin.on('keypress', function handler(_, { name, ctrl }) {
        if (name === 'down' && selectIndex < options.length - 1) {
          ++selectIndex
          createSelect()
        } else if (name === 'up' && selectIndex > 0) {
          --selectIndex
          createSelect()
        }

        if (name === 'return') {
          stdin.removeListener('keypress', handler)
          stdin.setRawMode(false)
          stdin.pause()
          stdout.write('\x1B[?25h')
          selectedOption = options[selectIndex]
          if (!options.includes(selectedOption)) throw new Error('The selected option does not exist.')
          resolve(selectedOption)
        }

        if (name === 'escape' || (name === 'c' && ctrl)) {
          console.log('process.end')
          rl.close()
          stdin.removeListener('keypress', handler)
          stdin.setRawMode(false)
          stdin.pause()
          stdout.write('\x1B[?25h')
        }
      })
      createSelect()
    }
  })
}
