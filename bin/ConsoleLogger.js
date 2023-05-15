import chalk from 'chalk';
export class ConsoleLogger {
    isSilenced;
    constructor(isSilenced) {
        this.isSilenced = isSilenced;
    }
    logIndented = (message, indentation) => {
        if (!this.isSilenced) {
            console.log(`${'  '.repeat(indentation)}${message}`);
        }
    };
    log = (message) => { this.logIndented(message, 0); };
    _log = (message) => { this.logIndented(message, 1); };
    __log = (message) => { this.logIndented(message, 2); };
    ___log = (message) => { this.logIndented(message, 3); };
    err = (code, message) => {
        this.log(`${chalk.red.bold(`Error ${code}`)}: ${message}`);
    };
}
