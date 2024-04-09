import gql from 'graphql-tag'


export const ScanRemoteTfHCL2Mutation = gql` 
  query scanBranchQuery ($scanRequestId: ID!) {
    scanBranch(scanRequestId: $scanRequestId) {
      ... on ScanBranch {
        childrenCompleted
        childrenError
        childrenExpected
        children {
          id
          result {
            id
            observations {
              actionResultId
              capabilityId
              capabilityTitle
              createdAt
              description
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
