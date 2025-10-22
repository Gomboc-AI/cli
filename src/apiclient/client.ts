import crossFetch from 'cross-fetch'
// @ts-ignore
import { ApolloClient, InMemoryCache, NormalizedCacheObject, HttpLink } from '@apollo/client';
// @ts-ignore
import { setContext } from '@apollo/client/link/context/context.cjs'

import { CLI_VERSION } from '../cli/version';
import {
  Effect,
  InfrastructureTool,
  ScanOnPullRequestMutation,
  ScanOnPullRequestMutationVariables,
  ScanOnScheduleMutation,
  ScanOnScheduleMutationVariables,
  ScanRequestScansQuery,
  ScanRequestScansQueryVariables,
  ScanRequestStatus,
  ScanRequestStatusQuery,
  ScanRequestStatusQueryVariables,
  ScanResult
} from './gql/graphql';

import { scanOnPullRequest } from './mutations/scanOnPullRequest';
import { scanOnSchedule } from './mutations/scanOnSchedule';

import { consoleDebugger } from '../utils/ConsoleDebugger';
import { settings } from '../settings';
import { ExitCode } from '../cli/exitCodes';
import { ConsoleLogger } from '../utils/ConsoleLogger';
import { scanRequestStatusQuery } from './queries/scanRequest';
import { scanRequestScansQuery } from './queries/scanRequestScans';

type ScanResultWithoutObservations = Omit<ScanResult, 'observations'>
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
  client: ApolloClient<NormalizedCacheObject>

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
    consoleDebugger.log(`${functionName} -- input`, JSON.stringify(inputs))
  }

  async scanOnScheduleMutationCall(args: {
    directory: string,
    recurse: boolean,
    effect: Effect,
    iacTools: InfrastructureTool[],
    format?: boolean,
    _attempts?: number
  }): Promise<ScanOnScheduleMutation> {
    const { directory, effect, iacTools, recurse, _attempts = 1, format=false } = args

    this._listAllInputs('scanOnScheduleMutationCall', args)

    try {
      const { data }= await this.client.mutate<ScanOnScheduleMutation, ScanOnScheduleMutationVariables>({
        mutation: scanOnSchedule,
        variables: {
          input: {
            directory,
            recurse,
            effect,
            iacTools,
            autoFormat:format
          }
        }
      })
      
      if (data == null || data.scanOnSchedule.errors.length > 0) {
        consoleDebugger.log('Failed to remediate request', JSON.stringify(data))
        throw new ClientError('Scan request was rejected by the server.', ExitCode.SERVER_ERROR)
      }

      consoleDebugger.log(`scanOnScheduleMutationCall -- success on attempt #${_attempts}:`, JSON.stringify(data))

      return data
    } catch (e: any) {
      consoleDebugger.log(`scanOnScheduleMutationCall -- error on attempt #${_attempts}:`, JSON.stringify(e))

      const RETRY_ATTEMPTS = 3
      const RETRY_DELAY_MILLISECONDS = 5000

      if (_attempts > RETRY_ATTEMPTS) {
        throw new ClientError(`${e.message}`, ExitCode.SERVER_ERROR)
      }

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
    iacTools: InfrastructureTool[],
    format?: boolean
    _attempts?: number
  }): Promise<ScanOnPullRequestMutation> {
    const { scenarioPaths, effect, iacTools, pullRequestIdentifier, _attempts = 1, format = false } = args

    this._listAllInputs('scanOnPullRequestMutationCall', args)

    try {
      const {data}  = await this.client.mutate<ScanOnPullRequestMutation, ScanOnPullRequestMutationVariables>({
        mutation: scanOnPullRequest,
        variables: {
          input: {
            scenarioPaths,
            pullRequestIdentifier,
            effect,
            iacTools,
            autoFormat:format
          }
        }
      })

      if (data == null || data.scanOnPullRequest.errors.length > 0) {
        consoleDebugger.log('Failed to remediate request', JSON.stringify(data))
        throw new ClientError('Scan request was rejected by the server.', ExitCode.SERVER_ERROR)
      }

      consoleDebugger.log(`scanOnPullRequestMutationCall -- success on attempt #${_attempts}:`, JSON.stringify(data))

      // Mutation needs to be updated to make this nullable
      if (data.scanOnPullRequest.scanRequestId == null) {
        cl.err(ExitCode.SERVER_ERROR, 'Scan request was rejected by the server. Make sure that you have defined a security policy and that this repository has been linked to a project\n')
        cl.log(`Aborting...\n`)
        throw new ClientError('Scan request was rejected by the server.', ExitCode.SERVER_ERROR)
      }
      return data
    } catch (e: any) {
      consoleDebugger.log(`scanOnPullRequestMutationCall -- error on attempt #${_attempts}:`, JSON.stringify(e))

      const RETRY_ATTEMPTS = 3
      const RETRY_DELAY_MILLISECONDS = 5000

      if (_attempts > RETRY_ATTEMPTS) {
        throw new ClientError('Please ensure the repository has been linked within the portal. If the issue persists please attempt the request later.',
          ExitCode.SERVER_ERROR)
      }

      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MILLISECONDS))

      return await this.scanOnPullRequestMutationCall({
        ...args,
        _attempts: _attempts + 1,
      })
    }
  }

  private async _getScanResults(scanRequestId: string): Promise<ScanResultWithoutObservations[]> {
    const PAGE_SIZE = 20
    const { data } = await this.client.query<ScanRequestScansQuery, ScanRequestScansQueryVariables>({
      query: scanRequestScansQuery,
      variables: {
        scanRequestId,
        page:1,
        size:PAGE_SIZE,
      },
      fetchPolicy: 'no-cache'
    })
    const scanRequest = data.scanRequest
    const typename = scanRequest.__typename
    if(typename === 'FailedScan'){
      throw new ClientError(`${scanRequest.message} (Scan ID: ${scanRequest.id})`, ExitCode.BUSINESS_ERROR)
    }else if(typename === 'GombocError'){
      throw new ClientError(scanRequest.message, ExitCode.SERVER_ERROR)
    }
    
    return scanRequest.scanResults.results
  }

  private async _isScanAvailable(scanRequestId: string){
    const { data }= await this.client.query<ScanRequestStatusQuery, ScanRequestStatusQueryVariables>({
      query: scanRequestStatusQuery,
      variables: {
        scanRequestId,
      },
      fetchPolicy: 'no-cache'
    })

    if(data.scanRequest.__typename === "FailedScan"){
      throw new ClientError(`${data.scanRequest.message} (Scan ID: ${data.scanRequest.id})`, ExitCode.BUSINESS_ERROR)
    }
    if (data.scanRequest.__typename === 'GombocError') {
      throw new ClientError(data.scanRequest.message, ExitCode.SERVER_ERROR)
    }
    return data.scanRequest.status !== ScanRequestStatus.Running
  }

  public async pollScanStatus(scanRequestId: string): Promise<Record<keyof typeof InfrastructureTool, ScanResultWithoutObservations[]>> {
    cl._log(`Scan request accepted by server: ${settings.SERVER_URL} \n`)

    // Temporal naive implementation of a polling mechanism. Will be replaced by a GraphQL subscription
    // In the grand scheme of CI/CD pipeline times, this is not terrible
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    // Start polling mechanism
    const INITIAL_INTERVAL = 60 * 1000 // wait 1 minute before first poll
    const POLLING_INTERVAL = 60 * 1000 // check once a minute
    const TIMEOUT_LIMIT = 60 * 60 * 1000 // timeout after 1 hour

    // Initial call to check the status of the scan
    let attempts = 1

    let results: ScanResultWithoutObservations[] = []
    cl.log('Retrieving scan status...')
    // While there are still children scans being processed
    do {
      let isScanAvailable = false
      try{
        isScanAvailable= await this._isScanAvailable(scanRequestId)
        if(isScanAvailable){
            results = await this._getScanResults(scanRequestId)
        }
      }catch(e){
        consoleDebugger.log('Failed polling:', { error:e })
        break;
      }
      if (isScanAvailable) { break }

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
      Cloudformation: results.filter(result=>result.infrastructureTool===InfrastructureTool.Cloudformation),
      Terraform: results.filter(result=>result.infrastructureTool===InfrastructureTool.Terraform)
    }
  }
}
