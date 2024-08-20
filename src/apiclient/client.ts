import crossFetch from 'cross-fetch'
// @ts-ignore
import { ApolloClient, InMemoryCache } from "@apollo/client/core/core.cjs"
// @ts-ignore
import { HttpLink } from "@apollo/client/link/http/http.cjs";
// @ts-ignore
import { setContext } from '@apollo/client/link/context/context.cjs'

import { CLI_VERSION } from '../cli/version.js';
import { Effect, InfrastructureTool, ScanBranchActionResultsQuery, ScanBranchActionResultsQueryVariables, ScanBranchStatusQuery, ScanRemoteMutation, ScanRemoteMutationVariables } from './gql/graphql.js';

import { ScanBranchStatusQuery as ScanBranchStatusQuerySelection } from './queries/scanBranchStatus.js';
import { ScanBranchActionResultsQuery as ScanBranchActionResultsQuerySelection } from './queries/scanBranchActionResults.js';
import { ScanRemoteMutation as ScanRemoteMutationSelection } from './mutations/scanRemote.js';

import { consoleDebugger } from '../utils/ConsoleDebugger.js';

type AzdoOptions = {
    azdoBaseUrl: string,
    azdoOrganizationName: string
}

export class Client {
    url: string
    iacTool: InfrastructureTool;
    authToken?: string
    client: ApolloClient

    constructor(url: string, iacTool: InfrastructureTool, authToken?: string, azdoOptions?: AzdoOptions) {
        this.url = url
        this.iacTool = iacTool
        this.authToken = authToken
        const httpLink = new HttpLink({ uri: this.url, fetch: crossFetch })
        const authLink = setContext((_: any, { headers }: any) => {
            headers = {
                'X-GOMBOC-CLI-VERSION': CLI_VERSION,
                'X-GOMBOC-RUNNER-PATH': process.env._,
                ...headers
            }
            if (azdoOptions != null) {
                Object.assign(headers, {
                    'X-AZDO-ORGANIZATION-NAME': azdoOptions.azdoOrganizationName,
                    'X-AZDO-BASE-URL': azdoOptions.azdoBaseUrl
                })
            }
            if (this.authToken != null) {
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

    async scanRemoteMutationCall(workingDirectories: string[], effect: Effect): Promise<ScanRemoteMutation> {
        consoleDebugger.log('scanRemoteMutationCall -- workingDirectories: ', workingDirectories)
        consoleDebugger.log('scanRemoteMutationCall -- effect: ', effect)
        const { data }: { data: ScanRemoteMutation } = await this.client.mutate<ScanRemoteMutation, ScanRemoteMutationVariables>({
            mutation: ScanRemoteMutationSelection,
            variables: {
                input: {
                    workingDirectories,
                    effect,
                    iacTool: this.iacTool
                }
            }
        })
        consoleDebugger.log('scanRemoteMutationCall -- data: ', JSON.stringify(data))
        return data

    }

    async scanBranchStatusQueryCall(scanRequestId: string): Promise<ScanBranchStatusQuery> {
        consoleDebugger.log('scanRemoteMutationCall -- scanRequestId:', scanRequestId)
        const { data }: { data: ScanBranchStatusQuery } = await this.client.query<ScanBranchStatusQuery, ScanBranchStatusQuery>({
            query: ScanBranchStatusQuerySelection,
            variables: {
                scanRequestId,
            },
            fetchPolicy: 'no-cache'
        })
        consoleDebugger.log('scanRemoteMutationCall -- data:', JSON.stringify(data))
        return data
    }

    async scanBranchActionResultsQueryCall(scanRequestId: string, pageSize: number): Promise<ScanBranchActionResultsQuery> {
        consoleDebugger.log('scanBranchActionResultsQueryCall -- scanRequestId:', scanRequestId)
        consoleDebugger.log('scanBranchActionResultsQueryCall -- pageSize:', pageSize)
        const { data }: { data: ScanBranchActionResultsQuery } = await this.client.query<ScanBranchActionResultsQuery, ScanBranchActionResultsQueryVariables>({
            query: ScanBranchActionResultsQuerySelection,
            variables: {
                scanRequestId,
                pageSize,
            }
        })
        consoleDebugger.log('scanBranchActionResultsQueryCall -- data:', JSON.stringify(data))
        return data
    }
}
