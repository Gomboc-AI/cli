import { scanCfn } from "./cfn.js";
import { scanTf } from "./tf.js";
import { ExitCode } from "./exitCodes.js";
import { CommandCode } from "./commandCodes.js";
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
    if (argv.repository) {
        inputs.gitHubOptions.repository = argv.repository;
    }
    if (argv.repositoryOwner) {
        inputs.gitHubOptions.repositoryOwner = argv.repositoryOwner;
    }
    if (argv.sha) {
        inputs.gitHubOptions.sha = argv.sha;
    }
};
const addGitLabInputs = (inputs, argv) => {
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
    if (argv.repository) {
        inputs.gitHubOptions.repository = argv.repository;
    }
    if (argv.repositoryOwner) {
        inputs.gitHubOptions.repositoryOwner = argv.repositoryOwner;
    }
    if (argv.sha) {
        inputs.gitHubOptions.sha = argv.sha;
    }
};
export const cliCheck = async (argv) => {
    console.log(argv);
    const inputs = getCommonInputs(argv);
    const cmd1 = argv._[0];
    if (cmd1 === CommandCode.CHECK) {
        const service = argv._[1];
        // Add client specific inputs
        const client = argv._[2];
        if (client === CommandCode.GITHUB) {
            addGitHubInputs(inputs, argv);
        }
        else if (client === CommandCode.GITLAB) {
            addGitLabInputs(inputs, argv);
        }
        // Add service specific inputs and call scans
        if (service === CommandCode.CLOUDFORMATION) {
            const cfnInputs = inputs;
            // no CloudFormation specific options to add
            return await scanCfn(cfnInputs);
        }
        else if (service === CommandCode.TERRAFORM) {
            const tfInputs = inputs;
            tfInputs.plan = argv.plan;
            tfInputs.workingDirectory = argv.workingDirectory;
            return await scanTf(tfInputs);
        }
    }
    return new Promise(() => { ExitCode.CLIENT_ERROR; });
};
