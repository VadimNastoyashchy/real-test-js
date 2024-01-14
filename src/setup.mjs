import path from 'path'
import fs from 'fs'

const getCustomArgFromArgs = (args, customArgPrefix) => {
  // pick custom arg that contains custom prefix
  const customArg = args.find((arg) => arg.includes(customArgPrefix)) ?? ''
  const parsedCustomArg = customArg.split(customArgPrefix)
  const customArgValue = parsedCustomArg[1]
  return customArgValue
}

const readConfigJSONFile = (args) => {
  if (getConfigName(args)) {
    const file = fs.readFileSync(
      path.resolve(process.cwd(), getConfigName(args))
    )
    return JSON.parse(file)
  }
}

const getConfigName = (args) => {
  const customArgPrefix = '--config='
  return getCustomArgFromArgs(args, customArgPrefix) || ''
}

export const getTestNameFromArgs = (args) => {
  const customArgPrefix = '--test='
  return getCustomArgFromArgs(args, customArgPrefix) || ''
}

export const getTestFolderFromArgs = (args) => {
  const customArgPrefix = '--test-folder='
  return getCustomArgFromArgs(args, customArgPrefix) || ''
}

export const getConfigFileFromArgs = (args) => {
  return readConfigJSONFile(args)
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
