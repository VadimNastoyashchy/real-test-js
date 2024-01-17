import { getTestFolderFromArgs, getTestNameFromArgs } from './cli.mjs'
import { readConfigJSONFile } from './setup.mjs'

const testName = getTestNameFromArgs()
const testDir = getTestFolderFromArgs()
const configFile = readConfigJSONFile()

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
