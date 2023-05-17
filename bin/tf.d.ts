import { GitHubOptions, GitLabOptions } from './apiclient/__generated__/GlobalTypes.js';
import { ExitCode } from './exitCodes.js';
export interface ScanTfInput {
    authToken: string;
    apiUrl: string;
    config: string;
    output: string;
    plan: string;
    workingDirectory: string;
    gitHubOptions?: GitHubOptions;
    gitLabOptions?: GitLabOptions;
}
export declare const scanTf: (inputs: ScanTfInput) => Promise<ExitCode>;
