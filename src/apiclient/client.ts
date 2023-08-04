import crossFetch from 'cross-fetch'
// @ts-ignore
import { ApolloClient, InMemoryCache } from "@apollo/client/core/core.cjs"
// @ts-ignore
import { HttpLink } from "@apollo/client/link/http/http.cjs";
// @ts-ignore
import { setContext } from '@apollo/client/link/context/context.cjs'
import { Effect, GitHubOptions, GitLabOptions, ScanPolicy, TemplatePayload } from './__generated__/GlobalTypes.js'
import { ScanTfPlanExt, ScanTfPlanExtVariables, ScanTfPlanExt_scanTfPlanExt } from "./__generated__/ScanTfPlanExt.js";
import { ScanCfnTemplateExt, ScanCfnTemplateExtVariables, ScanCfnTemplateExt_scanCfnTemplateExt } from "./__generated__/ScanCfnTemplateExt.js";
import { ScanCfnTemplateExtQuery } from './scanCfnTemplateExt.js'
import { ScanTfPlanExtQuery } from './scanTfPlanExt.js'

import { CLI_VERSION } from '../cli/version.js';
import { Lighthouse, Lighthouse_lighthouse } from './__generated__/Lighthouse.js';
import { LighthouseQuery } from './lighthouse.js';
import { RemediateRemoteTfHCL2, RemediateRemoteTfHCL2Variables, RemediateRemoteTfHCL2_remediateRemoteTfHCL2 } from './__generated__/RemediateRemoteTfHCL2.js';
import { RemediateRemoteTfHCL2Mutation } from './remediateRemoteTfHCL2.js';
import { consoleDebugger } from '../utils/ConsoleDebugger.js';

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
        consoleDebugger.log('scanCfnTemplateExtQueryCall', data)
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
        consoleDebugger.log('scanTfPlanExtQueryCall', data)
        return data.scanTfPlanExt
    }

    async remediateRemoteTfHCL2MutationCall(workingDirectory: string, effect: Effect, accessToken: string ): Promise<RemediateRemoteTfHCL2_remediateRemoteTfHCL2> {
        const variables: RemediateRemoteTfHCL2Variables = {
            workingDirectory,
            effect,
            accessToken
        }
        const { data } : { data: RemediateRemoteTfHCL2} = await this.client.mutate<RemediateRemoteTfHCL2, RemediateRemoteTfHCL2Variables>({
            mutation: RemediateRemoteTfHCL2Mutation,
            variables
        })
        consoleDebugger.log('remediateRemoteTfHCL2MutationCall', data)
        return data.remediateRemoteTfHCL2
    }
}