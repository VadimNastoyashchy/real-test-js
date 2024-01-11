import { AssertionError } from './assertionError.mjs'
import { applyColor } from './transform.mjs'

export const toBeDefined = (actual) => {
  if (actual === undefined) {
    throw new AssertionError('<actual> to be defined', {
      actual,
    })
  }
}

export const toHaveLength = (actual, expected) => {
  if (actual.length !== expected) {
    throw new AssertionError(
      'value to have length <expected> but it was <actual>',
      { actual: actual.length, expected }
    )
  }
}
