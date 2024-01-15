import path from 'path'
import fs from 'fs'
import { applyColor, transformStackTrace } from './transform.mjs'
import { runParsedBlocks } from './context.mjs'
import { getConfig } from './config.mjs'
import { getMultipleFilePath } from './setup.mjs'
import { timeStamp, printExecutionTime } from './support.mjs'
import { createReport } from './reporters/reporter.mjs'

const config = getConfig()

Error.prepareStackTrace = transformStackTrace

const isSingleFileMode = () => config.testFile

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

const discoverTestFiles = async () => {
  return getMultipleFilePath(path.resolve(process.cwd(), config.testDir))
}

const chooseTestFiles = () =>
  isSingleFileMode() ? getSingleFilePath() : discoverTestFiles()

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
    // createReport(report)
    process.exit(failures.length > 0 ? 0 : 1)
  } catch (e) {
    console.error(e.message)
    console.error(e.stack)
    process.exit(3)
  }
}

const fullTestDescription = ({ name, describeStack }) =>
  [...describeStack, { name }]
    .map(({ name }) => `<bold>${name}</bold>`)
    .join(' → ')

const printFailureMsg = (failure) => {
  console.error(applyColor(fullTestDescription(failure)))
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
