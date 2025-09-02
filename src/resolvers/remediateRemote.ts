import { Client, ClientError, POLICY_OBSERVATIONS_PAGE_SIZE } from '../apiclient/client'
import { ConsoleLogger } from '../utils/ConsoleLogger'
import { ExitCode } from '../cli/exitCodes'
import { hl, checkMark, formatTitle, hlSuccess, hlError } from '../utils/consoleUtils'
import { CLI_VERSION } from '../cli/version'
import { Effect, InfrastructureTool } from '../apiclient/gql/graphql'
import { settings } from '../settings'
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
  azdoOptions: zAzdoOptions.optional(),
  format: z.boolean().optional()
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


const resolveActionResult = async (scanRequestId: string, client: Client) => {
  const actionResults = await client.pollScanStatus(scanRequestId)

  // Keep track of whether there are any violations or failed scans to prevent or not deployment
  let atLeastOneViolation = false

  for (const iac in actionResults) {
    // If its not part of the IaC tools included ignore the section
    if (!client.iacTools.includes(InfrastructureTool[iac as keyof typeof InfrastructureTool])) { continue }
    cl._log(`${hl(iac)} scan results:\n`)
    const results = actionResults[iac as keyof typeof actionResults]
    if (results == null) { continue }
    const children = results.children.filter(child => {
      return child.__typename === 'ScanScenario' && child.result != null
    })
    if (children.length === 0) {
      cl.log('\tNo violations found\n')
    }

    if (
      (
        results.__typename === 'ScanBranch' ||
        results.__typename === 'ScanDirectory'
      ) &&
      results.childrenExpected != results.childrenCompleted + results.childrenError
    ) {
      throw new ClientError('Status reverted to NOT OK in final validation', ExitCode.SERVER_ERROR)
    }
    children.forEach((child: any) => {
      if (child.__typename === 'FailedScan') {
        throw new ClientError(`${child.message} (Scan ID: ${child.id})\n`, ExitCode.FAILED_SCAN)
      } else if (child.__typename === 'GombocError') {
        throw new ClientError(`${child.message} (Code: ${child.code ?? 'Unknown'})\n`, ExitCode.SERVER_ERROR)
      } else if (child.__typename !== 'ScanScenario') {
        throw new ClientError('Unexpected error occurred', ExitCode.SERVER_ERROR)
      } else {
        if (child.result == null || child.result.policyObservations.results.length === 0) {
          return
        }
        child.result.policyObservations.results.forEach((obs: any) => {
          const location = `${obs.filepath}, line ${obs.lineNumber}`
          cl.__log(`Policy observation at ${hl(location)}:`)
          cl.___log(`Resource: ${hl(obs.resourceName)} (${obs.resourceType})`)
          cl.___log(`Policy: All resources must implement ${hl(obs.capabilityTitle)}`)
          const dispositionHighlight = obs.disposition === 'AUTO_REMEDIATED' ? hlSuccess : hlError
          cl.___log(`Status: ${dispositionHighlight(obs.disposition)}`)
          atLeastOneViolation = true
        })
        if (child.result.policyObservations.results.length === POLICY_OBSERVATIONS_PAGE_SIZE) {
          cl.__log(`...and possibly more`)
        }
        cl._log('\n')
        cl.__log(`Find the details at ${settings.CLIENT_URL}/scans/${child.result.id}\n`)
      }
    })
  }

  if (atLeastOneViolation) {
    throw new ClientError('At least one violation or error was found', ExitCode.VIOLATIONS_FOUND)
  }

  cl.log(hlSuccess(`No violations or errors found`))
}


export const resolveOnSchedule = async (inputs: OnScheduleInputs) => {
  const {
    iacTools,
    authToken,
    effect,
    azdoOptions,
    recurse,
  } = inputs
  const client = new Client(iacTools, authToken, azdoOptions)

  cl.log(formatTitle(`Running Gomboc.AI Remediate (v${CLI_VERSION})`))

  cl._log(`Target directory:\n`)
  cl.__log(`${hl(inputs.directory)} ${checkMark}\n`)
  cl._log(`Recurse through nested directories:\n`)
  cl.__log(`${hl(recurse)}\n`)

  cl._log(`Effect: ${hl(inputs.effect)}`)

  if (effect === Effect.Preview) {
    cl.__log(`Remediations will only be displayed and no commits will be made\n`)
  } else if (inputs.effect === Effect.SubmitForReview) {
    cl.__log(`Remediations will be committed in a new PR for your review\n`)
  }

  const scanResult = await client.scanOnScheduleMutationCall(inputs)
  const { scanRequestId } = scanResult.scanOnSchedule

  return await resolveActionResult(scanRequestId, client)
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

  cl.log(formatTitle(`Running Gomboc.AI Remediate (v${CLI_VERSION})`))

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

  await resolveActionResult(scanRequestId, client)
}
