import { AssertionError } from './assertionError.mjs'
import { RunnerError } from './runnerError.mjs'

export const toBeDefined = (actual) => {
  if (actual === undefined) {
    throw new AssertionError('<actual> to be defined', {
      actual,
    })
  }
}

export const toHaveLength = (actual, expected) => {
  if (!Array.isArray(actual)) {
    throw new RunnerError(`Expected ${actual} is not an array`)
  }
  if (typeof expected !== 'number') {
    throw new RunnerError(`${expected} is not a number`)
  }
  if (actual.length !== expected) {
    throw new AssertionError(
      'value to have length <expected> but it was <actual>',
      { actual: actual.length, expected }
    )
  }
}

export const toBeFalsy = (actual) => {
  if (typeof actual !== 'boolean') {
    throw new RunnerError(`${actual} is not an expected boolean value`)
  }
  if (actual !== false) {
    throw new AssertionError('<actual> to be false', {
      actual,
    })
  }
}
