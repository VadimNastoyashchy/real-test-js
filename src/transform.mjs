import { ANSI_COLORS, ANSI_RESET } from './constants.mjs'

export const applyColor = (message) =>
  Object.keys(ANSI_COLORS).reduce(
    (message, color) =>
      message
        .replace(new RegExp(`<${color}>`, 'g'), ANSI_COLORS[color])
        .replace(new RegExp(`</${color}>`, 'g'), ANSI_RESET),
    message
  )

export const last = (arr) => arr[arr.length - 1]

export const withoutLast = (arr) => arr.slice(0, -1)

export const executeAll = (fnArray) => fnArray.forEach((fn) => fn())
