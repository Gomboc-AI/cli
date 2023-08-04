import gql from 'graphql-tag'


export const RemediateRemoteTfHCL2Mutation = gql` 
  mutation RemediateRemoteTfHCL2 ($workingDirectory: String!, $effect: Effect!, $accessToken: String!) {
    remediateRemoteTfHCL2 (workingDirectory: $workingDirectory, effect: $effect, accessToken: $accessToken) {
      ... on AutoRemediateTfHCLFilesError {
        message
      }
      ... on AutoRemediateTfHCLFilesSuccess {
        traceId
        success
        message
        generalCommentPlain
        files {
          filepath
          newContent
          fileComments {
            line
            commentPlain
          }
        }
      }
    }
  }
`