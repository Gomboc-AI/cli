import chalk from 'chalk'

import { ExitCode } from '../cli/exitCodes.js';
import { settings } from '../settings.js';


export class ConsoleLogger {
  isSilenced: boolean

  constructor(isSilenced = false) {
    // CANARY_MODE shortcircuits the logger
    this.isSilenced = isSilenced || settings.CANARY_MODE;
  }

  private logIndented = (message: string, indentation: number) => {
    if(!this.isSilenced){
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
