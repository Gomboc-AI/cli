import { Client } from '../apiclient/client.js'
import { ConsoleLogger } from '../utils/ConsoleLogger.js'
import { ExitCode } from '../cli/exitCodes.js'
import { hl, checkMark, formatTitle } from '../utils/consoleUtils.js'
import { CLI_VERSION } from '../cli/version.js'
import { consoleDebugger } from '../utils/ConsoleDebugger.js'
import { AutoRemediateTfHclFilesResponse, AutoRemediateTfHclFilesSuccess, Effect, GombocError, RemediateRemoteTfHcl2Mutation } from '../apiclient/gql/graphql.js'


export interface Inputs {
  authToken: string
  serverUrl: string
  targetDirectories: string[]
  effect: Effect
}

type ServerError = {
  __typename: 'ServerError'
  message: string
}

const responseHasViolations = (response: AutoRemediateTfHclFilesSuccess, consoleLogger: ConsoleLogger) => {
  // TODO: Today any fileComment refers to a violation
  const atLeastOneViolation = response.files.some((file) => file.fileComments.length > 0)

  consoleDebugger.log('..:: Success response', response)

  consoleLogger.log(`Action ID: ${hl(response.traceId)}\n`)
  const actionStatus = response.success ? 'successfully' : 'unsuccesfully'
  consoleLogger.log(`Action ran ${hl(actionStatus)}`)

  for (const file of response.files) {
    // Log the name of the file
    consoleLogger._log(`${hl(file.filepath)}\n`)

    // Log each observation for the file
    for (const observation of file.fileComments) {
      consoleLogger.__log(`${hl(`l.${observation.line}`)} ${observation.commentPlain}\n`)
    }

    if (file.fileComments.length === 0) {
      consoleLogger.__log(`No observations for this file\n`)
    }
  }

  if (response.files.length === 0) {
    consoleLogger._log(`No HCL files were found\n`)
  }

  if (atLeastOneViolation) {
    consoleLogger.err(ExitCode.VIOLATIONS_FOUND, 'At least one violation was found')
    return ExitCode.VIOLATIONS_FOUND
  }
  consoleLogger.log(`${response.message}\n`)
  return ExitCode.SUCCESS
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

  const handleMutation = async (targetDirectory: string) => {
    try {
      return client.remediateRemoteTfHCL2MutationCall(targetDirectory, inputs.effect)
    } catch (e: any) {
      return {__typename: 'ServerError', message: e.message} as ServerError
    }
  }

  // Run the API calls in parallel
  const allResponses = await Promise.all(
    inputs.targetDirectories.map(targetDirectory => handleMutation(targetDirectory))
  )

  // At the top level, we can have either a mutation response or a server error
  const mutationResponses = allResponses.filter((r): r is RemediateRemoteTfHcl2Mutation => r.__typename === 'Mutation')
  const serverErrorResponses = allResponses.filter((r): r is ServerError => r.__typename === 'ServerError')

  // For mutation responses, we can have either a success response or a GombocError
  const remediateResponses = mutationResponses.map(response => response.remediateRemoteTfHCL2) as AutoRemediateTfHclFilesResponse[]
  const successResponses = remediateResponses.filter((r): r is AutoRemediateTfHclFilesSuccess => r.__typename === 'AutoRemediateTfHCLFilesSuccess')
  const gombocErrorResponses = remediateResponses.filter((r): r is GombocError => r.__typename === 'GombocError')

  // Check if there are any violations among the success responses
  const atLeastOneViolation = successResponses.some((response) => responseHasViolations(response, cl))

  // Log the gomboc (client) error quantities and messages
  cl.log(`Client errors: ${gombocErrorResponses.length}\n`)
  gombocErrorResponses.forEach((error) => cl._log(`${error.message}\n`))
  
  // Log the server error quantities
  cl.log(`Server errors: ${gombocErrorResponses.length}\n`)

  // Fail first by server errors, then by client errors, then by violations
  if (serverErrorResponses.length > 0) {
    return ExitCode.SERVER_ERROR
  }
  if (gombocErrorResponses.length > 0) {
    return ExitCode.CLIENT_ERROR
  }
  if (atLeastOneViolation) {
    return ExitCode.VIOLATIONS_FOUND
  }

  return ExitCode.SUCCESS
}
