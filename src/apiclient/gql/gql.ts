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
    " \n  mutation ScanOnSchedule($input: ScanOnScheduleInput!){\n    scanOnSchedule(input:$input){\n      scanRequestId\n      errors{\n        message\n        code\n      }\n    }\n  }\n": types.ScanOnScheduleDocument,
    " \n  mutation ScanRemote ($input: ScanRemoteInput!) {\n    scanRemote(input: $input)\n  }\n": types.ScanRemoteDocument,
    " \n  query scanBranchActionResults ($scanRequestId: ID!, $pageSize: Int!) {\n    scanBranch(scanRequestId: $scanRequestId) {\n      ... on ScanBranch {\n        id\n        childrenCompleted\n        childrenError\n        childrenExpected\n        children {\n          ... on ScanScenario {\n            id\n            result {\n              id\n              observations(exclude: [ALREADY_COMPLIANT, NOT_APPLICABLE, INSUFFICIENT_INFO_TO_REMEDIATE], page: 1, size: $pageSize) {\n                filepath\n                lineNumber\n                resourceName\n                resourceType\n                disposition\n                capabilityTitle\n              }\n            }\n          }\n          ... on FailedScan {\n            id\n            message\n          }\n          ... on GombocError {\n            code\n            message\n          }\n        }\n      }\n      ... on FailedScan {\n        id\n        message\n      }\n      ... on GombocError {\n        code\n        message\n      }\n    }\n  }\n": types.ScanBranchActionResultsDocument,
    " \n  query scanBranchStatus ($scanRequestId: ID!) {\n    scanBranch(scanRequestId: $scanRequestId) {\n      ... on ScanBranch {\n        id\n        childrenCompleted\n        childrenError\n        childrenExpected\n      }\n      ... on FailedScan {\n        id\n        message\n      }\n      ... on GombocError {\n        code\n        message\n      }\n    }\n  }\n": types.ScanBranchStatusDocument,
    " \n  query scanDirectoryActionResults ($scanRequestId: ID!, $pageSize: Int!) {\n    scanDirectory(scanRequestId: $scanRequestId) {\n      ... on ScanDirectory {\n          id\n          childrenCompleted\n          childrenError\n          childrenExpected\n          children {\n            ...on ScanScenario {\n            id\n            result {\n              id\n              observations(exclude: [ALREADY_COMPLIANT, NOT_APPLICABLE, INSUFFICIENT_INFO_TO_REMEDIATE], page: 1, size: $pageSize) {\n                filepath\n                lineNumber\n                resourceName\n                resourceType\n                disposition\n                capabilityTitle\n            }\n          }\n        }\n          ... on FailedScan {\n            id\n            message\n          }\n          ... on GombocError {\n            code\n            message\n          }\n        }\n      }\n      ... on FailedScan {\n        id\n        message\n      }\n      ... on GombocError {\n        code\n        message\n      }\n    }\n  }\n": types.ScanDirectoryActionResultsDocument,
    " \n  query scanDirectoryStatus ($scanRequestId: ID!) {\n    scanDirectory(scanRequestId: $scanRequestId) {\n      ... on ScanDirectory {\n        id\n        childrenCompleted\n        childrenError\n        childrenExpected\n      }\n      ... on FailedScan {\n        id\n        message\n      }\n      ... on GombocError {\n        code\n        message\n      }\n    }\n  }\n": types.ScanDirectoryStatusDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: " \n  mutation ScanOnPullRequest($input: ScanOnPullRequestInput!) {\n    scanOnPullRequest(input: $input){\n      scanRequestId\n      errors {\n        message\n        code\n      }\n    }\n  }\n"): typeof import('./graphql').ScanOnPullRequestDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: " \n  mutation ScanOnSchedule($input: ScanOnScheduleInput!){\n    scanOnSchedule(input:$input){\n      scanRequestId\n      errors{\n        message\n        code\n      }\n    }\n  }\n"): typeof import('./graphql').ScanOnScheduleDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: " \n  mutation ScanRemote ($input: ScanRemoteInput!) {\n    scanRemote(input: $input)\n  }\n"): typeof import('./graphql').ScanRemoteDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: " \n  query scanBranchActionResults ($scanRequestId: ID!, $pageSize: Int!) {\n    scanBranch(scanRequestId: $scanRequestId) {\n      ... on ScanBranch {\n        id\n        childrenCompleted\n        childrenError\n        childrenExpected\n        children {\n          ... on ScanScenario {\n            id\n            result {\n              id\n              observations(exclude: [ALREADY_COMPLIANT, NOT_APPLICABLE, INSUFFICIENT_INFO_TO_REMEDIATE], page: 1, size: $pageSize) {\n                filepath\n                lineNumber\n                resourceName\n                resourceType\n                disposition\n                capabilityTitle\n              }\n            }\n          }\n          ... on FailedScan {\n            id\n            message\n          }\n          ... on GombocError {\n            code\n            message\n          }\n        }\n      }\n      ... on FailedScan {\n        id\n        message\n      }\n      ... on GombocError {\n        code\n        message\n      }\n    }\n  }\n"): typeof import('./graphql').ScanBranchActionResultsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: " \n  query scanBranchStatus ($scanRequestId: ID!) {\n    scanBranch(scanRequestId: $scanRequestId) {\n      ... on ScanBranch {\n        id\n        childrenCompleted\n        childrenError\n        childrenExpected\n      }\n      ... on FailedScan {\n        id\n        message\n      }\n      ... on GombocError {\n        code\n        message\n      }\n    }\n  }\n"): typeof import('./graphql').ScanBranchStatusDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: " \n  query scanDirectoryActionResults ($scanRequestId: ID!, $pageSize: Int!) {\n    scanDirectory(scanRequestId: $scanRequestId) {\n      ... on ScanDirectory {\n          id\n          childrenCompleted\n          childrenError\n          childrenExpected\n          children {\n            ...on ScanScenario {\n            id\n            result {\n              id\n              observations(exclude: [ALREADY_COMPLIANT, NOT_APPLICABLE, INSUFFICIENT_INFO_TO_REMEDIATE], page: 1, size: $pageSize) {\n                filepath\n                lineNumber\n                resourceName\n                resourceType\n                disposition\n                capabilityTitle\n            }\n          }\n        }\n          ... on FailedScan {\n            id\n            message\n          }\n          ... on GombocError {\n            code\n            message\n          }\n        }\n      }\n      ... on FailedScan {\n        id\n        message\n      }\n      ... on GombocError {\n        code\n        message\n      }\n    }\n  }\n"): typeof import('./graphql').ScanDirectoryActionResultsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: " \n  query scanDirectoryStatus ($scanRequestId: ID!) {\n    scanDirectory(scanRequestId: $scanRequestId) {\n      ... on ScanDirectory {\n        id\n        childrenCompleted\n        childrenError\n        childrenExpected\n      }\n      ... on FailedScan {\n        id\n        message\n      }\n      ... on GombocError {\n        code\n        message\n      }\n    }\n  }\n"): typeof import('./graphql').ScanDirectoryStatusDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
