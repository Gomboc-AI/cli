import gql from 'graphql-tag'


export const MUST_IMPLEMENT_CAPABILITY_POLICY_STATEMENT_FRAGMENT = gql`
  fragment MustImplementCapabilityPolicyStatementFragment on MustImplementCapabilityPolicyStatement {
    __typename
    capability {
      title
    }
  }
`

export const DELETE_TRANSFORMATION_FRAGMENT = gql`
  fragment DeleteTransformationFragment on DeleteTransformation {
    __typename
    property
    logicalResource {
      filePath
      line
      name
    }
  }
`

export const UPDATE_TRANSFORMATION_FRAGMENT = gql`
  fragment UpdateTransformationFragment on UpdateTransformation {
    __typename
    logicalResource {
      filePath
      line
      name
    }
    property
    value
  }
`

export const CREATE_TRANSFORMATION_FRAGMENT = gql`
  fragment CreateTransformationFragment on CreateTransformation {
    __typename
    logicalResource {
      filePath
      line
      name
    }
    property
    value
  }
`

export const scanTfQuery = gql` 
  ${MUST_IMPLEMENT_CAPABILITY_POLICY_STATEMENT_FRAGMENT}
  ${DELETE_TRANSFORMATION_FRAGMENT}
  ${UPDATE_TRANSFORMATION_FRAGMENT}
  ${CREATE_TRANSFORMATION_FRAGMENT}
  query ScanTfPlan($plan: String!, $workingDirectory: String!, $policy: ScanPolicy!, $gitHubOptions: GitHubOptions, $gitLabOptions: GitLabOptions) {
    scanTfPlanExt(plan: $plan, workingDirectory: $workingDirectory, policy: $policy, gitHubOptions: $gitHubOptions, gitLabOptions: $gitLabOptions) {
      scanMeta {
        timestamp
        scanId
        portalUrl
      }
      sideEffectsResult {
        success
      }
      result {
        complianceObservations {
          logicalResource {
            filePath
            line
            name
          }
          policyStatement {
            ...MustImplementCapabilityPolicyStatementFragment
          }
        }
        violationObservations {
          policyStatement {
            ...MustImplementCapabilityPolicyStatementFragment
          }
          trivialRemediation {
            id
            resolvesWithTransformations {
              ...CreateTransformationFragment
              ...UpdateTransformationFragment
              ...DeleteTransformationFragment
            }
            appliesToLogicalResource {
              filePath
              line
              name
            }
          }
          nonTrivialRemediation {
            id
            appliesToLogicalResource {
              filePath
              line
              name
            }
          }
          logicalResource {
            filePath
            line
            name
          }
        }
      }
    }
  }
`