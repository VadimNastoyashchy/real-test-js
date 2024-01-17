import { AssertionError } from '../errors/assertion.mjs'
import { indentLine } from '../transform.mjs'

export const toBeNotNull = (actual) => {
  if (actual === null) {
    throw new AssertionError(indentLine('Recieved: <actual> to be not null'), {
      actual,
    })
  }
}
