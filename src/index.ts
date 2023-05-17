#! /usr/bin/env node

import { hideBin } from 'yargs/helpers'
import { cliCheck } from './cli.js'

import { ActionCommand, ServiceCommand, ClientCommand } from './cliCommands.js'
import { hl } from './consoleUtils.js'

import yargs from 'yargs'


const addGitHubOptionsBuilder = (yargs: any) => {
  yargs.option("access-token", {
  describe: "Access token",
  type: "string",
  demandOption: false
  })
  .option("create-pr", {
    describe: "Create a Pull Request with remediations",
    type: "boolean",
    demandOption: false
  })
  .option("commit-on-current-branch", {
    describe: "Commit remediations in existing PR",
    type: "boolean",
    demandOption: false
  })
  .option("create-comments-with-code-suggestions", {
    describe: "Create comments with code suggestions",
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

const addGitLabOptionsBuilder = (yargs: any) => {
  yargs.option("access-token", {
    describe: "Access token",
    type: "string",
    demandOption: false
  })
  .option("create-mr", {
    describe: "Create a Merge Request with remediations",
    type: "boolean",
    demandOption: false
  })
  .option("commit-on-current-branch", {
    describe: "Commit remediations in existing MR",
    type: "boolean",
    demandOption: false
  })
  .option("create-comments-with-code-suggestions", {
    describe: "Create comments with code suggestions",
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

const usage = ""

// Setting CLI command and options
await yargs(hideBin(process.argv))
  .usage('Usage: gomboc scan [service] [client] <options>')
  .command(
    ActionCommand.SCAN,
    '\tGomboc.ai scan service',
    (yargs) => {
      yargs.command(
        ServiceCommand.CLOUDFORMATION,
        '\tScan CloudFormation templates',
        (yargs) => {
          yargs.command(
            ClientCommand.GITHUB,
            '\tScan CloudFormation templates on GitHub',
            (yargs) => {
              addGitHubOptionsBuilder(yargs)
              yargs.check(async (argv)=>{
                process.exitCode = await cliCheck(argv) as number
                return true
              })
          })
          .command(
            ClientCommand.GITLAB,
            '\tScan CloudFormation templates on GitLab',
            (yargs) => {
              addGitLabOptionsBuilder(yargs)
              yargs.check(async (argv)=>{
                process.exitCode = await cliCheck(argv) as number
                return true
              })
            }
          )
        }
      ).command(
        ServiceCommand.TERRAFORM,
        '\tScan Terraform plan',
        (yargs) => {
          yargs.command(
            ClientCommand.GITHUB,
            '\tScan Terraform plan on GitHub',
            (yargs) => {
              addGitHubOptionsBuilder(yargs)
              yargs.check(async (argv)=>{
                process.exitCode = await cliCheck(argv) as number
                return true
              })
          })
          .command(
            ClientCommand.GITLAB,
            '\tScan Terraform plan on GitLab',
            (yargs) => {
              addGitLabOptionsBuilder(yargs)
              yargs.check(async (argv)=>{
                process.exitCode = await cliCheck(argv) as number
                return true
              })
            }
          ).option("working-directory", {
              describe: "The root directory for the Terraform configuration",
              type: "string",
              default: "",
            }
          ).option("plan", {
              describe: "A filepath to a local JSON file describing your Terraform plan (relative to working-directory)",
              type: "string",
              demandOption: true,
            }
          )
        }
      ).option("config", {
        describe: "The filepath to the Gomboc.ai config YAML file",
        type: "string",
        demandOption: true
      })
      .option("auth-token", {
        describe: "An authentication auth token",
        type: "string",
        demandOption: false
      })
      .option("secret-access-key", {
        describe: "Required for Gomboc Auth",
        type: "string",
        demandOption: false
      })
      .option("output", {
        describe: "What format to output",
        type: "string",
        default: "text",
        demandOption: false,
        choices: ['text', 'json'],
      })
    }
  )
  .demandCommand()
  .strict()
  .version()
  .argv

const index = async () => {
}

export default index
