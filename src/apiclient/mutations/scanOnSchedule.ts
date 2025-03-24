import gql from 'graphql-tag'

export const scanOnSchedule = gql` 
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

