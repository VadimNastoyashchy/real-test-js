import { AssertionError } from '../errors/assertion.mjs'
import { indentLine } from '../transform.mjs'

export const toBeNull = (actual) => {
  if (actual !== null) {
    throw new AssertionError(indentLine('Recieved: <actual> to be null'), {
      actual,
    })
  }
}
