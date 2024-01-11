import { describe, test, expect } from '../src/core.mjs'

describe('Unit tests for assertions', () => {
  test('Check assertion toBeDefined()', () => {
    const number = 1
    expect(number).toBeDefined()
  })

  test('Check assertion toHaveLength()', () => {
    const arr = [1, 2, 3]
    expect(arr).toHaveLength(3)
  })
})
