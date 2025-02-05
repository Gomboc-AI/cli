import gql from 'graphql-tag'

export const ScanOnScheduleMutation = gql` 
  mutation ScanOnSchedule($input: ScanOnScheduleInput!){
    scanOnSchedule(input:$input){
      scanRequestId
      errors{
        message
        code
      }
    }
  }
`

