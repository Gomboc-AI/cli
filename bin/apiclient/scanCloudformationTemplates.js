import gql from 'graphql-tag';
export const MUST_IMPLEMENT_CAPABILITY_POLICY_STATEMENT_FRAGMENT = gql `
  fragment MustImplementCapabilityPolicyStatementFragment on MustImplementCapabilityPolicyStatement {
    __typename
    capability {
      title
    }
  }
`;
export const DELETE_TRANSFORMATION_FRAGMENT = gql `
  fragment DeleteTransformationFragment on DeleteTransformation {
    __typename
    property
    logicalResource {
      line
      name
    }
  }
`;
export const UPDATE_TRANSFORMATION_FRAGMENT = gql `
  fragment UpdateTransformationFragment on UpdateTransformation {
    __typename
    logicalResource {
      line
      name
    }
    property
    value
  }
`;
export const CREATE_TRANSFORMATION_FRAGMENT = gql `
  fragment CreateTransformationFragment on CreateTransformation {
    __typename
    logicalResource {
      line
      name
    }
    property
    value
  }
`;
export const scanCfnQuery = gql ` 
  ${MUST_IMPLEMENT_CAPABILITY_POLICY_STATEMENT_FRAGMENT}
  ${DELETE_TRANSFORMATION_FRAGMENT}
  ${UPDATE_TRANSFORMATION_FRAGMENT}
  ${CREATE_TRANSFORMATION_FRAGMENT}
  query ScanCfnTemplates($templates: [TemplatePayload!]!, $policy: ScanPolicy!, $gitHubOptions: GitHubOptions, $gitLabOptions: GitLabOptions, $secretAccessKey: String) {
    scanCfnTemplateExt( templates: $templates, policy: $policy, gitHubOptions: $gitHubOptions, gitLabOptions: $gitLabOptions, secretAccessKey: $secretAccessKey) {
      scanMeta {
        timestamp
        scanId
        portalUrl
      }
      sideEffectsResult {
        success
      }
      results {
        filePath
        error
        complianceObservations {
          logicalResource {
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
              line
              name
            }
          }
          nonTrivialRemediation {
            id
            appliesToLogicalResource {
              line
              name
            }
          }
          logicalResource {
            line
            name
          }
        }
      }
    }
  }
`;
