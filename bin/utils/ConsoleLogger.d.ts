import { ExitCode } from '../cli/exitCodes.js';
export declare class ConsoleLogger {
    isSilenced: boolean;
    constructor(isSilenced: boolean);
    private logIndented;
    log: (message: string) => void;
    _log: (message: string) => void;
    __log: (message: string) => void;
    ___log: (message: string) => void;
    err: (code: ExitCode, message: string) => void;
}
