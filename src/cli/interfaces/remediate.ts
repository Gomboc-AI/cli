import { resolve as resolveRemediateRemoteTfCode, Inputs as RemediateRemoteTfCodeInputs, Action } from "../../resolvers/remediateRemoteTfCode.js"
import { ExitCode } from "../exitCodes.js"
import { ActionCommand } from "../commands.js"
import { ConsoleLogger } from "../../utils/ConsoleLogger.js"
import { hl } from "../../utils/consoleUtils.js"
import { Arguments } from "yargs"


export const cliTerraformRemediateRemoteCheck = async (argv: Arguments): Promise<ExitCode> => {
  try {
    if(argv.submitForReview && argv.directApply) { throw new Error(`Conflicting actions. Select ${hl('submit-for-review')} OR ${hl('direct-apply')}`) }
    if(!argv.submitForReview && !argv.directApply) { throw new Error(`No action passed. Select ${hl('submit-for-review')} OR ${hl('direct-apply')}`) }

    if(process.env.API_URL){
      console.log(`..:: Running against local URL: ${process.env.API_URL}!`)
    }

    const inputs: RemediateRemoteTfCodeInputs = {
      authToken: argv.authToken as string,
      output: argv.output as string,
      apiUrl: process.env.API_URL ?? "https://scan.gomboc.ai/graphql",
      config: argv.config as string,
      workingDirectory: argv.workingDirectory as string,
      action: argv._[3] as Action,
      accessToken: argv.accessToken as string
    }

    console.log(inputs)
    return await resolveRemediateRemoteTfCode(inputs)

  } catch (error: any) {
    const cl = new ConsoleLogger()
    cl.err(ExitCode.COMMAND_ERROR, error.message, [])
    return new Promise(() => { ExitCode.COMMAND_ERROR })
  }
}