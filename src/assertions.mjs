/* eslint-disable curly */
import { AssertionError } from './errors/assertion.mjs'
import { RunnerError } from './errors/runner.mjs'
import { indentLine } from './transform.mjs'
import { EOL } from 'os'

export const toBeDefined = (actual) => {
  if (actual === undefined) {
    throw new AssertionError(indentLine('Received: <actual>'), {
      actual,
    })
  }
}

export const toBeUndefined = (actual) => {
  if (actual !== undefined) {
    throw new AssertionError(indentLine('Recieved: <actual> to be undefined'), {
      actual,
    })
  }
}

export const toBeNull = (actual) => {
  if (actual !== null) {
    throw new AssertionError(indentLine('Recieved: <actual> to be null'), {
      actual,
    })
  }
}

export const notToBeNull = (actual) => {
  if (actual === null) {
    throw new AssertionError(indentLine('Recieved: <actual> to be not null'), {
      actual,
    })
  }
}

export const toBeFalsy = (actual) => {
  if (typeof actual !== 'boolean') {
    throw new RunnerError(
      indentLine(`Received: ${actual} is not a boolean value`)
    )
  }
  if (actual !== false) {
    throw new AssertionError(indentLine('Received: <actual> to be false'), {
      actual,
    })
  }
}

export const toBeTruthy = (actual) => {
  if (typeof actual !== 'boolean') {
    throw new RunnerError(
      indentLine(`Received: ${actual} is not a boolean value`)
    )
  }
  if (actual !== true) {
    throw new AssertionError(indentLine('Received: <actual> to be true'), {
      actual,
    })
  }
}

export const toHaveLength = (actual, expected) => {
  if (!Array.isArray(actual)) {
    throw new RunnerError(indentLine(`Received: ${actual} is not an array`))
  }
  if (typeof expected !== 'number') {
    throw new RunnerError(indentLine(`Expected: ${expected} is not a number`))
  }
  if (actual.length !== expected) {
    throw new AssertionError(
      indentLine('Expected: <expected>') +
        EOL +
        indentLine('Received: <actual>'),
      {
        actual: actual.length,
        expected,
      }
    )
  }
}

export const toEqual = (actual, expected) => {
  if (actual !== expected) {
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

export const notToEqual = (actual, expected) => {
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

export const toBeLessThan = (actual, expected) => {
  if (typeof actual !== 'number') {
    throw new RunnerError(indentLine(`Expected: ${actual} is not a number`))
  }
  if (typeof expected !== 'number') {
    throw new RunnerError(indentLine(`Recieved: ${expected} is not a number`))
  }
  if (actual > expected) {
    throw new AssertionError(
      indentLine('Expected: <actual>') +
        EOL +
        indentLine('to be less than') +
        EOL +
        indentLine('Received: <expected>'),
      {
        actual,
        expected,
      }
    )
  }
}

export const toBeNaN = (actual) => {
  if (!isNaN(actual)) {
    throw new AssertionError(indentLine('Received: <actual> to be NaN'), {
      actual,
    })
  }
}
