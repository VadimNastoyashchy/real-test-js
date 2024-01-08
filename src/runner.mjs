import path from 'path'
import { getConfig } from './config.mjs'

const config = getConfig()

export const run = async () => {
  try {
    await import(path.resolve(process.cwd(), config.specFile))
  } catch (e) {
    console.error(e)
  }
  console.log('Test run finished')
}
