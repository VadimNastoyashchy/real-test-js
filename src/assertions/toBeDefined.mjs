import { AssertionError } from '../errors/assertion.mjs'
import { indentLine } from '../transform.mjs'

export const toBeDefined = (actual) => {
  if (actual === undefined) {
    throw new AssertionError(indentLine('Received: <actual>'), {
      actual,
    })
  }
}
