import path from 'path'
import { getConfig } from './config.mjs'
import { applyColor } from './transform.mjs'
import { TICK, CROSS, EXIT_CODES } from './constants.mjs'

const config = getConfig()

let successes = 0
const failures = []
let currentDescribe = ''

const printFailure = (failure) => {
  console.error(applyColor(fullTestDescription(failure)))
  console.error(failure.error)
  console.error('')
}

const printFailures = () => {
  if (failures.length > 0) {
    console.error('')
    console.error('Failures:')
    console.error('')
  }
  failures.forEach(printFailure)
}

const fullTestDescription = ({ name, describeName }) =>
  `<bold>${describeName}</bold> → <bold>${name}</bold>`

// Runner entry point
export const run = async () => {
  try {
    await import(path.resolve(process.cwd(), config.specFile))
  } catch (e) {
    console.error(e)
  }
  printFailures()
  console.log(
    applyColor(
      `Tests: <green>${successes} passed</green>, ` +
        `<red>${failures.length} failed</red>.`
    )
  )
  process.exit(failures.length > 0 ? EXIT_CODES.failures : EXIT_CODES.ok)
}

export const it = (name, body) => {
  try {
    body()
    console.log(applyColor(`  <green>${TICK}</green> ${name}`))
    successes++
  } catch (e) {
    console.error(applyColor(`  <red>${CROSS}</red> ${name}`))
    failures.push({
      error: e,
      name,
      describeName: currentDescribe,
    })
  }
}

export const describe = (name, body) => {
  console.log(name)
  currentDescribe = name
  body()
  currentDescribe = undefined
}
