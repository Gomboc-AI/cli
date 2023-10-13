import crossFetch from 'cross-fetch'
// @ts-ignore
import { ApolloClient, InMemoryCache } from "@apollo/client/core/core.cjs"
// @ts-ignore
import { HttpLink } from "@apollo/client/link/http/http.cjs";
// @ts-ignore
import { setContext } from '@apollo/client/link/context/context.cjs'

import { CLI_VERSION } from '../cli/version.js';
import { consoleDebugger } from '../utils/ConsoleDebugger.js';
import { Effect, LighthouseQuery, MutationRemediateRemoteTfHcl2Args, RemediateRemoteTfHcl2Mutation } from './gql/graphql.js';

import { LighthouseQuery as LighthouseQuerySelection } from './queries/lighthouse.js';
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