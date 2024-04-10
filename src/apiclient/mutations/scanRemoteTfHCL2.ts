import gql from 'graphql-tag'


export const ScanRemoteTfHCL2Mutation = gql` 
  mutation ScanRemoteTfHCL2 ($input: ScanRemoteTfHCL2Input!) {
    scanRemoteTfHCL2 (input: $input)
  }
`