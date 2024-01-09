import path from 'path'
import { getConfig } from './config.mjs'
import { applyColor } from './transform.mjs'
import { TICK, CROSS, EXIT_CODES } from './constants.mjs'
import { timeStamp, printExecutionTime } from './support.mjs'

const config = getConfig()

let successes = 0
const failures = []
let describeStack = []

// Runner entry point
export const run = async () => {
  const startTimeStamp = timeStamp()
  try {
    await import(path.resolve(process.cwd(), config.specFile))
  } catch (e) {
    console.error(e)
  }
  const endTimeStamp = timeStamp()
  printFailuresMsg()
  console.log(
    applyColor(
      `Tests: <green>${successes} passed</green>, ` +
        `<red>${failures.length} failed</red>.`
    )
  )
  printExecutionTime(startTimeStamp, endTimeStamp)
  process.exit(failures.length > 0 ? EXIT_CODES.failures : EXIT_CODES.ok)
}

export const describe = (name, body) => {
  describeStack = [...describeStack, name]
  body()
  describeStack = withoutLast(describeStack)
}

export const it = (name, body) => {
  try {
    body()
    console.log(indent(applyColor(`  <green>${TICK}</green> ${name}`)))
    successes++
  } catch (e) {
    console.error(indent(applyColor(`  <red>${CROSS}</red> ${name}`)))
    failures.push({ error: e, name, describeStack })
  }
}

const printFailureMsg = (failure) => {
  console.error(applyColor(fullTestDescription(failure)))
  console.error(failure.error)
  console.error('')
}

const printFailuresMsg = () => {
  if (failures.length > 0) {
    console.error('')
    console.error('Failures:')
    console.error('')
  }
  failures.forEach(printFailureMsg)
}

const withoutLast = (arr) => arr.slice(0, -1)

const fullTestDescription = ({ name, describeStack }) =>
  [...describeStack, name].map((name) => `<bold>${name}</bold>`).join(' → ')

const indent = (message) => `${' '.repeat(describeStack.length * 2)}${message}`
