import { Client, ClientError } from '../apiclient/client'
import { ConsoleLogger } from '../utils/ConsoleLogger'
import { ExitCode } from '../cli/exitCodes'
import { hl, checkMark, formatTitle, hlSuccess } from '../utils/consoleUtils'
import { CLI_VERSION } from '../cli/version'
import { Effect, Language, ScmRunnerScanStatus } from '../apiclient/gql/graphql'
import { z } from 'zod'


const cl = new ConsoleLogger()

export const languageCliEnumValues = Object.values(Language).map((l) =>
  l.toLowerCase()
) as [string, ...string[]]

const cliLanguageToCustomerApiLanguage = new Map<string, Language>(
  Object.values(Language).map((l) => [l.toLowerCase(), l])
)

const translateCliLanguagesToCustomerApiLanguages = (
  cliLanguages: readonly string[]
): Language[] =>
  cliLanguages.map((cli) => {
    const lang = cliLanguageToCustomerApiLanguage.get(cli)
    if (lang === undefined) {
      throw new Error(`Unknown CLI language: ${cli}`)
    }
    return lang
  })

export const zAzdoOptions = z.object({
  azdoBaseUrl: z.string(),
  azdoOrganizationName: z.string()
})

export const zBaseInputs = z.object({
  languages: z.array(z.enum(languageCliEnumValues)),
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


const handleScanResult = (status: ScmRunnerScanStatus) => {
  switch (status) {
    case ScmRunnerScanStatus.SucceededWithFixes:
      cl.log(hlSuccess(`Scan completed - some fixes require your attention`))
      throw new ClientError('Please review PR(s) with fixes and retry', ExitCode.SUCCEEDED_WITH_FIXES)
    case ScmRunnerScanStatus.SucceededWithoutFixes:
      cl.log(hlSuccess(`Scan completed - no fixes needed`))
      return
    case ScmRunnerScanStatus.Failed:
      cl.log(`Scan failed - please check the logs above for details`)
      return
  }
}


export const resolveOnSchedule = async (inputs: OnScheduleInputs) => {
  const {
    languages,
    authToken,
    effect,
    azdoOptions,
    recurse,
  } = inputs
  const apiLanguages = translateCliLanguagesToCustomerApiLanguages(languages)
  const client = new Client(apiLanguages, authToken, azdoOptions)

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

  const scanResult = await client.scanOnScheduleMutationCall({
    ...inputs,
    languages: apiLanguages,
  })
  const { scanRequestId: scmRunnerScanId } = scanResult.scanOnSchedule

  const status = await client.getScmRunnerScan({ scmRunnerScanId })
  handleScanResult(status)
}

export const resolveOnPullRequest = async (inputs: OnPullRequestInputs) => {
  const {
    languages,
    authToken,
    azdoOptions,
    scenarioPaths,
  } = inputs

  const apiLanguages = translateCliLanguagesToCustomerApiLanguages(languages)
  const client = new Client(apiLanguages, authToken, azdoOptions)
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

  const scanResult = await client.scanOnPullRequestMutationCall({
    ...inputs,
    languages: apiLanguages,
  })
  const { scanRequestId: scmRunnerScanId } = scanResult.scanOnPullRequest

  const status = await client.getScmRunnerScan({ scmRunnerScanId })
  handleScanResult(status)
}
