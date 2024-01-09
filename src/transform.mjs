import { ANSI_COLORS, ANSI_RESET } from './constants.mjs'

export const applyColor = (message) =>
  Object.keys(ANSI_COLORS).reduce(
    (message, color) =>
      message
        .replace(new RegExp(`<${color}>`, 'g'), ANSI_COLORS[color])
        .replace(new RegExp(`</${color}>`, 'g'), ANSI_RESET),
    message
  )
