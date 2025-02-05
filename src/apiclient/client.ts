import crossFetch from 'cross-fetch'
// @ts-ignore
import { ApolloClient, InMemoryCache } from "@apollo/client/core/core.cjs"
// @ts-ignore
import { HttpLink } from "@apollo/client/link/http/http.cjs";
// @ts-ignore
import { setContext } from '@apollo/client/link/context/context.cjs'

import { CLI_VERSION } from '../cli/version.js';
import { Effect, InfrastructureTool, ScanBranchActionResultsQuery, ScanBranchActionResultsQueryVariables, ScanBranchStatusQuery, ScanDirectoryActionResultsQuery, ScanDirectoryActionResultsQueryVariables, ScanDirectoryStatusQuery, ScanDirectoryStatusQueryVariables, ScanOnPullRequestMutation, ScanOnPullRequestMutationVariables, ScanOnScheduleMutation, ScanRemoteMutation, ScanRemoteMutationVariables } from './gql/graphql.js';

import { ScanBranchStatusQuery as ScanBranchStatusQuerySelection } from './queries/scanBranchStatus.js';
import { ScanBranchActionResultsQuery as ScanBranchActionResultsQuerySelection } from './queries/scanBranchActionResults.js';
import { scanOnPullRequest } from './mutations/scanOnPullRequest.js';

import { consoleDebugger } from '../utils/ConsoleDebugger.js';
import { ScanDirectoryActionResultsQuery as ScanDirectoryActionResultsQuerySelection } from './queries/scanDirectoryActionResults.js';
import { ScanDirectoryStatusQuery as ScanDirectoryStatusQuerySelection } from './queries/scanDirectoryStatus.js';
import { settings } from '../settings.js';

type AzdoOptions = {
  azdoBaseUrl: string,
  azdoOrganizationName: string
}

export class Client {
  iacTools: InfrastructureTool[];
  authToken?: string
  client: ApolloClient

  constructor(iacTools: InfrastructureTool[], authToken?: string, azdoOptions?: AzdoOptions) {
    this.iacTools = iacTools
    this.authToken = authToken
    const httpLink = new HttpLink({ uri: settings.SERVER_URL, fetch: crossFetch })
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

  private _listAllInputs(functionName: string, inputs: Record<string, any>): void {
    for (const input in inputs) {
      console.log(`${functionName} -- key: ${input}, value: ${inputs[input]}`)
    }
  }

  async scanOnScheduleMutationCall(args: {
    directory: string,
    recurse: boolean,
    effect: Effect,
    iacTools: InfrastructureTool[]
    _attempts?: number
  }): Promise<ScanOnScheduleMutation> {
    const { directory, effect, iacTools, recurse, _attempts = 1 } = args

    this._listAllInputs('scanOnScheduleMutationCall', args)

    try {
      const { data }: { data: ScanOnScheduleMutation } = await this.client.mutate<ScanOnPullRequestMutation, ScanOnPullRequestMutationVariables>({
        mutation: scanOnPullRequest,
        variables: {
          input: {
            directory,
            recurse,
            effect,
            iacTools
          }
        }
      })
      consoleDebugger.log(`scanOnScheduleMutationCall -- success on attempt #${_attempts}:`, JSON.stringify(data))

      return data
    } catch (e) {
      consoleDebugger.log(`scanOnScheduleMutationCall -- error on attempt #${_attempts}:`, JSON.stringify(e))

      const RETRY_ATTEMPTS = 3
      const RETRY_DELAY_MILLISECONDS = 5000

      if (_attempts > RETRY_ATTEMPTS) throw e

      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MILLISECONDS))

      return await this.scanOnScheduleMutationCall({
        ...args,
        _attempts: _attempts + 1,
      })
    }
  }

  async scanOnPullRequestMutationCall(args: {
    scenarioPaths: string[],
    pullRequestIdentifier: string,
    effect: Effect,
    iacTools: InfrastructureTool[]
    _attempts?: number
  }): Promise<ScanOnPullRequestMutation> {
    const { scenarioPaths, effect, iacTools, pullRequestIdentifier, _attempts = 1 } = args

    this._listAllInputs('scanOnPullRequestMutationCall', args)

    try {
      const { data }: { data: ScanOnPullRequestMutation } = await this.client.mutate<ScanOnPullRequestMutation, ScanOnPullRequestMutationVariables>({
        mutation: scanOnPullRequest,
        variables: {
          input: {
            scenarioPaths,
            pullRequestIdentifier,
            effect,
            iacTools
          }
        }
      })
      consoleDebugger.log(`scanOnPullRequestMutationCall -- success on attempt #${_attempts}:`, JSON.stringify(data))

      return data
    } catch (e) {
      consoleDebugger.log(`scanOnPullRequestMutationCall -- error on attempt #${_attempts}:`, JSON.stringify(e))

      const RETRY_ATTEMPTS = 3
      const RETRY_DELAY_MILLISECONDS = 5000

      if (_attempts > RETRY_ATTEMPTS) throw e

      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MILLISECONDS))

      return await this.scanOnPullRequestMutationCall({
        ...args,
        _attempts: _attempts + 1,
      })
    }
  }

  async scanBranchStatusQueryCall(scanRequestId: string): Promise<ScanBranchStatusQuery> {
    consoleDebugger.log('scanBranchStatusQueryCall -- scanRequestId:', scanRequestId)

    const { data }: { data: ScanBranchStatusQuery } = await this.client.query<ScanBranchStatusQuery, ScanBranchStatusQuery>({
      query: ScanBranchStatusQuerySelection,
      variables: {
        scanRequestId
      },
      fetchPolicy: 'no-cache'
    })

    consoleDebugger.log('scanBranchStatusQueryCall -- data:', JSON.stringify(data))

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
