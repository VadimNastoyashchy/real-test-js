export const timeStamp = () => Date.now()

export const printExecutionTime = (start, end) => {
  console.log(`Execution time: ${end - start} ms`)
}
