import { Effect } from '../apiclient/__generated__/GlobalTypes.js'
import { Lighthouse_lighthouse } from '../apiclient/__generated__/Lighthouse.js'

import { Client } from '../apiclient/client.js'
import { ConsoleLogger } from '../utils/ConsoleLogger.js'
import { ExitCode } from '../cli/exitCodes.js'
import { hl, checkMark, formatTitle } from '../utils/consoleUtils.js'
import { CLI_VERSION } from '../cli/version.js'
import { RemediateRemoteTfHCL2_remediateRemoteTfHCL2 } from '../apiclient/__generated__/RemediateRemoteTfHCL2.js'


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
  let lighthouseMessages: Lighthouse_lighthouse[]
  try {
    lighthouseMessages = await client.lighthouseQueryCall()
  } catch (e: any) {
    lighthouseMessages = []
  }

  const cl = new ConsoleLogger(inputs.output !== 'text')

  cl.log(formatTitle(`Running Gomboc.AI Remediate for Terraform (v${CLI_VERSION})`))

  cl._log(`Terraform directory: ${hl(inputs.workingDirectory)} ${checkMark}\n`)

  cl._log(`Effect: ${hl(inputs.effect)}\n`)

  if (inputs.effect === Effect.DirectApply) {
    cl.__log(`Remediations will be committed to your current PR\n`)
  } else if (inputs.effect === Effect.SubmitForReview) {
    cl.__log(`Remediations will be committed in a new PR for your review\n`)
  }

  cl._log(`...\n`)

  // Resolve the action
  let action: RemediateRemoteTfHCL2_remediateRemoteTfHCL2

  try {
    action = await client.remediateRemoteTfHCL2MutationCall(inputs.workingDirectory, inputs.effect, inputs.accessToken)

    if (action.__typename === 'AutoRemediateTfHCLFilesError') {
      // This is the error type response
      throw new Error(action.message)
    }

  } catch (e: any) {
    cl.err(ExitCode.SERVER_ERROR, e, lighthouseMessages)
    return ExitCode.SERVER_ERROR
  }

  if(inputs.output === 'json'){
    console.log(JSON.stringify(action!, null, 2))
    if (action.success === true) {
      // Note: Lighthouse messages are lost
      return ExitCode.SUCCESS
    }
    return ExitCode.BUSINESS_ERROR
  }

  const actionStatus = action.success ? 'successfully' : 'unsuccesfully'
  cl.log(`Action ran ${hl(actionStatus)} (Trace ID: ${hl(action.traceId)})\n`)


  for (const file of action.files) {
    cl._log(hl(file.filepath))

    for (const observation of file.observations) {
      cl.__log(`${hl(`l.${observation.line}`)} ${observation.commentPlain}`)
    }

    if (file.observations.length === 0) {
      cl.__log(`No observations for this file`)
    }
    cl.___log('')
  }

  if (action.files.length === 0) {
    cl._log(`No HCL files were found\n`)
  }

  if (action.success === true) {
    cl.log(`${action.message}\n`)
    cl.allLighthouseMessages(lighthouseMessages)
    return ExitCode.SUCCESS
  }
  cl.err(ExitCode.BUSINESS_ERROR, action.message, lighthouseMessages)
  return ExitCode.BUSINESS_ERROR
}
