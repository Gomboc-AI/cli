#! /usr/bin/env node
import { hideBin } from 'yargs/helpers';
import { cliCheck } from './cli.js';
import yargs from 'yargs';
const usage = "\nUsage: gomboc [command] <options>";
const addGitHubOptionsBuilder = (yargs) => {
    yargs.option("access-token", {
        describe: "Access token",
        type: "string",
        demandOption: false
    })
        .option("create-pr", {
        describe: "Create a Pull Request with remediations -- only for simple remediations",
        type: "boolean",
        demandOption: false
    })
        .option("commit-on-current-branch", {
        describe: "Commit remediations in existing PR -- only for simple remediations",
        type: "boolean",
        demandOption: false
    })
        .option("create-comments-with-code-suggestions", {
        describe: "Create comments with code suggestions -- only for simple remediations",
        type: "boolean",
        demandOption: false
    })
        .option("ref", {
        describe: "Full ref to the branch -- only for Gomboc Auth",
        type: "string",
        demandOption: false
    })
        .option("repository", {
        describe: "Full repository name -- only for Gomboc Auth",
        type: "string",
        demandOption: false
    })
        .option("repository-owner", {
        describe: "Repository owner -- only for Gomboc Auth",
        type: "string",
        demandOption: false
    });
};
const addGitLabOptionsBuilder = (yargs) => {
    yargs.option("access-token", {
        describe: "Access token",
        type: "string",
        demandOption: false
    })
        .option("create-mr", {
        describe: "Create a Merge Request with remediations -- only for simple remediations",
        type: "boolean",
        demandOption: false
    })
        .option("commit-on-current-branch", {
        describe: "Commit remediations in existing MR -- only for simple remediations",
        type: "boolean",
        demandOption: false
    })
        .option("create-comments-with-code-suggestions", {
        describe: "[GitLab] Create comments with code suggestions -- only for simple remediations",
        type: "boolean",
        demandOption: false
    })
        .option("namespace-path", {
        describe: "[GitLab] The namespace path -- only for Gomboc Auth",
        type: "string",
        demandOption: false
    })
        .option("project-id", {
        describe: "The project id -- only for Gomboc Auth",
        type: "string",
        demandOption: false
    })
        .option("project-path", {
        describe: "The project path -- only for Gomboc Auth",
        type: "string",
        demandOption: false
    })
        .option("ref", {
        describe: "Full ref to the branch -- only for Gomboc Auth",
        type: "string",
        demandOption: false
    })
        .option("sha", {
        describe: "Commit SHA -- only for Gomboc Auth",
        type: "string",
        demandOption: false
    });
};
// Setting CLI command and options
await yargs(hideBin(process.argv))
    .usage(usage)
    .command('get-github-token', '\tGet an ID Token for GitHub', (yargs) => {
})
    .command('get-gitlab-token', '\tGet an ID Token for GitLab', (yargs) => {
})
    .command('check', '\tCheck the Gomboc.ai service', (yargs) => {
    yargs.command('cloudformation', '\tRun for AWS CloudFormation', (yargs) => {
        yargs.command('github', '\tRun for AWS CloudFormation on GitHub', (yargs) => {
            addGitHubOptionsBuilder(yargs);
            yargs.check(async (argv) => {
                const scan = await cliCheck(argv);
                // scan is the exit code
                process.exitCode = scan;
                return true;
            });
        })
            .command('gitlab', '\tRun for AWS CloudFormation on GitLab', (yargs) => {
            addGitLabOptionsBuilder(yargs);
            yargs.check(async (argv) => {
                const scan = await cliCheck(argv);
                // scan is the exit code
                process.exitCode = scan;
                return true;
            });
        });
    }).command('terraform', '\tRun for Hashicorp Terraform', (yargs) => {
        yargs.command('github', '\tRun for Hashicorp Terraform on GitHub', (yargs) => {
            addGitHubOptionsBuilder(yargs);
            yargs.check(async (argv) => {
                const scan = await cliCheck(argv);
                // scan is the exit code
                process.exitCode = scan;
                return true;
            });
        })
            .command('gitlab', '\tRun for Hashicorp Terraform on GitLab', (yargs) => {
            addGitLabOptionsBuilder(yargs);
            yargs.check(async (argv) => {
                const scan = await cliCheck(argv);
                // scan is the exit code
                process.exitCode = scan;
                return true;
            });
        }).option("working-directory", {
            describe: "The root directory for the Terraform configuration",
            type: "string",
            default: "",
        }).option("plan", {
            describe: "A filepath to a local JSON file describing your Terraform plan (relative to working-directory)",
            type: "string",
            demandOption: true,
        });
    }).option("config", {
        describe: "The filepath to the Gomboc.ai config YAML file",
        type: "string",
        demandOption: true
    })
        .option("auth-token", {
        describe: "An authentication Auth token",
        type: "string",
        demandOption: false
    })
        .option("secret-access-key", {
        describe: "Required for Gomboc Auth",
        type: "string",
        demandOption: false
    })
        .option("output", {
        describe: "What format to output",
        type: "string",
        default: "text",
        demandOption: false,
        choices: ['text', 'json'],
    })
        .check(async (argv) => {
        const scan = await cliCheck(argv);
        // scan is the exit code
        process.exitCode = scan;
        return true;
    });
})
    .showHelpOnFail(false)
    .help(true)
    .version()
    .argv;
const index = async () => {
};
export default index;
/*
.option("working-directory", {
    describe: "The root directory for the Terraform configuration",
    type: "string",
    default: "",
  })
  .option("plan", {
    describe: "A filepath to a local JSON file describing your Terraform plan (relative to working-directory)",
    type: "string",
    demandOption: true,
  })

  .command(
    'run <service> <client>',
    '\tRun Gomboc.ai for a service on a client',
    (yargs) => {
      yargs.positional('service', {
        describe: 'The service to use',
        type: 'string',
        choices: ['cloudformation', 'terraform'],
      })
      .positional('client', {
        describe: 'The service to use',
        type: 'string',
        choices: ['github', 'gitlab'],
      })
      .option("test", {
        describe: "test internal option",
        type: "string",
        demandOption: false
      })
      .check(async (argv)=>{
        const scan = await cliScanCfn(argv)
        // scan is the exit code
        process.exitCode = scan as number
        return true
      })
    }
  )




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
    demandOption: false
  })
  .option("secret-access-key", {
    describe: "Required for Gomboc Auth",
    type: "string",
    demandOption: false
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
  .option("gh-ref", {
    describe: "[GitHub] Full ref to the branch -- only for Gomboc Auth",
    type: "string",
    demandOption: false
  })
  .option("gh-repository", {
    describe: "[GitHub] Full repository name -- only for Gomboc Auth",
    type: "string",
    demandOption: false
  })
  .option("gh-repository-owner", {
    describe: "[GitHub] Repository owner -- only for Gomboc Auth",
    type: "string",
    demandOption: false
  })
  .option("gh-sha", {
    describe: "[GitHub] Commit SHA -- only for Gomboc Auth",
    type: "string",
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
  .option("gl-namespace-path", {
    describe: "[GitLab] The namespace path -- only for Gomboc Auth",
    type: "string",
    demandOption: false
  })
  .option("gl-project-id", {
    describe: "[GitLab] The project id -- only for Gomboc Auth",
    type: "string",
    demandOption: false
  })
  .option("gl-project-path", {
    describe: "[GitLab] The project path -- only for Gomboc Auth",
    type: "string",
    demandOption: false
  })
  .option("gl-ref", {
    describe: "[GitLab] Full ref to the branch -- only for Gomboc Auth",
    type: "string",
    demandOption: false
  })
  .option("gl-sha", {
    describe: "[GitLab] Commit SHA -- only for Gomboc Auth",
    type: "string",
    demandOption: false
  })
  .command(
    'run <service> <client>',
    '\tRun Gomboc.ai for a service on a client',
    (yargs) => {
      yargs.positional('service', {
        describe: 'The service to use',
        type: 'string',
        choices: ['cloudformation', 'terraform'],
      })
      .positional('client', {
        describe: 'The service to use',
        type: 'string',
        choices: ['github', 'gitlab'],
      })
      .option("test", {
        describe: "test internal option",
        type: "string",
        demandOption: false
      })
      .check(async (argv)=>{
        const scan = await cliScanCfn(argv)
        // scan is the exit code
        process.exitCode = scan as number
        return true
      })
    }
  )
  .showHelpOnFail(false)
  .help(true)
  .version(true)
  .argv

const index = async () => {
}


export default index
*/ 
