/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type ActionResult = {
  __typename?: 'ActionResult';
  id: Scalars['ID']['output'];
  observations: Array<PolicyObservation>;
};


export type ActionResultObservationsArgs = {
  exclude?: InputMaybe<Array<Disposition>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type ActionResultPage = {
  __typename?: 'ActionResultPage';
  page: Scalars['Int']['output'];
  results: Array<ActionResult>;
  totalCount: Scalars['Int']['output'];
};

export type ActionResultResponse = ActionResult | GombocError;

export type AdoptFrameworkControlsIntoOrganizationInput = {
  controlIds: Array<Scalars['ID']['input']>;
  resetPolicy: Scalars['Boolean']['input'];
};

export type AlreadyExistsError = {
  __typename?: 'AlreadyExistsError';
  /** @deprecated Use GombocError instead */
  message: Scalars['String']['output'];
};

export enum BitBucketApiVersion {
  V2_0 = 'V2_0'
}

export type Capability = {
  __typename?: 'Capability';
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export type CreateAzdoProviderInput = {
  organization: Scalars['String']['input'];
  personalAccessToken: Scalars['String']['input'];
};

export type CreateAzdoProviderOutput = GitProvider | GombocError;

export type CreateBitBucketProviderInput = {
  accessToken: Scalars['String']['input'];
  apiVersion: BitBucketApiVersion;
  workspaceSlug: Scalars['String']['input'];
};

export type CreateBitBucketProviderOutput = GitProvider | GombocError;

export type CreateGitHubProviderResponse = AlreadyExistsError | GitProvider | InvalidArgumentError | UnauthorizedError;

export type CreateGitLabProviderInput = {
  apiUrl: Scalars['String']['input'];
  apiVersion: GitLabApiVersion;
  groupAccessToken: Scalars['String']['input'];
};

export type CreateGitLabProviderOutput = GitProvider | GombocError;

export type CreatePolicyStatementResponse = InvalidArgumentError | NotFoundError | PolicyStatement | UnauthorizedError;

export type CreateProjectResponse = AlreadyExistsError | InvalidArgumentError | NotFoundError | Project | UnauthorizedError;

export type CustomerApi_PolicyStatementPayloadMustImplementType = {
  __typename?: 'CustomerAPI_PolicyStatementPayloadMustImplementType';
  capability: Capability;
};

export type DeleteGitProviderInput = {
  gitProviderId: Scalars['ID']['input'];
};

export type DeletePolicyStatementsInput = {
  policyStatementIds: Array<Scalars['ID']['input']>;
};

export type DeletionResponse = NotFoundError | Success | UnauthorizedError;

export enum Disposition {
  AlreadyCompliant = 'ALREADY_COMPLIANT',
  AutoRemediated = 'AUTO_REMEDIATED',
  CannotRemediate = 'CANNOT_REMEDIATE',
  InsufficientInfoToRemediate = 'INSUFFICIENT_INFO_TO_REMEDIATE',
  NotApplicable = 'NOT_APPLICABLE'
}

export enum Effect {
  DirectApply = 'DirectApply',
  Preview = 'Preview',
  SubmitForReview = 'SubmitForReview'
}

export type FailedScan = {
  __typename?: 'FailedScan';
  createdAt: Scalars['String']['output'];
  createdBy: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
};

export enum GitLabApiVersion {
  V4 = 'V4'
}

export type GitProvider = {
  __typename?: 'GitProvider';
  createdAt: Scalars['String']['output'];
  createdBy: Scalars['String']['output'];
  externalUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  ownerName: Scalars['String']['output'];
  providerName: ProviderName;
  repositories: Array<Repository>;
};


export type GitProviderRepositoriesArgs = {
  selection?: InputMaybe<RepositorySelection>;
};

export type GitProviderResponse = GitProvider | NotFoundError | UnauthorizedError;

export type GombocError = {
  __typename?: 'GombocError';
  code?: Maybe<GombocErrorCode>;
  message: Scalars['String']['output'];
};

export enum GombocErrorCode {
  Generic = 'GENERIC',
  InvalidArgument = 'INVALID_ARGUMENT',
  NotFound = 'NOT_FOUND',
  NotImplemented = 'NOT_IMPLEMENTED',
  Unauthorized = 'UNAUTHORIZED'
}

export type ImportPolicyStatementsResponse = ImportedPolicyStatementSuccess | InvalidArgumentError | NotFoundError | UnauthorizedError;

export type ImportedPolicyStatementSuccess = {
  __typename?: 'ImportedPolicyStatementSuccess';
  statements: Array<PolicyStatement>;
};

export type InvalidArgumentError = {
  __typename?: 'InvalidArgumentError';
  /** @deprecated Use GombocError instead */
  message: Scalars['String']['output'];
};

export type Lighthouse = {
  __typename?: 'Lighthouse';
  level: MessageLevel;
  message: Scalars['String']['output'];
};

export type Link = {
  __typename?: 'Link';
  actionResults: Array<ActionResult>;
  createdAt: Scalars['String']['output'];
  createdBy: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastActionResult?: Maybe<ActionResult>;
  lastScan?: Maybe<ScanRequest>;
  project: Project;
  providerName: ProviderName;
  repository: LinkedRepository;
  scans: Array<ScanRequest>;
};


export type LinkActionResultsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type LinkScansArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type LinkRepositoriesInput = {
  projectId: Scalars['ID']['input'];
  providers: Array<LinkRepositoriesProviderInput>;
};

export type LinkRepositoriesProviderInput = {
  gitProviderId: Scalars['ID']['input'];
  selectedRepositoryIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type LinkRepositoryResponse = GombocError | Link;

export type LinkResponse = Link | NotFoundError | UnauthorizedError;

export type LinkedRepository = Repository | UnreachableRepository;

export type LinksPage = {
  __typename?: 'LinksPage';
  lastKey?: Maybe<Scalars['ID']['output']>;
  links: Array<Link>;
};

export type LogicalResource = {
  __typename?: 'LogicalResource';
  filepath: Scalars['String']['output'];
  line: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export enum MessageLevel {
  Error = 'ERROR',
  Info = 'INFO',
  Warning = 'WARNING'
}

export type Mutation = {
  __typename?: 'Mutation';
  scanRemoteTfHCL2: Scalars['ID']['output'];
};


export type MutationScanRemoteTfHcl2Args = {
  input: ScanRemoteTfHcl2Input;
};

export type NotFoundError = {
  __typename?: 'NotFoundError';
  /** @deprecated Use GombocError instead */
  message: Scalars['String']['output'];
};

export type Organization = {
  __typename?: 'Organization';
  gitProvider: GitProviderResponse;
  gitProviders: Array<GitProvider>;
  hasGitProviders: Scalars['Boolean']['output'];
  hasLinks: Scalars['Boolean']['output'];
  hasPolicy: Scalars['Boolean']['output'];
  hasScanRequests: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  policy: Policy;
  project: ProjectResponse;
  projects: Array<Project>;
  scans: Array<ScanRequestResponse>;
};


export type OrganizationGitProviderArgs = {
  id: Scalars['ID']['input'];
};


export type OrganizationProjectArgs = {
  slug: Scalars['String']['input'];
};


export type OrganizationScansArgs = {
  before?: InputMaybe<Scalars['String']['input']>;
};

export type OrganizationResponse = NotFoundError | Organization | UnauthorizedError;

export type Policy = {
  __typename?: 'Policy';
  statements: Array<PolicyStatement>;
};

export type PolicyObservation = {
  __typename?: 'PolicyObservation';
  capabilityTitle: Scalars['String']['output'];
  disposition: Disposition;
  filepath: Scalars['String']['output'];
  lineNumber: Scalars['Int']['output'];
  resourceName: Scalars['String']['output'];
  resourceType: Scalars['String']['output'];
};

export type PolicyStatement = {
  __typename?: 'PolicyStatement';
  createdAt: Scalars['String']['output'];
  createdBy: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  framework?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  identifier?: Maybe<Scalars['String']['output']>;
  payload: PolicyStatementPayloadType;
};

export type PolicyStatementPayloadType = CustomerApi_PolicyStatementPayloadMustImplementType;

export type Project = {
  __typename?: 'Project';
  createdAt: Scalars['String']['output'];
  createdBy: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastActionResult?: Maybe<ActionResult>;
  lastScan?: Maybe<ScanRequest>;
  link: LinkResponse;
  linkCount: Scalars['Int']['output'];
  /** @deprecated No longer supported */
  links: Array<Link>;
  linksPage: LinksPage;
  name: Scalars['String']['output'];
  policy: Policy;
  scans: Array<ScanRequest>;
  slug: Scalars['String']['output'];
};


export type ProjectLinkArgs = {
  linkId: Scalars['ID']['input'];
};


export type ProjectLinksPageArgs = {
  startKey?: InputMaybe<Scalars['ID']['input']>;
};


export type ProjectScansArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type ProjectResponse = NotFoundError | Project | UnauthorizedError;

export enum ProviderName {
  Azdo = 'AZDO',
  Bitbucket = 'BITBUCKET',
  Github = 'GITHUB',
  Gitlab = 'GITLAB'
}

export enum PullRequestStatus {
  Closed = 'CLOSED',
  Expected = 'EXPECTED',
  Merged = 'MERGED',
  Open = 'OPEN'
}

export type PutSetupCompletedInput = {
  setupCompleted: Scalars['Boolean']['input'];
};

export type Query = {
  __typename?: 'Query';
  lighthouse: Array<Lighthouse>;
  scanBranch: ScanBranchResponse;
};


export type QueryScanBranchArgs = {
  scanRequestId: Scalars['ID']['input'];
};

export type Repository = {
  __typename?: 'Repository';
  branches: Array<RepositoryBranch>;
  directoryNames: Array<Scalars['String']['output']>;
  externalUrl: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  ownerName: Scalars['String']['output'];
};


export type RepositoryBranchesArgs = {
  isProtected?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};


export type RepositoryDirectoryNamesArgs = {
  branch?: InputMaybe<Scalars['String']['input']>;
};

export type RepositoryBranch = {
  __typename?: 'RepositoryBranch';
  label?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export enum RepositorySelection {
  All = 'ALL',
  Linked = 'LINKED',
  Unlinked = 'UNLINKED'
}

export enum RequestOrigin {
  Portal = 'PORTAL',
  Workflow = 'WORKFLOW'
}

export type ScanBranch = {
  __typename?: 'ScanBranch';
  children: Array<ScanScenarioResponse>;
  childrenCompleted: Scalars['Int']['output'];
  childrenError: Scalars['Int']['output'];
  childrenExpected: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
};

export type ScanBranchResponse = FailedScan | GombocError | ScanBranch;

export type ScanRemoteTfHcl2Input = {
  effect: Effect;
  workingDirectories: Array<Scalars['String']['input']>;
};

export type ScanRepository = {
  __typename?: 'ScanRepository';
  children: Array<ScanBranchResponse>;
  childrenCompleted: Scalars['Int']['output'];
  childrenError: Scalars['Int']['output'];
  childrenExpected: Scalars['Int']['output'];
  createdAt: Scalars['String']['output'];
  createdBy: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  parent: ScanRequest;
};

export type ScanRepositoryResponse = FailedScan | GombocError | ScanRepository;

export type ScanRequest = {
  __typename?: 'ScanRequest';
  actionResults: ActionResultPage;
  children: Array<ScanRepositoryResponse>;
  childrenCompleted: Scalars['Int']['output'];
  childrenError: Scalars['Int']['output'];
  childrenExpected: Scalars['Int']['output'];
  createdAt: Scalars['String']['output'];
  createdBy: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  requestOrigin: RequestOrigin;
};


export type ScanRequestActionResultsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type ScanRequestResponse = FailedScan | GombocError | ScanRequest;

export type ScanRequestResponseType = {
  __typename?: 'ScanRequestResponseType';
  errors: Array<Maybe<GombocError>>;
  scanRequestId: Scalars['ID']['output'];
};

export type ScanScenario = {
  __typename?: 'ScanScenario';
  id: Scalars['ID']['output'];
  result: ActionResult;
};

export type ScanScenarioResponse = FailedScan | GombocError | ScanScenario;

export type SecurityFramework = {
  __typename?: 'SecurityFramework';
  controls: Array<SecurityFrameworkControl>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  tag?: Maybe<Scalars['String']['output']>;
};

export type SecurityFrameworkControl = {
  __typename?: 'SecurityFrameworkControl';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  identifier: Scalars['String']['output'];
  statements: Array<PolicyStatement>;
};

export type SendSupportRequestInput = {
  location: Scalars['String']['input'];
  message: Scalars['String']['input'];
};

export type Success = {
  __typename?: 'Success';
  message: Scalars['String']['output'];
};

export type UnauthorizedError = {
  __typename?: 'UnauthorizedError';
  /** @deprecated Use GombocError instead */
  message: Scalars['String']['output'];
};

export type UnreachableRepository = {
  __typename?: 'UnreachableRepository';
  id: Scalars['ID']['output'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  organizations: Array<Organization>;
  pictureUrl: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type ScanRemoteTfHcl2MutationVariables = Exact<{
  input: ScanRemoteTfHcl2Input;
}>;


export type ScanRemoteTfHcl2Mutation = { __typename: 'Mutation', scanRemoteTfHCL2: string };

export type ScanBranchActionResultsQueryVariables = Exact<{
  scanRequestId: Scalars['ID']['input'];
  pageSize: Scalars['Int']['input'];
}>;


export type ScanBranchActionResultsQuery = { __typename: 'Query', scanBranch: { __typename: 'FailedScan', id: string, message: string } | { __typename: 'GombocError', code?: GombocErrorCode | null, message: string } | { __typename: 'ScanBranch', id: string, childrenCompleted: number, childrenError: number, childrenExpected: number, children: Array<{ __typename: 'FailedScan', id: string, message: string } | { __typename: 'GombocError', code?: GombocErrorCode | null, message: string } | { __typename: 'ScanScenario', id: string, result: { __typename: 'ActionResult', id: string, observations: Array<{ __typename: 'PolicyObservation', filepath: string, lineNumber: number, resourceName: string, resourceType: string, disposition: Disposition, capabilityTitle: string }> } }> } };

export type ScanBranchStatusQueryVariables = Exact<{
  scanRequestId: Scalars['ID']['input'];
}>;


export type ScanBranchStatusQuery = { __typename: 'Query', scanBranch: { __typename: 'FailedScan', id: string, message: string } | { __typename: 'GombocError', code?: GombocErrorCode | null, message: string } | { __typename: 'ScanBranch', id: string, childrenCompleted: number, childrenError: number, childrenExpected: number } };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType'];

  constructor(private value: string, public __meta__?: Record<string, any>) {
    super(value);
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const ScanRemoteTfHcl2Document = new TypedDocumentString(`
    mutation ScanRemoteTfHCL2($input: ScanRemoteTfHCL2Input!) {
  __typename
  scanRemoteTfHCL2(input: $input)
}
    `) as unknown as TypedDocumentString<ScanRemoteTfHcl2Mutation, ScanRemoteTfHcl2MutationVariables>;
export const ScanBranchActionResultsDocument = new TypedDocumentString(`
    query scanBranchActionResults($scanRequestId: ID!, $pageSize: Int!) {
  __typename
  scanBranch(scanRequestId: $scanRequestId) {
    __typename
    ... on ScanBranch {
      __typename
      id
      childrenCompleted
      childrenError
      childrenExpected
      children {
        __typename
        ... on ScanScenario {
          __typename
          id
          result {
            __typename
            id
            observations(
              exclude: [ALREADY_COMPLIANT, NOT_APPLICABLE, INSUFFICIENT_INFO_TO_REMEDIATE]
              page: 1
              size: $pageSize
            ) {
              __typename
              filepath
              lineNumber
              resourceName
              resourceType
              disposition
              capabilityTitle
            }
          }
        }
        ... on FailedScan {
          __typename
          id
          message
        }
        ... on GombocError {
          __typename
          code
          message
        }
      }
    }
    ... on FailedScan {
      __typename
      id
      message
    }
    ... on GombocError {
      __typename
      code
      message
    }
  }
}
    `) as unknown as TypedDocumentString<ScanBranchActionResultsQuery, ScanBranchActionResultsQueryVariables>;
export const ScanBranchStatusDocument = new TypedDocumentString(`
    query scanBranchStatus($scanRequestId: ID!) {
  __typename
  scanBranch(scanRequestId: $scanRequestId) {
    __typename
    ... on ScanBranch {
      __typename
      id
      childrenCompleted
      childrenError
      childrenExpected
    }
    ... on FailedScan {
      __typename
      id
      message
    }
    ... on GombocError {
      __typename
      code
      message
    }
  }
}
    `) as unknown as TypedDocumentString<ScanBranchStatusQuery, ScanBranchStatusQueryVariables>;