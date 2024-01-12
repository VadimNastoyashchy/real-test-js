import path from 'path'
import fs from 'fs'

export const timeStamp = () => Date.now()

export const printExecutionTime = (start, end) => {
  console.log(`Execution time: ${end - start} ms`)
}

export const createFolder = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    try {
      fs.mkdirSync(folderPath)
      console.log(`Folder '${folderPath}' created successfully.`)
    } catch (err) {
      console.error(`Error creating folder '${folderPath}':`, err)
    }
  }
}

export const createFile = (path, data) => {
  fs.writeFileSync(path, data, 'utf8', (err) => {
    if (err) {
      console.error('Error writing JSON file:', err)
    } else {
      console.log('JSON file has been created successfully!')
    }
  })
}

export const prepareSpace = (fileName, folderName) => {
  let formattedFolderName = ''
  if (folderName) {
    formattedFolderName = `${folderName}/`
    const folderPath = path.resolve(process.cwd(), formattedFolderName)
    createFolder(folderPath)
  }
  const filePath = path.resolve(
    process.cwd(),
    `${formattedFolderName}${fileName}`
  )
  return filePath
}
