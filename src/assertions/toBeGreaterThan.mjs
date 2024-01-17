import { AssertionError } from 'assert'
import { RunnerError } from '../errors/runner.mjs'
import { indentLine } from '../transform.mjs'
import { EOL } from 'os'

export const toBeGreaterThan = (actual, expected) => {
  if (typeof actual !== 'number') {
    throw new RunnerError(indentLine(`Expected: ${actual} is not a number`))
  }
  if (typeof expected !== 'number') {
    throw new RunnerError(indentLine(`Recieved: ${expected} is not a number`))
  }
  if (actual < expected) {
    throw new AssertionError(
      indentLine('Expected: <actual>') +
        EOL +
        indentLine('to be greater than') +
        EOL +
        indentLine('Received: <expected>'),
      {
        actual,
        expected,
      }
    )
  }
}
