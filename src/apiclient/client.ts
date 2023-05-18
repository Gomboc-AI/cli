import crossFetch from 'cross-fetch'
// @ts-ignore
import { ApolloClient, InMemoryCache } from "@apollo/client/core/core.cjs"
// @ts-ignore
import { HttpLink } from "@apollo/client/link/http/http.cjs";
// @ts-ignore
import { setContext } from '@apollo/client/link/context/context.cjs'
import { GitHubOptions, GitLabOptions, ScanPolicy, TemplatePayload } from './__generated__/GlobalTypes.js'
import { ScanTfPlan, ScanTfPlanVariables, ScanTfPlan_scanTfPlanExt } from "./__generated__/ScanTfPlan.js";
import { ScanCfnTemplate, ScanCfnTemplateVariables, ScanCfnTemplate_scanCfnTemplateExt } from "./__generated__/ScanCfnTemplate.js";
import { scanCfnQuery } from './scanCloudformationTemplate.js'
import { scanTfQuery } from './scanTerraformPlan.js'

import { CLI_VERSION } from '../cliVersion.js';

export class Client {
    url: string
    authToken?: string
    client: ApolloClient<any>

    constructor(url: string, authToken?: string) {
        this.url = url
        this.authToken = authToken
        const httpLink = new HttpLink({ uri: this.url, fetch: crossFetch })
        const authLink = setContext((_: any, { headers }: any) => {
            headers['X-GOMBOC-CLI-VERSION'] = CLI_VERSION
            headers['X-GOMBOC-RUNNER-PATH'] = process.env._
            if(this.authToken != null) {
                headers['Authorization'] = `Bearer ${this.authToken}`
            }
            return { headers: headers}
        })

        this.client = new ApolloClient({
            link: authLink.concat(httpLink),
            cache: new InMemoryCache()
        })
    }

    async scanCfnTemplate(templatePayloads: TemplatePayload[], policy: ScanPolicy, gitHubOptions?: GitHubOptions, gitLabOptions?: GitLabOptions, secretAccessKey?: string): Promise<ScanCfnTemplate_scanCfnTemplateExt> {
        const scanVariables: ScanCfnTemplateVariables = {
            templates: templatePayloads,
            policy: policy,
            gitHubOptions: gitHubOptions,
            gitLabOptions: gitLabOptions,
            secretAccessKey: secretAccessKey
        }
        const { data } : { data: ScanCfnTemplate} = await this.client.query<ScanCfnTemplate, ScanCfnTemplateVariables>({
            query: scanCfnQuery,
            variables: scanVariables
        })
        return data.scanCfnTemplateExt
    }

    async scanTfPlan(plan: string, workingDirectory: string, policy: ScanPolicy, gitHubOptions?: GitHubOptions, gitLabOptions?: GitLabOptions, secretAccessKey?: string): Promise<ScanTfPlan_scanTfPlanExt> {
        const scanVariables: ScanTfPlanVariables = {
            plan: plan,
            workingDirectory: workingDirectory,
            policy: policy,
            gitHubOptions: gitHubOptions,
            gitLabOptions: gitLabOptions,
            secretAccessKey: secretAccessKey
        }
        const { data } : { data: ScanTfPlan} = await this.client.query<ScanTfPlan, ScanTfPlanVariables>({
            query: scanTfQuery,
            variables: scanVariables
        })
        return data.scanTfPlanExt
    }
}