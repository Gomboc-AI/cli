import gql from 'graphql-tag'


export const ScanDirectoryStatusQuery = gql` 
  query scanDirectoryStatus ($scanRequestId: ID!) {
    scanDirectory(scanRequestId: $scanRequestId) {
      ... on ScanDirectory {
        id
        childrenCompleted
        childrenError
        childrenExpected
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
