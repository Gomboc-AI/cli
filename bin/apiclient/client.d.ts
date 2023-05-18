import { ApolloClient } from "@apollo/client/core/core.cjs";
import { GitHubOptions, GitLabOptions, ScanPolicy, TemplatePayload } from './__generated__/GlobalTypes.js';
import { ScanTfPlan_scanTfPlanExt } from "./__generated__/ScanTfPlan.js";
import { ScanCfnTemplate_scanCfnTemplateExt } from "./__generated__/ScanCfnTemplate.js";
export declare class Client {
    url: string;
    authToken?: string;
    client: ApolloClient<any>;
    constructor(url: string, authToken?: string);
    scanCfnTemplate(templatePayloads: TemplatePayload[], policy: ScanPolicy, gitHubOptions?: GitHubOptions, gitLabOptions?: GitLabOptions, secretAccessKey?: string): Promise<ScanCfnTemplate_scanCfnTemplateExt>;
    scanTfPlan(plan: string, workingDirectory: string, policy: ScanPolicy, gitHubOptions?: GitHubOptions, gitLabOptions?: GitLabOptions, secretAccessKey?: string): Promise<ScanTfPlan_scanTfPlanExt>;
}
