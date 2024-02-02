import { Arguments } from "yargs"

import { resolve as resolveRemediateRemoteTfHCL2, Inputs as RemediateRemoteTfHCL2Inputs } from "../../resolvers/remediateRemoteTfHCL2.js"
import { ExitCode } from "../exitCodes.js"
import { EffectCommand } from "../commands.js"
import { ConsoleLogger } from "../../utils/ConsoleLogger.js"
import { settings } from "../../settings.js"
import { consoleDebugger } from "../../utils/ConsoleDebugger.js"
import { Effect } from "../../apiclient/gql/graphql.js"
import { hl } from "../../utils/consoleUtils.js"


export const cliTerraformRemediateRemoteCheck = async (argv: Arguments): Promise<ExitCode> => {
  try {
    // argv._[0] -> ServiceCommand (cloudformation, terraform)
    // argv._[1] -> VerbCommand (scan, remediate)
    // argv._[2] -> SourceCommand (remote, local)
    // argv._[3] -> EffectCommand (submit-for-review, direct-apply)

    const cl = new ConsoleLogger(false)

    const workingDirectoryOption = argv.workingDirectory ? argv.workingDirectory as string : undefined
    const targetDirectoriesOption = argv.targetDirectotries ? argv.targetDirectories as string[] : undefined

    const getTargetDirectories = (workingDirectoryOption: string | undefined, targetDirectoriesOption: string[] | undefined): string[] => {
      const wdPresent = workingDirectoryOption != null
      const tdPresent = targetDirectoriesOption != null
      if (wdPresent && tdPresent) {
        const msg = 'Cannot use both working-directory and target-directories options. Please use target-directories only'
        cl.err(ExitCode.INVALID_ARGUMENTS, msg)
      } else if (!wdPresent && !tdPresent) {
        const msg = 'Please specify a least one target directory'
        cl.err(ExitCode.INVALID_ARGUMENTS, msg)
      } else if (wdPresent && !tdPresent) {
        cl.log(hl('DEPRECATION NOTICE: working-directory is deprecated and will be removed in the future. Please use target-directories instead'))
        return [workingDirectoryOption]
      }
      // One case left: !wdPresent && tdPresent
      return targetDirectoriesOption as string[]
    }

    if (argv.accessToken){
      cl.log(hl('DEPRECATION NOTICE: access-token is deprecated and will be removed in the future'))
    }

    const inputs: RemediateRemoteTfHCL2Inputs = {
      authToken: argv.authToken as string,
      serverUrl: settings.SERVER_URL,
      targetDirectories: getTargetDirectories(workingDirectoryOption, targetDirectoriesOption),
      effect: argv._[3] == EffectCommand.SUBMIT_FOR_REVIEW ? Effect.SubmitForReview : Effect.DirectApply,
    }

    consoleDebugger.log('CLI inputs', inputs)

    return await resolveRemediateRemoteTfHCL2(inputs)

  } catch (error: any) {
    const cl = new ConsoleLogger()
    cl.err(ExitCode.COMMAND_ERROR, error.message)
    return new Promise(() => { ExitCode.COMMAND_ERROR })
  }
}