#! /usr/bin/env node

import yargs, { Argv } from 'yargs'
import { hideBin } from 'yargs/helpers'
import { cliScanCheck } from './cli/interfaces/scan.js'
import { cliTerraformRemediateRemoteCheck } from './cli/interfaces/remediate.js'
import { ActionCommand, VerbCommand, ServiceCommand, ClientCommand, SourceCommand } from './cli/commands.js'


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

const addAccessTokenOption = (argv: Argv, demandOption: boolean) => {
  argv.option("access-token", {
    describe: "Access token to perform action to actions",
    type: "string",
    demandOption,
  })
}

const addConfigOption = (argv: Argv) => {
  argv.option("config", {
    describe: "The filepath to the Gomboc.AI config YAML file",
    type: "string",
    demandOption: true
  })
}

const addGitHubOptionsBuilder = (yargs: Argv) => {
  addAccessTokenOption(yargs, false)

  yargs.option("create-pr", {
    describe: "Create a Pull Request with remediations",
    type: "boolean",
    demandOption: false
  })
  .option("commit-on-current-branch", {
    describe: "Commit a remediation in the current branch",
    type: "boolean",
    demandOption: false
  })
  .option("ref", {
    describe: "Full ref to the branch -- if auth-token is not supplied",
    type: "string",
    demandOption: false
  })
  .option("sha", {
    describe: "Commit SHA -- if auth-token is not supplied",
    type: "string",
    demandOption: false
  })
  .option("repository", {
    describe: "Full repository name -- if auth-token is not supplied",
    type: "string",
    demandOption: false
  })
  .option("repository-owner", {
    describe: "Repository owner -- if auth-token is not supplied",
    type: "string",
    demandOption: false
  })
}

const addGitLabOptionsBuilder = (yargs: Argv) => {
  addAccessTokenOption(yargs, false)

  yargs.option("create-mr", {
    describe: "Create a Merge Request with remediations",
    type: "boolean",
    demandOption: false
  })
  .option("namespace-path", {
    describe: "The namespace path -- if auth-token is not supplied",
    type: "string",
    demandOption: false
  })
  .option("project-id", {
    describe: "The project id -- if auth-token is not supplied",
    type: "string",
    demandOption: false
  })
  .option("project-path", {
    describe: "The project path -- if auth-token is not supplied",
    type: "string",
    demandOption: false
  })
  .option("ref", {
    describe: "Full ref to the branch -- if auth-token is not supplied",
    type: "string",
    demandOption: false
  })
  .option("sha", {
    describe: "Commit SHA -- if auth-token is not supplied",
    type: "string",
    demandOption: false
  })
}

// Setting CLI command and options
await yargs(hideBin(process.argv))
  .command(
    VerbCommand.SCAN,
    '\tGomboc.AI scan service',
    (yargs) => {
      yargs.command(
        ServiceCommand.CLOUDFORMATION,
        '\tScan CloudFormation templates',
        (yargs) => {
          yargs.command(
            ClientCommand.GITHUB,
            '\t...with side effects on GitHub',
            (yargs) => {
              addGitHubOptionsBuilder(yargs)
              addExecuteCheck(yargs, cliScanCheck)
            }
          ).command(
            ClientCommand.GITLAB,
            '\t...with side effects on GitLab',
            (yargs) => {
              addGitLabOptionsBuilder(yargs)
              addExecuteCheck(yargs, cliScanCheck)
            }
          )
          addExecuteCheck(yargs, cliScanCheck)
        }
      ).command(
        ServiceCommand.TERRAFORM,
        '\tScan Terraform plan',
        (yargs) => {
          yargs.command(
            ClientCommand.GITHUB,
            '\t...with side effects on GitHub',
            (yargs) => {
              addGitHubOptionsBuilder(yargs)
              addExecuteCheck(yargs, cliScanCheck)
            }
          ).command(
            ClientCommand.GITLAB,
            '\t...with side effects on GitLab',
            (yargs) => {
              addGitLabOptionsBuilder(yargs)
              addExecuteCheck(yargs, cliScanCheck)
            }
          ).option("tf-directory", {
              describe: "The root directory for the Terraform configuration",
              type: "string",
              default: "",
            }
          ).option("tf-plan", {
              describe: "A filepath to a local JSON file describing your Terraform plan (relative to tf-directory)",
              type: "string",
              demandOption: true,
            }
          )
          addExecuteCheck(yargs, cliScanCheck)
        }
      )
      .option("secret-access-key", {
        describe: "Required for Gomboc Auth",
        type: "string",
        demandOption: false
      })
      addAuthTokenOption(yargs, false)
      addConfigOption(yargs)
      addOutputOption(yargs)
      yargs.demandCommand(1, 'Specify a service [terraform OR cloudformation]')
    }
  )
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
                ActionCommand.SUBMIT_FOR_REVIEW,
                '\tRemediate Remote Terraform code',
                (yargs) => {
                  addExecuteCheck(yargs, cliTerraformRemediateRemoteCheck)
                }
              )
              yargs.command(
                ActionCommand.DIRECT_APPLY,
                '\tRemediate Remote Terraform code',
                (yargs) => {
                  addExecuteCheck(yargs, cliTerraformRemediateRemoteCheck)
                }
              )
              yargs.demandCommand(1, 'Specify an action [direct-apply, submit-for-review]')
            }
          )
          addAccessTokenOption(yargs, true)
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
