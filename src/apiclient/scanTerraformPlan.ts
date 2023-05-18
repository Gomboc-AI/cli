import gql from 'graphql-tag'


export const MUST_IMPLEMENT_CAPABILITY_POLICY_STATEMENT_FRAGMENT = gql`
  fragment MustImplementCapabilityPolicyStatementFragment on MustImplementCapabilityPolicyStatement {
    __typename
    capability {
      title
    }
  }
`

export const DELETE_TRANSFORMATION_FRAGMENT_TF = gql`
  fragment DeleteTransformationFragmentTf on DeleteTransformation {
    __typename
    property
    logicalResource {
      filePath
      line
      name
    }
  }
`

export const UPDATE_TRANSFORMATION_FRAGMENT_TF = gql`
  fragment UpdateTransformationFragmentTf on UpdateTransformation {
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

export const CREATE_TRANSFORMATION_FRAGMENT_TF = gql`
  fragment CreateTransformationFragmentTf on CreateTransformation {
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
  ${DELETE_TRANSFORMATION_FRAGMENT_TF}
  ${UPDATE_TRANSFORMATION_FRAGMENT_TF}
  ${CREATE_TRANSFORMATION_FRAGMENT_TF}
  query ScanTfPlan($plan: String!, $workingDirectory: String!, $policy: ScanPolicy!, $gitHubOptions: GitHubOptions, $gitLabOptions: GitLabOptions, $secretAccessKey: String) {
    scanTfPlanExt(plan: $plan, workingDirectory: $workingDirectory, policy: $policy, gitHubOptions: $gitHubOptions, gitLabOptions: $gitLabOptions, secretAccessKey: $secretAccessKey) {
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
              ...CreateTransformationFragmentTf
              ...UpdateTransformationFragmentTf
              ...DeleteTransformationFragmentTf
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