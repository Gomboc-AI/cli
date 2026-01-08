/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    " \n  mutation ScanOnPullRequest($input: ScanOnPullRequestInput!) {\n    scanOnPullRequest(input: $input){\n      scanRequestId\n      errors {\n        message\n        code\n      }\n    }\n  }\n": types.ScanOnPullRequestDocument,
    " \n  mutation ScanOnSchedule($input: ScanOnScheduleInput!) {\n    scanOnSchedule(input:$input) {\n      scanRequestId\n      errors {\n        message\n        code\n      }\n    }\n  }\n": types.ScanOnScheduleDocument,
    " \n  query scmRunnerScan ($scmRunnerScanInput: ScmRunnerScanInput!, $scmRunnerScanLogsInput: ScmRunnerScanLogsInput!) {\n    scmRunnerScan(input:$scmRunnerScanInput) {\n      ... on ScmRunnerScan {\n        id\n        status\n        logs (input:$scmRunnerScanLogsInput) {\n          level\n          message\n          createdAt\n        }\n      }\n      ... on GombocError {\n        code\n        message\n      }\n    }\n  }\n": types.ScmRunnerScanDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: " \n  mutation ScanOnPullRequest($input: ScanOnPullRequestInput!) {\n    scanOnPullRequest(input: $input){\n      scanRequestId\n      errors {\n        message\n        code\n      }\n    }\n  }\n"): typeof import('./graphql').ScanOnPullRequestDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: " \n  mutation ScanOnSchedule($input: ScanOnScheduleInput!) {\n    scanOnSchedule(input:$input) {\n      scanRequestId\n      errors {\n        message\n        code\n      }\n    }\n  }\n"): typeof import('./graphql').ScanOnScheduleDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: " \n  query scmRunnerScan ($scmRunnerScanInput: ScmRunnerScanInput!, $scmRunnerScanLogsInput: ScmRunnerScanLogsInput!) {\n    scmRunnerScan(input:$scmRunnerScanInput) {\n      ... on ScmRunnerScan {\n        id\n        status\n        logs (input:$scmRunnerScanLogsInput) {\n          level\n          message\n          createdAt\n        }\n      }\n      ... on GombocError {\n        code\n        message\n      }\n    }\n  }\n"): typeof import('./graphql').ScmRunnerScanDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
