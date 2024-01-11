import {
  describe,
  test,
  beforeEach,
  afterEach,
  afterAll,
  beforeAll,
} from '../src/core.mjs'

describe('First describe', () => {
  beforeAll(() => {
    console.log('Before ALL 1')
  })
  let afterAllCount = 0

  afterAll(() => {
    console.log(`After all ${++afterAllCount}`)
  })
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
  beforeAll(() => {
    console.log('Before ALL 2')
  })
  let beforeCount = 0
  let afterCount = 0
  beforeEach(() => {
    console.log(`Before each ${++beforeCount}`)
  })
  afterEach(() => {
    console.log(`After each ${++afterCount}`)
  })
  afterAll(() => {
    console.log('After all 2')
  })
  test('It #1.1', () => {})
})
