import fs from 'fs'
import path from 'path'
import { boilerplateConfig /* , defaultTargetDir */ } from '../config'

const fsPromises = fs.promises

const cwd = process.cwd()

export const templateRootDir = path.join(cwd, 'vite-app')

export const pathExists = (path: string) =>
  fsPromises
    .access(path)
    .then(() => true)
    .catch(() => false)

export async function removeDir(path: string) {
  if (await pathExists(path)) {
    const files = await fsPromises.readdir(path)
    for (let file of files) {
      const currentPath = path + '/' + file
      if (await (await fsPromises.lstat(currentPath)).isDirectory()) {
        removeDir(currentPath)
      } else {
        await fsPromises.unlink(currentPath)
      }
    }
    await fsPromises.rm(path, { recursive: true })
  }
}

export async function generateBoilerplateDirs() {
  const { createDirectories } = boilerplateConfig

  for (const dir of createDirectories) {
    await fsPromises.mkdir(`${templateRootDir}/${dir}`, { recursive: true })
  }
}

export const writeJson = async (path: string, data: any) => {
  const json = JSON.stringify(data, null, 2)
  await fsPromises.writeFile(path, json, 'utf-8')
}

export const copyFile = async (src: string, dest: string) => {
  await fsPromises.copyFile(src, dest)
}

export function generateOptions() {}
