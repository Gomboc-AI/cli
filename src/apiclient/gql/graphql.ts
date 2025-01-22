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

/** A Scan Result that originated from a Scan Request */
export type ActionResult = {
  __typename?: 'ActionResult';
  id: Scalars['ID']['output'];
  /** The list of observations in this scan result */
  observations: Array<PolicyObservation>;
};


/** A Scan Result that originated from a Scan Request */
export type ActionResultObservationsArgs = {
  exclude?: InputMaybe<Array<Disposition>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export enum ActionResultCondition {
  AllFixed = 'ALL_FIXED',
  Compliant = 'COMPLIANT',
  NoneFixed = 'NONE_FIXED',
  SomeFixed = 'SOME_FIXED'
}

export type ActionResultPage = {
  __typename?: 'ActionResultPage';
  page: Scalars['Int']['output'];
  results: Array<ActionResult>;
  size: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

export type ActionResultResponse = ActionResult | GombocError;

export type AdoptFrameworkControlsIntoOrganizationInput = {
  controlIds: Array<Scalars['ID']['input']>;
  resetPolicy: Scalars['Boolean']['input'];
};

export enum BitBucketApiVersion {
  V2_0 = 'V2_0'
}

export type BulkLinkScanRemoteInput = {
  iacTool: InfrastructureTool;
  linkIds: Array<Scalars['ID']['input']>;
};

export type BulkLinkScanRemoteTfHcl2Input = {
  linkIds: Array<Scalars['ID']['input']>;
};

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

export type CreateGitHubProviderInput = {
  code: Scalars['String']['input'];
  installationId: Scalars['ID']['input'];
};

export type CreateGitHubProviderResponse = GitProvider | GombocError;

export type CreateGitLabProviderInput = {
  apiUrl: Scalars['String']['input'];
  apiVersion: GitLabApiVersion;
  groupAccessToken: Scalars['String']['input'];
};

export type CreateGitLabProviderOutput = GitProvider | GombocError;

export type CreateMustImplementPolicyStatementInput = {
  capabilityId: Scalars['ID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  framework?: InputMaybe<Scalars['String']['input']>;
  identifier?: InputMaybe<Scalars['String']['input']>;
};

export type CreatePolicyStatementResponse = GombocError | PolicyStatement;

export type CreateProjectResponse = GombocError | Project;

export type CreateTicketInput = {
  actionResultId: Scalars['ID']['input'];
  externalUrl: Scalars['String']['input'];
};

export type CreateTicketOutput = GombocError | Ticket;

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

export type DeleteTicketInput = {
  ticketId: Scalars['ID']['input'];
};

export enum Disposition {
  AlreadyCompliant = 'ALREADY_COMPLIANT',
  AutoRemediated = 'AUTO_REMEDIATED',
  CannotRemediate = 'CANNOT_REMEDIATE',
  InsufficientInfoToRemediate = 'INSUFFICIENT_INFO_TO_REMEDIATE',
  NotApplicable = 'NOT_APPLICABLE'
}

export enum Effect {
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

/** Represents an integration to an SCM provider **owner** entity, such as: - A GitHub **organization** - A GitLab **group** - A Bitbucket **workspace** - An Azure DevOps **organization** */
export type GitProvider = {
  __typename?: 'GitProvider';
  createdAt: Scalars['String']['output'];
  /** Returns the email of the user who integrated the SCM provider */
  createdBy: Scalars['String']['output'];
  /** A URL to the SCM provider integration page */
  externalUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  /** The name of the SCM provider owner (see above) */
  ownerName: Scalars['String']['output'];
  providerName: ProviderName;
  /** All the repositories this integration has access to */
  repositories: Array<Repository>;
};


/** Represents an integration to an SCM provider **owner** entity, such as: - A GitHub **organization** - A GitLab **group** - A Bitbucket **workspace** - An Azure DevOps **organization** */
export type GitProviderRepositoriesArgs = {
  selection?: InputMaybe<RepositorySelection>;
};

export type GitProviderResponse = GitProvider | GombocError;

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

export type ImportPolicyStatementsResponse = GombocError | ImportedPolicyStatementSuccess;

export type ImportedPolicyStatementSuccess = {
  __typename?: 'ImportedPolicyStatementSuccess';
  statements: Array<PolicyStatement>;
};

export enum InfrastructureTool {
  Cloudformation = 'CLOUDFORMATION',
  Terraform = 'TERRAFORM'
}

export type Lighthouse = {
  __typename?: 'Lighthouse';
  level: MessageLevel;
  message: Scalars['String']['output'];
};

export type Link = {
  __typename?: 'Link';
  /** Returns a page of Scan Results related to this linked repository */
  actionResults: ActionResultPage;
  createdAt: Scalars['String']['output'];
  /** Returns the email of the user who linked the repository */
  createdBy: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** Return the latest Scan Request related to this linked repository */
  lastScanRequest?: Maybe<ScanRequest>;
  /** Returns the project the repository is linked to */
  project: Project;
  /** Returns the name of the SCM Provider */
  providerName: ProviderName;
  /** Returns the repository itself */
  repository: LinkedRepository;
  /** Returns a URL-friendly slug for the linked repository */
  slug: Scalars['ID']['output'];
};


export type LinkActionResultsArgs = {
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

export type LinkResponse = GombocError | Link;

export type LinkScanRemoteInput = {
  branchName?: InputMaybe<Scalars['String']['input']>;
  effect: Effect;
  iacTool: InfrastructureTool;
  linkId: Scalars['ID']['input'];
  pullRequestTitle?: InputMaybe<Scalars['String']['input']>;
  recurse?: InputMaybe<Scalars['Boolean']['input']>;
  workingDirectory?: InputMaybe<Scalars['String']['input']>;
};

export type LinkScanRemoteTfHcl2Input = {
  branchName?: InputMaybe<Scalars['String']['input']>;
  effect: Effect;
  linkId: Scalars['ID']['input'];
  pullRequestTitle?: InputMaybe<Scalars['String']['input']>;
  recurse?: InputMaybe<Scalars['Boolean']['input']>;
  workingDirectory?: InputMaybe<Scalars['String']['input']>;
};

export type LinkedRepository = Repository | UnreachableRepository;

export type LinksPage = {
  __typename?: 'LinksPage';
  /** Use this to get the next page */
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
  /** *Internal use only* */
  scanRemote: Scalars['ID']['output'];
};


export type MutationScanRemoteArgs = {
  input: ScanRemoteInput;
};

/** A customer organization as represented in the system */
export type Organization = {
  __typename?: 'Organization';
  /** Returns one SCM integration by its ID, or an error if not found */
  gitProvider: GitProviderResponse;
  /** Returns SCM integrations for this organization */
  gitProviders: Array<GitProvider>;
  /** Returns true if the organization has at least one SCM Integration */
  hasGitProviders: Scalars['Boolean']['output'];
  /** Returns true if the organization has at least one Linked Repository */
  hasLinks: Scalars['Boolean']['output'];
  /** Returns true if the organization has at least one Policy Statement */
  hasPolicy: Scalars['Boolean']['output'];
  /** Returns true if the organization has received at least one Scan Request */
  hasScanRequests: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  /** Returns the security policy for this organization */
  policy: Policy;
  /** Return one Gomboc project by its slug, or an error if not found */
  project: ProjectResponse;
  /** Returns all Gomboc projects for this organization */
  projects: Array<Project>;
  /** Returns recent scan requests for this organization */
  scans: Array<ScanRequestResponse>;
};


/** A customer organization as represented in the system */
export type OrganizationGitProviderArgs = {
  id: Scalars['ID']['input'];
};


/** A customer organization as represented in the system */
export type OrganizationProjectArgs = {
  slug: Scalars['String']['input'];
};


/** A customer organization as represented in the system */
export type OrganizationScansArgs = {
  before?: InputMaybe<Scalars['String']['input']>;
};

export type OrganizationResponse = GombocError | Organization;

export type Policy = {
  __typename?: 'Policy';
  statements: Array<PolicyStatement>;
};

export type PolicyObservation = {
  __typename?: 'PolicyObservation';
  /** The policy statement capability Title involved */
  capabilityTitle: Scalars['String']['output'];
  disposition: Disposition;
  /** The filepath of the IaC resource that was observed */
  filepath: Scalars['String']['output'];
  /** The file line number of the IaC resource that was observed */
  lineNumber: Scalars['Int']['output'];
  /** The name of the IaC resource that was observed */
  resourceName: Scalars['String']['output'];
  /** The type of the IaC resource that was observed */
  resourceType: Scalars['String']['output'];
};

export type PolicyStatement = {
  __typename?: 'PolicyStatement';
  createdAt: Scalars['String']['output'];
  /** Returns the email of the user who added the policy statement */
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
  /** Returns the email of the user who created the project */
  createdBy: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** Returns the most recent Scan Request related to this project */
  lastScanRequest?: Maybe<ScanRequest>;
  /** Returns a single linked repository by its ID, or an error if not found */
  link: LinkResponse;
  /** Returns a single linked repository by its slug, or an error if not found */
  linkBySlug: LinkResponse;
  /** Returns the number of linked repositories */
  linkCount: Scalars['Int']['output'];
  /** @deprecated No longer supported */
  links: Array<Link>;
  /** Returns a page of repositories linked to this project */
  linksPage: LinksPage;
  /** Returns the name of the project */
  name: Scalars['String']['output'];
  /** @deprecated No longer supported */
  policy: Policy;
  /** Returns a URL-friendly slug for the project */
  slug: Scalars['String']['output'];
};


export type ProjectLinkArgs = {
  linkId: Scalars['ID']['input'];
};


export type ProjectLinkBySlugArgs = {
  slug: Scalars['ID']['input'];
};


export type ProjectLinksPageArgs = {
  startKey?: InputMaybe<Scalars['ID']['input']>;
};

export type ProjectResponse = GombocError | Project;

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
  /** *Internal use only* */
  scanBranch: ScanBranchResponse;
  /** *Internal use only* */
  scanDirectory: ScanDirectoryResponse;
};


export type QueryScanBranchArgs = {
  scanRequestId: Scalars['ID']['input'];
};


export type QueryScanDirectoryArgs = {
  scanRequestId: Scalars['ID']['input'];
};

export type Repository = {
  __typename?: 'Repository';
  /** The list of branches in the repository */
  branches: Array<RepositoryBranch>;
  /** The list of directories in the repository */
  directoryNames: Array<Scalars['String']['output']>;
  /** A URL to the SCM provider repository page */
  externalUrl: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  /** The name of the SCM provider owner */
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
  /** Returns additional info on the branch (e.g. "main", "protected"...) */
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

export type Scan = {
  __typename?: 'Scan';
  actionResult?: Maybe<ActionResult>;
  children: ScanPage;
  createdAt: Scalars['String']['output'];
  createdBy: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  metadata: Scalars['String']['output'];
  parent?: Maybe<Scan>;
  scanRequestId: Scalars['ID']['output'];
  scanScope: Scalars['String']['output'];
};


export type ScanChildrenArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type ScanBranch = {
  __typename?: 'ScanBranch';
  children: Array<ScanScenarioResponse>;
  childrenCompleted: Scalars['Int']['output'];
  childrenError: Scalars['Int']['output'];
  childrenExpected: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
};

export type ScanBranchResponse = FailedScan | GombocError | ScanBranch;

export type ScanDirectory = {
  __typename?: 'ScanDirectory';
  children: Array<ScanScenarioResponse>;
  childrenCompleted: Scalars['Int']['output'];
  childrenError: Scalars['Int']['output'];
  childrenExpected: Scalars['Int']['output'];
  createdAt: Scalars['String']['output'];
  createdBy: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  parent: ScanBranch;
};

export type ScanDirectoryResponse = FailedScan | GombocError | ScanDirectory;

export type ScanPage = {
  __typename?: 'ScanPage';
  page: Scalars['Int']['output'];
  results: Array<Scan>;
  size: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

export type ScanRemoteInput = {
  effect: Effect;
  iacTool: InfrastructureTool;
  workingDirectories: Array<Scalars['String']['input']>;
};

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
  /** @deprecated No longer supported */
  children: Array<ScanRepositoryResponse>;
  childrenCompleted: Scalars['Int']['output'];
  childrenError: Scalars['Int']['output'];
  childrenExpected: Scalars['Int']['output'];
  createdAt: Scalars['String']['output'];
  createdBy: Scalars['String']['output'];
  effect: Effect;
  id: Scalars['ID']['output'];
  requestOrigin: RequestOrigin;
  scans: ScanPage;
};


export type ScanRequestActionResultsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type ScanRequestScansArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type ScanRequestResponse = FailedScan | GombocError | ScanRequest;

export type ScanRequestResponseType = {
  __typename?: 'ScanRequestResponseType';
  errors: Array<Maybe<GombocError>>;
  scanRequestId: Scalars['ID']['output'];
};

export type ScanResponse = FailedScan | GombocError | Scan;

export type ScanScenario = {
  __typename?: 'ScanScenario';
  id: Scalars['ID']['output'];
  result?: Maybe<ActionResult>;
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

export type Ticket = {
  __typename?: 'Ticket';
  createdAt: Scalars['String']['output'];
  /** Returns the email of the user who linked the ticket */
  createdBy: Scalars['String']['output'];
  /** A link to the external ticketing system */
  externalUrl: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type TicketPage = {
  __typename?: 'TicketPage';
  page: Scalars['Int']['output'];
  results: Array<Ticket>;
  totalCount: Scalars['Int']['output'];
};

/** Represents a repository that was either deleted or is unreachable due to service or integration issues */
export type UnreachableRepository = {
  __typename?: 'UnreachableRepository';
  id: Scalars['ID']['output'];
};

export type ScanRemoteMutationVariables = Exact<{
  input: ScanRemoteInput;
}>;


export type ScanRemoteMutation = { __typename: 'Mutation', scanRemote: string };

export type ScanBranchActionResultsQueryVariables = Exact<{
  scanRequestId: Scalars['ID']['input'];
  pageSize: Scalars['Int']['input'];
}>;


export type ScanBranchActionResultsQuery = { __typename: 'Query', scanBranch: { __typename: 'FailedScan', id: string, message: string } | { __typename: 'GombocError', code?: GombocErrorCode | null, message: string } | { __typename: 'ScanBranch', id: string, childrenCompleted: number, childrenError: number, childrenExpected: number, children: Array<{ __typename: 'FailedScan', id: string, message: string } | { __typename: 'GombocError', code?: GombocErrorCode | null, message: string } | { __typename: 'ScanScenario', id: string, result?: { __typename: 'ActionResult', id: string, observations: Array<{ __typename: 'PolicyObservation', filepath: string, lineNumber: number, resourceName: string, resourceType: string, disposition: Disposition, capabilityTitle: string }> } | null }> } };

export type ScanBranchStatusQueryVariables = Exact<{
  scanRequestId: Scalars['ID']['input'];
}>;


export type ScanBranchStatusQuery = { __typename: 'Query', scanBranch: { __typename: 'FailedScan', id: string, message: string } | { __typename: 'GombocError', code?: GombocErrorCode | null, message: string } | { __typename: 'ScanBranch', id: string, childrenCompleted: number, childrenError: number, childrenExpected: number } };

export type ScanDirectoryActionResultsQueryVariables = Exact<{
  scanRequestId: Scalars['ID']['input'];
  pageSize: Scalars['Int']['input'];
}>;


export type ScanDirectoryActionResultsQuery = { __typename: 'Query', scanDirectory: { __typename: 'FailedScan', id: string, message: string } | { __typename: 'GombocError', code?: GombocErrorCode | null, message: string } | { __typename: 'ScanDirectory', id: string, childrenCompleted: number, childrenError: number, childrenExpected: number, children: Array<{ __typename: 'FailedScan', id: string, message: string } | { __typename: 'GombocError', code?: GombocErrorCode | null, message: string } | { __typename: 'ScanScenario', id: string, result?: { __typename: 'ActionResult', id: string, observations: Array<{ __typename: 'PolicyObservation', filepath: string, lineNumber: number, resourceName: string, resourceType: string, disposition: Disposition, capabilityTitle: string }> } | null }> } };

export type ScanDirectoryStatusQueryVariables = Exact<{
  scanRequestId: Scalars['ID']['input'];
}>;


export type ScanDirectoryStatusQuery = { __typename: 'Query', scanDirectory: { __typename: 'FailedScan', id: string, message: string } | { __typename: 'GombocError', code?: GombocErrorCode | null, message: string } | { __typename: 'ScanDirectory', id: string, childrenCompleted: number, childrenError: number, childrenExpected: number } };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables> {
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType'];

  constructor(private value: string, public __meta__?: Record<string, any>) {
    super(value);
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const ScanRemoteDocument = new TypedDocumentString(`
    mutation ScanRemote($input: ScanRemoteInput!) {
  __typename
  scanRemote(input: $input)
}
    `) as unknown as TypedDocumentString<ScanRemoteMutation, ScanRemoteMutationVariables>;
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
export const ScanDirectoryActionResultsDocument = new TypedDocumentString(`
    query scanDirectoryActionResults($scanRequestId: ID!, $pageSize: Int!) {
  __typename
  scanDirectory(scanRequestId: $scanRequestId) {
    __typename
    ... on ScanDirectory {
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
    `) as unknown as TypedDocumentString<ScanDirectoryActionResultsQuery, ScanDirectoryActionResultsQueryVariables>;
export const ScanDirectoryStatusDocument = new TypedDocumentString(`
    query scanDirectoryStatus($scanRequestId: ID!) {
  __typename
  scanDirectory(scanRequestId: $scanRequestId) {
    __typename
    ... on ScanDirectory {
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
    `) as unknown as TypedDocumentString<ScanDirectoryStatusQuery, ScanDirectoryStatusQueryVariables>;