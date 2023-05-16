import { GitHubOptions, GitLabOptions, ScanPolicy, TemplatePayload } from './__generated__/GlobalTypes.js';
import { Scan_scanCfnTemplateExt } from "./__generated__/Scan";
export declare class Client {
    url: string;
    idToken?: string;
    constructor(url: string, idToken?: string);
    scanCfnTemplate(templatePayloads: TemplatePayload[], policy: ScanPolicy, gitHubOptions?: GitHubOptions, gitLabOptions?: GitLabOptions, secretAccessKey?: string): Promise<Scan_scanCfnTemplateExt>;
}
