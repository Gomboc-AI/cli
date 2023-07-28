import { resolve as resolveRemediateRemoteTfHCL2, Inputs as RemediateRemoteTfHCL2Inputs } from "../../resolvers/remediateRemoteTfHCL2.js"
import { ExitCode } from "../exitCodes.js"
import { EffectCommand } from "../commands.js"
import { ConsoleLogger } from "../../utils/ConsoleLogger.js"
import { Arguments } from "yargs"
import { Effect } from "../../apiclient/__generated__/GlobalTypes.js"
import { settings } from "../../settings.js"


export const cliTerraformRemediateRemoteCheck = async (argv: Arguments): Promise<ExitCode> => {
  try {
    if(process.env.API_URL){
      console.log(`..:: Running against local URL: ${process.env.API_URL}!`)
    }

    // argv._[0] -> ServiceCommand (cloudformation, terraform)
    // argv._[1] -> VerbCommand (scan, remediate)
    // argv._[2] -> SourceCommand (remote, local)
    // argv._[3] -> EffectCommand (submit-for-review, direct-apply)

    const inputs: RemediateRemoteTfHCL2Inputs = {
      authToken: argv.authToken as string,
      output: argv.output as string,
      serverUrl: settings.SERVER_URL,
      workingDirectory: argv.workingDirectory as string,
      effect: argv._[3]== EffectCommand.SUBMIT_FOR_REVIEW ? Effect.SubmitForReview : Effect.DirectApply,
      accessToken: argv.accessToken as string
    }

    return await resolveRemediateRemoteTfHCL2(inputs)

  } catch (error: any) {
    const cl = new ConsoleLogger()
    cl.err(ExitCode.COMMAND_ERROR, error.message, [])
    return new Promise(() => { ExitCode.COMMAND_ERROR })
  }
}