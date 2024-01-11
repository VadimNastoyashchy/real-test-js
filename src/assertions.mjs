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
    throw new RunnerError(`${actual} is not a boolean value`)
  }
  if (actual !== false) {
    throw new AssertionError('<actual> to be false', {
      actual,
    })
  }
}

export const toBeTruthy = (actual) => {
  if (typeof actual !== 'boolean') {
    throw new RunnerError(`${actual} is not a boolean value`)
  }
  if (actual !== true) {
    throw new AssertionError('<actual> to be true', {
      actual,
    })
  }
}

export const toEqual = (actual, expected) => {
  if (actual !== expected) {
    throw new AssertionError('<expected> to equal <actual>', {
      actual,
      expected,
    })
  }
}

export const notToEqual = (actual, expected) => {
  if (actual === expected) {
    throw new AssertionError('<expected> not to equal <actual>', {
      actual,
      expected,
    })
  }
}
