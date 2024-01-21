import path from 'path'
import fs from 'fs'
import { EOL } from 'os'
import { applyColor } from '../utils/transform.mjs'
import { RunnerError } from '../errors/runner.mjs'
import { createConfig } from './create.mjs'

export const readConfigFile = async (configName) => {
  if (checkFileConfigExist(configName)) {
    try {
      const config = await import(path.resolve(process.cwd(), configName))
      return config.default
    } catch (e) {
      console.log(e)
    }
  }
}

const getAllFilePaths = (dir) => {
  const fileNames = fs.readdirSync(dir)
  let filePaths = []
  fileNames.forEach((fileName) => {
    const filePath = path.join(dir, fileName)
    const stat = fs.statSync(filePath)
    if (stat.isDirectory()) {
      filePaths = filePaths.concat(getAllFilePaths(filePath))
    } else if (fileName.endsWith('.js')) {
      filePaths.push(filePath)
    }
  })
  return filePaths
}

export const getMultipleFilePath = (fileDir) => {
  return getAllFilePaths(fileDir)
}

export const checkFileConfigExist = (configName) => {
  const userProjectDir = process.cwd()
  const filePath = path.join(userProjectDir, configName)

  if (!fs.existsSync(filePath)) {
    createConfig(filePath)
    if (!fs.existsSync(filePath)) {
      throw new RunnerError(
        applyColor(
          "<red>Can't find runner configuration file!" +
            EOL +
            `Looking for:</red> <yellow>${configName}</yellow>`
        )
      )
    } else {
      console.log(
        applyColor(
          `Config file <yellow>${configName}</yellow> has been successfully created!` +
            EOL +
            'Re run the runner again'
        )
      )
      process.exit(1)
    }
  } else {
    return true
  }
}
