import { ApolloClient } from "@apollo/client/core/core.cjs";
import { GitHubOptions, GitLabOptions, ScanPolicy, TemplatePayload } from './__generated__/GlobalTypes.js';
import { ScanTfPlan_scanTfPlanExt } from "./__generated__/ScanTfPlan.js";
import { ScanCfnTemplates_scanCfnTemplateExt } from "./__generated__/ScanCfnTemplates.js";
export declare class Client {
    url: string;
    authToken?: string;
    client: ApolloClient<any>;
    constructor(url: string, authToken?: string);
    scanCfnTemplates(templatePayloads: TemplatePayload[], policy: ScanPolicy, gitHubOptions?: GitHubOptions, gitLabOptions?: GitLabOptions, secretAccessKey?: string): Promise<ScanCfnTemplates_scanCfnTemplateExt>;
    scanTfPlan(plan: string, workingDirectory: string, policy: ScanPolicy, gitHubOptions?: GitHubOptions, gitLabOptions?: GitLabOptions): Promise<ScanTfPlan_scanTfPlanExt>;
}
