import { Arguments } from "yargs"

import { resolveOnSchedule, resolveOnPullRequest, zOnScheduleInputs, zAzdoOptions, zOnPullRequestInputs } from "../../resolvers/remediateRemote.js"
import { Effect, InfrastructureTool } from "../../apiclient/gql/graphql.js"
import { EffectCommand, EventCommand, IacOptions } from "../commands.js"

const getValidEffectCommand = (effectArg: string) => {
  switch (effectArg) {
    case EffectCommand.AUDIT:
      return Effect.Preview
    case EffectCommand.SUBMIT_FOR_REVIEW:
      return Effect.SubmitForReview
    default:
      throw new Error('Invalid effect command received')
  }
}

const translateIacOption = (iacOptions: string[]) => {
  const translatedIac: InfrastructureTool[] = []
  for (const option in iacOptions) {
    switch (option) {
      case IacOptions.CLOUDFORMATION:
        translatedIac.push(InfrastructureTool.Cloudformation)
        break;
      case IacOptions.TERRAFORM:
        translatedIac.push(InfrastructureTool.Terraform)
        break;
      default:
        throw new Error(`Invalid IAC tool provided: ${option}`)
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
    throw new Error('Improper use of the on_schedule command handler')
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
    throw new Error('Invalid inputs received for "on-schedule" command')
  }

  return await resolveOnSchedule(inputs.data)
}

export const handleOnPullRequestCommand = async (argv: Arguments) => {
  // argv._[0] -> EffectCommand (submit-for-review, preview)
  // argv._[1] -> EventCommand (on-pull-request, on-schedule)
  const [effectCommand, eventCommand] = argv._
  if (eventCommand != EventCommand.ON_PULL_REQUEST ||
    typeof effectCommand != 'string') {
    throw new Error('Improper use of the on_pull_request command handler')
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
    throw new Error('Invalid inputs received for "on-pull-request" command')
  }

  return await resolveOnPullRequest(inputs.data)
}
