import { resolve as resolveRemediateRemoteTfCode, Inputs as RemediateRemoteTfCodeInputs } from "../../resolvers/remediateRemoteTfCode.js"
import { ExitCode } from "../exitCodes.js"
import { ActionCommand } from "../commands.js"
import { ConsoleLogger } from "../../utils/ConsoleLogger.js"
import { Arguments } from "yargs"
import { Action } from "../../apiclient/__generated__/GlobalTypes.js"


export const cliTerraformRemediateRemoteCheck = async (argv: Arguments): Promise<ExitCode> => {
  try {
    if(process.env.API_URL){
      console.log(`..:: Running against local URL: ${process.env.API_URL}!`)
    }

    // argv._[0] -> ServiceCommand (cloudformation, terraform)
    // argv._[1] -> VerbCommand (scan, remediate)
    // argv._[2] -> SourceCommand (remote, local)
    // argv._[3] -> ActionCommand (submit-for-review, direct-apply)

    const inputs: RemediateRemoteTfCodeInputs = {
      authToken: argv.authToken as string,
      output: argv.output as string,
      apiUrl: process.env.API_URL ?? "https://scan.gomboc.ai/graphql",
      workingDirectory: argv.workingDirectory as string,
      action: argv._[3]== ActionCommand.SUBMIT_FOR_REVIEW ? Action.SubmitForReview : Action.DirectApply,
      accessToken: argv.accessToken as string
    }

    return await resolveRemediateRemoteTfCode(inputs)

  } catch (error: any) {
    const cl = new ConsoleLogger()
    cl.err(ExitCode.COMMAND_ERROR, error.message, [])
    return new Promise(() => { ExitCode.COMMAND_ERROR })
  }
}