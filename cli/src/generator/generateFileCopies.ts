import { copyFile } from './utils'
import { boilerplateConfig, defaultTargetDir } from '../config'
import type { UIOptions } from '../types'

export async function generateFileCopies(uiOption: UIOptions) {
  const {
    copyFiles: { defaultFiles, uiFiles }
  } = boilerplateConfig

  for await (let file of defaultFiles) {
    await copyFile(`../boilerplate/${file.src}`, `${defaultTargetDir}/${file.output}`)
  }

  if (uiOption in uiFiles) {
    const { files } = uiFiles[uiOption]

    for await (let file of files) {
      await copyFile(`../boilerplate/${file.src}`, `${defaultTargetDir}/${file.output}`)
    }
  }
}
