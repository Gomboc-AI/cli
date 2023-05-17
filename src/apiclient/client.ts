// @ts-ignore
import { ApolloClient, InMemoryCache } from "@apollo/client/core/core.cjs"
// @ts-ignore
import { HttpLink } from "@apollo/client/link/http/http.cjs";
// @ts-ignore
import { setContext } from '@apollo/client/link/context/context.cjs'
import { GitHubOptions, GitLabOptions, ScanPolicy, TemplatePayload } from './__generated__/GlobalTypes.js'
import { ScanTfPlan, ScanTfPlanVariables, ScanTfPlan_scanTfPlanExt } from "./__generated__/ScanTfPlan.js";
import { ScanCfnTemplates, ScanCfnTemplatesVariables, ScanCfnTemplates_scanCfnTemplateExt } from "./__generated__/ScanCfnTemplates.js";
import { scanCfnQuery } from './scanCloudformationTemplates.js'
import { scanTfQuery } from './scanTerraformPlan.js'

import crossFetch from 'cross-fetch'

export class Client {
    url: string
    idToken?: string

    constructor(url: string, idToken?: string) {
        this.url = url
        this.idToken = idToken
    }

    async scanCfnTemplates(templatePayloads: TemplatePayload[], policy: ScanPolicy, gitHubOptions?: GitHubOptions, gitLabOptions?: GitLabOptions, secretAccessKey?: string): Promise<ScanCfnTemplates_scanCfnTemplateExt> {
        const httpLink = new HttpLink({ uri: this.url, fetch: crossFetch })
        const authLink = setContext((_: any, { headers }: any) => {
            if(this.idToken == null) {
                return { headers: headers }
            }
            return {
                headers: {
                ...headers,
                authorization: `Bearer ${this.idToken}`
                }
            }
        })

        const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache()
        })
        const scanVariables: ScanCfnTemplatesVariables = {
            templates: templatePayloads,
            policy: policy,
            gitHubOptions: gitHubOptions,
            gitLabOptions: gitLabOptions,
            secretAccessKey: secretAccessKey
        }
        const { data } : { data: ScanCfnTemplates} = await client.query<ScanCfnTemplates, ScanCfnTemplatesVariables>({
            query: scanCfnQuery,
            variables: scanVariables
        })
        return data.scanCfnTemplateExt
    }

    async scanTfPlan(plan: string, workingDirectory: string, policy: ScanPolicy, gitHubOptions?: GitHubOptions, gitLabOptions?: GitLabOptions): Promise<ScanTfPlan_scanTfPlanExt> {
        const httpLink = new HttpLink({ uri: this.url, fetch: crossFetch })
        const authLink = setContext((_: any, { headers }: any) => {
            return {
                headers: {
                ...headers,
                authorization: `Bearer ${this.idToken}`
                }
            }
        })

        const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache()
        })
        const scanVariables: ScanTfPlanVariables = {
            plan: plan,
            workingDirectory: workingDirectory,
            policy: policy,
            gitHubOptions: gitHubOptions,
            gitLabOptions: gitLabOptions
        }
        const { data } : { data: ScanTfPlan} = await client.query<ScanTfPlan, ScanTfPlanVariables>({
            query: scanTfQuery,
            variables: scanVariables
        })
        return data.scanTfPlanExt
    }
}