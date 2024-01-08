import { getSpecName, getConfigFile } from './args.mjs'

const args = process.argv // get arguments from command line
const specName = getSpecName(args)
const configFile = getConfigFile(args)

const baseConfig = {
  specFile: ''
}

const config = {
  ...baseConfig,
  ...configFile
}

export const getConfig = () => {
  if (specName) config.specFile = specName
  return config
}
