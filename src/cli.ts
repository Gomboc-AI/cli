import { scanCfn, ScanCfnInput } from "./cfn.js"
import { ExitCode } from "./exitCodes.js"

export const cliScanCfn = async (argv?: any): Promise<ExitCode> => {
    const inputs: ScanCfnInput = {
        idToken: argv.idToken as string,
        secretAccessKey: argv.secretAccessKey as string,
        output: argv.output as string,
        apiUrl: argv.apiUrl as string,
        config: argv.config as string,
    }
    // If there's a GitHub access token, construct the GitHubOptions object
    if(argv.ghAccessToken) {
      inputs.gitHubOptions = { accessToken: argv.ghAccessToken as string }

      if(argv.ghCreatePr) {
        inputs.gitHubOptions.createPR = true
      }
      if(argv.ghCommitOnCurrentBranch) {
        inputs.gitHubOptions.commitOnCurrentBranch = true
      }
      if(argv.ghCreateCommentsWithCodeSuggestions) {
        inputs.gitHubOptions.createCommentsWithCodeSuggestions = true
      }
      if(argv.ghRef) {
        inputs.gitHubOptions.ref = argv.ghRef as string
      }
      if(argv.ghRepository) {
        inputs.gitHubOptions.repository = argv.ghRepository as string
      }
      if(argv.ghRepositoryOwner) {
        inputs.gitHubOptions.repositoryOwner = argv.ghRepositoryOwner as string
      }
      if(argv.ghSha) {
        inputs.gitHubOptions.sha = argv.ghSha as string
      }
    }
    // If there's a GitLab access token, construct the GitLabOptions object
    if(argv.glAccessToken) {
      inputs.gitLabOptions = { accessToken: argv.glAccessToken as string }

      if(argv.glCreateMr) {
        inputs.gitLabOptions.createMR = true
      }
      if(argv.glCommitOnCurrentBranch) {
        inputs.gitLabOptions.commitOnCurrentBranch = true
      }
      if(argv.glCreateCommentsWithCodeSuggestions) {
        inputs.gitLabOptions.createCommentsWithCodeSuggestions = true
      }
      if(argv.glNamespacePath) {
        inputs.gitLabOptions.namespacePath = argv.glNamespacePath as string
      }
      if(argv.glProjectId) {
        inputs.gitLabOptions.projectId = argv.glProjectId as string
      }
      if(argv.glProjectPath) {
        inputs.gitLabOptions.projectPath = argv.glProjectPath as string
      }
      if(argv.glRef) {
        inputs.gitLabOptions.ref = argv.glRef as string
      }
      if(argv.glSha) {
        inputs.gitLabOptions.sha = argv.glSha as string
      }
    }
    return await scanCfn(inputs)
  }