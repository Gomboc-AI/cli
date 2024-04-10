import gql from 'graphql-tag'


export const ScanBranchStatusQuery = gql` 
  query scanBranchStatus ($scanRequestId: ID!) {
    scanBranch(scanRequestId: $scanRequestId) {
      ... on ScanBranch {
        childrenCompleted
        childrenError
        childrenExpected
      }
      ... on GombocError {
        code
        message
      }
    }
  }
`
