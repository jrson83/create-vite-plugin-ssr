import fs from 'fs'
import type { SelectedOptions } from './types'

export async function clearConsole() {
  await new Promise((resolve) => {
    process.stdout.write(process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H', resolve)
  })
}

export function sanitizePath(path: string) {
  return path.replace(/[\\/:*?"<>|]/g, '')
}

export function isEmptyDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  } else {
    if (fs.readdirSync(dir).length !== 0) {
      return false
    }
  }
  return true
}

export function isInRange(x: number, min: number, max: number) {
  return x >= min && x <= max
}

export function validateOptions(payload: SelectedOptions) {
  if (!Array.isArray(payload)) {
    return `Array provided array not valid`
  }

  if (!payload.length) {
    return `No records to process`
  }

  if (payload.length != 6) {
    return `Array provided length not valid`
  }

  if (payload.some(isNaN)) {
    return `Array provided values not valid`
  }

  for (let i = 0; i < payload.length; i++) {
    if (i === 0) {
      if (!isInRange(payload[i], 0, 2)) {
        return `Array provided values not in range 0-2`
      }
    } else {
      if (!isInRange(payload[i], 0, 1)) {
        return `Array provided values not in range 0-1`
      }
    }
  }
}
