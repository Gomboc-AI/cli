import crossFetch from 'cross-fetch'
// @ts-ignore
import { ApolloClient, InMemoryCache, NormalizedCacheObject, HttpLink, ApolloQueryResult } from '@apollo/client';
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
  ScmRunnerScanQuery,
  ScmRunnerScanQueryVariables,
  ScmRunnerScanStatus,
  ScmRunnerScanLogLevel,
} from './gql/graphql';

import { scanOnPullRequest } from './mutations/scanOnPullRequest';
import { scanOnSchedule } from './mutations/scanOnSchedule';
import { scmRunnerScanQuery } from './queries/scmRunnerScan';

import { consoleDebugger } from '../utils/ConsoleDebugger';
import { settings } from '../settings';
import { ExitCode } from '../cli/exitCodes';
import { ConsoleLogger } from '../utils/ConsoleLogger';

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
      const { data } = await this.client.mutate<ScanOnScheduleMutation, ScanOnScheduleMutationVariables>({
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
    } catch (e) {
      consoleDebugger.log(`scanOnScheduleMutationCall -- error on attempt #${_attempts}:`, JSON.stringify(e))

      const RETRY_ATTEMPTS = 3
      const RETRY_DELAY_MILLISECONDS = 5000

      if (_attempts > RETRY_ATTEMPTS) {
        const message = e instanceof Error ? e.message : 'An unexpected error occurred'
        throw new ClientError(message, ExitCode.SERVER_ERROR)
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
      const { data }  = await this.client.mutate<ScanOnPullRequestMutation, ScanOnPullRequestMutationVariables>({
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
    } catch (e) {
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

  public async getScmRunnerScan(args: { scmRunnerScanId: string }): Promise<ScmRunnerScanStatus> {
    cl._log(`Request accepted by server: ${settings.SERVER_URL}\n`)
    const { scmRunnerScanId } = args

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

    const POLLING_INTERVAL = 10 * 1000 // check every 10 seconds
    const TIMEOUT_LIMIT = 60 * 60 * 1000 // timeout after 1 hour

    let attempts = 0
    let lastLogTimestamp: string | undefined = undefined

    cl.log('Retrieving scan status...')

    // eslint-disable-next-line no-constant-condition
    while (true) {
      try {
        consoleDebugger.log(`Polling scan (attempt #${attempts})`, { scmRunnerScanId, lastLogTimestamp })

        const result: ApolloQueryResult<ScmRunnerScanQuery> = await this.client.query<ScmRunnerScanQuery, ScmRunnerScanQueryVariables>({
          query: scmRunnerScanQuery,
          variables: {
            scmRunnerScanInput: { id: scmRunnerScanId },
            scmRunnerScanLogsInput: { createdAfter: lastLogTimestamp },
          },
          fetchPolicy: 'no-cache',
        })

        const scmRunnerScan: ScmRunnerScanQuery['scmRunnerScan'] = result.data.scmRunnerScan

        if (scmRunnerScan.__typename === 'GombocError') {
          throw new ClientError(scmRunnerScan.message, ExitCode.SERVER_ERROR)
        }

        // Log any new logs received
        for (const log of scmRunnerScan.logs) {
          this._logScmRunnerScanLog(log.level, log.message)
          // Track the latest timestamp for the next poll
          if (!lastLogTimestamp || log.createdAt > lastLogTimestamp) {
            lastLogTimestamp = log.createdAt
          }
        }

        // Check if scan is complete
        if (scmRunnerScan.status !== ScmRunnerScanStatus.InProgress) {
          cl.log(`Scan completed with status: ${scmRunnerScan.status}${scmRunnerScan.status === ScmRunnerScanStatus.SucceededWithFixes ? `, fixes count: ${scmRunnerScan.fixesCount}` : ''}`)
          return scmRunnerScan.status
        }
      } catch (e) {
        if (e instanceof ClientError) {
          throw e
        }
        consoleDebugger.log('Failed polling', { error: e })
        throw new ClientError('Failed to poll scan status', ExitCode.SERVER_ERROR)
      }

      // Check for timeout
      const totalAwaitedTime = attempts * POLLING_INTERVAL
      if (totalAwaitedTime > TIMEOUT_LIMIT) {
        const timeoutMinutes = Math.floor(TIMEOUT_LIMIT / 60000)
        const errorMessage = `Scan timed out after ${timeoutMinutes} min. Please try again later`
        cl.err(ExitCode.SERVER_TIMEOUT_ERROR, errorMessage)
        throw new ClientError(errorMessage, ExitCode.SERVER_TIMEOUT_ERROR)
      }

      attempts++
      await sleep(POLLING_INTERVAL)
    }
  }

  private _logScmRunnerScanLog(level: ScmRunnerScanLogLevel, message: string): void {
    switch (level) {
      case ScmRunnerScanLogLevel.Critical:
      case ScmRunnerScanLogLevel.Error:
        cl.err(ExitCode.SERVER_ERROR, `[${level}] ${message}`)
        break
      case ScmRunnerScanLogLevel.Warning:
        cl.log(`[${level}] ${message}`)
        break
      case ScmRunnerScanLogLevel.Info:
        cl.log(`[${level}] ${message}`)
        break
      case ScmRunnerScanLogLevel.Debug:
        consoleDebugger.log(`[${level}]`, message)
        break
    }
  }
}
