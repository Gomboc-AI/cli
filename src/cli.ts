import { scanCfn, ScanCfnInput } from "./cfn.js"
import { ExitCode } from "./exitCodes.js"

export const cliScanCfn = async (argv?: any): Promise<ExitCode> => {
    const inputs: ScanCfnInput = {
        idToken: argv.idToken,
        output: argv.output,
        apiUrl: argv.apiUrl,
        config: argv.config,
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
    }
    return await scanCfn(inputs)
  }