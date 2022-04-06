// @ts-check

/**
 * @param {number[]} code
 * @param {string} string
 * @returns {string}
 */
const colorized = (code, string) => {
  if (!process.stdout.hasColors()) return string
  return `\x1b[${code[0]}m${string}\x1b[${code[1]}m`
}

/**
 * @type {{cyan(arg0: string): string, green(arg0: string): string, grey(arg0: string): string, red(arg0: string): string, bgMagenta(arg0: string): string, bold(arg0: string): string, underline(arg0: string): string}}
 */
const colorize = {
  cyan(string) {
    const code = [36, 39]
    return colorized(code, string)
  },
  green(string) {
    const code = [32, 39]
    return colorized(code, string)
  },
  grey(string) {
    const code = [90, 39]
    return colorized(code, string)
  },
  red(string) {
    const code = [31, 39]
    return colorized(code, string)
  },
  bgMagenta(string) {
    const code = [45, 49]
    return colorized(code, string)
  },
  bold(string) {
    const code = [1, 22]
    return colorized(code, string)
  },
  underline(string) {
    const code = [4, 24]
    return colorized(code, string)
  }
}

export default colorize
