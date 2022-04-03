import process from 'process'
import readline from 'readline'
const std = process.stdout

class Spinner {
  spin() {
    process.stdout.write('\x1B[?25l')

    const spinners = ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷']
    const spinnerTimeInterval = 80

    let index = 0

    this.timer = setInterval(() => {
      let now = spinners[index]

      if (now == undefined) {
        index = 0
        now = spinners[index]
      }

      std.write(now)

      readline.cursorTo(std, 0, 0)

      index = index > spinners.length ? 0 : index + 1
    }, spinnerTimeInterval)
  }
}

new Spinner().spin()
