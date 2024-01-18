import path from 'path'
import fs from 'fs'

const configFileName = 'test.config.json'
const filePath = path.join(process.cwd(), configFileName)
const configFileData = {
  testDir: 'test'
}

const jsonConfigFile = JSON.stringify(configFileData, null, 2)

fs.writeFileSync(filePath, jsonConfigFile)
