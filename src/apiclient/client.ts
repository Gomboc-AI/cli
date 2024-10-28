import crossFetch from 'cross-fetch'
// @ts-ignore
import { ApolloClient, InMemoryCache } from "@apollo/client/core/core.cjs"
// @ts-ignore
import { HttpLink } from "@apollo/client/link/http/http.cjs";
// @ts-ignore
import { setContext } from '@apollo/client/link/context/context.cjs'

import { CLI_VERSION } from '../cli/version.js';
import { Effect, InfrastructureTool, ScanBranchActionResultsQuery, ScanBranchActionResultsQueryVariables, ScanBranchStatusQuery, ScanDirectoryActionResultsQuery, ScanDirectoryActionResultsQueryVariables, ScanDirectoryStatusQuery, ScanDirectoryStatusQueryVariables, ScanRemoteMutation, ScanRemoteMutationVariables } from './gql/graphql.js';

import { ScanBranchStatusQuery as ScanBranchStatusQuerySelection } from './queries/scanBranchStatus.js';
import { ScanBranchActionResultsQuery as ScanBranchActionResultsQuerySelection } from './queries/scanBranchActionResults.js';
import { ScanRemoteMutation as ScanRemoteMutationSelection } from './mutations/scanRemote.js';

import { consoleDebugger } from '../utils/ConsoleDebugger.js';
import { ScanDirectoryActionResultsQuery as ScanDirectoryActionResultsQuerySelection } from './queries/scanDirectoryActionResults.js';
import { ScanDirectoryStatusQuery as ScanDirectoryStatusQuerySelection } from './queries/scanDirectoryStatus.js';
import { scan } from 'ramda';

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
        ...headers,
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

  async scanRemoteMutationCall(args: {
    targetDirectories: string[],
    effect: Effect,
    iacTool: InfrastructureTool,
    pullRequestIdentifier: string | null,
    _attempt?: number
  }): Promise<ScanRemoteMutation> {
    const { targetDirectories, effect, iacTool, pullRequestIdentifier, _attempt = 1 } = args

    consoleDebugger.log('scanRemoteMutationCall -- targetDirectories: ', targetDirectories)
    consoleDebugger.log('scanRemoteMutationCall -- effect: ', effect)
    consoleDebugger.log('scanRemoteMutationCall -- iacTool: ', iacTool)
    consoleDebugger.log('scanRemoteMutationCall -- prIdentifier: ', pullRequestIdentifier)
    consoleDebugger.log('scanRemoteMutationCall -- attempt: ', _attempt)

    try {
      const { data }: { data: ScanRemoteMutation } = await this.client.mutate<ScanRemoteMutation, ScanRemoteMutationVariables>({
        mutation: ScanRemoteMutationSelection,
        variables: {
          input: {
            workingDirectories: targetDirectories,
            effect,
            iacTool,
            pullRequestIdentifier,
          }
        }
      })
      consoleDebugger.log(`scanRemoteMutationCall -- success on attempt #${_attempt}:`, JSON.stringify(data))

      return data
    } catch (e) {
      consoleDebugger.log(`scanRemoteMutationCall -- error on attempt #${_attempt}:`, JSON.stringify(e))

      const RETRY_ATTEMPTS = 3
      const RETRY_DELAY_MILLISECONDS = 5000

      if (_attempt > RETRY_ATTEMPTS) throw e

      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MILLISECONDS))

      return await this.scanRemoteMutationCall({
        ...args,
        _attempt: _attempt + 1,
      })
    }
  }

  async scanBranchStatusQueryCall(scanRequestId: string): Promise<ScanBranchStatusQuery> {
      consoleDebugger.log('scanRemoteMutationCall -- scanRequestId:', scanRequestId)

      const { data }: { data: ScanBranchStatusQuery } = await this.client.query<ScanBranchStatusQuery, ScanBranchStatusQuery>({
        query: ScanBranchStatusQuerySelection,
        variables: {
          scanRequestId
        },
        fetchPolicy: 'no-cache'
      })

      consoleDebugger.log('scanRemoteMutationCall -- data:', JSON.stringify(data))

      return data
  }
  async scanDirectoryStatusQueryCall(scanRequestId: string): Promise<ScanDirectoryStatusQuery> {
    consoleDebugger.log('scanDirectoryStatusQueryCall -- scanRequestId:', scanRequestId)

    const { data }: { data: ScanDirectoryStatusQuery } = await this.client.query<ScanDirectoryStatusQuery, ScanDirectoryStatusQueryVariables>({
      query: ScanDirectoryStatusQuerySelection,
      variables: {
        scanRequestId
      },
      fetchPolicy: 'no-cache'
    })

    consoleDebugger.log('scanDirectoryStatusQueryCall -- data:', JSON.stringify(data))

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
  async scanDirectoryActionResultsQueryCall(scanRequestId: string, pageSize: number): Promise<ScanDirectoryActionResultsQuery> {
    const { data }: { data: ScanDirectoryActionResultsQuery } = await this.client.query<ScanDirectoryActionResultsQuery, ScanDirectoryActionResultsQueryVariables>({
      query: ScanDirectoryActionResultsQuerySelection,
      variables: {
        scanRequestId,
        pageSize,
      }
    })

    consoleDebugger.log('scanDirectoryActionResultsQueryCall -- data:', JSON.stringify(data))

    return data
  }
}
