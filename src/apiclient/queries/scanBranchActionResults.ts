import gql from 'graphql-tag'


export const ScanBranchActionResultsQuery = gql` 
  query scanBranchActionResults ($scanRequestId: ID!, $pageSize: Int!) {
    scanBranch(scanRequestId: $scanRequestId) {
      ... on ScanBranch {
        id
        childrenCompleted
        childrenError
        childrenExpected
        children {
          ... on ScanScenario {
            id
            result {
              observations(exclude: [ALREADY_COMPLIANT, NOT_APPLICABLE, INSUFFICIENT_INFO_TO_REMEDIATE], page: 1, size: $pageSize) {
                filepath
                lineNumber
                resourceName
                resourceType
              }
            }
          }
          ... on FailedScan {
            id
            message
          }
          ... on GombocError {
            code
            message
          }
        }
      }
      ... on FailedScan {
        id
        message
      }
      ... on GombocError {
        code
        message
      }
    }
  }
`
