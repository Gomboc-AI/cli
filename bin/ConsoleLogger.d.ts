import { ExitCode } from './exitCodes.js';
export declare class ConsoleLogger {
    isSilenced: boolean;
    constructor(isSilenced: boolean);
    logIndented: (message: string, indentation: number) => void;
    log: (message: string) => void;
    _log: (message: string) => void;
    __log: (message: string) => void;
    ___log: (message: string) => void;
    err: (code: ExitCode, message: string) => void;
}
