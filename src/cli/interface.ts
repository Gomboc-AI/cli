import { resolve as resolveScanCfnTemplateExt, Inputs as ScanCfnTemplateExtInputs } from "../resolvers/scanCfnTemplateExt.js"
import { resolve as resolveScanTfPlanExt, Inputs as ScanTfPlanExtInputs } from "../resolvers/scanTfPlanExt.js"
import { resolve as resolveRemediateRemoteTfCode, Inputs as RemediateRemoteTfCodeInputs, Action } from "../resolvers/remediateRemoteTfCode.js"
import { ExitCode } from "./exitCodes.js"
import { ActionCommand, ServiceCommand, ClientCommand, SourceCommand } from "./commands.js"
import { getGitHubInfo, GitInfo } from "../utils/gitUtils.js"
import { ConsoleLogger } from "../utils/ConsoleLogger.js"
import { hl } from "../utils/consoleUtils.js"
import { Arguments } from "yargs"
import { ActionOptions } from "./options.js"


type CLIScanInputs = ScanCfnTemplateExtInputs | ScanTfPlanExtInputs

const getCommonInputs = (argv: any): CLIScanInputs => {
  if(argv.authToken && argv.secretAccessKey) { throw new Error(`Conflicting options. Select ${hl('auth-token')} OR ${hl('secret-access-key')}`) }
  if(!argv.authToken && !argv.secretAccessKey) { throw new Error(`No auth credentials passed. Select ${hl('auth-token')} OR ${hl('secret-access-key')}`) }

  if(process.env.API_URL){
    console.log(`..:: Running against local URL: ${process.env.API_URL}!`)
  }
  return {
    authToken: argv.authToken as string,
    secretAccessKey: argv.secretAccessKey as string,
    output: argv.output as string,
    apiUrl: process.env.API_URL ?? "https://scan.gomboc.ai/graphql",
    config: argv.config as string,
  }
}

const completeGitFields = async (argv: any): Promise<any> => {
  let info: GitInfo
  
  try {
    info = await getGitHubInfo()
  } catch (e) {
    return argv
  }

  const filledArgv = {
    ...argv,
    ref: argv.ref ?? info.ref,
    sha: argv.sha ?? info.sha,
    repository: argv.repository ?? info.repository,
    repositoryOwner: argv.repositoryOwner ?? info.repositoryOwner,
  }

  return filledArgv
}

const addGitHubInputs = async (inputs: CLIScanInputs, argv: Arguments): Promise<void> => {
  if (argv.accessToken == null) { throw new Error(`Missing an ${hl('access-token')} for GitHub`) }
  if(argv.createPr && argv.commitOnCurrentBranch) { throw new Error(`Conflicting options. Select ${hl('create-pr')} OR ${hl('commit-on-current-branch')}`) }
  if(!argv.createPr && !argv.commitOnCurrentBranch) { throw new Error(`No options passed. Select ${hl('create-pr')} OR ${hl('commit-on-current-branch')}`) }

  inputs.gitHubOptions = { accessToken: argv.accessToken as string }
  let _completeGitArgs = false

  if (argv.createPr) {
    inputs.gitHubOptions.createPR = true
    _completeGitArgs = true
  }
  if (argv.commitOnCurrentBranch) {
    inputs.gitHubOptions.commitOnCurrentBranch = true
    _completeGitArgs = true
  }
  /// If any of the arguments to generate side effects is non null, 
  /// try to fill the arguments with the git info if possible.
  if (_completeGitArgs) {
    argv = await completeGitFields(argv)
  }  
  if (argv.ref) {
    inputs.gitHubOptions.ref = argv.ref as string
  }
  if (argv.sha) {
    inputs.gitHubOptions.sha = argv.sha as string
  }
  if (argv.repository) {
    inputs.gitHubOptions.repository = argv.repository as string
  }
  if (argv.repositoryOwner) {
    inputs.gitHubOptions.repositoryOwner = argv.repositoryOwner as string
  }
}

const addGitLabInputs = (inputs: CLIScanInputs, argv: Arguments): void => {
  if (argv.accessToken == null) { throw new Error(`Missing an ${hl('access-token')} for GitLab`) }
  if(!argv.createMr) { throw new Error(`No options passed. Select ${hl('create-mr')}`) }

  inputs.gitLabOptions = { accessToken: argv.accessToken as string }
  if (argv.createMr) {
    inputs.gitLabOptions.createMR = true
  }
  // Auth options for Gomboc Auth
  if (argv.ref) {
    inputs.gitLabOptions.ref = argv.ref as string
  }
  if (argv.sha) {
    inputs.gitLabOptions.sha = argv.sha as string
  }
  if (argv.projectId) {
    inputs.gitLabOptions.projectId = argv.projectId as string
  }
  if (argv.projectPath) {
    inputs.gitLabOptions.projectPath = argv.projectPath as string
  }
  if (argv.namespacePath) {
    inputs.gitLabOptions.namespacePath = argv.namespacePath as string
  }
}

export const cliScanCheck = async (argv: Arguments): Promise<ExitCode> => {
  try {
    const inputs: CLIScanInputs = getCommonInputs(argv)

    const action = argv._[0]
    if (action === ActionCommand.SCAN) {
      // Add client specific inputs
      const client = argv._[2]
      if (client === ClientCommand.GITHUB) { await addGitHubInputs(inputs, argv) }
      else if (client === ClientCommand.GITLAB) { addGitLabInputs(inputs, argv) }

      // Add service specific inputs and call scans
      const service = argv._[1]
      if (service === ServiceCommand.CLOUDFORMATION) {
        const cfnInputs = inputs as ScanCfnTemplateExtInputs
        // no CloudFormation specific options to add
        return await resolveScanCfnTemplateExt(cfnInputs)
      } else if (service === ServiceCommand.TERRAFORM) {
        const tfInputs = inputs as ScanTfPlanExtInputs
        tfInputs.plan = argv.tfPlan as string
        tfInputs.workingDirectory = argv.tfDirectory as string
        return await resolveScanTfPlanExt(tfInputs)
      }
    }
  } catch (error: any) {
    const cl = new ConsoleLogger()
    cl.err(ExitCode.COMMAND_ERROR, error.message, [])
    return new Promise(() => { ExitCode.COMMAND_ERROR })
  }
  return new Promise(() => { ExitCode.CLIENT_ERROR })
}

export const cliRemediateCheck = async (argv: Arguments): Promise<ExitCode> => {
  try {
    if(process.env.API_URL){
      console.log(`..:: Running against local URL: ${process.env.API_URL}!`)
    }
    const inputs: RemediateRemoteTfCodeInputs = {
      authToken: argv.authToken as string,
      output: argv.output as string,
      apiUrl: process.env.API_URL ?? "https://scan.gomboc.ai/graphql",
      config: argv.config as string,
      workingDirectory: argv.workingDirectory as string,
      action: argv.action==ActionOptions.DIRECT_APPLY ? Action.DirectApply : Action.SubmitForReview,
      accessToken: argv.accessToken as string
    }
    const action = argv._[0]
    if (action === ActionCommand.REMEDIATE) {
      // Add client specific inputs
      const source = argv._[1]
      if (source === SourceCommand.REMOTE) { 
        // Add service specific inputs and call scans
        const service = argv._[2]
        if (service === ServiceCommand.TERRAFORM) {
          const tfInputs = inputs as RemediateRemoteTfCodeInputs
          tfInputs.workingDirectory = argv.tfDirectory as string
          return await resolveRemediateRemoteTfCode(tfInputs)
        }
      }
    }
  } catch (error: any) {
    const cl = new ConsoleLogger()
    cl.err(ExitCode.COMMAND_ERROR, error.message, [])
    return new Promise(() => { ExitCode.COMMAND_ERROR })
  }
  return new Promise(() => { ExitCode.CLIENT_ERROR })
}