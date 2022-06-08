import path from 'path'
import { promises as fs } from 'fs'
import { Config } from './config'
import type { CodeStyle, ITask } from './types'

export function runTasks(codeStyle: CodeStyle) {
  if (!Config.hasOwnProperty(codeStyle)) throw new Error('Wrong usage of `process.env.CODE_STYLE`')

  const tasks: ITask[] = Config[codeStyle]

  process.stdout.write(
    `\x1b[45m ${process.env.npm_package_name} \x1b[49m \x1b[2mBuilding ${
      codeStyle === 'jsTaskList' ? 'JavaScript' : 'TypeScript'
    } Templates\x1b[22m\n\n`
  )
  let result = Promise.resolve()
  tasks.forEach((t: any) => {
    result = result.then(() => t.task().then(process.stdout.write(`\x1b[32m ✔ \x1b[39m ${t.title}\n`)))
  })
  return result
}

export const pathExists = async (path: string) => {
  return await fs
    .access(path)
    .then(() => true)
    .catch(() => false)
}

export const copyDir = async (src: string, dest: string) => {
  await fs.cp(src, dest, { recursive: true })
}

export const copyFile = async (src: string, dest: string) => {
  await fs.copyFile(src, dest)
}

export const writeJson = async (path: string, data: any) => {
  const json = JSON.stringify(data, null, 2)
  await fs.writeFile(path, json, 'utf-8')
}

export const copyFilesEnsure = async (dir: string, dest: string) => {
  const entries = await fs.readdir(dir, { withFileTypes: true })

  const files = entries
    .filter((file) => !file.isDirectory())
    .map((file) => ({
      ...file,
      path: path.dirname(path.join(dir, file.name)),
      filePath: path.join(dir, file.name)
    }))

  for (const file of files) {
    const dirExists = await pathExists(dest)
    if (!dirExists) {
      await fs.mkdir(dest, { recursive: true })
    }
    await fs.copyFile(file.filePath, `${dest}/${file.name}`)
  }
}

export const listFilesRecursive = async (dir: string) => {
  const entries = await fs.readdir(dir, { withFileTypes: true })

  const files = entries
    .filter((file) => !file.isDirectory())
    .map((file) => ({
      ...file,
      path: path.dirname(path.join(dir, file.name)).replace(/\\/g, '/'),
      filePath: path.join(dir, file.name).replace(/\\/g, '/')
    }))

  const folders = entries.filter((folder) => folder.isDirectory())

  for (const folder of folders) {
    const filePath = path.join(dir, folder.name)
    files.push(...(await listFilesRecursive(filePath)))
  }
  return files
}
