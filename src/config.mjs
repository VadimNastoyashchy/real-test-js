import {
  getTestNameFromArgs,
  getConfigFileFromArgs,
  getTestFolderFromArgs,
} from './setup.mjs'

const args = process.argv // get arguments from command line
const testName = getTestNameFromArgs(args)
const testDir = getTestFolderFromArgs(args)
const configFile = getConfigFileFromArgs(args)

const baseConfig = {
  testFile: configFile?.testFile || testName,
  testDir: configFile?.testDir || testDir,
  reporter: {
    type: configFile?.reporter?.type,
    folderName: configFile?.reporter?.folderName,
    fileName: configFile?.reporter?.fileName || 'results',
  },
}

export const getConfig = () => {
  return baseConfig
}
