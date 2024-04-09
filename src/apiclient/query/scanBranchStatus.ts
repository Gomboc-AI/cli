import gql from 'graphql-tag'


export const ScanRemoteTfHCL2Mutation = gql` 
  query scanBranchQuery ($scanRequestId: ID!) {
    scanBranch(scanRequestId: $scanRequestId) {
      ... on ScanBranch {
        id
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
