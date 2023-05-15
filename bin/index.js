#! /usr/bin/env node
import { hideBin } from 'yargs/helpers';
import { cliScanCfn } from './cli.js';
import yargs from 'yargs';
const usage = "\nUsage: gomboc [command] <options>";
// Setting CLI command and options
await yargs(hideBin(process.argv))
    .usage(usage)
    .option("config", {
    describe: "The filepath to the Gomboc.ai config YAML file",
    type: "string",
    demandOption: true
})
    .option("id-token", {
    describe: "An authentication ID token",
    type: "string",
    demandOption: true
})
    .option("api-url", {
    describe: "The URL of the API endpoint",
    type: "string",
    default: "https://scan.gomboc.ai/graphql",
    hidden: true,
    demandOption: false
})
    .option("output", {
    describe: "What format to output",
    type: "string",
    default: "text",
    demandOption: false,
    choices: ['text', 'json'],
})
    .option("gh-access-token", {
    describe: "[GitHub] Access token",
    type: "string",
    demandOption: false
})
    .option("gh-create-pr", {
    describe: "[GitHub] Create a Pull Request with remediations -- only for simple remediations",
    type: "boolean",
    demandOption: false
})
    .option("gh-commit-on-current-branch", {
    describe: "[GitHub] Commit remediations in existing PR -- only for simple remediations",
    type: "boolean",
    demandOption: false
})
    .option("gh-create-comments-with-code-suggestions", {
    describe: "[GitHub] Create comments with code suggestions -- only for simple remediations",
    type: "boolean",
    demandOption: false
})
    .option("gl-access-token", {
    describe: "[GitLab] Access token",
    type: "string",
    demandOption: false
})
    .option("gl-create-mr", {
    describe: "[GitLab] Create a Merge Request with remediations -- only for simple remediations",
    type: "boolean",
    demandOption: false
})
    .option("gl-commit-on-current-branch", {
    describe: "[GitLab] Commit remediations in existing MR -- only for simple remediations",
    type: "boolean",
    demandOption: false
})
    .option("gl-create-comments-with-code-suggestions", {
    describe: "[GitLab] Create comments with code suggestions -- only for simple remediations",
    type: "boolean",
    demandOption: false
})
    .command('run', '\tGomboc.ai CloudFormation CLI', (yargs) => {
    yargs.check(async (argv) => {
        const scan = await cliScanCfn(argv);
        // scan is the exit code
        process.exitCode = scan;
        return true;
    });
})
    .showHelpOnFail(false)
    .help(true)
    .version(true)
    .argv;
const index = async () => {
};
export default index;
