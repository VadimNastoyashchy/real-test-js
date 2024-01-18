import path from 'path'
import fs from 'fs'
import { getConfigName } from './cli.mjs'
import { applyColor } from './transform.mjs'

export const readConfigJSONFile = (args) => {
  if (getConfigName()) {
    const file = fs.readFileSync(path.resolve(process.cwd(), getConfigName()))
    return JSON.parse(file)
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

export const checkFileConfigExist = () => {
  const userProjectDir = process.cwd()
  const filePath = path.join(userProjectDir, 'test.config.json')

  if (!fs.existsSync(filePath)) {
    console.error(
      applyColor(
        "<red>Can't find runner configuration file! Looking for: test.config.json</red>"
      )
    )
  }
}
