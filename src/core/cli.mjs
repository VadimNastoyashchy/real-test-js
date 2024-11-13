import { EOL } from 'os'
import { ARGS } from './constants.mjs'
import { applyColor } from '../utils/transform.mjs'

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
  }
}

const printError = (arg) => {
  console.error(
    applyColor(`<red>Error: unknown option: ${arg.replace(/=.*$/, '=')}</red>`)
  )
  console.error('Usage: npx real-test-js <option>' + EOL)
  printHelp()
}

export const printHelp = () => {
  console.log(
    'Available options: ' +
      EOL +
      '' +
      EOL +
      `${ARGS.FILE}        <path>  ${'Path to your test file'}` +
      EOL +
      `${ARGS.FOLDER}      <path>  ${'Path to your tests folder'}` +
      EOL +
      '' +
      EOL +
      `${ARGS.HELP}                 ${'Display help for command'}` +
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

export const getTestNameFromArgs = () => {
  const customArgPrefix = ARGS.FILE
  return getCustomArgFromArgs(customArgPrefix) || ''
}

export const getTestFolderFromArgs = () => {
  const customArgPrefix = ARGS.FOLDER
  return getCustomArgFromArgs(customArgPrefix) || ''
}
