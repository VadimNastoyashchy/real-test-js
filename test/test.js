import { describe, it, beforeEach, afterEach } from '../src/core.mjs'

describe('First describe', () => {
  let beforeCount = 0
  beforeEach(() => {
    console.log(`Before each ${++beforeCount}`)
  })
  afterEach(() => {
    console.log(`After each ${--beforeCount}`)
  })
  it('It #1', () => {})
  it('It #2', () => {})
  it('It #3', () => {})
})

describe('Second describe', () => {
  let beforeCount = 0
  beforeEach(() => {
    console.log(`Before each ${++beforeCount}`)
  })
  afterEach(() => {
    console.log(`After each ${--beforeCount}`)
  })
  it('It #1.1', () => {})
  describe('Inside second describe > nested describe', () => {
    it('It #2.1', () => {})
  })
})
