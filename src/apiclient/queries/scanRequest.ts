import gql from 'graphql-tag'

export const scanRequestStatusQuery = gql` 
  query scanRequestStatus ($scanRequestId: ID!) {
    scanRequest(id:$scanRequestId){
      ... on ScanRequest{
        id
        status
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
