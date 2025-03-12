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
  /**
   * The list of observations in this scan result
   * @deprecated use policyObservations -- paginated
   */
  observations: Array<PolicyObservation>;
  /** A page of policy observations in this scan result */
  policyObservations: PolicyObservationsPage;
};


/** A Scan Result that originated from a Scan Request */
export type ActionResultObservationsArgs = {
  exclude?: InputMaybe<Array<Disposition>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


/** A Scan Result that originated from a Scan Request */
export type ActionResultPolicyObservationsArgs = {
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
  policyStatements: Array<CreateMustImplementPolicyStatementInput>;
  resetPolicy: Scalars['Boolean']['input'];
};

export type AdoptFrameworkControlsIntoOrganizationResponse = GombocError | Policy;

export type AppliedMustImplementPolicyStatement = {
  __typename?: 'AppliedMustImplementPolicyStatement';
  capability: Capability;
};

export type AppliedPolicyStatement = {
  __typename?: 'AppliedPolicyStatement';
  description: Scalars['String']['output'];
  framework: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  identifier: Scalars['String']['output'];
  observations: Array<PolicyObservation>;
  payload: AppliedPolicyStatementPayloadType;
  source: StatementSource;
};

export type AppliedPolicyStatementPayloadType = AppliedMustImplementPolicyStatement;

export type AutoRemediateCfnFileComments = {
  __typename?: 'AutoRemediateCfnFileComments';
  commentMarkdown: Scalars['String']['output'];
  /** @deprecated No longer supported */
  commentPlain?: Maybe<Scalars['String']['output']>;
  line: Scalars['Int']['output'];
};

export type AutoRemediateCfnFileSuccess = {
  __typename?: 'AutoRemediateCfnFileSuccess';
  appliedPolicyStatements: Array<AppliedPolicyStatement>;
  file: AutoRemediatedCfnFile;
  generalCommentMarkdown: Scalars['String']['output'];
  /** @deprecated No longer supported */
  generalCommentPlain?: Maybe<Scalars['String']['output']>;
};

export type AutoRemediateCfnInvalidFileError = {
  __typename?: 'AutoRemediateCfnInvalidFileError';
  filepath: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type AutoRemediateTfHclFileComments = {
  __typename?: 'AutoRemediateTfHCLFileComments';
  commentMarkdown: Scalars['String']['output'];
  /** @deprecated No longer supported */
  commentPlain?: Maybe<Scalars['String']['output']>;
  line: Scalars['Int']['output'];
};

export type AutoRemediateTfHclFilesSuccess = {
  __typename?: 'AutoRemediateTfHCLFilesSuccess';
  appliedPolicyStatements: Array<AppliedPolicyStatement>;
  files: Array<AutoRemediatedTfHclFile>;
  /** @deprecated No longer supported */
  generalCommentPlain?: Maybe<Scalars['String']['output']>;
};

export type AutoRemediatedCfnFile = {
  __typename?: 'AutoRemediatedCfnFile';
  fileComments: Array<AutoRemediateCfnFileComments>;
  filepath: Scalars['String']['output'];
  newContent: Scalars['String']['output'];
};

export type AutoRemediatedTfHclFile = {
  __typename?: 'AutoRemediatedTfHCLFile';
  fileComments: Array<AutoRemediateTfHclFileComments>;
  filepath: Scalars['String']['output'];
  newContent: Scalars['String']['output'];
};

export enum BitBucketApiVersion {
  V2_0 = 'V2_0'
}

export type BulkAllLinkScanRemoteInput = {
  iacTools: Array<InfrastructureTool>;
};

export type BulkLinkScanRemoteInput = {
  iacTools: Array<InfrastructureTool>;
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

export type CloudResource = {
  __typename?: 'CloudResource';
  id: Scalars['ID']['output'];
  provider: CloudResourceProvider;
  title: Scalars['String']['output'];
};

export type CloudResourcePage = {
  __typename?: 'CloudResourcePage';
  page: Scalars['Int']['output'];
  results: Array<CloudResource>;
  size: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export enum CloudResourceProvider {
  Aws = 'AWS',
  Azure = 'AZURE',
  Gcp = 'GCP'
}

export type CodeResource = {
  __typename?: 'CodeResource';
  cloudResource: CloudResource;
  documentationUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  infrastructureTool: InfrastructureTool;
};

export type CodeResourcePage = {
  __typename?: 'CodeResourcePage';
  page: Scalars['Int']['output'];
  results: Array<CodeResource>;
  size: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type CreateAzdoProviderInput = {
  organization: Scalars['String']['input'];
  personalAccessToken: Scalars['String']['input'];
};

export type CreateAzdoProviderOutput = GitProvider | GombocError;

export type CreateBitBucketProviderInput = {
  accessToken: Scalars['String']['input'];
  apiVersion: BitBucketApiVersion;
  gombocAccessToken: Scalars['String']['input'];
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

export type CreateLinkInput = {
  gitProviderId: Scalars['ID']['input'];
  projectId: Scalars['ID']['input'];
  repositoryId: Scalars['ID']['input'];
};

export type CreateMustImplementPolicyStatementInput = {
  capabilityId: Scalars['ID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  framework?: InputMaybe<Scalars['String']['input']>;
  identifier?: InputMaybe<Scalars['String']['input']>;
};

export type CreateOrcaIntegrationInput = {
  gombocToken: Scalars['String']['input'];
  name: Scalars['String']['input'];
  orcaApiToken: Scalars['String']['input'];
  orcaRegion: OrcaRegion;
};

export type CreatePolicyStatementResponse = GombocError | SetPolicyStatement;

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

export type DeleteOrcaIntegrationInput = {
  integrationId: Scalars['ID']['input'];
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
  /** The name of the integration to be displayed */
  name?: Maybe<Scalars['String']['output']>;
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

export enum InfrastructureTool {
  Cloudformation = 'CLOUDFORMATION',
  Terraform = 'TERRAFORM'
}

export type InheritedAutoRemediateCfnFileResponse = AutoRemediateCfnFileSuccess | AutoRemediateCfnInvalidFileError;

export type InheritedAutoRemediateTfHclFilesResponse = AutoRemediateTfHclFilesSuccess;

export type InheritedPolicyStatementPayloadMustImplementType = {
  capabilityId: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  metadata: InputStatementMetadata;
};

export type InputFile = {
  content: Scalars['String']['input'];
  filepath: Scalars['String']['input'];
};

export type InputStatementMetadata = {
  createdAt: Scalars['String']['input'];
  createdBy: Scalars['String']['input'];
  description: Scalars['String']['input'];
  framework: Scalars['String']['input'];
  identifier: Scalars['String']['input'];
  source: StatementSource;
};

export enum IntegrationParty {
  Orca = 'ORCA',
  Wiz = 'WIZ'
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
  iacTools: Array<InfrastructureTool>;
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
  cloudResource?: Maybe<CloudResource>;
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
  scanOnPullRequest: ScanRequestResponseType;
  scanOnSchedule: ScanRequestResponseType;
  /**
   * *Internal use only*
   * @deprecated Use scanOnSchedule or scanOnPullRequest instead
   */
  scanRemote: Scalars['ID']['output'];
};


export type MutationScanOnPullRequestArgs = {
  input: ScanOnPullRequestInput;
};


export type MutationScanOnScheduleArgs = {
  input: ScanOnScheduleInput;
};


export type MutationScanRemoteArgs = {
  input: ScanRemoteInput;
};

export type OrcaAlert = {
  __typename?: 'OrcaAlert';
  actionResults: ActionResultPage;
  assetName: Scalars['String']['output'];
  assetType?: Maybe<Scalars['String']['output']>;
  cloudResource?: Maybe<CloudResource>;
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastScanRequest?: Maybe<ScanRequest>;
  orcaScore: Scalars['Float']['output'];
  scanTarget?: Maybe<ScanTarget>;
  status: Scalars['String']['output'];
  title: Scalars['String']['output'];
};


export type OrcaAlertActionResultsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type OrcaAlertResponse = GombocError | OrcaAlert;

export type OrcaAlertScanPageResponse = GombocError | ScanPage;

export type OrcaAlertsPage = {
  __typename?: 'OrcaAlertsPage';
  alerts: Array<OrcaAlert>;
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  totalItems: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

/** Represents an integration to a CSPM provider */
export type OrcaIntegration = {
  __typename?: 'OrcaIntegration';
  /** Alerts for a given CSPM integration */
  alertsPage: OrcaAlertsPage;
  apiKey: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  integrationParty: IntegrationParty;
  name: Scalars['String']['output'];
};


/** Represents an integration to a CSPM provider */
export type OrcaIntegrationAlertsPageArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};

export type OrcaIntegrationResponse = GombocError | OrcaIntegration;

export enum OrcaRegion {
  Australia = 'Australia',
  Brazil = 'Brazil',
  Europe = 'Europe',
  India = 'India',
  Israel = 'Israel',
  Us = 'US'
}

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
  /** Returns CSPM integrations for this organization */
  orcaIntegration?: Maybe<OrcaIntegration>;
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
  statements: Array<SetPolicyStatement>;
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
  /** The name of the IaC resource instance that was observed */
  resourceName: Scalars['String']['output'];
  /**
   * The type of the IaC resource that was observed
   * @deprecated No longer supported
   */
  resourceType: Scalars['String']['output'];
};

export type PolicyObservationResponse = GombocError | PolicyObservation;

export type PolicyObservationsPage = {
  __typename?: 'PolicyObservationsPage';
  page: Scalars['Int']['output'];
  results: Array<PolicyObservation>;
  size: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

export type PolicyStatement = {
  __typename?: 'PolicyStatement';
  description?: Maybe<Scalars['String']['output']>;
  framework?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  identifier?: Maybe<Scalars['String']['output']>;
  payload: PolicyStatementPayloadType;
};

export type PolicyStatementPayload = CustomerApi_PolicyStatementPayloadMustImplementType;

export type PolicyStatementPayloadMustImplement = {
  __typename?: 'PolicyStatementPayloadMustImplement';
  capability: Capability;
};

export type PolicyStatementPayloadType = PolicyStatementPayloadMustImplement;

export type Project = {
  __typename?: 'Project';
  createdAt: Scalars['String']['output'];
  /** Returns the email of the user who created the project */
  createdBy: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** Returns the most recent Scan Request related to this project */
  lastScanRequest?: Maybe<ScanRequest>;
  /**
   * Returns a single linked repository by its ID, or an error if not found
   * @deprecated Use Query.link(id: ID!)
   */
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
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  startKey?: InputMaybe<Scalars['ID']['input']>;
};

export type ProjectResponse = GombocError | Project;

export enum ProviderName {
  Azdo = 'AZDO',
  Bitbucket = 'BITBUCKET',
  Github = 'GITHUB',
  Gitlab = 'GITLAB'
}

export type PullRequest = {
  __typename?: 'PullRequest';
  externalUrl: Scalars['String']['output'];
  identifier: Scalars['String']['output'];
  providerName: ProviderName;
  status: PullRequestStatus;
};

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

/** Places from where scan requests can originate */
export enum RequestOrigin {
  OrcaSecurity = 'ORCA_SECURITY',
  Portal = 'PORTAL',
  Workflow = 'WORKFLOW'
}

export type ResultingPolicy = {
  mustImplement: Array<InheritedPolicyStatementPayloadMustImplementType>;
};

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

export type ScanFromOrcaInput = {
  /** The effect -- defaults to 'SubmitForReview' */
  effect?: InputMaybe<Effect>;
  /** The Orca alert ID -- it must have a scan target or this will fail */
  orcaAlertId: Scalars['ID']['input'];
  /** The target for the scan */
  scanTarget: ScanTargetInput;
};

export type ScanOnPullRequestInput = {
  effect: Effect;
  iacTools: Array<InfrastructureTool>;
  pullRequestIdentifier: Scalars['String']['input'];
  scenarioPaths: Array<Scalars['String']['input']>;
};

export type ScanOnScheduleInput = {
  directory: Scalars['String']['input'];
  effect: Effect;
  iacTools: Array<InfrastructureTool>;
  recurse: Scalars['Boolean']['input'];
};

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
  pullRequestIdentifier?: InputMaybe<Scalars['String']['input']>;
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
  /** List of errors encountered during the scan */
  errors: Array<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** Orca Security Alert ID -- if there is one */
  orcaAlertId?: Maybe<Scalars['ID']['output']>;
  /** The Pull Request that triggered this scan, if there is one */
  pullRequest?: Maybe<PullRequest>;
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

export type ScanTarget = {
  __typename?: 'ScanTarget';
  /** The repository branch */
  branch: Scalars['String']['output'];
  /** Maps to a repository */
  link?: Maybe<Link>;
  /** The scenario path: a directory or a filepath */
  path: Scalars['String']['output'];
};

export type ScanTargetInput = {
  /** The repository branch */
  branch: Scalars['String']['input'];
  /** Maps to a repository */
  linkId: Scalars['ID']['input'];
  /** The scenario path: a directory or a filepath */
  path: Scalars['String']['input'];
};

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

export type SetPolicyStatement = {
  __typename?: 'SetPolicyStatement';
  createdAt: Scalars['String']['output'];
  /** Returns the email of the user who added the policy statement */
  createdBy: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  framework?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  identifier?: Maybe<Scalars['String']['output']>;
  payload: PolicyStatementPayload;
};

export type SetScanTargetInput = {
  /** The alert to be updated */
  orcaAlertId: Scalars['ID']['input'];
  /** The scan target to be set */
  scanTarget: ScanTargetInput;
};

export enum StatementSource {
  Organization = 'ORGANIZATION',
  Project = 'PROJECT'
}

export type Success = {
  __typename?: 'Success';
  message: Scalars['String']['output'];
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

/** A customer user with access to the system */
export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** All the organizations the user is a member of (usually just one) */
  organizations: Array<Organization>;
  pictureUrl: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type ScanOnPullRequestMutationVariables = Exact<{
  input: ScanOnPullRequestInput;
}>;


export type ScanOnPullRequestMutation = { __typename: 'Mutation', scanOnPullRequest: { __typename: 'ScanRequestResponseType', scanRequestId: string, errors: Array<{ __typename: 'GombocError', message: string, code?: GombocErrorCode | null } | null> } };

export type ScanOnScheduleMutationVariables = Exact<{
  input: ScanOnScheduleInput;
}>;


export type ScanOnScheduleMutation = { __typename: 'Mutation', scanOnSchedule: { __typename: 'ScanRequestResponseType', scanRequestId: string, errors: Array<{ __typename: 'GombocError', message: string, code?: GombocErrorCode | null } | null> } };

export type ScanBranchActionResultsQueryVariables = Exact<{
  scanRequestId: Scalars['ID']['input'];
  pageSize: Scalars['Int']['input'];
}>;


export type ScanBranchActionResultsQuery = { __typename: 'Query', scanBranch: { __typename: 'FailedScan', id: string, message: string } | { __typename: 'GombocError', code?: GombocErrorCode | null, message: string } | { __typename: 'ScanBranch', id: string, childrenCompleted: number, childrenError: number, childrenExpected: number, children: Array<{ __typename: 'FailedScan', id: string, message: string } | { __typename: 'GombocError', code?: GombocErrorCode | null, message: string } | { __typename: 'ScanScenario', id: string, result?: { __typename: 'ActionResult', id: string, policyObservations: { __typename: 'PolicyObservationsPage', results: Array<{ __typename: 'PolicyObservation', filepath: string, lineNumber: number, resourceName: string, resourceType: string, disposition: Disposition, capabilityTitle: string }> } } | null }> } };

export type ScanBranchStatusQueryVariables = Exact<{
  scanRequestId: Scalars['ID']['input'];
}>;


export type ScanBranchStatusQuery = { __typename: 'Query', scanBranch: { __typename: 'FailedScan', id: string, message: string } | { __typename: 'GombocError', code?: GombocErrorCode | null, message: string } | { __typename: 'ScanBranch', id: string, childrenCompleted: number, childrenError: number, childrenExpected: number } };

export type ScanDirectoryActionResultsQueryVariables = Exact<{
  scanRequestId: Scalars['ID']['input'];
  pageSize: Scalars['Int']['input'];
}>;


export type ScanDirectoryActionResultsQuery = { __typename: 'Query', scanDirectory: { __typename: 'FailedScan', id: string, message: string } | { __typename: 'GombocError', code?: GombocErrorCode | null, message: string } | { __typename: 'ScanDirectory', id: string, childrenCompleted: number, childrenError: number, childrenExpected: number, children: Array<{ __typename: 'FailedScan', id: string, message: string } | { __typename: 'GombocError', code?: GombocErrorCode | null, message: string } | { __typename: 'ScanScenario', id: string, result?: { __typename: 'ActionResult', id: string, policyObservations: { __typename: 'PolicyObservationsPage', results: Array<{ __typename: 'PolicyObservation', filepath: string, lineNumber: number, resourceName: string, resourceType: string, disposition: Disposition, capabilityTitle: string }> } } | null }> } };

export type ScanDirectoryStatusQueryVariables = Exact<{
  scanRequestId: Scalars['ID']['input'];
}>;


export type ScanDirectoryStatusQuery = { __typename: 'Query', scanDirectory: { __typename: 'FailedScan', id: string, message: string } | { __typename: 'GombocError', code?: GombocErrorCode | null, message: string } | { __typename: 'ScanDirectory', id: string, childrenCompleted: number, childrenError: number, childrenExpected: number } };

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

export const ScanOnPullRequestDocument = new TypedDocumentString(`
    mutation ScanOnPullRequest($input: ScanOnPullRequestInput!) {
  __typename
  scanOnPullRequest(input: $input) {
    __typename
    scanRequestId
    errors {
      __typename
      message
      code
    }
  }
}
    `) as unknown as TypedDocumentString<ScanOnPullRequestMutation, ScanOnPullRequestMutationVariables>;
export const ScanOnScheduleDocument = new TypedDocumentString(`
    mutation ScanOnSchedule($input: ScanOnScheduleInput!) {
  __typename
  scanOnSchedule(input: $input) {
    __typename
    scanRequestId
    errors {
      __typename
      message
      code
    }
  }
}
    `) as unknown as TypedDocumentString<ScanOnScheduleMutation, ScanOnScheduleMutationVariables>;
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
            policyObservations(
              exclude: [ALREADY_COMPLIANT, NOT_APPLICABLE, INSUFFICIENT_INFO_TO_REMEDIATE]
              page: 1
            ) {
              __typename
              results {
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
            policyObservations(
              exclude: [ALREADY_COMPLIANT, NOT_APPLICABLE, INSUFFICIENT_INFO_TO_REMEDIATE]
              page: 1
            ) {
              __typename
              results {
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