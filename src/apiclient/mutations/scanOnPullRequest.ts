import gql from 'graphql-tag'

export const scanOnPullRequest = gql` 
  mutation ScanOnPullRequest($input: ScanOnPullRequestInput!) {
    scanOnPullRequest(input: $input){
      scanRequestId
      errors {
        message
        code
      }
    }
  }
`
