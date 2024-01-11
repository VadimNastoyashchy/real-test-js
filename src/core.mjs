import path from 'path'
import { getConfig } from './config.mjs'
import { applyColor } from './transform.mjs'
import { TICK, CROSS, EXIT_CODES } from './constants.mjs'
import { timeStamp, printExecutionTime } from './support.mjs'

const config = getConfig()

let successes = 0
const failures = []
let describeStack = []
let hasBeforeAll = false
let beforeAllStack = []

// Runner entry point
export const run = async () => {
  const startTimeStamp = timeStamp()
  try {
    await import(path.resolve(process.cwd(), config.specFile))
  } catch (e) {
    console.error(e)
  }
  const endTimeStamp = timeStamp()
  printFailuresMsg()
  printTestResult()
  printExecutionTime(startTimeStamp, endTimeStamp)
  process.exit(failures.length > 0 ? EXIT_CODES.failures : EXIT_CODES.ok)
}

const last = (arr) => arr[arr.length - 1]

const withoutLast = (arr) => arr.slice(0, -1)

const currentDescribe = () => last(describeStack)

const updateDescribe = (newProps) => {
  const newDescribe = {
    ...currentDescribe(),
    ...newProps,
  }
  describeStack = [...withoutLast(describeStack), newDescribe]
}

const executeAll = (fnArray) => fnArray.forEach((fn) => fn())

export const beforeEach = (body) =>
  updateDescribe({
    beforeEach: [...currentDescribe().beforeEach, body],
  })

export const beforeAll = (body) => {
  beforeAllStack.push(body)
  hasBeforeAll = true
}

export const afterEach = (body) =>
  updateDescribe({
    afterEach: [...currentDescribe().afterEach, body],
  })

export const afterAll = (body) =>
  updateDescribe({
    afterAll: [...currentDescribe().afterAll, body],
  })

const invokeBeforeAll = () => {
  if (hasBeforeAll) {
    executeAll(beforeAllStack)
    hasBeforeAll = false
    beforeAllStack = []
  }
}

const invokeBeforeEach = () =>
  executeAll(describeStack.flatMap((describe) => describe.beforeEach))

const invokeAfterEach = () =>
  executeAll(describeStack.flatMap((describe) => describe.afterEach))

const invokeAfterAll = () =>
  executeAll(describeStack.flatMap((describe) => describe.afterAll))

const makeDescribe = (name) => ({
  name,
  beforeEach: [],
  beforeAll: [],
  afterEach: [],
  afterAll: [],
})

export const describe = (name, body) => {
  describeStack = [...describeStack, makeDescribe(name)]
  body()
  invokeAfterAll()
  describeStack = withoutLast(describeStack)
}

export const test = (name, body) => {
  try {
    invokeBeforeAll()
    invokeBeforeEach()
    body()
    console.log(indent(applyColor(`  <green>${TICK}</green> ${name}`)))
    successes++
  } catch (e) {
    console.error(indent(applyColor(`  <red>${CROSS}</red> ${name}`)))
    failures.push({ error: e, name, describeStack })
  }
  try {
    invokeAfterEach()
  } catch (e) {
    console.error(e)
  }
}

const indent = (message) => `${' '.repeat(describeStack.length * 2)}${message}`

const printFailureMsg = (failure) => {
  console.error(applyColor(fullTestDescription(failure)))
  console.error(failure.error)
  console.error('')
}

const printFailuresMsg = () => {
  if (failures.length > 0) {
    console.error('')
    console.error('Failures:')
    console.error('')
  }
  failures.forEach(printFailureMsg)
}

const printTestResult = () => {
  console.log(
    applyColor(
      `Tests: <green>${successes} passed</green>, ` +
        `<red>${failures.length} failed</red>.`
    )
  )
}

const fullTestDescription = ({ name, describeStack }) =>
  [...describeStack, { name }]
    .map(({ name }) => `<bold>${name}</bold>`)
    .join(' → ')
