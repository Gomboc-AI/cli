import gql from 'graphql-tag'


export const ScanDirectoryActionResultsQuery = gql` 
  query scanDirectoryActionResults ($scanRequestId: ID!, $pageSize: Int!) {
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
              observations(exclude: [ALREADY_COMPLIANT, NOT_APPLICABLE, INSUFFICIENT_INFO_TO_REMEDIATE], page: 1, size: $pageSize) {
                filepath
                lineNumber
                resourceName
                resourceType
                disposition
                capabilityTitle
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
