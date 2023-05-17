import { scanCfn } from "./cfn.js";
import { scanTf } from "./tf.js";
import { ExitCode } from "./exitCodes.js";
import { ActionCommand, ServiceCommand, ClientCommand } from "./cliCommands.js";
const getCommonInputs = (argv) => {
    return {
        authToken: argv.authToken,
        secretAccessKey: argv.secretAccessKey,
        output: argv.output,
        apiUrl: process.env.API_URL ?? "https://scan.gomboc.ai/graphql",
        config: argv.config,
    };
};
const addGitHubInputs = (inputs, argv) => {
    if (argv.accessToken == null) {
        return;
    }
    inputs.gitHubOptions = { accessToken: argv.accessToken };
    if (argv.createPr) {
        inputs.gitHubOptions.createPR = true;
    }
    if (argv.commitOnCurrentBranch) {
        inputs.gitHubOptions.commitOnCurrentBranch = true;
    }
    if (argv.createCommentsWithCodeSuggestions) {
        inputs.gitHubOptions.createCommentsWithCodeSuggestions = true;
    }
    // Auth options for Gomboc Auth
    if (argv.ref) {
        inputs.gitHubOptions.ref = argv.ref;
    }
    if (argv.sha) {
        inputs.gitHubOptions.sha = argv.sha;
    }
    if (argv.repository) {
        inputs.gitHubOptions.repository = argv.repository;
    }
    if (argv.repositoryOwner) {
        inputs.gitHubOptions.repositoryOwner = argv.repositoryOwner;
    }
};
const addGitLabInputs = (inputs, argv) => {
    if (argv.accessToken == null) {
        return;
    }
    inputs.gitLabOptions = { accessToken: argv.accessToken };
    if (argv.createMr) {
        inputs.gitLabOptions.createMR = true;
    }
    if (argv.commitOnCurrentBranch) {
        inputs.gitLabOptions.commitOnCurrentBranch = true;
    }
    if (argv.createCommentsWithCodeSuggestions) {
        inputs.gitLabOptions.createCommentsWithCodeSuggestions = true;
    }
    // Auth options for Gomboc Auth
    if (argv.ref) {
        inputs.gitLabOptions.ref = argv.ref;
    }
    if (argv.sha) {
        inputs.gitLabOptions.sha = argv.sha;
    }
    if (argv.projectId) {
        inputs.gitLabOptions.projectId = argv.projectId;
    }
    if (argv.projectPath) {
        inputs.gitLabOptions.projectPath = argv.projectPath;
    }
    if (argv.namespacePath) {
        inputs.gitLabOptions.namespacePath = argv.namespacePath;
    }
};
export const cliCheck = async (argv) => {
    const inputs = getCommonInputs(argv);
    const cmd1 = argv._[0];
    if (cmd1 === ActionCommand.SCAN) {
        // Add client specific inputs
        const client = argv._[2];
        if (client === ClientCommand.GITHUB) {
            addGitHubInputs(inputs, argv);
        }
        else if (client === ClientCommand.GITLAB) {
            addGitLabInputs(inputs, argv);
        }
        // Add service specific inputs and call scans
        const service = argv._[1];
        if (service === ServiceCommand.CLOUDFORMATION) {
            const cfnInputs = inputs;
            // no CloudFormation specific options to add
            return await scanCfn(cfnInputs);
        }
        else if (service === ServiceCommand.TERRAFORM) {
            const tfInputs = inputs;
            tfInputs.plan = argv.plan;
            tfInputs.workingDirectory = argv.workingDirectory;
            return await scanTf(tfInputs);
        }
    }
    return new Promise(() => { ExitCode.CLIENT_ERROR; });
};
