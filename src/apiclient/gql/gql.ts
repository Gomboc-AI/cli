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
    " \n  query scanRequestStatus ($scanRequestId: ID!) {\n    scanRequest(id:$scanRequestId){\n      ... on ScanRequest{\n        id\n        status\n      }\n      ... on FailedScan {\n        id\n        message\n      }\n      ... on GombocError {\n        code\n        message\n      }\n    }\n  }\n": types.ScanRequestStatusDocument,
    " \n  query scanRequestScans ($scanRequestId: ID!, $page:Int!, $size:Int!) {\n    scanRequest(id:$scanRequestId){\n      ...on ScanRequest{\n        scanResults (page:$page, size:$size){\n          results{\n            id\n            infrastructureTool\n            policyObservations(\n              exclude: [ALREADY_COMPLIANT, NOT_APPLICABLE, INSUFFICIENT_INFO_TO_REMEDIATE, CANNOT_REMEDIATE], page: 1,size: $size\n            ){\n              results{\n                filepath\n                lineNumber\n                resourceName\n                resourceType\n                disposition\n                capabilityTitle\n              }\n              page\n              size\n              totalCount\n            }\n          }\n          page\n          totalCount\n          size\n        }\n      }\n      ... on FailedScan{\n        id\n        message\n      }\n      ... on GombocError {\n        code\n        message\n      }\n    }\n  }\n": types.ScanRequestScansDocument,
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
export function graphql(source: " \n  query scanRequestStatus ($scanRequestId: ID!) {\n    scanRequest(id:$scanRequestId){\n      ... on ScanRequest{\n        id\n        status\n      }\n      ... on FailedScan {\n        id\n        message\n      }\n      ... on GombocError {\n        code\n        message\n      }\n    }\n  }\n"): typeof import('./graphql').ScanRequestStatusDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: " \n  query scanRequestScans ($scanRequestId: ID!, $page:Int!, $size:Int!) {\n    scanRequest(id:$scanRequestId){\n      ...on ScanRequest{\n        scanResults (page:$page, size:$size){\n          results{\n            id\n            infrastructureTool\n            policyObservations(\n              exclude: [ALREADY_COMPLIANT, NOT_APPLICABLE, INSUFFICIENT_INFO_TO_REMEDIATE, CANNOT_REMEDIATE], page: 1,size: $size\n            ){\n              results{\n                filepath\n                lineNumber\n                resourceName\n                resourceType\n                disposition\n                capabilityTitle\n              }\n              page\n              size\n              totalCount\n            }\n          }\n          page\n          totalCount\n          size\n        }\n      }\n      ... on FailedScan{\n        id\n        message\n      }\n      ... on GombocError {\n        code\n        message\n      }\n    }\n  }\n"): typeof import('./graphql').ScanRequestScansDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
