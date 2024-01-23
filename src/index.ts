#! /usr/bin/env node

import yargs, { Argv } from 'yargs'
import { hideBin } from 'yargs/helpers'
import { cliTerraformRemediateRemoteCheck } from './cli/interfaces/remediate.js'
import { EffectCommand, VerbCommand, ServiceCommand, SourceCommand } from './cli/commands.js'


const addExecuteCheck = (argv: Argv, callableCheck: CallableFunction) => {
  // If reached, this check will execute the CLI and set an exit code
  argv.check(async (argv) => {
    process.exitCode = await callableCheck(argv) as number
    return true
  }, false)
}

const addOutputOption = (argv: Argv) => {
  argv.option("output", {
    describe: "What format to output",
    type: "string",
    default: "text",
    demandOption: false,
    choices: ['text', 'json'],
  })
}

const addAuthTokenOption = (argv: Argv, demandOption: boolean) => {
  argv.option("auth-token", {
    describe: "An authentication auth token",
    type: "string",
    demandOption
  })
}

const addAccessTokenOption = (argv: Argv) => {
  argv.option("access-token", {
    describe: "Access token to perform action to actions",
    type: "string",
    demandOption: false,
    hidden: true,
    deprecated: 'Not needed -- will be removed in future versions',
  })
}

// Setting CLI command and options
await yargs(hideBin(process.argv))
  .command(
    ServiceCommand.TERRAFORM,
    '\tGomboc.AI Terraform service',
    (yargs) => {
      yargs.command(
        VerbCommand.REMEDIATE,
        '\tRemediate Terraform code',
        (yargs) => {
          yargs.command(
            SourceCommand.REMOTE,
            '\tRemediate Remote Terraform code',
            (yargs) => {
              yargs.command(
                EffectCommand.SUBMIT_FOR_REVIEW,
                '\tRemediate Remote Terraform code',
                (yargs) => {
                  addExecuteCheck(yargs, cliTerraformRemediateRemoteCheck)
                }
              )
              yargs.command(
                EffectCommand.DIRECT_APPLY,
                '\tRemediate Remote Terraform code',
                (yargs) => {
                  addExecuteCheck(yargs, cliTerraformRemediateRemoteCheck)
                }
              )
              yargs.demandCommand(1, 'Specify an action [direct-apply, submit-for-review]')
            }
          )
          addAccessTokenOption(yargs)
          yargs.demandCommand(1, 'Specify a source [remote]')
        }
      )
      yargs.option("working-directory", {
          alias: "wd",
          describe: "The root directory for the Terraform configuration",
          type: "string",
          default: "",
          demandOption: true
        }
      )
      addAuthTokenOption(yargs, true)
      addOutputOption(yargs)
      yargs.demandCommand(1, 'Specify a verb [remediate]')
    }
  )
  .demandCommand()
  .strict()
  .version()
  .argv

// eslint-disable-next-line @typescript-eslint/no-empty-function
const index = async () => {
}

export default index
