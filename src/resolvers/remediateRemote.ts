import { Client, ClientError } from '../apiclient/client.js'
import { ConsoleLogger } from '../utils/ConsoleLogger.js'
import { ExitCode } from '../cli/exitCodes.js'
import { hl, checkMark, formatTitle, hlSuccess, hlError } from '../utils/consoleUtils.js'
import { CLI_VERSION } from '../cli/version.js'
import { Effect, InfrastructureTool, ScanBranch, ScanBranchResponse, ScanDirectory, ScanDirectoryResponse, } from '../apiclient/gql/graphql.js'
import { settings } from '../settings.js'
import { z } from 'zod'


const cl = new ConsoleLogger()

export const zAzdoOptions = z.object({
  azdoBaseUrl: z.string(),
  azdoOrganizationName: z.string()
})

export const zBaseInputs = z.object({
  iacTools: z.array(z.enum([InfrastructureTool.Cloudformation, InfrastructureTool.Terraform])),
  authToken: z.string(),
  effect: z.enum([Effect.Preview, Effect.SubmitForReview]),
  azdoOptions: zAzdoOptions.optional()
})

export const zOnScheduleInputs = z.object({
  ...zBaseInputs.shape,
  recurse: z.boolean(),
  directory: z.string(),
})

export const zOnPullRequestInputs = z.object({
  ...zBaseInputs.shape,
  scenarioPaths: z.array(z.string()),
  pullRequestIdentifier: z.string()
})

type OnScheduleInputs = z.infer<typeof zOnScheduleInputs>
type OnPullRequestInputs = z.infer<typeof zOnPullRequestInputs>


export const resolveOnSchedule = async (inputs: OnScheduleInputs) => {
  const {
    iacTools,
    authToken,
    effect,
    azdoOptions,
    recurse,
  } = inputs
  const client = new Client(iacTools, authToken, azdoOptions)

  cl.log(formatTitle(`Running Gomboc.AI Remediate for Terraform (v${CLI_VERSION})`))

  cl._log(`Target directory:\n`)
  cl.__log(`${hl(inputs)} ${checkMark}\n`)
  cl._log(`Recurse through nested directories:\n`)
  cl.__log(`${hl(recurse)}\n`)

  cl._log(`Effect: ${hl(inputs.effect)}`)

  if (effect === Effect.Preview) {
    cl.__log(`Remediations will only be displayed and no commits will be made\n`)
  } else if (inputs.effect === Effect.SubmitForReview) {
    cl.__log(`Remediations will be committed in a new PR for your review\n`)
  }

  try {
    return await client.scanOnScheduleMutationCall(inputs)
  } catch (e: any) {
    throw new ClientError(e.message, ExitCode.SERVER_ERROR)
  }
}

export const resolveOnPullRequest = async (inputs: OnPullRequestInputs) => {
  const {
    iacTools,
    authToken,
    azdoOptions,
    scenarioPaths,
  } = inputs

  const client = new Client(iacTools, authToken, azdoOptions)
  const cl = new ConsoleLogger()

  cl.log(formatTitle(`Running Gomboc.AI Remediate for Terraform (v${CLI_VERSION})`))

  cl._log(`Target directories:\n`)
  for (const path of scenarioPaths) {
    cl.__log(`${hl(path)} ${checkMark}\n`)
  }

  cl._log(`Effect: ${hl(inputs.effect)}`)

  if (inputs.effect === Effect.Preview) {
    cl.__log(`Remediations will only be displayed and no commits will be made\n`)
  } else if (inputs.effect === Effect.SubmitForReview) {
    cl.__log(`Remediations will be committed in a new PR for your review\n`)
  }

  const scanResult = await client.scanOnPullRequestMutationCall(inputs)
  const { scanRequestId } = scanResult.scanOnPullRequest

  const actionResults = await client.getActionResults(scanRequestId)
  for (const iac in actionResults) {
    const results = actionResults[iac as keyof typeof actionResults]
    if (results == null) { continue }
    if (results.__typename === 'ScanBranch' ||
      (results.__typename === 'ScanDirectory' &&
        results.childrenExpected != results.childrenCompleted + results.childrenError)
    ) {
      throw new ClientError('Status reverted to NOT OK in final validation', ExitCode.SERVER_ERROR)
    }
  }

  // Keep track of whether there are any violations or failed scans to prevent or not deployment
  let atLeastOneViolationOrError = false
}

export const resolve = async (inputs: OnScheduleInputs | OnPullRequestInputs): Promise<ExitCode> => {

  // Final check to see if everything is in order with the final query
  if (scanActionResults.childrenExpected != scanActionResults.childrenCompleted + scanActionResults.childrenError) {
    cl.err(ExitCode.SERVER_ERROR, 'Status reverted to NOT OK in final validation')
    if (suppressError) {
      return ExitCode.SUCCESS
    }
    return ExitCode.SERVER_ERROR
  }


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
    if (suppressError) {
      return ExitCode.SUCCESS
    }
    return ExitCode.VIOLATIONS_FOUND
  }

  cl.log(hlSuccess(`No violations or errors found`))
  return ExitCode.SUCCESS
}
