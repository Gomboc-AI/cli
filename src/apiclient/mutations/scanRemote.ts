import gql from 'graphql-tag'

export const ScanRemoteMutation = gql` 
  mutation ScanRemote ($input: ScanRemoteInput!) {
    scanRemote(input: $input)
  }
`
