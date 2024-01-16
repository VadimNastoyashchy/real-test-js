import {
  describe as coreDescribe,
  test as coreTest,
  beforeEach as coreBeforeEach,
  afterEach as coreAfterEach,
  beforeAll as coreBeforeAll,
  afterAll as coreAfterAll,
} from './context.mjs'
import { expect as coreExpect } from './expect.mjs'

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
  coreDescribe(name, optionsOrBody, body)

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
  coreTest(name, optionsOrBody, body)

/**
 * Execute before each test case.
 *
 * ```js
 * beforeEach(() => {
 *  const number = 1
 * });
 * ```
 */
export const beforeEach = (body) => coreBeforeEach(body)

/**
 * Execute before all test cases.
 *
 * ```js
 * beforeAll(() => {
 *  const number = 1
 * });
 * ```
 */
export const beforeAll = (body) => coreBeforeAll(body)

/**
 * Execute after each test case.
 *
 * ```js
 * afterEach(() => {
 *  const number = 1
 * });
 * ```
 */
export const afterEach = (body) => coreAfterEach(body)

/**
 * Execute after all test cases.
 *
 * ```js
 * afterAll(() => {
 *  const number = 1
 * });
 * ```
 */
export const afterAll = (body) => coreAfterAll(body)

/**
 * Expect gives you access to a number of "matchers" that let you validate different things.
 *
 * ```js
 *  expect(number).toBeDefined()
 * ```
 *
 * @param expected Expected value to check.
 */
export const expect = (expected) => coreExpect(expected)
