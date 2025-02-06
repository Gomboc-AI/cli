import crossFetch from 'cross-fetch'
// @ts-ignore
import { ApolloClient, InMemoryCache } from "@apollo/client/core/core.cjs"
// @ts-ignore
import { HttpLink } from "@apollo/client/link/http/http.cjs";
// @ts-ignore
import { setContext } from '@apollo/client/link/context/context.cjs'

import { CLI_VERSION } from '../cli/version.js';
import {
  Effect,
  InfrastructureTool,
  ScanBranch,
  ScanBranchActionResultsQuery as ScanBranchActionResultsQueryType,
  ScanBranchActionResultsQueryVariables,
  ScanBranchStatusQuery,
  ScanBranchStatusQueryVariables,
  ScanDirectory,
  ScanDirectoryActionResultsQuery as ScanDirectoryActionResultsQueryType,
  ScanDirectoryActionResultsQueryVariables,
  ScanDirectoryStatusQuery,
  ScanDirectoryStatusQueryVariables,
  ScanOnPullRequestMutation,
  ScanOnPullRequestMutationVariables,
  ScanOnScheduleMutation,
  ScanOnScheduleMutationVariables
} from './gql/graphql.js';

import { ScanBranchStatusQuery as ScanBranchStatusQuerySelection } from './queries/scanBranchStatus.js';
import { scanOnPullRequest } from './mutations/scanOnPullRequest.js';
import { scanOnSchedule } from './mutations/scanOnSchedule.js';

import { consoleDebugger } from '../utils/ConsoleDebugger.js';
import { ScanDirectoryStatusQuery as ScanDirectoryStatusQuerySelection } from './queries/scanDirectoryStatus.js';
import { settings } from '../settings.js';
import { ExitCode } from '../cli/exitCodes.js';
import { ConsoleLogger } from '../utils/ConsoleLogger.js';
import { ScanBranchActionResultsQuery } from './queries/scanBranchActionResults.js';
import { ScanDirectoryActionResultsQuery } from './queries/scanDirectoryActionResults.js';

type AzdoOptions = {
  azdoBaseUrl: string,
  azdoOrganizationName: string
}

export class ClientError extends Error {
  private _code: ExitCode
  constructor(message: string, code: ExitCode) {
    super(message)
    this._code = code
  }
  get code() {
    return this._code
  }
}

const cl = new ConsoleLogger()
export const POLICY_OBSERVATIONS_PAGE_SIZE = 10

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
      const { data }: { data: ScanOnScheduleMutation } = await this.client.mutate<ScanOnScheduleMutation, ScanOnScheduleMutationVariables>({
        mutation: scanOnSchedule,
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

      // Mutation needs to be updated to make this nullable
      if (data.scanOnPullRequest.scanRequestId == null) {
        cl.err(ExitCode.SERVER_ERROR, 'Scan request was rejected by the server. Make sure that you have defined a security policy and that this repository has been linked to a project\n')
        cl.log(`Aborting...\n`)
        throw new ClientError('Scan request was rejected by the server.', ExitCode.SUCCESS)
      }
      return data
    } catch (e: any) {
      consoleDebugger.log(`scanOnPullRequestMutationCall -- error on attempt #${_attempts}:`, JSON.stringify(e))

      const RETRY_ATTEMPTS = 3
      const RETRY_DELAY_MILLISECONDS = 5000

      if (_attempts > RETRY_ATTEMPTS) {
        throw new ClientError(e?.message, e.code ?? ExitCode.SERVER_ERROR)
      }

      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MILLISECONDS))

      return await this.scanOnPullRequestMutationCall({
        ...args,
        _attempts: _attempts + 1,
      })
    }
  }

  private async _terraformScanIsAvailable(scanRequestId: string): Promise<boolean> {
    const { data: initialPoll }: { data: ScanBranchStatusQuery } = await this.client.query<ScanBranchStatusQuery, ScanBranchStatusQueryVariables>({
      query: ScanBranchStatusQuerySelection,
      variables: {
        scanRequestId
      },
      fetchPolicy: 'no-cache'
    })
    console.log('--- _terraformScanIsAvailable initialPoll', initialPoll)
    if (initialPoll.scanBranch.__typename === 'FailedScan') {
      throw new ClientError(`${initialPoll.scanBranch.message} (Scan ID: ${initialPoll.scanBranch.id})`, ExitCode.BUSINESS_ERROR)
    }
    if (initialPoll.scanBranch.__typename === 'GombocError') {
      return false
    }
    if (initialPoll.scanBranch.childrenExpected != initialPoll.scanBranch.childrenCompleted + initialPoll.scanBranch.childrenError) {
      throw new ClientError('Status reverted to NOT OK in final validation', ExitCode.SERVER_ERROR)
    }
    return true

  }

  private async _cloudformationScanIsAvailable(scanRequestId: string): Promise<boolean> {
    // Light query to check if we can query for additional data
    const { data: initialPoll }: { data: ScanDirectoryStatusQuery } = await this.client.query<ScanDirectoryStatusQuery, ScanDirectoryStatusQueryVariables>({
      query: ScanDirectoryStatusQuerySelection,
      variables: {
        scanRequestId
      },
      fetchPolicy: 'no-cache'
    })
    console.log('--- _cloudformationScanIsAvailable initialPoll', initialPoll)
    if (initialPoll.scanDirectory.__typename === 'FailedScan') {
      throw new ClientError(`${initialPoll.scanDirectory.message} (Scan ID: ${initialPoll.scanDirectory.id})`, ExitCode.BUSINESS_ERROR)
    }
    if (initialPoll.scanDirectory.__typename === 'GombocError') {
      return false
    }
    if (initialPoll.scanDirectory.childrenExpected != initialPoll.scanDirectory.childrenCompleted + initialPoll.scanDirectory.childrenError) {
      throw new ClientError('Status reverted to NOT OK in final validation', ExitCode.SERVER_ERROR)
    }
    return true

  }

  private async _getTerraformActionResult(scanRequestId: string): Promise<ScanBranch> {
    const { data }: { data: ScanBranchActionResultsQueryType } = await this.client.query<ScanBranchActionResultsQueryType, ScanBranchActionResultsQueryVariables>({
      query: ScanBranchActionResultsQuery,
      variables: {
        scanRequestId,
        size: POLICY_OBSERVATIONS_PAGE_SIZE
      },
      fetchPolicy: 'no-cache'
    })
    console.log('---_getTerraformActionResult', data)

    if (data.scanBranch.__typename === 'FailedScan') {
      throw new ClientError(`${data.scanBranch.message} (Scan ID: ${data.scanBranch.id})`, ExitCode.BUSINESS_ERROR)
    }
    if (data.scanBranch.__typename === 'GombocError') {
      throw new ClientError(data.scanBranch.message, ExitCode.SERVER_ERROR)
    }
    // fuck the codegen that we have for these types
    return data.scanBranch as ScanBranch
  }

  private async _getCloudformationActionResult(scanRequestId: string): Promise<ScanDirectory> {
    try {
      const { data }: { data: ScanDirectoryActionResultsQueryType } = await this.client.query<ScanDirectoryActionResultsQueryType, ScanDirectoryActionResultsQueryVariables>({
        query: ScanDirectoryActionResultsQuery,
        variables: {
          scanRequestId,
          size: POLICY_OBSERVATIONS_PAGE_SIZE
        },
        fetchPolicy: 'no-cache'
      })
      console.log('---_getCloudformationActionResult', data)
      if (data.scanDirectory.__typename === 'FailedScan') {
        throw new ClientError(`${data.scanDirectory.message} (Scan ID: ${data.scanDirectory.id})`, ExitCode.BUSINESS_ERROR)
      }
      if (data.scanDirectory.__typename === 'GombocError') {
        throw new ClientError(data.scanDirectory.message, ExitCode.SERVER_ERROR)
      }
      return data.scanDirectory as ScanDirectory
    } catch (e) {
      console.log('---e', e)
      throw e
    }
  }

  public async pollScanStatus(scanRequestId: string): Promise<Record<keyof typeof InfrastructureTool, ScanBranch | ScanDirectory | null>> {
    const scanRequestUrl = `${settings.CLIENT_URL}/scan-requests/${scanRequestId}`
    cl._log(`Scan request accepted by server: ${scanRequestUrl} \n`)

    // Temporal naive implementation of a polling mechanism. Will be replaced by a GraphQL subscription
    // In the grand scheme of CI/CD pipeline times, this is not terrible
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    // Start polling mechanism
    const INITIAL_INTERVAL = 60 * 100 // wait 1 minute before first poll
    const POLLING_INTERVAL = 60 * 100 // check once a minute
    const TIMEOUT_LIMIT = 60 * 60 * 1000 // timeout after 1 hour

    // Initial call to check the status of the scan
    let attempts = 1

    let cloudformationResults: ScanDirectory | null = null
    let terraformResults: ScanBranch | null = null

    let pollTerraform = this.iacTools.includes(InfrastructureTool.Terraform)
    let pollCloudformation = this.iacTools.includes(InfrastructureTool.Cloudformation)
    cl.log('Retrieving scan status...')
    // While there are still children scans being processed
    do {
      try {
        if (pollTerraform) {
          const hasTerraformScan = await this._terraformScanIsAvailable(scanRequestId)
          if (hasTerraformScan) {
            pollTerraform = false
            terraformResults = await this._getTerraformActionResult(scanRequestId)
          }
        }
      } catch (e) { /* empty */ }

      try {
        if (pollCloudformation) {
          const hasCloudFormationScan = await this._cloudformationScanIsAvailable(scanRequestId)
          if (hasCloudFormationScan) {
            pollCloudformation = false
            cloudformationResults = await this._getCloudformationActionResult(scanRequestId)
            console.log('---cloudformationResults', cloudformationResults)
          }
        }
      } catch (e) { /* empty */ }

      if (!pollTerraform && !pollCloudformation) { break }

      // Server is still working on the children scan
      const totalAwaitedTime = INITIAL_INTERVAL + attempts * POLLING_INTERVAL
      if (totalAwaitedTime > TIMEOUT_LIMIT) {
        const timeoutMinutes = Math.floor(TIMEOUT_LIMIT / 60000)
        const errorMessage = `Scan timed out after ${timeoutMinutes} min. Please try again later`
        cl.err(ExitCode.SERVER_TIMEOUT_ERROR, `Scan timed out after ${timeoutMinutes} min. Please try again later`)
        throw new ClientError(errorMessage, ExitCode.SERVER_TIMEOUT_ERROR)
      }

      attempts++
      console.log('---sleeping for', POLLING_INTERVAL)
      await sleep(POLLING_INTERVAL)
      // eslint-disable-next-line no-constant-condition
    } while (true)

    console.log('---returning cloudformationScans', cloudformationResults)
    console.log('---returning terraformResults', terraformResults)
    return {
      Cloudformation: cloudformationResults,
      Terraform: terraformResults
    }
  }
}
