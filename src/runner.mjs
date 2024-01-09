import path from 'path'
import { getConfig } from './config.mjs'
import { color } from './colors.mjs'

const config = getConfig()

export const it = (name, body) => {
  try {
    body()
  } catch (e) {
    console.error(color(`<red>${name}</red>`))
    console.error(e)
  }
}

export const run = async () => {
  try {
    await import(path.resolve(process.cwd(), config.specFile))
  } catch (e) {
    console.error(e)
  }
  console.log('Test run finished')
}
