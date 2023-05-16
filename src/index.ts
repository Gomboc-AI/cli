#! /usr/bin/env node

import { hideBin } from 'yargs/helpers'
import { cliScanCfn } from './cli.js'

import yargs from 'yargs'

  
const usage = "\nUsage: gomboc [command] <options>"
// Setting CLI command and options
await yargs(hideBin(process.argv))
  .usage(usage)
  .option("config", {
    describe: "The filepath to the Gomboc.ai config YAML file",
    type: "string",
    demandOption: true
  })
  .option("id-token", {
    describe: "An authentication ID token",
    type: "string",
    demandOption: false
  })
  .option("secret-access-key", {
    describe: "Required for Gomboc Auth",
    type: "string",
    demandOption: false
  })
  .option("api-url", {
    describe: "The URL of the API endpoint",
    type: "string",
    default: "https://scan.gomboc.ai/graphql",
    hidden: true,
    demandOption: false
  })
  .option("output", {
    describe: "What format to output",
    type: "string",
    default: "text",
    demandOption: false,
    choices: ['text', 'json'],
  })
  .option("gh-access-token", {
    describe: "[GitHub] Access token",
    type: "string",
    demandOption: false
  })
  .option("gh-create-pr", {
    describe: "[GitHub] Create a Pull Request with remediations -- only for simple remediations",
    type: "boolean",
    demandOption: false
  })
  .option("gh-commit-on-current-branch", {
    describe: "[GitHub] Commit remediations in existing PR -- only for simple remediations",
    type: "boolean",
    demandOption: false
  })
  .option("gh-create-comments-with-code-suggestions", {
    describe: "[GitHub] Create comments with code suggestions -- only for simple remediations",
    type: "boolean",
    demandOption: false
  })
  .option("gh-ref", {
    describe: "[GitHub] Full ref to the branch -- only for Gomboc Auth",
    type: "string",
    demandOption: false
  })
  .option("gh-repository", {
    describe: "[GitHub] Full repository name -- only for Gomboc Auth",
    type: "string",
    demandOption: false
  })
  .option("gh-repository-owner", {
    describe: "[GitHub] Repository owner -- only for Gomboc Auth",
    type: "string",
    demandOption: false
  })
  .option("gh-sha", {
    describe: "[GitHub] Commit SHA -- only for Gomboc Auth",
    type: "string",
    demandOption: false
  })
  .option("gl-access-token", {
    describe: "[GitLab] Access token",
    type: "string",
    demandOption: false
  })
  .option("gl-create-mr", {
    describe: "[GitLab] Create a Merge Request with remediations -- only for simple remediations",
    type: "boolean",
    demandOption: false
  })
  .option("gl-commit-on-current-branch", {
    describe: "[GitLab] Commit remediations in existing MR -- only for simple remediations",
    type: "boolean",
    demandOption: false
  })
  .option("gl-create-comments-with-code-suggestions", {
    describe: "[GitLab] Create comments with code suggestions -- only for simple remediations",
    type: "boolean",
    demandOption: false
  })
  .option("gl-namespace-path", {
    describe: "[GitLab] The namespace path -- only for Gomboc Auth",
    type: "string",
    demandOption: false
  })
  .option("gl-project-id", {
    describe: "[GitLab] The project id -- only for Gomboc Auth",
    type: "string",
    demandOption: false
  })
  .option("gl-project-path", {
    describe: "[GitLab] The project path -- only for Gomboc Auth",
    type: "string",
    demandOption: false
  })
  .option("gl-ref", {
    describe: "[GitLab] Full ref to the branch -- only for Gomboc Auth",
    type: "string",
    demandOption: false
  })
  .option("gl-sha", {
    describe: "[GitLab] Commit SHA -- only for Gomboc Auth",
    type: "string",
    demandOption: false
  })
  .command(
    'run',
    '\tGomboc.ai CloudFormation CLI',
    (yargs) => {
      yargs.check(async (argv)=>{
        const scan = await cliScanCfn(argv)
        // scan is the exit code
        process.exitCode = scan as number
        return true
      })
    }
  )
  .showHelpOnFail(false)
  .help(true)
  .version(true)
  .argv

const index = async () => {
}


export default index