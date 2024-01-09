import path from 'path'
import { getConfig } from './config.mjs'
import { color } from './colors.mjs'

const config = getConfig()

let successes = 0
let failures = 0

const exitCodes = {
  ok: 0,
  failures: 1
}

export const run = async () => {
  try {
    await import(path.resolve(process.cwd(), config.specFile))
  } catch (e) {
    console.error(e)
  }
  console.log(
    color(
      `Tests: <green>${successes} passed</green>, <red>${failures} failed</red>`
    )
  )
  process.exit(failures !== 0 ? exitCodes.failures : exitCodes.ok)
}

export const it = (name, body) => {
  try {
    body()
    successes++
  } catch (e) {
    console.error(color(`  <red>✗</red> ${name}`))
    console.error(e)
    failures++
  }
}
