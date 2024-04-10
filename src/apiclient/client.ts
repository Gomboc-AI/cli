import crossFetch from 'cross-fetch'
// @ts-ignore
import { ApolloClient, InMemoryCache } from "@apollo/client/core/core.cjs"
// @ts-ignore
import { HttpLink } from "@apollo/client/link/http/http.cjs";
// @ts-ignore
import { setContext } from '@apollo/client/link/context/context.cjs'

import { CLI_VERSION } from '../cli/version.js';
import { consoleDebugger } from '../utils/ConsoleDebugger.js';
import { Effect, MutationRemediateRemoteTfHcl2Args, RemediateRemoteTfHcl2Mutation, ScanBranchActionResultsQueryVariables, ScanBranchStatusQuery, ScanRemoteTfHcl2Mutation, ScanRemoteTfHcl2MutationVariables } from './gql/graphql.js';

import { RemediateRemoteTfHCL2Mutation as RemediateRemoteTfHCL2MutationSelection } from './mutations/remediateRemoteTfHCL2.js';
import { ScanRemoteTfHCL2Mutation as ScanRemoteTfHCL2MutationSelection } from './mutations/scanRemoteTfHCL2.js';
import { ScanBranchStatusQuery as ScanBranchStatusQuerySelection } from './queries/scanBranchStatus.js';
import { ScanBranchActionResultsQuery as ScanBranchActionResultsQuerySelection } from './queries/scanBranchActionResults.js';

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

    /**
     * @deprecated Remove in next version
     */
    async remediateRemoteTfHCL2MutationCall(workingDirectory: string, effect: Effect): Promise<RemediateRemoteTfHcl2Mutation> {
        const { data } : { data: RemediateRemoteTfHcl2Mutation } = await this.client.mutate<RemediateRemoteTfHcl2Mutation, MutationRemediateRemoteTfHcl2Args>({
            mutation: RemediateRemoteTfHCL2MutationSelection,
            variables: {
                workingDirectory,
                effect,
                accessToken: 'deprecated'
            }
        })
        consoleDebugger.log('remediateRemoteTfHCL2MutationCall', data)
        return data
    }

    async scanRemoteTfHCL2MutationCall(workingDirectory: string, effect: Effect): Promise<ScanRemoteTfHcl2Mutation> {
        const { data } : { data: ScanRemoteTfHcl2Mutation} = await this.client.mutate<ScanRemoteTfHcl2Mutation, ScanRemoteTfHcl2MutationVariables>({
            mutation: RemediateRemoteTfHCL2MutationSelection,
            variables: {
                workingDirectory,
                effect,
            }
        })
        return data
    }

    async scanBranchStatusQueryCall(scanRequestId: string): Promise<ScanBranchStatusQuery> {
        const { data } : { data: ScanBranchStatusQuery} = await this.client.query<ScanBranchStatusQuery, ScanBranchActionResultsQueryVariables>({
            query: ScanBranchStatusQuerySelection,
            variables: {
                scanRequestId,
            }
        })
        return data
    }
    async scanBranchActionResultsQueryCall(scanRequestId: string): Promise<ScanBranchStatusQuery> {
        const { data } : { data: ScanBranchStatusQuery} = await this.client.query<ScanBranchStatusQuery, ScanBranchActionResultsQueryVariables>({
            query: ScanBranchActionResultsQuerySelection,
            variables: {
                scanRequestId,
            }
        })
        return data
    }
}