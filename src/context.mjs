/* eslint-disable no-prototype-builtins */
/* eslint-disable no-undef */
import { TimeoutError } from './errors/timeout.mjs'
import { focusedOnly } from './focus.mjs'
import { applyColor, executeAll, withoutLast } from './transform.mjs'
export { expect } from './expect.mjs'

export const report = []
const failures = []
let successes = 0
let describeStack = []
let currentDescribe
let hasBeforeAll = false
let hasAfterAll = false
let beforeAllStack = []
let afterAllStack = []
let defaultTimeout = 5_000

const makeDescribe = (name, options) => ({
  ...options,
  name,
  beforeEach: [],
  afterEach: [],
  children: [],
})

const makeTest = (name, body) => ({
  name,
  body,
  errors: [],
  timeout: new TimeoutError(defaultTimeout),
})

currentDescribe = makeDescribe('root')

/**
 * Describe a "suite" with the given title and callback fn containing nested suites.
 *
 * ```js
 * describe('Unit tests for assertions', { skip: true } () => {
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
export const describe = (name, optionsOrBody, body) => {
  const options = typeof optionsOrBody === 'object' ? optionsOrBody : {}
  const actualBody = typeof optionsOrBody === 'function' ? optionsOrBody : body
  if (options.skip) {
    printSkippedMsg(name)
    return
  }
  const parentDescribe = currentDescribe
  currentDescribe = makeDescribe(name, options)
  actualBody()
  currentDescribe = {
    ...parentDescribe,
    children: [...parentDescribe.children, currentDescribe],
  }
}

/**
 * Test a specification or test-case with the given title, test options and callback fn.
 *
 * ```js
 * test('Check assertion toBeDefined()', { skip: true } () => {
 *    const number = 1
 *    expect(number).toBeDefined()
 * })
 * ```
 *
 * @param name Test title.
 * @param optionsOrBody (Optional) Object with options
 * @param callback A callback that is run immediately when calling test(name, optionsOrBody, callback)
 */
export const test = (name, optionsOrBody, body) => {
  const options = typeof optionsOrBody === 'object' ? optionsOrBody : {}
  const actualBody = typeof optionsOrBody === 'function' ? optionsOrBody : body
  if (options.skip) {
    printSkippedMsg(name)
    return
  }
  if (options.timeout) {
    defaultTimeout = options.timeout
  }
  currentDescribe = {
    ...currentDescribe,
    children: [...currentDescribe.children, makeTest(name, actualBody)],
  }
}

/**
 * Execute before each test case.
 *
 * ```js
 * beforeEach(() => {
 *  const number = 1
 * });
 * ```
 */
export const beforeEach = (body) => {
  currentDescribe = {
    ...currentDescribe,
    beforeEach: [...currentDescribe.beforeEach, body],
  }
}

/**
 * Execute after each test case.
 *
 * ```js
 * afterEach(() => {
 *  const number = 1
 * });
 * ```
 */
export const afterEach = (body) => {
  currentDescribe = {
    ...currentDescribe,
    afterEach: [...currentDescribe.afterEach, body],
  }
}

/**
 * Execute before all test cases.
 *
 * ```js
 * beforeAll(() => {
 *  const number = 1
 * });
 * ```
 */
export const beforeAll = (body) => {
  beforeAllStack.push(body)
  hasBeforeAll = true
}

/**
 * Execute after all test cases.
 *
 * ```js
 * afterAll(() => {
 *  const number = 1
 * });
 * ```
 */
export const afterAll = (body) => {
  afterAllStack.push(body)
  hasAfterAll = true
}

const isTestBlock = (testObject) => testObject.hasOwnProperty('body')

const indent = (message) => `${' '.repeat(describeStack.length * 2)}${message}`

const runDescribe = async (describe) => {
  console.log(indent(describe.name))
  describeStack = [...describeStack, describe]
  for (let i = 0; i < describe.children.length; ++i) {
    await runBlock(describe.children[i])
  }
  invokeAfterAll()
  describeStack = withoutLast(describeStack)
}

const timeoutPromise = () => currentTest.timeout.createTimeoutPromise()

const runBodyAndWait = async (body) => {
  const result = body()
  if (result instanceof Promise) {
    await Promise.race([result, timeoutPromise()])
  }
}

const runTest = async (test) => {
  global.currentTest = test
  currentTest.describeStack = [...describeStack]
  try {
    invokeBeforeAll()
    invokeBeforeEach(currentTest)
    await runBodyAndWait(currentTest.body)
  } catch (e) {
    currentTest.errors.push(e)
  }
  if (currentTest.errors.length > 0) {
    console.log(indent(applyColor(`<red>✗</red> ${currentTest.name}`)))
    failures.push(currentTest)
  } else {
    successes++
    console.log(indent(applyColor(`<green>✓</green> ${currentTest.name}`)))
  }
  try {
    invokeAfterEach(currentTest)
  } catch (e) {
    console.error(e)
  }
  report.push(currentTest)
  global.currentTest = null
}

const invokeBeforeEach = () =>
  executeAll(describeStack.flatMap((describe) => describe.beforeEach))

const invokeAfterEach = () =>
  executeAll(describeStack.flatMap((describe) => describe.afterEach))

const invokeBeforeAll = () => {
  if (hasBeforeAll) {
    executeAll(beforeAllStack)
    hasBeforeAll = false
    beforeAllStack = []
  }
}

const invokeAfterAll = () => {
  if (hasAfterAll) {
    executeAll(afterAllStack)
    hasAfterAll = false
    afterAllStack = []
  }
}

const runBlock = (block) =>
  isTestBlock(block) ? runTest(block) : runDescribe(block)

export const runParsedBlocks = async () => {
  const withFocus = focusedOnly(currentDescribe)
  for (let i = 0; i < withFocus.children.length; ++i) {
    await runBlock(withFocus.children[i])
  }
  return { successes, failures }
}

const printSkippedMsg = (name) =>
  console.log(applyColor(`<cyan>Skipped test:</cyan> ${name}`))
