#! /usr/bin/env node

import yargs, { Argv } from 'yargs'
import { hideBin } from 'yargs/helpers'
import { EffectCommand, EventCommand } from './cli/commands'
import { Language } from './apiclient/gql/graphql'
import { RECURSE_DEFAULT, TARGET_DIRECTORIES_DEFAULT, TARGET_DIRECTORY_DEFAULT } from './default'
import { handleOnPullRequestCommand, handleOnScheduleCommand } from './cli/interfaces/remediate'
import { ConsoleLogger } from './utils/ConsoleLogger'
import { ExitCode } from './cli/exitCodes'
import { ClientError } from './apiclient/client'
import { hl } from './utils/consoleUtils'
import { languageCliEnumValues } from './resolvers/remediateRemote'

const addFormatOption =  (argv: Argv) => {
  argv.option("format", {
    describe: "Automatically formats the IaC files",
    type: "boolean",
  })
}

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

const addLanguagesOption = (argv: Argv) => {
  argv.option("languages", {
    alias: "iac",
    array: true,
    describe: "Languages to remediate",
    type: "array",
    demandOption: true,
    choices: languageCliEnumValues
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
        await handleOnPullRequestCommand(args)
      } catch (error) {
        const cl = new ConsoleLogger()
        const err = error instanceof ClientError ? error : null
        const message = err?.message ?? 'An unexpected error occurred'
        const code = err?.code ?? ExitCode.COMMAND_ERROR
        cl.err(code, message)
        if (suppressError) {
          return yargs.exit(ExitCode.SUCCESS, new Error(
            `${hl('SUPPRESSED ERROR')}:  ${message}`
          ))
        }
        if (code !== ExitCode.SUCCEEDED_WITH_FIXES && code !== ExitCode.INVALID_ARGUMENTS && code !== ExitCode.FAILED_SCAN) {
          return yargs.exit(ExitCode.SUCCESS, new Error(
            `${hl('INTERNAL SERVER ERROR')}:  ${message}`
          ))
        }
        return yargs.exit(code, err ?? new Error(message))
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
        await handleOnScheduleCommand(args)
      } catch (error) {
        const cl = new ConsoleLogger()
        const err = error instanceof ClientError ? error : null
        const message = err?.message ?? 'An unexpected error occurred'
        const code = err?.code ?? ExitCode.COMMAND_ERROR
        cl.err(code, message)
        if (suppressError) {
          yargs.exit(ExitCode.SUCCESS, new Error(
            `${hl('SUPPRESSED ERROR')}:  ${message}`
          ))
        }
        if (code !== ExitCode.SUCCEEDED_WITH_FIXES && code !== ExitCode.INVALID_ARGUMENTS && code !== ExitCode.FAILED_SCAN) {
          return yargs.exit(ExitCode.SUCCESS, new Error(
            `${hl('INTERNAL SERVER ERROR')}:  ${message}`
          ))
        }
        yargs.exit(code, err ?? new Error(message))
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
      addLanguagesOption(yargs)
      addAuthTokenOption(yargs, true)
      addFormatOption(yargs)
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
      addLanguagesOption(yargs)
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
