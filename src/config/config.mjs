/* eslint-disable space-before-function-paren */
import { EOL } from 'os'
import {
  getTestFolderFromArgs,
  getTestNameFromArgs,
  printHelp,
} from '../core/cli.mjs'
import { applyColor } from '../utils/transform.mjs'

const file = getTestNameFromArgs()
const folder = getTestFolderFromArgs()

const config = {
  file,
  folder,
}

export const getConfig = () => {
  return config
}

export const validateConfig = () => {
  if (config.file === '' && config.folder === '') {
    console.error(
      applyColor(
        '<bold><red>Missing "file" or "folder" path arguments to your test(s)</red></bold>'
      ) + EOL
    )
    printHelp()
  }
}
