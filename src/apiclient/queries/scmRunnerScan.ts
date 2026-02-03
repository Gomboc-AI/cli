import gql from 'graphql-tag'

export const scmRunnerScanQuery = gql` 
  query scmRunnerScan ($scmRunnerScanInput: ScmRunnerScanInput!, $scmRunnerScanLogsInput: ScmRunnerScanLogsInput!) {
    scmRunnerScan(input:$scmRunnerScanInput) {
      ... on ScmRunnerScan {
        id
        status
        fixesCount
        logs (input:$scmRunnerScanLogsInput) {
          level
          message
          createdAt
        }
      }
      ... on GombocError {
        code
        message
      }
    }
  }
`
