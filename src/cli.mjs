import { EOL } from 'os'
import { ARGS } from './constants.mjs'
import { RunnerError } from './errors/runner.mjs'
import { applyColor } from './transform.mjs'

const args = process.argv // get arguments from command line

export const checkCliArgs = () => {
  if (args.length > 2) {
    const userArgs = args.slice(2)
    userArgs.forEach((arg) => {
      if (!Object.values(ARGS).includes(arg.replace(/=.*$/, '='))) {
        printError(arg)
      } else {
        switch (arg) {
          case ARGS.HELP:
            printHelp()
            break
        }
      }
    })
  } else {
    throw new RunnerError(
      applyColor('<red>Args should be provided!</red>') +
        EOL +
        `Use ${ARGS.HELP} to see available options` +
        EOL +
        ''
    )
  }
}

const printError = (arg) => {
  console.error(
    applyColor(`<red>Error: unknown option: ${arg.replace(/=.*$/, '=')}</red>`)
  )
  console.error('Usage: npx real-test-js --config="test.config.json"' + EOL)
  printHelp()
}

const printHelp = () => {
  console.log(
    'Options: ' +
      EOL +
      '' +
      EOL +
      `${ARGS.CONFIG}      <path>  ${'path to the config file'}` +
      EOL +
      `${ARGS.TEST}        <path>  ${'path to the your file with tests'}` +
      EOL +
      `${ARGS.TEST_FOLDER} <path>  ${'path to the your folder with tests'}` +
      EOL +
      '' +
      EOL +
      `${ARGS.HELP}                 ${'display help for command'}` +
      EOL +
      ''
  )
  process.exit(1)
}

const getCustomArgFromArgs = (customArgPrefix) => {
  // pick custom arg that contains custom prefix
  const customArg = args.find((arg) => arg.includes(customArgPrefix)) ?? ''
  const parsedCustomArg = customArg.split(customArgPrefix)
  const customArgValue = parsedCustomArg[1]
  return customArgValue
}

export const getConfigName = () => {
  const customArgPrefix = ARGS.CONFIG
  return getCustomArgFromArgs(customArgPrefix) || ''
}

export const getTestNameFromArgs = () => {
  const customArgPrefix = ARGS.TEST
  return getCustomArgFromArgs(customArgPrefix) || ''
}

export const getTestFolderFromArgs = () => {
  const customArgPrefix = ARGS.TEST_FOLDER
  return getCustomArgFromArgs(customArgPrefix) || ''
}
