import { describe, test, beforeEach, afterEach } from '../src/core.mjs'

describe('First describe', () => {
  let beforeCount = 0
  let afterCount = 0
  beforeEach(() => {
    console.log(`Before each ${++beforeCount}`)
  })
  afterEach(() => {
    console.log(`After each ${++afterCount}`)
  })
  test('It #1', () => {})
  test('It #2', () => {})
  test('It #3', () => {})
})

describe('Second describe', () => {
  let beforeCount = 0
  let afterCount = 0
  beforeEach(() => {
    console.log(`Before each ${++beforeCount}`)
  })
  afterEach(() => {
    console.log(`After each ${++afterCount}`)
  })
  test('It #1.1', () => {})
  describe('Inside second describe > nested describe', () => {
    test('It #2.1', () => {})
  })
})
