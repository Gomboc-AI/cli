import chalk from 'chalk'
import { ExitCode } from './exitCodes.js';


export class ConsoleLogger {
  isSilenced: boolean

  constructor(isSilenced: boolean) {
    this.isSilenced = isSilenced;
  }
  logIndented = (message: string, indentation: number) => {
    if(!this.isSilenced){
      console.log(`${'  '.repeat(indentation)}${message}`)
    }
  }
  log = (message: string) => { this.logIndented(message, 0) }
  _log = (message: string) => { this.logIndented(message, 1) }
  __log = (message: string) => { this.logIndented(message, 2) }
  ___log = (message: string) => { this.logIndented(message, 3) }

  err = (code: ExitCode, message: string) => {
    this.log(`${chalk.red.bold(`Error ${code as number}`)}: ${message}`)
  }
}  