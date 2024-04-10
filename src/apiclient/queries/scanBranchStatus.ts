import gql from 'graphql-tag'


export const ScanBranchStatusQuery = gql` 
  query scanBranchStatus ($scanRequestId: ID!) {
    scanBranch(scanRequestId: $scanRequestId) {
      ... on ScanBranch {
        id
        childrenCompleted
        childrenError
        childrenExpected
      }
      ... on FailedScan {
        id
        message
      }
    }
  }
`
