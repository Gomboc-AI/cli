import { Client } from '../apiclient/client.js'
import { ConsoleLogger } from '../utils/ConsoleLogger.js'
import { ExitCode } from '../cli/exitCodes.js'
import { hl, checkMark, formatTitle, hlSuccess, hlError } from '../utils/consoleUtils.js'
import { CLI_VERSION } from '../cli/version.js'
import { Effect } from '../apiclient/gql/graphql.js'
import { settings } from '../settings.js'


export interface Inputs {
  authToken: string
  serverUrl: string
  targetDirectories: string[]
  effect: Effect
}

type ClientError = {
  __typename: 'ClientError'
  code: ExitCode
  message: string
}

export const resolve = async (inputs: Inputs): Promise<ExitCode> => {
  const client = new Client(inputs.serverUrl, inputs.authToken)

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
      return await client.scanRemoteTfHCL2MutationCall(inputs.targetDirectories, inputs.effect)
    } catch (e: any) {
      return {code: ExitCode.SERVER_ERROR, message: e.message} as ClientError
    }
  }

  // This will call the query to check the status of a scan, and handle a server error and a failed scan error
  const handleScanStatusPoll = async (scanRequestId: string) => {
    try {
      const poll = await client.scanBranchStatusQueryCall(scanRequestId)
      if (poll.scanBranch.__typename === 'FailedScan') {
        return {code: ExitCode.BUSINESS_ERROR, message: `${poll.scanBranch.message} (Scan ID: ${poll.scanBranch.id})`} as ClientError
      }
      if (poll.scanBranch.__typename === 'GombocError') {
        return {code: ExitCode.SERVER_ERROR, message: `${poll.scanBranch.message} (Code: ${poll.scanBranch.code ?? 'Unknown'})`} as ClientError
      }
      return poll.scanBranch
    } catch (e: any) {
      return {code: ExitCode.SERVER_ERROR, message: e.message} as ClientError
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
      const poll = await client.scanBranchActionResultsQueryCall(scanRequestId, POLICY_OBSERVATIONS_PAGE_SIZE)
      if (poll.scanBranch.__typename === 'FailedScan') {
        return {code: ExitCode.BUSINESS_ERROR, message: `${poll.scanBranch.message} (Scan ID: ${poll.scanBranch.id})`} as ClientError
      }
      if (poll.scanBranch.__typename === 'GombocError') {
        return {code: ExitCode.SERVER_ERROR, message: `${poll.scanBranch.message} (Code: ${poll.scanBranch.code ?? 'Unknown'})`} as ClientError
      }
      return poll.scanBranch
    } catch (e: any) {
      return {code: ExitCode.SERVER_ERROR, message: e.message} as ClientError
    }
  }

  const scanRequestResponse = await handleScanRequest()

  if (scanRequestResponse.__typename === 'ClientError') {
    cl.err(scanRequestResponse.code, scanRequestResponse.message)
    return scanRequestResponse.code
  }

  const scanRequestId = scanRequestResponse.scanRemoteTfHCL2

  cl._log(`Scan request accepted by server: ${scanRequestId} \n`)

  // Temporal naive implementation of a polling mechanism. Will be replaced by a GraphQL subscription
  // In the grand scheme of CI/CD pipeline times, this is not terrible
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  // Start polling mechanism
  const INITIAL_INTERVAL = 4 * 1000
  const POLLING_INTERVAL = 2 * 1000
  const TIMEOUT_LIMIT = 5 * 60 * 1000

  // Initial sleep to give the server time to digest the request
  await sleep(INITIAL_INTERVAL)

  // Initial call to check the status of the scan
  const scanStatusPollResult = await handleScanStatusPoll(scanRequestId)
  if (scanStatusPollResult.__typename === 'ClientError') {
    cl.err(scanStatusPollResult.code, scanStatusPollResult.message)
    return scanStatusPollResult.code
  }

  let attempts = 1

  // While there are still children scans being processed
  while (scanStatusPollResult.childrenExpected != scanStatusPollResult.childrenCompleted + scanStatusPollResult.childrenError) {
    // Server is still working on the children scan
    const totalAwaitedTime = INITIAL_INTERVAL + attempts * POLLING_INTERVAL
    if (totalAwaitedTime > TIMEOUT_LIMIT) {
      const timeoutMinutes = Math.floor(TIMEOUT_LIMIT / 60000)
      cl.err(ExitCode.SERVER_TIMEOUT_ERROR, `Scan timed out after ${timeoutMinutes} min. Please try again later`)
      return ExitCode.SERVER_TIMEOUT_ERROR
    }

    await sleep(POLLING_INTERVAL)
    attempts ++

    const scanStatusPollResult = await handleScanStatusPoll(scanRequestId)
    if (scanStatusPollResult.__typename === 'ClientError') {
      cl.err(scanStatusPollResult.code, scanStatusPollResult.message)
      return scanStatusPollResult.code
    }
  }

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
  scanActionResults.children.map((child) => {
    cl._log(`\nScan result:\n`)
    if(child.__typename === 'FailedScan') {
      cl.err(ExitCode.FAILED_SCAN, `${child.message} (Scan ID: ${child.id})\n`)
      atLeastOneViolationOrError = true
    } else if (child.__typename === 'GombocError') {
      cl.err(ExitCode.SERVER_ERROR, `${child.message} (Code: ${child.code ?? 'Unknown'})\n`)
      atLeastOneViolationOrError = true
    } else {
      // child is a valid ScanScenario object
      child.result.observations.forEach((obs) => {
        const location = `${obs.filepath}, ln ${obs.lineNumber}`
        cl.__log(`Policy observation at ${hl(location)}:`)
        cl.___log(`Resource: ${hl(obs.resourceName)} (${obs.resourceType})`)
        cl.___log(`Policy: All resources must implement ${hl(obs.capabilityTitle)}`)
        const dispositionHighlight = obs.disposition === 'AUTO_REMEDIATED' ? hlSuccess : hlError
        cl.___log(`Status: ${dispositionHighlight(obs.disposition)}`)
        atLeastOneViolationOrError = true
      })
      if(child.result.observations.length === POLICY_OBSERVATIONS_PAGE_SIZE) {
        cl.__log(`...and possibly more`)
      }
      cl.__log(`\nFind the detailed result at ${settings.CLIENT_URL}/actions/${child.result.id}\n`)
    }
  })

  if(atLeastOneViolationOrError) {
    cl.err(ExitCode.VIOLATIONS_FOUND, 'At least one violation or error was found')
    return ExitCode.VIOLATIONS_FOUND
  }

  cl.log(hlSuccess(`No violations or errors found`))
  return ExitCode.SUCCESS
}
