import { Client } from '../apiclient/client.js'
import { ConsoleLogger } from '../utils/ConsoleLogger.js'
import { ExitCode } from '../cli/exitCodes.js'
import { hl, checkMark, formatTitle } from '../utils/consoleUtils.js'
import { CLI_VERSION } from '../cli/version.js'
import { consoleDebugger } from '../utils/ConsoleDebugger.js'
import { AutoRemediateTfHclFilesResponse, AutoRemediateTfHclFilesSuccess, Effect, Lighthouse } from '../apiclient/gql/graphql.js'
import { settings } from '../settings.js'


export interface Inputs {
  authToken: string
  serverUrl: string
  output: string
  workingDirectory: string
  effect: Effect
  accessToken: string
}

export const resolve = async (inputs: Inputs): Promise<ExitCode> => {
  const client = new Client(inputs.serverUrl, inputs.authToken)

  // Call the lighthouse first
  let lighthouseMessages: Lighthouse[]
  try {
    const response = await client.lighthouseQueryCall()
    lighthouseMessages = response.lighthouse as Lighthouse[]
  } catch (e: any) {
    lighthouseMessages = []
  }

  const cl = new ConsoleLogger(inputs.output !== 'text')

  cl.log(formatTitle(`Running Gomboc.AI Remediate for Terraform (v${CLI_VERSION})`))

  cl._log(`Terraform directory: ${hl(inputs.workingDirectory)} ${checkMark}\n`)

  cl._log(`Effect: ${hl(inputs.effect)}`)

  if (inputs.effect === Effect.DirectApply) {
    cl.__log(`Remediations will be committed to your current PR\n`)
  } else if (inputs.effect === Effect.SubmitForReview) {
    cl.__log(`Remediations will be committed in a new PR for your review\n`)
  }

  cl._log(`...\n`)

  let actionResponse: AutoRemediateTfHclFilesResponse

  try {
    const response = await client.remediateRemoteTfHCL2MutationCall(inputs.workingDirectory, inputs.effect, inputs.accessToken)
    actionResponse = response.remediateRemoteTfHCL2 as AutoRemediateTfHclFilesResponse

    if (actionResponse.__typename === 'AutoRemediateTfHCLFilesError') {
      // This is the error type response
      throw new Error(actionResponse.message)
    } else if (settings.CANARY_MODE){
      return ExitCode.SUCCESS
    }
  } catch (e: any) {
    cl.err(ExitCode.SERVER_ERROR, e, lighthouseMessages)
    return ExitCode.SERVER_ERROR
  }

  const action = actionResponse as AutoRemediateTfHclFilesSuccess

  // TODO: Today any fileComment refers to a violation
  const atLeastOneViolation = action.files.some((file) => file.fileComments.length > 0)

  consoleDebugger.log('action', action)

  if(inputs.output === 'json'){
    // NOTE: In JSON mode, lighthouse messages are lost
    console.log(JSON.stringify(action!, null, 2))
    if (atLeastOneViolation) {
      return ExitCode.VIOLATIONS_FOUND
    }
    return ExitCode.SUCCESS
  }

  const actionStatus = action.success ? 'successfully' : 'unsuccesfully'
  cl.log(`Action ran ${hl(actionStatus)} (Trace ID: ${hl(action.traceId)})\n`)

  for (const file of action.files) {
    // Log the name of the file
    cl._log(`${hl(file.filepath)}\n`)

    // Log each observation for the file
    for (const observation of file.fileComments) {
      cl.__log(`${hl(`l.${observation.line}`)} ${observation.commentPlain}\n`)
    }

    if (file.fileComments.length === 0) {
      cl.__log(`No observations for this file\n`)
    }
  }

  if (action.files.length === 0) {
    cl._log(`No HCL files were found\n`)
  }

  if (atLeastOneViolation) {
    cl.err(ExitCode.VIOLATIONS_FOUND, 'At least one violation was found', lighthouseMessages)
    return ExitCode.VIOLATIONS_FOUND
  }
  cl.log(`${action.message}\n`)
  cl.allLighthouseMessages(lighthouseMessages)
  return ExitCode.SUCCESS
}
