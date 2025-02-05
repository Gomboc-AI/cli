import crossFetch from 'cross-fetch'
// @ts-ignore
import { ApolloClient, InMemoryCache } from "@apollo/client/core/core.cjs"
// @ts-ignore
import { HttpLink } from "@apollo/client/link/http/http.cjs";
// @ts-ignore
import { setContext } from '@apollo/client/link/context/context.cjs'

import { CLI_VERSION } from '../cli/version.js';
import { Effect, InfrastructureTool, ScanBranch, ScanBranchActionResultsQuery, ScanBranchActionResultsQueryVariables, ScanBranchResponse, ScanBranchStatusQuery, ScanDirectory, ScanDirectoryActionResultsQuery, ScanDirectoryActionResultsQueryVariables, ScanDirectoryResponse, ScanDirectoryStatusQuery, ScanDirectoryStatusQueryVariables, ScanOnPullRequestMutation, ScanOnPullRequestMutationVariables, ScanOnScheduleMutation, ScanRemoteMutation, ScanRemoteMutationVariables } from './gql/graphql.js';

import { ScanBranchStatusQuery as ScanBranchStatusQuerySelection } from './queries/scanBranchStatus.js';
import { ScanBranchActionResultsQuery as ScanBranchActionResultsQuerySelection } from './queries/scanBranchActionResults.js';
import { scanOnPullRequest } from './mutations/scanOnPullRequest.js';

import { consoleDebugger } from '../utils/ConsoleDebugger.js';
import { ScanDirectoryActionResultsQuery as ScanDirectoryActionResultsQuerySelection } from './queries/scanDirectoryActionResults.js';
import { ScanDirectoryStatusQuery as ScanDirectoryStatusQuerySelection } from './queries/scanDirectoryStatus.js';
import { settings } from '../settings.js';
import { ExitCode } from '../cli/exitCodes.js';
import { ConsoleLogger } from '../utils/ConsoleLogger.js';

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
const POLICY_OBSERVATIONS_PAGE_SIZE = 10

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

  private async _pollTerraformScanStatus(scanRequestId: string): Promise<ScanBranchResponse | void> {
    try {
      const poll = await this.client.scanBranchStatusQueryCall(scanRequestId)
      if (poll.scanBranch.__typename === 'FailedScan') {
        throw new ClientError(`${poll.scanBranch.message} (Scan ID: ${poll.scanBranch.id})`, ExitCode.BUSINESS_ERROR)
      }
      if (poll.scanBranch.__typename === 'GombocError') {
        throw new ClientError(poll.scanBranch.message, ExitCode.SERVER_ERROR)
      }
      return poll.scanBranch as ScanBranch
    } catch (e: any) {
      throw new ClientError(e.message, ExitCode.SERVER_ERROR)
    }
  }

  private async _pollCloudformationScanStatus(scanRequestId: string): Promise<ScanDirectoryResponse | void> {
    try {
      const poll = await this.client.scanDirectoryStatusQueryCall(scanRequestId)
      if (poll.scanDirectory.__typename === 'FailedScan') {
        throw new ClientError(`${poll.scanDirectory.message} (Scan ID: ${poll.scanDirectory.id})`, ExitCode.BUSINESS_ERROR)
      }
      if (poll.scanDirectory.__typename === 'GombocError') {
        return
      }
      return poll.scanDirectory as ScanDirectory
    } catch (e: any) {
      throw new ClientError(e.message, ExitCode.SERVER_ERROR)
    }
  }

  public async pollScanStatus(scanRequestId: string, iacTools: InfrastructureTool[]) {
    const scanRequestUrl = `${settings.CLIENT_URL}/scan-requests/${scanRequestId}`
    cl._log(`Scan request accepted by server: ${scanRequestUrl} \n`)

    // Temporal naive implementation of a polling mechanism. Will be replaced by a GraphQL subscription
    // In the grand scheme of CI/CD pipeline times, this is not terrible
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    // Start polling mechanism
    const INITIAL_INTERVAL = 60 * 1000 // wait 1 minute before first poll
    const POLLING_INTERVAL = 60 * 1000 // check once a minute
    const TIMEOUT_LIMIT = 60 * 60 * 1000 // timeout after 1 hour

    // Initial call to check the status of the scan
    let scanStatusPollResult
    let attempts = 1

    let cloudformationResults: ScanDirectory | null = null
    let terraformResults: ScanBranch | null = null

    let pollTerraform = iacTools.includes(InfrastructureTool.Terraform)
    let pollCloudformation = iacTools.includes(InfrastructureTool.Cloudformation)

    cl.log('Retrieving scan status...')
    // While there are still children scans being processed
    do {
      if (pollTerraform) {
        scanStatusPollResult = await this._pollTerraformScanStatus(scanRequestId)
        if (scanStatusPollResult != null) {
          if (
            scanStatusPollResult?.__typename === 'ScanBranch' &&
            (scanStatusPollResult.childrenExpected == scanStatusPollResult.childrenCompleted + scanStatusPollResult.childrenError)
          ) {
            pollTerraform = false
            terraformResults = scanStatusPollResult
          }
        }
      }
      if (pollCloudformation) {
        scanStatusPollResult = await this._pollCloudformationScanStatus(scanRequestId)
        if (scanStatusPollResult != null) {
          if (
            scanStatusPollResult?.__typename === 'ScanDirectory' &&
            (scanStatusPollResult.childrenExpected == scanStatusPollResult.childrenCompleted + scanStatusPollResult.childrenError)
          ) {
            pollCloudformation = false
            cloudformationResults = scanStatusPollResult
          }
        }
      }

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
      await sleep(POLLING_INTERVAL)
      // eslint-disable-next-line no-constant-condition
    } while (true)

    return {
      cloudformationScans: cloudformationResults,
      terraformScans: terraformResults
    }
  }

  // This will call the query to check the status of a scan, and handle a server error and a failed scan error
  // We will get a single page of RELEVANT (i.e. with violations) policy observations to avoid overwhelming the user
  // Getting at least one of these is sufficient for the CLI to fail in signal of action required
  // If we get a full page, we'll print a little message saying there could be more.
  // In any case, we'll print out the url to the action result page with all the policy observations

  // This will call final query to get the action results of a scan, and handle a server error and a failed scan error

  public async getActionResults(scanRequestId: string, observationsPageSize: number = POLICY_OBSERVATIONS_PAGE_SIZE) {
    let terraformActionResult: ScanBranchActionResultsQuery | null = null
    let cloudformationActionResult: ScanDirectoryActionResultsQuery | null = null

    if (this.iacTools.includes(InfrastructureTool.Cloudformation)) {
      const cloudformationPoll = await this.scanDirectoryActionResultsQueryCall(scanRequestId, observationsPageSize)
      if (cloudformationPoll.scanDirectory.__typename === 'FailedScan') {
        throw new ClientError(`${cloudformationPoll.scanDirectory.message} (Scan ID: ${cloudformationPoll.scanDirectory.id})`, ExitCode.BUSINESS_ERROR)
      }
      if (cloudformationPoll.scanDirectory.__typename === 'GombocError') {
        throw new ClientError(`${cloudformationPoll.scanDirectory.message} (Code: ${cloudformationPoll.scanDirectory.code ?? 'Unknown'})`, ExitCode.SERVER_ERROR)
      }
      cloudformationActionResult = cloudformationPoll
    }

    if (this.iacTools.includes(InfrastructureTool.Terraform)) {
      const terraformPoll = await this.scanBranchActionResultsQueryCall(scanRequestId, observationsPageSize)
      if (terraformPoll.scanBranch.__typename === 'FailedScan') {
        throw new ClientError(`${terraformPoll.scanBranch.message} (Scan ID: ${terraformPoll.scanBranch.id})`, ExitCode.BUSINESS_ERROR)
      }
      if (terraformPoll.scanBranch.__typename === 'GombocError') {
        throw new ClientError(`${terraformPoll.scanBranch.message} (Code: ${terraformPoll.scanBranch.code ?? 'Unknown'})`, ExitCode.SERVER_ERROR)
      }
      terraformActionResult = terraformPoll
    }
    return {
      cloudformation: cloudformationActionResult?.scanDirectory,
      terraform: terraformActionResult?.scanBranch
    }
  }
}
