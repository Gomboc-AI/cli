import { scanCfn, ScanCfnInput } from "./cfn.js"
import { scanTf, ScanTfInput } from "./tf.js"
import { ExitCode } from "./exitCodes.js"
import { CommandCode } from "./commandCodes.js"


const getCommonInputs = (argv: any): ScanCfnInput | ScanTfInput => {
  return {
      authToken: argv.authToken as string,
      secretAccessKey: argv.secretAccessKey as string,
      output: argv.output as string,
      apiUrl: process.env.API_URL ?? "https://scan.gomboc.ai/graphql",
      config: argv.config as string,
  }
}

const addGitHubInputs = (inputs: ScanCfnInput | ScanTfInput, argv: any) => {
  inputs.gitHubOptions = { accessToken: argv.accessToken as string }
  if(argv.createPr) {
    inputs.gitHubOptions.createPR = true
  }
  if(argv.commitOnCurrentBranch) {
    inputs.gitHubOptions.commitOnCurrentBranch = true
  }
  if(argv.createCommentsWithCodeSuggestions) {
    inputs.gitHubOptions.createCommentsWithCodeSuggestions = true
  }
  // Auth options for Gomboc Auth
  if(argv.ref) {
    inputs.gitHubOptions.ref = argv.ref as string
  }
  if(argv.repository) {
    inputs.gitHubOptions.repository = argv.repository as string
  }
  if(argv.repositoryOwner) {
    inputs.gitHubOptions.repositoryOwner = argv.repositoryOwner as string
  }
  if(argv.sha) {
    inputs.gitHubOptions.sha = argv.sha as string
  }
}

const addGitLabInputs = (inputs: ScanCfnInput | ScanTfInput, argv: any) => {
  inputs.gitHubOptions = { accessToken: argv.accessToken as string }
  if(argv.createPr) {
    inputs.gitHubOptions.createPR = true
  }
  if(argv.commitOnCurrentBranch) {
    inputs.gitHubOptions.commitOnCurrentBranch = true
  }
  if(argv.createCommentsWithCodeSuggestions) {
    inputs.gitHubOptions.createCommentsWithCodeSuggestions = true
  }
  // Auth options for Gomboc Auth
  if(argv.ref) {
    inputs.gitHubOptions.ref = argv.ref as string
  }
  if(argv.repository) {
    inputs.gitHubOptions.repository = argv.repository as string
  }
  if(argv.repositoryOwner) {
    inputs.gitHubOptions.repositoryOwner = argv.repositoryOwner as string
  }
  if(argv.sha) {
    inputs.gitHubOptions.sha = argv.sha as string
  }
}

export const cliCheck = async (argv?: any): Promise<ExitCode> => {
  console.log(argv)
  const inputs: ScanCfnInput | ScanTfInput = getCommonInputs(argv)
  const cmd1 = argv._[0]
  if(cmd1 === CommandCode.CHECK) {
    const service = argv._[1]
    // Add client specific inputs
    const client = argv._[2]
    if(client === CommandCode.GITHUB) {
      addGitHubInputs(inputs, argv)
    } else if(client === CommandCode.GITLAB) {
      addGitLabInputs(inputs, argv)
    }
    // Add service specific inputs and call scans
    if(service === CommandCode.CLOUDFORMATION) {
      const cfnInputs = inputs as ScanCfnInput
      // no CloudFormation specific options to add
      return await scanCfn(cfnInputs)
    } else if(service === CommandCode.TERRAFORM) {
      const tfInputs = inputs as ScanTfInput
      tfInputs.plan = argv.plan as string
      tfInputs.workingDirectory = argv.workingDirectory as string
      return await scanTf(tfInputs)
    }
  } 
  return new Promise(() => {ExitCode.CLIENT_ERROR})
}