import { getSpecName, getConfigFile, getSpecFolder } from './setup.mjs'

const args = process.argv // get arguments from command line
const specName = getSpecName(args)
const specFolder = getSpecFolder(args)
const configFile = getConfigFile(args)

const baseConfig = {
  specFile: configFile?.specFile || specName,
  specFolder: configFile?.specFolder || specFolder,
  reporter: {
    type: configFile?.reporter?.type,
    folderName: configFile?.reporter?.folderName,
    fileName: configFile?.reporter?.fileName || 'results',
  },
}

export const getConfig = () => {
  return baseConfig
}
