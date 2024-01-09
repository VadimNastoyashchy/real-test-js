import path from 'path'
import { getConfig } from './config.mjs'
import { applyColor } from './transform.mjs'
import { TICK, CROSS, EXIT_CODES } from './constants.mjs'

const config = getConfig()

let successes = 0
const failures = []

const printFailure = (e) => {
  console.error(e)
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
      `<green>${successes}</green> tests passed, ` +
        `<red>${failures.length}</red> tests failed.`
    )
  )
  process.exit(failures.length > 0 ? EXIT_CODES.failures : EXIT_CODES.ok)
}

export const it = (name, body) => {
  try {
    body()
    console.log(applyColor(`  <green>${TICK}</green> ${name}`))
    successes++
  } catch (e) {
    console.error(applyColor(`  <red>${CROSS}</red> ${name}`))
    failures.push(e)
  }
}

export const describe = (name, body) => body()
