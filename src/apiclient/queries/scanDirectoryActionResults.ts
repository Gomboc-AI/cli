import gql from 'graphql-tag'


export const ScanDirectoryActionResultsQuery = gql` 
  query scanDirectoryActionResults ($scanRequestId: ID!, $size: Int!) {
    scanDirectory(scanRequestId: $scanRequestId) {
      ... on ScanDirectory {
          id
          childrenCompleted
          childrenError
          childrenExpected
          children {
            ...on ScanScenario {
            id
            result {
              id
              policyObservations(
              exclude: [ALREADY_COMPLIANT, NOT_APPLICABLE, INSUFFICIENT_INFO_TO_REMEDIATE], page: 1, size: $size
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
