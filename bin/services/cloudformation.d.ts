import { GitHubOptions, GitLabOptions } from '../apiclient/__generated__/GlobalTypes.js';
import { ExitCode } from '../cli/exitCodes.js';
export interface ScanCfnInput {
    authToken?: string;
    secretAccessKey?: string;
    apiUrl: string;
    config: string;
    output: string;
    gitHubOptions?: GitHubOptions;
    gitLabOptions?: GitLabOptions;
}
export declare const scanCfn: (inputs: ScanCfnInput) => Promise<ExitCode>;
