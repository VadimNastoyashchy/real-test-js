/* eslint-disable space-before-function-paren */
import { getTestFolderFromArgs, getTestNameFromArgs } from '../cli.mjs'
import { RunnerError } from '../errors/runner.mjs'
import { readConfigFile } from '../setup.mjs'
import { applyColor } from '../transform.mjs'

export const configName = 'test.config.js'

const testName = getTestNameFromArgs()
const testDir = getTestFolderFromArgs()
const configFile = validateConfig(await readConfigFile(configName))

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

function validateConfig(config) {
  if (!config || typeof config !== 'object') {
    throw new RunnerError(
      applyColor(
        `<red>Config file should be an object in</red> <yellow>${configName}</yellow>`
      )
    )
  }

  if (config.testFile || config.testDir) {
    if (
      (config.testFile && typeof config.testFile !== 'string') ||
      config.testFile === ''
    ) {
      throw new RunnerError(
        applyColor(
          `<red>Missing or invalid "testFile" property in</red> <yellow>${configName}</yellow>`
        )
      )
    }
    if (
      (config.testDir && typeof config.testDir !== 'string') ||
      config.testDir === ''
    ) {
      throw new RunnerError(
        applyColor(
          `<red>Missing or invalid "testDir" property in</red> <yellow>${configName}</yellow>`
        )
      )
    }
  } else {
    throw new RunnerError(
      applyColor(
        `<red>Missing "testFile" or "testDir" property in</red> <yellow>${configName}</yellow>`
      )
    )
  }

  if (config.reporter) {
    if (typeof config.reporter !== 'object') {
      throw new RunnerError(
        applyColor(
          `<red>Reporter should be an object in</red> <yellow>${configName}</yellow>`
        )
      )
    }

    if (
      (config.reporter.type && typeof config.reporter.type !== 'string') ||
      config.reporter.type === ''
    ) {
      throw new RunnerError(
        applyColor(
          `<red>Invalid reporter "type" in</red> <yellow>${configName}</yellow>`
        )
      )
    } else {
      if (
        (config.reporter.folderName &&
          typeof config.reporter.folderName !== 'string') ||
        config.reporter.folderName === ''
      ) {
        throw new RunnerError(
          applyColor(
            `<red>Invalid "folderName" in</red> <yellow>${configName}</yellow>`
          )
        )
      }

      if (
        (config.reporter.fileName &&
          typeof config.reporter.fileName !== 'string') ||
        config.reporter.fileName === ''
      ) {
        throw new RunnerError(
          applyColor(
            `<red>Invalid "fileName" in</red> <yellow>${configName}</yellow>`
          )
        )
      }
    }
  }

  console.log('Config file is valid!')
  return config
}
