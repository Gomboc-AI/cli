import crossFetch from 'cross-fetch'
// @ts-ignore
import { ApolloClient, InMemoryCache } from "@apollo/client/core/core.cjs"
// @ts-ignore
import { HttpLink } from "@apollo/client/link/http/http.cjs";
// @ts-ignore
import { setContext } from '@apollo/client/link/context/context.cjs'

import { CLI_VERSION } from '../cli/version.js';
import { consoleDebugger } from '../utils/ConsoleDebugger.js';
import { Effect, GitHubOptions, GitLabOptions, LighthouseQuery, MutationRemediateRemoteTfHcl2Args, QueryScanCfnTemplateExtArgs, QueryScanTfPlanExtArgs, RemediateRemoteTfHcl2Document, RemediateRemoteTfHcl2Mutation, ScanCfnTemplateExtQuery, ScanPolicy, ScanTfPlanExtQuery, TemplatePayload } from './gql/graphql.js';

import { LighthouseQuery as LighthouseQuerySelection } from './queries/lighthouse.js';
import { ScanCfnTemplateExtQuery as ScanCfnTemplateExtQuerySelection } from './queries/scanCfnTemplateExt.js';
import { ScanTfPlanExtQuery as ScanTfPlanExtQuerySelection } from './queries/scanTfPlanExt.js';
import { RemediateRemoteTfHCL2Mutation as RemediateRemoteTfHCL2MutationSelection } from './mutations/remediateRemoteTfHCL2.js';

export class Client {
    url: string
    authToken?: string
    client: ApolloClient

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

    async lighthouseQueryCall(): Promise<LighthouseQuery> {
        const { data }: { data: LighthouseQuery } = await this.client.query<LighthouseQuery>({
            query: LighthouseQuerySelection
        })
        consoleDebugger.log('lighthouseQueryCall', data)
        return data
    }

    async scanCfnTemplateExtQueryCall(templates: TemplatePayload[], policy: ScanPolicy, gitHubOptions?: GitHubOptions, gitLabOptions?: GitLabOptions, secretAccessKey?: string): Promise<ScanCfnTemplateExtQuery> {
        const variables: QueryScanCfnTemplateExtArgs = {
            templates,
            policy,
            gitHubOptions,
            gitLabOptions,
            secretAccessKey
        }
        const { data } : { data: ScanCfnTemplateExtQuery } = await this.client.query<ScanCfnTemplateExtQuery, QueryScanCfnTemplateExtArgs>({
            query: ScanCfnTemplateExtQuerySelection,
            variables
        })
        consoleDebugger.log('scanCfnTemplateExtQueryCall', data)
        return data
    }

    async scanTfPlanExtQueryCall(plan: string, workingDirectory: string, tfWorkingDirectory: string, policy: ScanPolicy, gitHubOptions?: GitHubOptions, gitLabOptions?: GitLabOptions, secretAccessKey?: string): Promise<ScanTfPlanExtQuery> {
        const variables: QueryScanTfPlanExtArgs = {
            plan,
            workingDirectory,
            tfWorkingDirectory,
            policy,
            gitHubOptions,
            gitLabOptions,
            secretAccessKey
        }
        const { data } : { data: ScanTfPlanExtQuery} = await this.client.query<ScanTfPlanExtQuery, QueryScanTfPlanExtArgs>({
            query: ScanTfPlanExtQuerySelection,
            variables
        })
        consoleDebugger.log('scanTfPlanExtQueryCall', data)
        return data
    }

    async remediateRemoteTfHCL2MutationCall(workingDirectory: string, effect: Effect, accessToken: string ): Promise<RemediateRemoteTfHcl2Mutation> {
        const variables: MutationRemediateRemoteTfHcl2Args = {
            workingDirectory,
            effect,
            accessToken
        }
        const { data } : { data: RemediateRemoteTfHcl2Mutation } = await this.client.mutate<RemediateRemoteTfHcl2Mutation, MutationRemediateRemoteTfHcl2Args>({
            mutation: RemediateRemoteTfHCL2MutationSelection,
            variables
        })
        consoleDebugger.log('remediateRemoteTfHCL2MutationCall', data)
        return data
    }
}