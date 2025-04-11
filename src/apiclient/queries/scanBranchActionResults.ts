import gql from 'graphql-tag'


export const ScanBranchActionResultsQuery = gql` 
  query scanBranchActionResults ($scanRequestId: ID!, $size: Int!) {
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
              id
              policyObservations(
              exclude: [ALREADY_COMPLIANT, NOT_APPLICABLE, INSUFFICIENT_INFO_TO_REMEDIATE, CANNOT_REMEDIATE], page: 1,size: $size
              ){
                results{
                  filepath
                  lineNumber
                  resourceName
                  resourceType
                  disposition
                  capabilityTitle
                }
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
