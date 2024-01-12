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

export const getSpecName = (args) => {
  const customArgPrefix = '--spec='
  return getCustomArgFromArgs(args, customArgPrefix) || ''
}

export const getSpecFolder = (args) => {
  const customArgPrefix = '--spec-folder='
  return getCustomArgFromArgs(args, customArgPrefix) || ''
}

export const getConfigFile = (args) => {
  return readConfigJSONFile(args)
}

const getAllFileNames = function (dir) {
  return fs.readdirSync(dir).filter((fn) => fn.endsWith('.js'))
}

export const getMultipleFilePath = (fileDir) => {
  const fileNames = getAllFileNames(fileDir)
  return fileNames.map((fileName) => path.join(fileDir, fileName))
}
