#! /usr/bin/env node

import yargs, { Argv } from 'yargs'
import { hideBin } from 'yargs/helpers'
import { EffectCommand, EventCommand, IacOptions } from './cli/commands.js'
import { RECURSE_DEFAULT, TARGET_DIRECTORIES_DEFAULT, TARGET_DIRECTORY_DEFAULT } from './default.js'
import { handleOnPullRequestCommand, handleOnScheduleCommand } from './cli/interfaces/remediate.js'
import { ConsoleLogger } from './utils/ConsoleLogger.js'
import { ExitCode } from './cli/exitCodes.js'
import { hl } from './utils/consoleUtils.js'

const addAuthTokenOption = (argv: Argv, demandOption: boolean) => {
  argv.option("auth-token", {
    describe: "An authentication auth token",
    type: "string",
    demandOption,
  })
}

const addPullRequestOption = (argv: Argv) => {
  argv.option("pull-request", {
    alias: 'pr',
    describe: "The pull request identifier (e.g. number)",
    type: "string",
    demandOption: true,
  })
}

const addTargetDirectoriesOption = (argv: Argv) => {
  argv.option("target-directories", {
    alias: "tds",
    default: TARGET_DIRECTORIES_DEFAULT,
    describe: "Directories with IaC files that will be scanned",
    array: true,
    type: "array",
    demandOption: false
  })
}

const addTargetDirectoryOption = (argv: Argv) => {
  argv.option("target-directory", {
    default: TARGET_DIRECTORY_DEFAULT,
    alias: "td",
    describe: "Single directory with IaC files that will be scanned",
    type: "string",
    demandOption: false
  })
}

const addRecurseOption = (argv: Argv) => {
  argv.option("recurse", {
    default: RECURSE_DEFAULT,
    describe: "Recurse through directories starting from the target-directory",
    type: 'boolean',
    demandOption: false,
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

const addInfrastructureToolOption = (argv: Argv) => {
  argv.option("iac", {
    array: true,
    describe: "A list of the IaC we should remediate",
    type: "array",
    demandOption: true,
    choices: [IacOptions.CLOUDFORMATION, IacOptions.TERRAFORM]
  })
}

type YargType = Argv<any>

const onPullRequestCommand = (yargs: YargType) => {
  yargs.command(
    EventCommand.ON_PULL_REQUEST,
    '\tRemediate on pull requests',
    (yargs) => {
      addPullRequestOption(yargs)
      addTargetDirectoriesOption(yargs)
    },
    async (args) => {
      const suppressError = args.$0 === EffectCommand.AUDIT
      try {
        console.log('---onPullRequestCommand')
        await handleOnPullRequestCommand(args)
      } catch (error: any) {
        const cl = new ConsoleLogger()
        cl.err(ExitCode.COMMAND_ERROR, error.message)
        if (suppressError) {
          return yargs.exit(ExitCode.SUCCESS, new Error(
            `${hl('SUPPRESSED ERROR')}:  ${error.message}`
          ))
        }
        return yargs.exit(error?.code ?? ExitCode.COMMAND_ERROR, error)
      }
    }
  )
}

const onScheduleCommand = (yargs: YargType) => {
  yargs.command(
    EventCommand.ON_SCHEDULE,
    '\tRemediate on schedule',
    (yargs) => {
      addRecurseOption(yargs)
      addTargetDirectoryOption(yargs)
    },
    async (args) => {
      const suppressError = args.$0 === EffectCommand.AUDIT
      try {
        console.log('---onPullRequestCommand')
        await handleOnScheduleCommand(args)
      } catch (error: any) {
        const cl = new ConsoleLogger()
        cl.err(ExitCode.COMMAND_ERROR, error.message)
        if (suppressError) {
          yargs.exit(ExitCode.SUCCESS, new Error(
            `${hl('SUPPRESSED ERROR')}:  ${error.message}`
          ))
        }
        yargs.exit(ExitCode.COMMAND_ERROR, error)
      }
    }
  )
}

// Setting CLI command and options
await yargs(hideBin(process.argv))
  .command(
    EffectCommand.SUBMIT_FOR_REVIEW,
    '\tSubmit a PR for IaC code',
    (yargs) => {
      onScheduleCommand(yargs)
      onPullRequestCommand(yargs)
      yargs.demandCommand(1, 1, 'Specify an action [on-pull-request, on-schedule]')

      addAzdoCollectionUriOption(yargs)
      addAzdoOrganizationNameOption(yargs)
      addInfrastructureToolOption(yargs)
      addAuthTokenOption(yargs, true)
    }
  )
  .command(
    EffectCommand.AUDIT,
    '\tReview IaC code without blocking CI or submitting a PR',
    (yargs) => {
      onScheduleCommand(yargs)
      onPullRequestCommand(yargs)
      yargs.demandCommand(1, 1, 'Specify an action [on-pull-request, on-schedule]')

      addAzdoCollectionUriOption(yargs)
      addAzdoOrganizationNameOption(yargs)
      addInfrastructureToolOption(yargs)
      addAuthTokenOption(yargs, true)
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
