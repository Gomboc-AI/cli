import gql from 'graphql-tag'


export const ScanRemoteTfHCL2Mutation = gql` 
  mutation ScanRemoteTfHCL2 ($workingDirectory: String!, $effect: Effect!, $accessToken: String!) {
    remediateRemoteTfHCL2 (workingDirectory: $workingDirectory, effect: $effect, accessToken: $accessToken)
  }
`