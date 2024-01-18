import path from 'path'
import fs from 'fs'
import { applyColor, transformStackTrace } from './transform.mjs'
import { runParsedBlocks, report } from './context.mjs'
import { getConfig } from './config/config.mjs'
import { getMultipleFilePath } from './config/setup.mjs'
import { timeStamp, printExecutionTime } from './support.mjs'
import { createReport } from './reporters/reporter.mjs'
import { EXIT_CODES } from './constants.mjs'

const config = getConfig()

Error.prepareStackTrace = transformStackTrace

const hasSingleFile = () => config.testFile

const getSingleFilePath = async () => {
  try {
    const fullPath = path.resolve(process.cwd(), config.testFile)
    await fs.promises.access(fullPath)
    return [fullPath]
  } catch {
    console.error(`File ${config.testFile} could not be accessed.`)
    process.exit(0)
  }
}

const getTestFiles = async () => {
  return getMultipleFilePath(path.resolve(process.cwd(), config.testDir))
}

const chooseTestFiles = () =>
  hasSingleFile() ? getSingleFilePath() : getTestFiles()

export const run = async () => {
  const startTimeStamp = timeStamp()
  try {
    const testFilePaths = await chooseTestFiles()
    await Promise.all(
      testFilePaths.map(async (testFilePath) => {
        printRunningTestFile(path.resolve(process.cwd(), testFilePath))
        await import(testFilePath)
      })
    )
    const { failures, successes } = await runParsedBlocks()
    printFailuresMsg(failures)
    printTestResult(failures, successes)
    const endTimeStamp = timeStamp()
    printExecutionTime(startTimeStamp, endTimeStamp)
    createReport(report)
    process.exit(failures.length > 0 ? EXIT_CODES.failures : EXIT_CODES.ok)
  } catch (e) {
    console.error(e.message)
    console.error(e.stack)
    process.exit(EXIT_CODES.failures)
  }
}

const createFullDescription = ({ name, describeStack }) =>
  [...describeStack, { name }]
    .map(({ name }) => `<bold>${name}</bold>`)
    .join(' → ')

const printFailureMsg = (failure) => {
  console.error(applyColor(createFullDescription(failure)))
  console.error('')
  failure.errors.forEach((error) => {
    console.error(error.message)
    console.error(error.stack)
  })
  console.error('')
}

const printFailuresMsg = (failures) => {
  if (failures.length > 0) {
    console.error('')
    console.error('Failures:')
    console.error('')
  }
  failures.forEach(printFailureMsg)
}

const printRunningTestFile = (testFile) => {
  console.log(`Running test file: ${testFile}`)
}

const printTestResult = (failures, successes) => {
  console.log(
    applyColor(
      `Tests: <green>${successes} passed</green>, ` +
        `<red>${failures.length} failed</red>, ` +
        `${successes + failures.length} total`
    )
  )
}
