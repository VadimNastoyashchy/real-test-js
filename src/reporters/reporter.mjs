import { getConfig } from '../config.mjs'
import { REPORTER_TYPE } from '../constants.mjs'
import { RunnerError } from '../errors/runner.mjs'
import { prepareHTMLReport } from './htmlReporter.mjs'
import { prepareJsonReport } from './jsonReporter.mjs'

const config = getConfig()

export const createReport = (data) => {
  const reporterConfig = config.reporter
  const reporterType = reporterConfig.type
  if (reporterType) {
    switch (reporterType) {
      case REPORTER_TYPE.HTML:
        prepareHTMLReport(
          data,
          reporterConfig.fileName,
          reporterConfig.folderName
        )
        break
      case REPORTER_TYPE.JSON:
        prepareJsonReport(
          data,
          reporterConfig.fileName,
          reporterConfig.folderName
        )
        break
      default:
        throw new RunnerError(`Unsupported report type: "${reporterType}"`)
    }
  }
}
