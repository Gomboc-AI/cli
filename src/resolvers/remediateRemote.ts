import { Client } from '../apiclient/client.js'
import { ConsoleLogger } from '../utils/ConsoleLogger.js'
import { ExitCode } from '../cli/exitCodes.js'
import { hl, checkMark, formatTitle, hlSuccess, hlError } from '../utils/consoleUtils.js'
import { CLI_VERSION } from '../cli/version.js'
import { Effect, InfrastructureTool, } from '../apiclient/gql/graphql.js'
import { settings } from '../settings.js'


export interface Inputs {
  iacTool: InfrastructureTool
  authToken: string
  serverUrl: string
  targetDirectories: string[]
  effect: Effect
  pullRequestIdentifier: string | null
  azdoOptions?: {
    azdoBaseUrl: string
    azdoOrganizationName: string
  }
}


type ClientError = {
  __typename: 'ClientError'
  code: ExitCode
  message: string
}

export const resolve = async (inputs: Inputs): Promise<ExitCode> => {
  // The case where one AZDO option is provided and the other is handled in

  const client = new Client(inputs.serverUrl, inputs.iacTool, inputs.authToken, inputs.azdoOptions)

  const cl = new ConsoleLogger()

  cl.log(formatTitle(`Running Gomboc.AI Remediate for Terraform (v${CLI_VERSION})`))

  cl._log(`Target directories:\n`)
  for (const targetDirectory of inputs.targetDirectories) {
    cl.__log(`${hl(targetDirectory)} ${checkMark}\n`)
  }

  cl._log(`Effect: ${hl(inputs.effect)}`)

  if (inputs.effect === Effect.DirectApply) {
    cl.__log(`Remediations will be committed to your current PR\n`)
  } else if (inputs.effect === Effect.SubmitForReview) {
    cl.__log(`Remediations will be committed in a new PR for your review\n`)
  }

  cl._log(`...\n`)

  // This will call the mutation to trigger a scan, and handle a server error
  const handleScanRequest = async () => {
    try {
      return await client.scanRemoteMutationCall(inputs)
    } catch (e: any) {
      return { code: ExitCode.SERVER_ERROR, message: e.message } as ClientError
    }
  }

  // This will call the query to check the status of a scan, and handle a server error and a failed scan error
  const handleScanStatusPoll = async (scanRequestId: string, iacTool: InfrastructureTool) => {
    try {
      if (iacTool === InfrastructureTool.Terraform) {
        const poll = await client.scanBranchStatusQueryCall(scanRequestId)
        if (poll.scanBranch.__typename === 'FailedScan') {
          return { code: ExitCode.BUSINESS_ERROR, message: `${poll.scanBranch.message} (Scan ID: ${poll.scanBranch.id})` } as ClientError
        }
        if (poll.scanBranch.__typename === 'GombocError') {
          return
        }
        return poll.scanBranch
      }
      if (iacTool === InfrastructureTool.Cloudformation) {
        const poll = await client.scanDirectoryStatusQueryCall(scanRequestId)
        if (poll.scanDirectory.__typename === 'FailedScan') {
          return { code: ExitCode.BUSINESS_ERROR, message: `${poll.scanDirectory.message} (Scan ID: ${poll.scanDirectory.id})` } as ClientError
        }
        if (poll.scanDirectory.__typename === 'GombocError') {
          return
        }
        return poll.scanDirectory
      }
    } catch (e: any) {
      return { code: ExitCode.SERVER_ERROR, message: e.message } as ClientError
    }
  }

  // We will get a single page of RELEVANT (i.e. with violations) policy observations to avoid overwhelming the user
  // Getting at least one of these is sufficient for the CLI to fail in signal of action required
  // If we get a full page, we'll print a little message saying there could be more.
  // In any case, we'll print out the url to the action result page with all the policy observations
  const POLICY_OBSERVATIONS_PAGE_SIZE = 10

  // This will call final query to get the action results of a scan, and handle a server error and a failed scan error
  const handleScanActionResultsRequest = async (scanRequestId: string) => {
    try {
      if (inputs.iacTool === InfrastructureTool.Terraform) {
        const poll = await client.scanBranchActionResultsQueryCall(scanRequestId, POLICY_OBSERVATIONS_PAGE_SIZE)
        if (poll.scanBranch.__typename === 'FailedScan') {
          return { code: ExitCode.BUSINESS_ERROR, message: `${poll.scanBranch.message} (Scan ID: ${poll.scanBranch.id})` } as ClientError
        }
        if (poll.scanBranch.__typename === 'GombocError') {
          return { code: ExitCode.SERVER_ERROR, message: `${poll.scanBranch.message} (Code: ${poll.scanBranch.code ?? 'Unknown'})` } as ClientError
        }
        return poll.scanBranch
      } else {
        const poll = await client.scanDirectoryActionResultsQueryCall(scanRequestId, POLICY_OBSERVATIONS_PAGE_SIZE)
        if (poll.scanDirectory.__typename === 'FailedScan') {
          return { code: ExitCode.BUSINESS_ERROR, message: `${poll.scanDirectory.message} (Scan ID: ${poll.scanDirectory.id})` } as ClientError
        }
        if (poll.scanDirectory.__typename === 'GombocError') {
          return { code: ExitCode.SERVER_ERROR, message: `${poll.scanDirectory.message} (Code: ${poll.scanDirectory.code ?? 'Unknown'})` } as ClientError
        }
        if (poll.scanDirectory.__typename === 'ScanDirectory') {
          return poll.scanDirectory
        } else {
          throw new Error()
        }
      }

    } catch (e: any) {
      return { code: ExitCode.SERVER_ERROR, message: e.message } as ClientError
    }
  }

  const scanRequestResponse = await handleScanRequest()

  if (scanRequestResponse.__typename === 'ClientError') {
    cl.err(scanRequestResponse.code, scanRequestResponse.message)
    return scanRequestResponse.code
  }

  const scanRequestId = scanRequestResponse.scanRemote

  if (scanRequestId == null) {
    cl.err(ExitCode.SERVER_ERROR, 'Scan request was rejected by the server. Make sure that you have defined a security policy and that this repository has been linked to a project\n')
    cl.log(`Aborting...\n`)
    return ExitCode.SUCCESS
  }

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

  cl.log('Retrieving scan status...')
  // While there are still children scans being processed
  do {
    await sleep(POLLING_INTERVAL)
    scanStatusPollResult = await handleScanStatusPoll(scanRequestId, inputs.iacTool)

    if (scanStatusPollResult != null) {
      if (
        scanStatusPollResult?.__typename === 'ScanBranch' &&
        (scanStatusPollResult.childrenExpected == scanStatusPollResult.childrenCompleted + scanStatusPollResult.childrenError)) {
        break;
      } else if (
        scanStatusPollResult?.__typename === 'ScanDirectory' &&
        (scanStatusPollResult.childrenExpected == scanStatusPollResult.childrenCompleted + scanStatusPollResult.childrenError)) {
        break;
      } else if (scanStatusPollResult?.__typename === 'ClientError') {
        cl.err(scanStatusPollResult.code, scanStatusPollResult.message)
        return scanStatusPollResult.code
      }
    }

    // Server is still working on the children scan
    const totalAwaitedTime = INITIAL_INTERVAL + attempts * POLLING_INTERVAL
    if (totalAwaitedTime > TIMEOUT_LIMIT) {
      const timeoutMinutes = Math.floor(TIMEOUT_LIMIT / 60000)
      cl.err(ExitCode.SERVER_TIMEOUT_ERROR, `Scan timed out after ${timeoutMinutes} min. Please try again later`)
      return ExitCode.SERVER_TIMEOUT_ERROR
    }

    attempts++
  /* eslint-disable no-constant-condition */
  } while (true)

  // Server has finished the scan, now we can request the results
  const scanActionResults = await handleScanActionResultsRequest(scanRequestId)
  if (scanActionResults.__typename === 'ClientError') {
    cl.err(scanActionResults.code, scanActionResults.message)
    return scanActionResults.code
  }

  // Final check to see if everything is in order with the final query
  if (scanActionResults.childrenExpected != scanActionResults.childrenCompleted + scanActionResults.childrenError) {
    cl.err(ExitCode.SERVER_ERROR, 'Status reverted to NOT OK in final validation')
    return ExitCode.SERVER_ERROR
  }

  // Keep track of whether there are any violations or failed scans to prevent or not deployment
  let atLeastOneViolationOrError = false

  // Check if there are any violations or failed scans
  // If an action result has a policy observation with disposition AUTO_REMEDIATED or COULD_NOT_REMEDIATE, it is considered a violation
  // We can only get those observations because we are excluding all other dispositions in the query
  scanActionResults.children.forEach((child: any) => {
    cl._log('\n')
    cl._log(`Scan result:\n`)
    if (child.__typename === 'FailedScan') {
      cl.err(ExitCode.FAILED_SCAN, `${child.message} (Scan ID: ${child.id})\n`)
      atLeastOneViolationOrError = true
    } else if (child.__typename === 'GombocError') {
      cl.err(ExitCode.SERVER_ERROR, `${child.message} (Code: ${child.code ?? 'Unknown'})\n`)
      atLeastOneViolationOrError = true
    } else {
      if (child.result == null || child.result.observations == null || child.result.observations.length === 0) {
        return
      }

      child.result.observations.forEach((obs: any) => {
        const location = `${obs.filepath}, line ${obs.lineNumber}`
        cl.__log(`Policy observation at ${hl(location)}:`)
        cl.___log(`Resource: ${hl(obs.resourceName)} (${obs.resourceType})`)
        cl.___log(`Policy: All resources must implement ${hl(obs.capabilityTitle)}`)
        const dispositionHighlight = obs.disposition === 'AUTO_REMEDIATED' ? hlSuccess : hlError
        cl.___log(`Status: ${dispositionHighlight(obs.disposition)}`)
        atLeastOneViolationOrError = true
      })
      if (child.result.observations.length === POLICY_OBSERVATIONS_PAGE_SIZE) {
        cl.__log(`...and possibly more`)
      }
      cl._log('\n')
      cl.__log(`Find the details at ${settings.CLIENT_URL}/actions/${child.result.id}\n`)
    }
  })

  if (atLeastOneViolationOrError) {
    cl.err(ExitCode.VIOLATIONS_FOUND, 'At least one violation or error was found')
    return ExitCode.VIOLATIONS_FOUND
  }

  cl.log(hlSuccess(`No violations or errors found`))
  return ExitCode.SUCCESS
}
