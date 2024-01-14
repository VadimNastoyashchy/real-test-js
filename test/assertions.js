import { describe, test, expect } from '../src/core.mjs'

describe('Unit tests for assertions', () => {
  test('Check assertion toBeDefined()', () => {
    const number = 1
    expect(number).toBeDefined()
  })

  test('Check assertion toHaveLength()', () => {
    const arr = 1
    expect(arr).toHaveLength(3)
  })

  test('Check assertion toBeFalsy()', () => {
    const flag = false
    expect(flag).toBeFalsy()
  })

  test('Check assertion toBeTruthy()', () => {
    const flag = true
    expect(flag).toBeTruthy()
  })

  test('Check assertion toEqual()', () => {
    expect(1).toEqual(1)
    expect('test').toEqual('test')
    expect(true).toEqual(true)
    expect(false).toEqual(false)
  })

  test('Check assertion notToEqual()', () => {
    expect(2).notToEqual(1)
    expect('best').notToEqual('test')
    expect(false).notToEqual(true)
    expect({}).notToEqual({})
    expect([]).notToEqual([])
  })
})
