import chalk from "chalk"


export const hl = chalk.hex('#FFFFA7') // highlight
export const hlSuccess = chalk.hex('#3CB043') // highlight green
export const hlError = chalk.hex('#CA3433') // highlight red

export const exclamationMark = chalk.redBright.bold('!')
export const checkMark = chalk.green('✔')
export const crossMark = chalk.red('✖')

export const formatTitle = (title: string) => {
  const lineBreak = '--------------------------------------------'
  return `${chalk.gray(lineBreak)}\n${chalk.blue.bold(title)}\n`
}
