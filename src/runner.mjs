import path from 'path'
import { getSpecName } from './args.mjs'

const args = process.argv // get arguments from command line
const specName = getSpecName(args)

export const run = async () => {
  try {
    await import(path.resolve(process.cwd(), specName))
  } catch (e) {
    console.error(e)
  }
  console.log('Test run finished')
}
