import { getSpecName, getConfigFile, getSpecFolder } from './setup.mjs'

const args = process.argv // get arguments from command line
const specName = getSpecName(args)
const specFolder = getSpecFolder(args)
const configFile = getConfigFile(args)

const baseConfig = {
  specFile: '',
  specFolder: '',
}

const config = {
  ...baseConfig,
  ...configFile,
}

export const getConfig = () => {
  if (specName) config.specFile = specName
  if (specFolder) config.specFolder = specFolder

  return config
}
