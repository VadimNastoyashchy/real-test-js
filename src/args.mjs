import path from 'path'
import fs from 'fs'

const getCustomArgFromArgs = (args, customArgPrefix) => {
  // pick custom arg that contains custom prefix
  const customArg = args.find((arg) => arg.includes(customArgPrefix)) ?? ''
  const parsedCustomArg = customArg.split(customArgPrefix)
  const customArgValue = parsedCustomArg[1]
  return customArgValue
}

const readFileToJson = (args) => {
  if (getConfigName(args)) {
    const file = fs.readFileSync(
      path.resolve(process.cwd(), `${getConfigName(args)}.config.json`)
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

export const getConfigFile = (args) => {
  return readFileToJson(args)
}
