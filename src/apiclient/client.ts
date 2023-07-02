import crossFetch from 'cross-fetch'
// @ts-ignore
import { ApolloClient, InMemoryCache } from "@apollo/client/core/core.cjs"
// @ts-ignore
import { HttpLink } from "@apollo/client/link/http/http.cjs";
// @ts-ignore
import { setContext } from '@apollo/client/link/context/context.cjs'
import { Action, GitHubOptions, GitLabOptions, ScanPolicy, TemplatePayload } from './__generated__/GlobalTypes.js'
import { ScanTfPlanExt, ScanTfPlanExtVariables, ScanTfPlanExt_scanTfPlanExt } from "./__generated__/ScanTfPlanExt.js";
import { ScanCfnTemplateExt, ScanCfnTemplateExtVariables, ScanCfnTemplateExt_scanCfnTemplateExt } from "./__generated__/ScanCfnTemplateExt.js";
import { ScanCfnTemplateExtQuery } from './scanCfnTemplateExt.js'
import { ScanTfPlanExtQuery } from './scanTfPlanExt.js'
import { RemediateRemoteTfCodeQuery } from './remediateRemoteTfCode.js'

import { CLI_VERSION } from '../cli/version.js';
import { Lighthouse, Lighthouse_lighthouse } from './__generated__/Lighthouse.js';
import { LighthouseQuery } from './lighthouse.js';
import { RemediateRemoteTfCode, RemediateRemoteTfCodeVariables, RemediateRemoteTfCode_remediateRemoteTfCode } from './__generated__/RemediateRemoteTfCode.js';

export class Client {
    url: string
    authToken?: string
    client: ApolloClient<any>

    constructor(url: string, authToken?: string) {
        this.url = url
        this.authToken = authToken
        const httpLink = new HttpLink({ uri: this.url, fetch: crossFetch })
        const authLink = setContext((_: any, { headers }: any) => {
            headers = {
                'X-GOMBOC-CLI-VERSION': CLI_VERSION,
                'X-GOMBOC-RUNNER-PATH': process.env._,
                ...headers
            }
            if(this.authToken != null) {
                headers = {
                    'Authorization': `Bearer ${this.authToken}`,
                    ...headers
                }
            }
            return { headers: headers }
        })

        this.client = new ApolloClient({
            link: authLink.concat(httpLink),
            cache: new InMemoryCache()
        })
    }

    async lighthouseQueryCall(): Promise<Lighthouse_lighthouse[]> {
        // Returns a list of lighthouse messages
        const { data } : { data: Lighthouse} = await this.client.query<Lighthouse>({
            query: LighthouseQuery
        })
        return data.lighthouse
    }

    async scanCfnTemplateExtQueryCall(templates: TemplatePayload[], policy: ScanPolicy, gitHubOptions?: GitHubOptions, gitLabOptions?: GitLabOptions, secretAccessKey?: string): Promise<ScanCfnTemplateExt_scanCfnTemplateExt> {
        const variables: ScanCfnTemplateExtVariables = {
            templates,
            policy,
            gitHubOptions,
            gitLabOptions,
            secretAccessKey
        }
        const { data } : { data: ScanCfnTemplateExt} = await this.client.query<ScanCfnTemplateExt, ScanCfnTemplateExtVariables>({
            query: ScanCfnTemplateExtQuery,
            variables
        })
        return data.scanCfnTemplateExt
    }

    async scanTfPlanExtQueryCall(plan: string, workingDirectory: string, tfWorkingDirectory: string, policy: ScanPolicy, gitHubOptions?: GitHubOptions, gitLabOptions?: GitLabOptions, secretAccessKey?: string): Promise<ScanTfPlanExt_scanTfPlanExt> {
        const variables: ScanTfPlanExtVariables = {
            plan,
            workingDirectory,
            tfWorkingDirectory,
            policy,
            gitHubOptions,
            gitLabOptions,
            secretAccessKey
        }
        const { data } : { data: ScanTfPlanExt} = await this.client.query<ScanTfPlanExt, ScanTfPlanExtVariables>({
            query: ScanTfPlanExtQuery,
            variables
        })
        return data.scanTfPlanExt
    }

    async remediateRemoteTfCodeQueryCall(workingDirectory: string, policy: ScanPolicy, action: Action, accessToken: string ): Promise<RemediateRemoteTfCode_remediateRemoteTfCode> {
        const variables: RemediateRemoteTfCodeVariables = {
            workingDirectory,
            policy,
            action,
            accessToken
        }
        console.log(variables)
        const { data } : { data: RemediateRemoteTfCode} = await this.client.query<RemediateRemoteTfCode, RemediateRemoteTfCodeVariables>({
            query: RemediateRemoteTfCodeQuery,
            variables
        })
        return data.remediateRemoteTfCode
    }
}