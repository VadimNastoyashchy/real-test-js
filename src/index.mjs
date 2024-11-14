/* eslint-disable no-unused-vars */
import * as core from './core/context.mjs'
import { expect as coreExpect } from './core/expect.mjs'
import { Assertions } from '..//src/index'

/**
 * Describe a "suite" with the given title and callback fn containing nested suites.
 *
 * ```js
 * describe('Unit tests for assertions', () => {
 *  test('Check assertion toBeDefined()', () => {
 *    const number = 1
 *    expect(number).toBeDefined()
 *  })
 * })
 * ```
 *
 * @param name Group title.
 * @param optionsOrBody (Optional) Object with options
 * @param callback A callback that is run immediately when calling describe(name, optionsOrBody, callback)
 */
export const describe = (name, optionsOrBody, body) =>
  core.describe(name, optionsOrBody, body)

/**
 * Test a specification or test-case with the given title, test options and callback fn.
 *
 * ```js
 * test('Check assertion toBeDefined()', () => {
 *    const number = 1
 *    expect(number).toBeDefined()
 * })
 * ```
 *
 * @param name Test title.
 * @param optionsOrBody (Optional) Object with options
 * @param callback A callback that is run immediately when calling test(name, optionsOrBody, callback)
 */
export const test = (name, optionsOrBody, body) =>
  core.test(name, optionsOrBody, body)

/**
 * Execute before each test case.
 *
 * ```js
 * beforeEach(() => {
 *  const number = 1
 * });
 * ```
 */
export const beforeEach = (body) => core.beforeEach(body)

/**
 * Execute before all test cases.
 *
 * ```js
 * beforeAll(() => {
 *  const number = 1
 * });
 * ```
 */
export const beforeAll = (body) => core.beforeAll(body)

/**
 * Execute after each test case.
 *
 * ```js
 * afterEach(() => {
 *  const number = 1
 * });
 * ```
 */
export const afterEach = (body) => core.afterEach(body)

/**
 * Execute after all test cases.
 *
 * ```js
 * afterAll(() => {
 *  const number = 1
 * });
 * ```
 */
export const afterAll = (body) => core.afterAll(body)

/**
 * Expect gives you access to a number of "matchers" that let you validate different things.
 *
 * ```js
 *  expect(number).toBeDefined()
 * ```
 *
 * @param {any} value - the value to be tested.
 * @returns {Assertions} test functions that let you validate different things
 */
export const expect = (expected) => coreExpect(expected)
