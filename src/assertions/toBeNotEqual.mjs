import { AssertionError } from '../errors/assertion.mjs'
import { indentLine } from '../transform.mjs'
import { EOL } from 'os'

export const toBeNotEqual = (actual, expected) => {
  if (actual === expected) {
    throw new AssertionError(
      indentLine('Expected: <expected>') +
        EOL +
        indentLine('Received: <actual>'),
      {
        actual,
        expected,
      }
    )
  }
}
