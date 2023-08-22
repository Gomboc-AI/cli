import chalk from 'chalk'

import { ExitCode } from '../cli/exitCodes.js';
import { Lighthouse, MessageLevel } from '../apiclient/gql/graphql.js';
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

  public err = (code: ExitCode, message: string, lighthouseMessages: Lighthouse[]) => {
    this.log(`\n${chalk.red.bold(`Error ${code as number}`)}: ${message}`)
    // In any case, we want to log the lighthouse messages
    this.allLighthouseMessages(lighthouseMessages)
  }

  public lighthouseMessage = (level: MessageLevel, message: string) => {
    switch(level){
      case MessageLevel.Error:
        this.log(`${chalk.red.bold('ALERT')}\t${message}`)
      break
      case MessageLevel.Info:
        this.log(`${chalk.blue.bold('INFO')}\t${message}`)
      break
      case MessageLevel.Warning:
        this.log(`${chalk.yellowBright.bold('WARNING')}\t${message}`)
      break
    }
  }

  public allLighthouseMessages = (messages: Lighthouse[]) => {
    messages.forEach((message) => {
      this.lighthouseMessage(message.level, message.message)
    })
  }
}  