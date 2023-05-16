import { scanCfn } from "./cfn.js";
export const cliScanCfn = async (argv) => {
    const inputs = {
        idToken: argv.idToken,
        secretAccessKey: argv.secretAccessKey,
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
        if (argv.ghRef) {
            inputs.gitHubOptions.ref = argv.ghRef;
        }
        if (argv.ghRepository) {
            inputs.gitHubOptions.repository = argv.ghRepository;
        }
        if (argv.ghRepositoryOwner) {
            inputs.gitHubOptions.repositoryOwner = argv.ghRepositoryOwner;
        }
        if (argv.ghSha) {
            inputs.gitHubOptions.sha = argv.ghSha;
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
        if (argv.glNamespacePath) {
            inputs.gitLabOptions.namespacePath = argv.glNamespacePath;
        }
        if (argv.glProjectId) {
            inputs.gitLabOptions.projectId = argv.glProjectId;
        }
        if (argv.glProjectPath) {
            inputs.gitLabOptions.projectPath = argv.glProjectPath;
        }
        if (argv.glRef) {
            inputs.gitLabOptions.ref = argv.glRef;
        }
        if (argv.glSha) {
            inputs.gitLabOptions.sha = argv.glSha;
        }
    }
    return await scanCfn(inputs);
};
