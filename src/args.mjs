const getCustomArgFromArgs = (args, customArgPrefix) => {
  // if (args.length < 3) {
  //   throw new Error('No custom arguments provided')
  // }
  // pick custom arg that contains custom prefix
  const customArg = args.find((arg) => arg.includes(customArgPrefix)) ?? ''
  const parsedCustomArg = customArg.split(customArgPrefix)
  const customArgValue = parsedCustomArg[1]
  return customArgValue
}

export const getSpecName = (args) => {
  const customArgPrefix = '--spec='
  return getCustomArgFromArgs(args, customArgPrefix) || ''
}
