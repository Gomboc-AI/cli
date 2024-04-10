import gql from 'graphql-tag'


export const ScanBranchActionResultsQuery = gql` 
  query scanBranchActionResults ($scanRequestId: ID!) {
    scanBranch(scanRequestId: $scanRequestId) {
      ... on ScanBranch {
        childrenCompleted
        childrenError
        childrenExpected
        children {
          result {
            id
            observations {
              filepath
              lineNumber
              resourceName
              resourceType
            }
          }
        }
      }
      ... on GombocError {
        code
        message
      }
    }
  }
`
