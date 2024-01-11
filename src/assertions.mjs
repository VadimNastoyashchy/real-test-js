import { applyColor } from './transform.mjs'

export const toBeDefined = (actual) => {
  if (actual === undefined) {
    throw new Error('Expected undefined value to be defined')
  }
}

export const toHaveLength = (actual, expected) => {
  if (actual.length !== expected) {
    throw new Error(
      applyColor(
        `Expected value to have length <bold>${expected}</bold>
    but it was` + ` <bold>${actual.length}</bold>`
      )
    )
  }
}
