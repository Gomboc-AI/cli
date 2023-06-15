#! /usr/bin/env node

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { cliCheck } from './cli/interface.js'

import { ActionCommand, ServiceCommand, ClientCommand } from './cli/commands.js'


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
            '\t...with side effects on GitHub',
            (yargs) => {
              addGitHubOptionsBuilder(yargs)
              yargs.check(async (argv)=>{
                process.exitCode = await cliCheck(argv) as number
                return true
              }, false)
          })
          .command(
            ClientCommand.GITLAB,
            '\t...with side effects on GitLab',
            (yargs) => {
              addGitLabOptionsBuilder(yargs)
              yargs.check(async (argv)=>{
                process.exitCode = await cliCheck(argv) as number
                return true
              }, false)
            }
          ).check(async (argv)=>{
            process.exitCode = await cliCheck(argv) as number
            return true
          }, false)
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
              yargs.check(async (argv)=>{
                process.exitCode = await cliCheck(argv) as number
                return true
              }, false)
          })
          .command(
            ClientCommand.GITLAB,
            '\t...with side effects on GitLab',
            (yargs) => {
              addGitLabOptionsBuilder(yargs)
              yargs.check(async (argv)=>{
                process.exitCode = await cliCheck(argv) as number
                return true
              }, false)
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
          ).check(async (argv)=>{
            process.exitCode = await cliCheck(argv) as number
            return true
          }, false)
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
      }).check(async (argv)=>{
        console.log('Missing required command: cloudformation or terraform')
        process.exitCode = 70
        return true
      }, false)
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
