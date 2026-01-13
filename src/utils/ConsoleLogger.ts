import chalk from 'chalk'
import { ExitCode } from '../cli/exitCodes';


export class ConsoleLogger {
  isSilenced: boolean
  private spinnerInterval: ReturnType<typeof setInterval> | null = null
  private spinnerFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
  private spinnerIndex = 0

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

  public err = (_code: ExitCode, message: string) => {
    this.log(`\n${chalk.red.bold('Blocked')}: ${message}`)
  }

  public startSpinner = (message: string) => {
    if (this.isSilenced || this.spinnerInterval) return
    
    this.spinnerIndex = 0
    process.stdout.write(`${this.spinnerFrames[this.spinnerIndex]} ${message}`)
    
    this.spinnerInterval = setInterval(() => {
      this.spinnerIndex = (this.spinnerIndex + 1) % this.spinnerFrames.length
      process.stdout.write(`\r${this.spinnerFrames[this.spinnerIndex]} ${message}`)
    }, 80)
  }

  public stopSpinner = (finalMessage?: string) => {
    if (this.spinnerInterval) {
      clearInterval(this.spinnerInterval)
      this.spinnerInterval = null
      process.stdout.write('\r\x1b[K') // Clear the line
      if (finalMessage) {
        this.log(finalMessage)
      }
    }
  }
}  
