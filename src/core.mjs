/* eslint-disable indent */
import path from 'path'
import { getConfig } from './config.mjs'
import { applyColor, executeAll, last, withoutLast } from './transform.mjs'
import { TICK, CROSS, EXIT_CODES } from './constants.mjs'
import { timeStamp, printExecutionTime } from './support.mjs'
import * as assertions from './assertions.mjs'
import { AssertionError } from './assertionError.mjs'
import { getMultipleFilePath } from './setup.mjs'
import { RunnerError } from './runnerError.mjs'

const config = getConfig()

let currentTest
let successes = 0
const failures = []
let describeStack = []

let hasBeforeAll = false
let hasAfterAll = false
let beforeAllStack = []
let afterAllStack = []

// Runner entry point
export const run = async () => {
  const startTimeStamp = timeStamp()
  if (config.specFile) {
    try {
      printRunningSpecFile(path.resolve(process.cwd(), config.specFile))
      await import(path.resolve(process.cwd(), config.specFile))
    } catch (e) {
      console.error(e)
    }
  } else if (config.specFolder) {
    const specs = getMultipleFilePath(
      path.resolve(process.cwd(), config.specFolder)
    )
    for (const spec of specs) {
      try {
        printRunningSpecFile(path.resolve(process.cwd(), spec))
        await import(spec)
      } catch (e) {
        console.error(e)
      }
    }
  } else {
    throw new RunnerError("Spec file/'s or spec folder should be provided")
  }

  const endTimeStamp = timeStamp()
  printFailuresMsg()
  printTestResult()
  printExecutionTime(startTimeStamp, endTimeStamp)
  process.exit(failures.length > 0 ? EXIT_CODES.failures : EXIT_CODES.ok)
}

const createDescribe = (name) => ({
  name,
  beforeEach: [],
  afterEach: [],
})

const createTest = (name) => ({
  name,
  errors: [],
  describeStack,
})

const currentDescribe = () => last(describeStack)

const updateDescribe = (newProps) => {
  const newDescribe = {
    ...currentDescribe(),
    ...newProps,
  }
  describeStack = [...withoutLast(describeStack), newDescribe]
}

export const beforeEach = (body) =>
  updateDescribe({
    beforeEach: [...currentDescribe().beforeEach, body],
  })

export const afterEach = (body) =>
  updateDescribe({
    afterEach: [...currentDescribe().afterEach, body],
  })

export const beforeAll = (body) => {
  beforeAllStack.push(body)
  hasBeforeAll = true
}

export const afterAll = (body) => {
  afterAllStack.push(body)
  hasAfterAll = true
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

export const describe = (name, body) => {
  console.log(indent(name))
  describeStack = [...describeStack, createDescribe(name)]
  body()
  invokeAfterAll()
  describeStack = withoutLast(describeStack)
}

export const test = (name, body) => {
  currentTest = createTest(name)
  try {
    invokeBeforeAll()
    invokeBeforeEach()
    body()
  } catch (e) {
    currentTest.errors.push(e)
  }
  if (currentTest.errors.length > 0) {
    console.log(indent(applyColor(`  <red>${CROSS}</red> ${name}`)))
    failures.push(currentTest)
  } else {
    successes++
    console.log(indent(applyColor(`  <green>${TICK}</green> ${name}`)))
  }
  try {
    invokeAfterEach()
  } catch (e) {
    console.error(e)
  }
}

const indent = (message) => `${' '.repeat(describeStack.length * 2)}${message}`

const printRunningSpecFile = (specFile) => {
  console.log(`Running spec file: ${specFile}`)
}

const printFailureMsg = (failure) => {
  console.error(applyColor(fullTestDescription(failure)))
  failure.errors.forEach((error) => {
    console.error(error)
  })
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

const assertionsHandler = (actual) => ({
  get:
    (_, name) =>
    (...args) => {
      try {
        assertions[name](actual, ...args)
      } catch (e) {
        if (e instanceof AssertionError) {
          currentTest.errors.push(e)
        } else {
          throw e
        }
      }
    },
})

export const expect = (actual) => new Proxy({}, assertionsHandler(actual))
