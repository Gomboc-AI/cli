import { scanCfn } from "./cfn.js";
export const cliScanCfn = async (argv) => {
    const inputs = {
        idToken: argv.idToken,
        output: argv.output,
        apiUrl: argv.apiUrl,
        config: argv.config,
    };
    // If there's a GitHub access token, construct the GitHubOptions object
    if (argv.ghAccessToken) {
        inputs.gitHubOptions = { accessToken: argv.ghAccessToken };
        if (argv.ghCreatePr) {
            inputs.gitHubOptions.createPR = true;
        }
        if (argv.ghCommitOnCurrentBranch) {
            inputs.gitHubOptions.commitOnCurrentBranch = true;
        }
        if (argv.ghCreateCommentsWithCodeSuggestions) {
            inputs.gitHubOptions.createCommentsWithCodeSuggestions = true;
        }
    }
    // If there's a GitLab access token, construct the GitLabOptions object
    if (argv.glAccessToken) {
        inputs.gitLabOptions = { accessToken: argv.glAccessToken };
        if (argv.glCreateMr) {
            inputs.gitLabOptions.createMR = true;
        }
        if (argv.glCommitOnCurrentBranch) {
            inputs.gitLabOptions.commitOnCurrentBranch = true;
        }
        if (argv.glCreateCommentsWithCodeSuggestions) {
            inputs.gitLabOptions.createCommentsWithCodeSuggestions = true;
        }
    }
    return await scanCfn(inputs);
};
