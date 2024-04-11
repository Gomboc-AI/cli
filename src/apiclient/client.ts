import crossFetch from 'cross-fetch'
// @ts-ignore
import { ApolloClient, InMemoryCache } from "@apollo/client/core/core.cjs"
// @ts-ignore
import { HttpLink } from "@apollo/client/link/http/http.cjs";
// @ts-ignore
import { setContext } from '@apollo/client/link/context/context.cjs'

import { CLI_VERSION } from '../cli/version.js';
import { Effect, ScanBranchActionResultsQuery, ScanBranchActionResultsQueryVariables, ScanBranchStatusQuery, ScanRemoteTfHcl2Mutation, ScanRemoteTfHcl2MutationVariables } from './gql/graphql.js';

import { RemediateRemoteTfHCL2Mutation as RemediateRemoteTfHCL2MutationSelection } from './mutations/remediateRemoteTfHCL2.js';
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

    async scanRemoteTfHCL2MutationCall(workingDirectories: string[], effect: Effect): Promise<ScanRemoteTfHcl2Mutation> {
        const { data } : { data: ScanRemoteTfHcl2Mutation} = await this.client.mutate<ScanRemoteTfHcl2Mutation, ScanRemoteTfHcl2MutationVariables>({
            mutation: RemediateRemoteTfHCL2MutationSelection,
            variables: {
                input: {
                    workingDirectories,
                    effect,
                }
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
    async scanBranchActionResultsQueryCall(scanRequestId: string, pageSize: number): Promise<ScanBranchActionResultsQuery> {
        const { data } : { data: ScanBranchActionResultsQuery} = await this.client.query<ScanBranchActionResultsQuery, ScanBranchActionResultsQueryVariables>({
            query: ScanBranchActionResultsQuerySelection,
            variables: {
                scanRequestId,
                pageSize,
            }
        })
        return data
    }
}
