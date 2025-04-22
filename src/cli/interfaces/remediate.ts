import { Arguments } from "yargs"

import { resolveOnSchedule, resolveOnPullRequest, zOnScheduleInputs, zAzdoOptions, zOnPullRequestInputs } from "../../resolvers/remediateRemote.js"
import { Effect, InfrastructureTool } from "../../apiclient/gql/graphql.js"
import { EffectCommand, EventCommand, IacOptions } from "../commands.js"
import { ClientError } from '../../apiclient/client.js'
import { ExitCode } from '../exitCodes.js'

const getValidEffectCommand = (effectArg: string) => {
  switch (effectArg) {
    case EffectCommand.AUDIT:
      return Effect.Preview
    case EffectCommand.SUBMIT_FOR_REVIEW:
      return Effect.SubmitForReview
    default:
      throw new ClientError('Invalid effect command received', ExitCode.INVALID_ARGUMENTS)
  }
}

const translateIacOption = (iacOptions: string[]) => {
  const translatedIac: InfrastructureTool[] = []
  for (const option of iacOptions) {
    switch (option) {
      case IacOptions.CLOUDFORMATION:
        translatedIac.push(InfrastructureTool.Cloudformation)
        break;
      case IacOptions.TERRAFORM:
        translatedIac.push(InfrastructureTool.Terraform)
        break;
      default:
        throw new ClientError(`Invalid IAC tool provided: ${option}`, ExitCode.INVALID_ARGUMENTS)
    }
  }
  return translatedIac
}
export const handleOnScheduleCommand = async (argv: Arguments) => {
  // argv._[0] -> EffectCommand (submit-for-review, preview)
  // argv._[1] -> EventCommand (on-pull-request, on-schedule)
  const [effectCommand, eventCommand] = argv._
  if (
    eventCommand != EventCommand.ON_SCHEDULE ||
    typeof effectCommand != 'string'
  ) {
    throw new ClientError('Improper use of the on_schedule command handler', ExitCode.INVALID_ARGUMENTS)
  }

  const effect = getValidEffectCommand(effectCommand)

  const {
    iac,
    authToken,
    targetDirectory,
    recurse,
    azdoOrganizationName,
    azdoCollectionUri,
  } = argv

  const azdoOptions = zAzdoOptions.safeParse({
    azdoBaseUrl: azdoCollectionUri,
    azdoOrganizationName
  })

  const inputs = zOnScheduleInputs.safeParse({
    iacTools: translateIacOption(iac as string[]),
    effect,
    authToken,
    azdoOptions: azdoOptions.data,
    directory: targetDirectory,
    recurse
  })

  if (inputs.error) {
    throw new ClientError('Invalid inputs received for "on-schedule" command', ExitCode.INVALID_ARGUMENTS)
  }

  return await resolveOnSchedule(inputs.data)
}

export const handleOnPullRequestCommand = async (argv: Arguments) => {
  // argv._[0] -> EffectCommand (submit-for-review, preview)
  // argv._[1] -> EventCommand (on-pull-request, on-schedule)
  const [effectCommand, eventCommand] = argv._
  if (eventCommand != EventCommand.ON_PULL_REQUEST ||
    typeof effectCommand != 'string') {
    throw new ClientError('Improper use of the on_pull_request command handler', ExitCode.INVALID_ARGUMENTS)
  }

  const effect = getValidEffectCommand(effectCommand)

  const {
    iac,
    authToken,
    targetDirectories,
    pullRequest,
    azdoOrganizationName,
    azdoCollectionUri,
  } = argv

  const azdoOptions = zAzdoOptions.safeParse({
    azdoBaseUrl: azdoCollectionUri,
    azdoOrganizationName
  })

  const inputs = zOnPullRequestInputs.safeParse({
    iacTools: translateIacOption(iac as string[]),
    authToken,
    effect,
    azdoOptions: azdoOptions.data,
    scenarioPaths: targetDirectories,
    pullRequestIdentifier: pullRequest
  })

  if (inputs.error) {
    throw new ClientError('Invalid inputs received for "on-pull-request" command', ExitCode.INVALID_ARGUMENTS)
  }

  return await resolveOnPullRequest(inputs.data)
}
