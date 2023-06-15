import { scanCfn, ScanCfnInput } from "../services/cloudformation.js"
import { scanTf, ScanTfInput } from "../services/terraform.js"
import { ExitCode } from "./exitCodes.js"
import { ActionCommand, ServiceCommand, ClientCommand } from "./commands.js"
import { getGitHubInfo, GitInfo } from "../utils/gitUtils.js"


const getCommonInputs = (argv: any): ScanCfnInput | ScanTfInput => {
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

const addGitHubInputs = async (inputs: ScanCfnInput | ScanTfInput, argv: any): Promise<void> => {
  if (argv.accessToken == null) { return }
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

const addGitLabInputs = (inputs: ScanCfnInput | ScanTfInput, argv: any): void => {
  if (argv.accessToken == null) { return }
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

export const cliCheck = async (argv?: any): Promise<ExitCode> => {
  const inputs: ScanCfnInput | ScanTfInput = getCommonInputs(argv)

  const command = argv._[0]
  if (command === ActionCommand.SCAN) {
    // Add client specific inputs
    const client = argv._[2]
    if (client === ClientCommand.GITHUB) { addGitHubInputs(inputs, argv) }
    else if (client === ClientCommand.GITLAB) { addGitLabInputs(inputs, argv) }

    // Add service specific inputs and call scans
    const service = argv._[1]
    if (service === ServiceCommand.CLOUDFORMATION) {
      const cfnInputs = inputs as ScanCfnInput
      // no CloudFormation specific options to add
      return await scanCfn(cfnInputs)
    } else if (service === ServiceCommand.TERRAFORM) {
      const tfInputs = inputs as ScanTfInput
      tfInputs.plan = argv.tfPlan as string
      tfInputs.workingDirectory = argv.tfDirectory as string
      return await scanTf(tfInputs)
    }
  }
  return new Promise(() => { ExitCode.CLIENT_ERROR })
}