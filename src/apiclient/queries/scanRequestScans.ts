import gql from 'graphql-tag'

export const scanRequestScansQuery = gql` 
  query scanRequestScans ($scanRequestId: ID!, $page:Int!, $size:Int!) {
    scanRequest(id:$scanRequestId){
      ...on ScanRequest{
        scanResults (page:$page, size:$size){
          results{
            id
            infrastructureTool
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
              page
              size
              totalCount
            }
          }
          page
          totalCount
          size
        }
      }
      ... on FailedScan{
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
