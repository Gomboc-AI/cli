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
  fragment DeleteTransformationFragmentTf on TfDeleteTransformation {
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
  fragment UpdateTransformationFragmentTf on TfUpdateTransformation {
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
  fragment CreateTransformationFragmentTf on TfCreateTransformation {
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

export const ScanTfPlanExtQuery = gql` 
  ${MUST_IMPLEMENT_CAPABILITY_POLICY_STATEMENT_FRAGMENT}
  ${DELETE_TRANSFORMATION_FRAGMENT_TF}
  ${UPDATE_TRANSFORMATION_FRAGMENT_TF}
  ${CREATE_TRANSFORMATION_FRAGMENT_TF}
  query ScanTfPlanExt ($plan: String!, $workingDirectory: String!, $policy: ScanPolicy!, $gitHubOptions: GitHubOptions, $gitLabOptions: GitLabOptions, $secretAccessKey: String) {
    scanTfPlanExt (plan: $plan, workingDirectory: $workingDirectory, policy: $policy, gitHubOptions: $gitHubOptions, gitLabOptions: $gitLabOptions, secretAccessKey: $secretAccessKey) {
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
            address
            definedByModule
            type
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
              address
              definedByModule
              type
            }
          }
          nonTrivialRemediation {
            id
            appliesToLogicalResource {
              filePath
              line
              name
              address
              definedByModule
              type
            }
          }
          logicalResource {
            filePath
            line
            name
            address
            definedByModule
            type
          }
        }
      }
    }
  }
`