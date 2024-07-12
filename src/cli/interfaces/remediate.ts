import { Arguments } from "yargs"

import { resolve as resolveRemediateRemoteTfHCL2, Inputs as RemediateRemoteTfHCL2Inputs } from "../../resolvers/remediateRemoteTfHCL2.js"
import { ExitCode } from "../exitCodes.js"
import { ConsoleLogger } from "../../utils/ConsoleLogger.js"
import { settings } from "../../settings.js"
import { consoleDebugger } from "../../utils/ConsoleDebugger.js"
import { Effect } from "../../apiclient/gql/graphql.js"
import { hl } from "../../utils/consoleUtils.js"
import { EffectCommand } from "../commands.js"


export const cliTerraformRemediateRemoteCheck = async (argv: Arguments): Promise<ExitCode> => {
  try {
    // argv._[0] -> ServiceCommand (cloudformation, terraform)
    // argv._[1] -> VerbCommand (scan, remediate)
    // argv._[2] -> SourceCommand (remote, local)
    // argv._[3] -> EffectCommand (submit-for-review, direct-apply)

    const cl = new ConsoleLogger(false)

    const workingDirectoryOption = argv.workingDirectory ? argv.workingDirectory as string : null
    const targetDirectoriesOption = argv.targetDirectories ? argv.targetDirectories as string[] : null

    const getDesiredEffect = (effect: string): Effect => {
      switch (effect as EffectCommand) {
        case EffectCommand.SUBMIT_FOR_REVIEW:
          return Effect.SubmitForReview
        case EffectCommand.DIRECT_APPLY:
          return Effect.DirectApply
        default:
          throw new Error(`Invalid effect: ${effect}.`)
      }
    }

    consoleDebugger.log('CLI arguments', argv)
    /**
     * We want to make sure that only one of these two options is used
     * @param workingDirectoryOption string -- is the old option that will be removed in the future
     * @param targetDirectoriesOption string[] -- is the new option
     */
    const getTargetDirectories = (workingDirectoryOption: string | null, targetDirectoriesOption: string[] | null): string[] => {
      const bothOptionsArePresent = workingDirectoryOption != null && targetDirectoriesOption != null
      const bothOptionsAreMissing = workingDirectoryOption == null && targetDirectoriesOption == null
      const onlyOldOptionPresent = workingDirectoryOption != null && targetDirectoriesOption == null

      if (bothOptionsArePresent) {
        const msg = 'Cannot use both working-directory and target-directories options. Please use target-directories only'
        cl.err(ExitCode.INVALID_ARGUMENTS, msg)
      } else if (bothOptionsAreMissing) {
        const msg = 'Please specify a least one target directory'
        cl.err(ExitCode.INVALID_ARGUMENTS, msg)
      } else if (onlyOldOptionPresent) {
        cl.log(hl('DEPRECATION NOTICE: working-directory is deprecated and will be removed in the future. Please use target-directories instead'))
        return [workingDirectoryOption]
      }
      // One case left: only the new option was passed
      return targetDirectoriesOption as string[] // safe to coerce, TS cannot infer
    }

    if (argv.accessToken) {
      cl.log(hl('DEPRECATION NOTICE: access-token is deprecated and will be removed in the future'))
    }

    const inputs: RemediateRemoteTfHCL2Inputs = {
      authToken: argv.authToken as string,
      serverUrl: settings.SERVER_URL,
      targetDirectories: getTargetDirectories(workingDirectoryOption, targetDirectoriesOption),
      effect: getDesiredEffect(argv._[3] as string),
      azdoCollectionUri: argv.azdoCollectionUri as string
    }

    consoleDebugger.log('CLI inputs', inputs)

    return await resolveRemediateRemoteTfHCL2(inputs)

  } catch (error: any) {
    const cl = new ConsoleLogger()
    cl.err(ExitCode.COMMAND_ERROR, error.message)
    return new Promise(() => { ExitCode.COMMAND_ERROR })
  }
}