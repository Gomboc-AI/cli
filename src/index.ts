#! /usr/bin/env node

import yargs, { Argv } from 'yargs'
import { hideBin } from 'yargs/helpers'
import { clRemediateRemoteCheck } from './cli/interfaces/remediate.js'
import { EffectCommand, VerbCommand, ServiceCommand, SourceCommand } from './cli/commands.js'


const addExecuteCheck = (argv: Argv, callableCheck: CallableFunction) => {
  // If reached, this check will execute the CLI and set an exit code
  argv.check(async (argv) => {
    process.exitCode = await callableCheck(argv) as number
    return true
  }, false)
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

const addWorkingDirectoryOption = (argv: Argv) => {
  argv.option("working-directory", {
    alias: "wd",
    describe: "The root directory for the Terraform configuration",
    type: "string",
    demandOption: false,
    hidden: true,
    deprecated: 'Not needed -- will be removed in future versions',
  })
}

const addTargetDirectoriesOption = (argv: Argv) => {
  argv.option("target-directories", {
    alias: "td",
    describe: "The target directories with IaC files",
    array: true,
    type: "string",
    demandOption: false // Change to true in the future when we remove the working-directory option
  })
}

const addAzdoCollectionUriOption = (argv: Argv) => {
  argv.option("azdo-collection-uri", {
    alias: "azuri",
    describe: "The base URI that is in the form https://dev.azure.com/{organizationName}/ and is provided by the System.TeamFoundationCollectionUri variable",
    type: "string",
    demandOption: false
  })
}

const addAzdoOrganizationNameOption = (argv: Argv) => {
  argv.option("azdo-organization-name", {
    alias: "azname",
    describe: "The Azdo organization name",
    type: "string",
    demandOption: false
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
                  addExecuteCheck(yargs, clRemediateRemoteCheck)
                }
              )
              yargs.command(
                EffectCommand.DIRECT_APPLY,
                '\tRemediate Remote Terraform code',
                (yargs) => {
                  addExecuteCheck(yargs, clRemediateRemoteCheck)
                }
              )
              yargs.demandCommand(1, 'Specify an action [direct-apply, submit-for-review]')
            }
          )
          addAccessTokenOption(yargs)
          yargs.demandCommand(1, 'Specify a source [remote]')
        }
      )
      addTargetDirectoriesOption(yargs)
      addWorkingDirectoryOption(yargs)
      addAzdoCollectionUriOption(yargs)
      addAzdoOrganizationNameOption(yargs)
      addAuthTokenOption(yargs, true)
      yargs.demandCommand(1, 'Specify a verb [remediate]')
    }
  )
  .command(
    ServiceCommand.CLOUDFORMATION,
    '\tGomboc.AI CloudFormation service',
    (yargs) => {
      yargs.command(
        VerbCommand.REMEDIATE,
        '\tRemediate CloudFormation code',
        (yargs) => {
          yargs.command(
            SourceCommand.REMOTE,
            '\tRemediate Remote CloudFormation code',
            (yargs) => {
              yargs.command(
                EffectCommand.SUBMIT_FOR_REVIEW,
                '\tRemediate Remote CloudFormation code',
                (yargs) => {
                  addExecuteCheck(yargs, clRemediateRemoteCheck)
                }
              )
              yargs.command(
                EffectCommand.DIRECT_APPLY,
                '\tRemediate Remote Terraform code',
                (yargs) => {
                  addExecuteCheck(yargs, clRemediateRemoteCheck)
                }
              )
              yargs.demandCommand(1, 'Specify an action [direct-apply, submit-for-review]')
            }
          )
          addAccessTokenOption(yargs)
          yargs.demandCommand(1, 'Specify a source [remote]')
        }
      )
      addTargetDirectoriesOption(yargs)
      addWorkingDirectoryOption(yargs)
      addAzdoCollectionUriOption(yargs)
      addAzdoOrganizationNameOption(yargs)
      addAuthTokenOption(yargs, true)
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
