import { createFile, prepareSpace } from '../support.mjs'

export const prepareJsonReport = (report, fileName, folderName) => {
  const filePath = prepareSpace(fileName, folderName)
  createFile(`${filePath}.json`, JSON.stringify(report, null, 2))
}
