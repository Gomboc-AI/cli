import chalk from 'chalk'
import { ExitCode } from '../cli/exitCodes';


export class ConsoleLogger {
  isSilenced: boolean

  constructor(isSilenced = false) {
    this.isSilenced = isSilenced;
  }

  private logIndented = (message: string, indentation: number) => {
    if (!this.isSilenced) {
      console.log(`${'  '.repeat(indentation)}${message}`)
    }
  }

  public log = (message: string) => { this.logIndented(message, 0) }
  public _log = (message: string) => { this.logIndented(message, 1) }
  public __log = (message: string) => { this.logIndented(message, 2) }
  public ___log = (message: string) => { this.logIndented(message, 3) }

  public err = (code: ExitCode, message: string) => {
    this.log(`\n${chalk.red.bold(`Error ${code as number}`)}: ${message}`)
  }
}  
