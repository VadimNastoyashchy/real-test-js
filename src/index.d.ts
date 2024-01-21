// Type definitions for log4js

// Type definitions for log4js

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
export function describe(name: string, optionsOrBody: {}, body: {}): void

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
export function test(name: string, optionsOrBody: {}, body: {}): void

/**
 * Execute before each test case.
 *
 * ```js
 * beforeEach(() => {
 *  const number = 1
 * });
 * ```
 */
export function beforeEach(body: () => void): void

/**
 * Execute before all test cases.
 *
 * ```js
 * beforeAll(() => {
 *  const number = 1
 * });
 * ```
 */
export function beforeAll(body: () => void): void

/**
 * Execute after each test case.
 *
 * ```js
 * afterEach(() => {
 *  const number = 1
 * });
 * ```
 */
export function afterEach(body: () => void): void

/**
 * Execute after all test cases.
 *
 * ```js
 * afterAll(() => {
 *  const number = 1
 * });
 * ```
 */
export function afterAll(body: () => void): void

type ExpectReturnValue = {
  toHaveLength: (length: number) => void
  toBeEqual: (value: any) => void
  toBeNotEqual: (value: any) => void
}

/**
 * Expect gives you access to a number of "matchers" that let you validate different things.
 *
 * ```js
 *  expect(number).toBeDefined()
 * ```
 *
 * @param expected Expected value to check.
 */
export function expect(expected: any): ExpectReturnValue
