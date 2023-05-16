// @ts-ignore
import { ApolloClient, InMemoryCache } from "@apollo/client/core/core.cjs"
// @ts-ignore
import { HttpLink } from "@apollo/client/link/http/http.cjs";
// @ts-ignore
import { setContext } from '@apollo/client/link/context/context.cjs'
import { GitHubOptions, GitLabOptions, ScanPolicy, TemplatePayload } from './__generated__/GlobalTypes.js'
import { Scan, ScanVariables, Scan_scanCfnTemplateExt } from "./__generated__/Scan";
import { scanCfnQuery } from './scanCloudformationTemplate.js'

import crossFetch from 'cross-fetch'

export class Client {
    url: string
    idToken?: string

    constructor(url: string, idToken?: string) {
        this.url = url
        this.idToken = idToken
    }

    async scanCfnTemplate(templatePayloads: TemplatePayload[], policy: ScanPolicy, gitHubOptions?: GitHubOptions, gitLabOptions?: GitLabOptions, secretAccessKey?: string): Promise<Scan_scanCfnTemplateExt> {
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
        const scanVariables: ScanVariables = {
            templates: templatePayloads,
            policy: policy,
            gitHubOptions: gitHubOptions,
            gitLabOptions: gitLabOptions,
            secretAccessKey: secretAccessKey
        }
        const { data } : { data: Scan} = await client.query<Scan, ScanVariables>({
            query: scanCfnQuery,
            variables: scanVariables
        })
        return data.scanCfnTemplateExt
    }
}