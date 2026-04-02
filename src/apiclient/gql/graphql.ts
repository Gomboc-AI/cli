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
  JSON: { input: any; output: any; }
};

/** A customer account */
export type Account = {
  __typename?: 'Account';
  /** Fix events */
  fixEvent: FixEventResponse;
  fixEventPolicyNames: Array<Scalars['String']['output']>;
  fixEventResourceTypes: Array<Scalars['String']['output']>;
  fixEvents: FixEventPage;
  fixEventsCsv: Scalars['String']['output'];
  hasFeatureBoolean: Scalars['Boolean']['output'];
  hasFeatureNumber: Scalars['Float']['output'];
  hasFeatureObject: Scalars['JSON']['output'];
  hasFeatureString: Scalars['String']['output'];
  /**
   * Returns a list of known IaC branches (from the account's workspace repositories)
   * @deprecated No longer supported
   */
  iacBranches: Array<Scalars['String']['output']>;
  /**
   * Returns a list of known IaC repositories (from the account's workspaces)
   * @deprecated No longer supported
   */
  iacRepositories: Array<ScmRepository>;
  id: Scalars['ID']['output'];
  license: AccountLicense;
  /** Account metrics */
  metrics: AccountMetrics;
  policyName: Scalars['String']['output'];
  pullRequest: PullRequestResponse;
  pullRequests: PullRequestPage;
  /** Returns a page of runs for the account */
  runs: RunPage;
  /** Returns a list of createdBy fields for runs */
  runsRequestors: Array<Scalars['String']['output']>;
  /** Returns a single SCM integration by its ID, or an error if not found */
  scmIntegration: ScmIntegrationResponse;
  /** Returns a page of SCM integrations for the account */
  scmIntegrations: ScmIntegrationPage;
  scmRepositories: ScmRepositoriesPage;
  workspace: WorkspaceResponse;
  workspaceByName: WorkspaceResponse;
  /** Returns a list of */
  workspaceLanguages: Array<Language>;
  workspaceScmTypes: Array<Maybe<ScmType>>;
  /** Returns a list of tags for the account */
  workspaceTags: Array<WorkspaceTag>;
  workspaces: WorkspacePage;
};


/** A customer account */
export type AccountFixEventArgs = {
  id: Scalars['ID']['input'];
};


/** A customer account */
export type AccountFixEventPolicyNamesArgs = {
  input: AccountFixEventPolicyNamesInput;
};


/** A customer account */
export type AccountFixEventResourceTypesArgs = {
  input: AccountFixEventResourceTypesInput;
};


/** A customer account */
export type AccountFixEventsArgs = {
  input: AccountFixEventsInput;
};


/** A customer account */
export type AccountFixEventsCsvArgs = {
  input: AccountFixEventsInput;
};


/** A customer account */
export type AccountHasFeatureBooleanArgs = {
  default: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
};


/** A customer account */
export type AccountHasFeatureNumberArgs = {
  default: Scalars['Float']['input'];
  name: Scalars['String']['input'];
};


/** A customer account */
export type AccountHasFeatureObjectArgs = {
  default: Scalars['JSON']['input'];
  name: Scalars['String']['input'];
};


/** A customer account */
export type AccountHasFeatureStringArgs = {
  default: Scalars['String']['input'];
  name: Scalars['String']['input'];
};


/** A customer account */
export type AccountIacBranchesArgs = {
  input: IacBranchesInput;
};


/** A customer account */
export type AccountIacRepositoriesArgs = {
  input: IacRepositoriesInput;
};


/** A customer account */
export type AccountPullRequestArgs = {
  id: Scalars['ID']['input'];
};


/** A customer account */
export type AccountPullRequestsArgs = {
  input: AccountPullRequestsInput;
};


/** A customer account */
export type AccountRunsArgs = {
  input: AccountRunsInput;
};


/** A customer account */
export type AccountRunsRequestorsArgs = {
  input: AccountRunsRequestorsInput;
};


/** A customer account */
export type AccountScmIntegrationArgs = {
  id: Scalars['ID']['input'];
};


/** A customer account */
export type AccountScmIntegrationsArgs = {
  input: AccountScmIntegrationsInput;
};


/** A customer account */
export type AccountScmRepositoriesArgs = {
  input: AccountScmRepositoriesInput;
};


/** A customer account */
export type AccountWorkspaceArgs = {
  id: Scalars['ID']['input'];
};


/** A customer account */
export type AccountWorkspaceByNameArgs = {
  name: Scalars['String']['input'];
};


/** A customer account */
export type AccountWorkspacesArgs = {
  input: AccountWorkspacesInput;
};

export type AccountFixEventPolicyNamesInput = {
  query?: InputMaybe<Scalars['String']['input']>;
};

export type AccountFixEventResourceTypesInput = {
  query?: InputMaybe<Scalars['String']['input']>;
};

export type AccountFixEventsInput = {
  createdAfter?: InputMaybe<Scalars['String']['input']>;
  createdBefore?: InputMaybe<Scalars['String']['input']>;
  impactScore?: InputMaybe<Array<Scalars['String']['input']>>;
  orderBy?: InputMaybe<Array<AccountFixEventsOrderByInput>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  policyName?: InputMaybe<Array<Scalars['String']['input']>>;
  requestOriginIncludes?: InputMaybe<Array<RequestOrigin>>;
  resourceType?: InputMaybe<Array<Scalars['String']['input']>>;
  riskScore?: InputMaybe<Array<Scalars['String']['input']>>;
  scanResultNodeId?: InputMaybe<Scalars['ID']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
  workspaceCreatedAfter?: InputMaybe<Scalars['String']['input']>;
  workspaceCreatedBefore?: InputMaybe<Scalars['String']['input']>;
  workspaceId?: InputMaybe<Scalars['ID']['input']>;
};

export enum AccountFixEventsOrderByField {
  CreatedAt = 'CREATED_AT',
  ImpactScore = 'IMPACT_SCORE',
  PolicyName = 'POLICY_NAME',
  ResourceType = 'RESOURCE_TYPE',
  RiskScore = 'RISK_SCORE',
  ScanResultRunNodeId = 'SCAN_RESULT_RUN_NODE_ID',
  TotalFixes = 'TOTAL_FIXES',
  WorkspaceId = 'WORKSPACE_ID'
}

export type AccountFixEventsOrderByInput = {
  direction: OrderByDirection;
  field: AccountFixEventsOrderByField;
};

export enum AccountLicense {
  Community = 'COMMUNITY',
  Enterprise = 'ENTERPRISE'
}

export type AccountMetrics = {
  __typename?: 'AccountMetrics';
  allTime: AllTimeMetrics;
  crum: CrumMetricsPage;
  daily: DailyMetricsPage;
  firstRunAt?: Maybe<Scalars['String']['output']>;
  impactScore: Array<ImpactScoreMetrics>;
  policyNames: PolicyMetricsPage;
  resourceTypes: ResourceMetricsPage;
  riskScore: Array<RiskScoreMetrics>;
  scmRepository: ScmRepositoryMetricsPage;
  totalCrum: Scalars['Int']['output'];
  weekly: WeeklyMetricsPage;
  weeklyCsv: Scalars['String']['output'];
  workspace: WorkspaceMetricsPage;
};


export type AccountMetricsCrumArgs = {
  input: CrumMetricsInput;
};


export type AccountMetricsDailyArgs = {
  input: DailyMetricsInput;
};


export type AccountMetricsPolicyNamesArgs = {
  input: PolicyMetricsInput;
};


export type AccountMetricsResourceTypesArgs = {
  input: ResourceMetricsInput;
};


export type AccountMetricsScmRepositoryArgs = {
  input: ScmRepositoryMetricsInput;
};


export type AccountMetricsWeeklyArgs = {
  input: WeeklyMetricsInput;
};


export type AccountMetricsWeeklyCsvArgs = {
  input: WeeklyMetricsInput;
};


export type AccountMetricsWorkspaceArgs = {
  input: WorkspaceMetricsInput;
};

export type AccountPullRequestsInput = {
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type AccountRunsInput = {
  createdAfter?: InputMaybe<Scalars['String']['input']>;
  createdBefore?: InputMaybe<Scalars['String']['input']>;
  createdByIncludes?: InputMaybe<Array<Scalars['String']['input']>>;
  effectIncludes?: InputMaybe<Array<Effect>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  requestOriginIncludes?: InputMaybe<Array<RequestOrigin>>;
  size?: InputMaybe<Scalars['Int']['input']>;
  statusIncludes?: InputMaybe<Array<RunStatus>>;
};

export type AccountRunsRequestorsInput = {
  query?: InputMaybe<Scalars['String']['input']>;
};

export type AccountScmIntegrationsInput = {
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type AccountScmRepositoriesInput = {
  nameContains?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  scmType?: InputMaybe<ScmType>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type AccountWorkspacesInput = {
  branch?: InputMaybe<Scalars['String']['input']>;
  createdAfter?: InputMaybe<Scalars['String']['input']>;
  createdBefore?: InputMaybe<Scalars['String']['input']>;
  hasDrift?: InputMaybe<Scalars['Boolean']['input']>;
  isArchived?: InputMaybe<Scalars['Boolean']['input']>;
  languagesInclude?: InputMaybe<Array<Language>>;
  latestScanResultConditionIn?: InputMaybe<Array<ScanResultCondition>>;
  latestScanResultCreatedAfter?: InputMaybe<Scalars['String']['input']>;
  latestScanResultCreatedBefore?: InputMaybe<Scalars['String']['input']>;
  latestScanResultEffect?: InputMaybe<Array<Effect>>;
  latestScanResultFixesGreaterThan?: InputMaybe<Scalars['Int']['input']>;
  latestScanResultFixesLessThan?: InputMaybe<Scalars['Int']['input']>;
  latestScanResultRunNodeConditionIn?: InputMaybe<Array<ScanResultCondition>>;
  latestScanResultRunNodeCreatedAfter?: InputMaybe<Scalars['String']['input']>;
  latestScanResultRunNodeCreatedBefore?: InputMaybe<Scalars['String']['input']>;
  latestScanResultRunNodeEffect?: InputMaybe<Array<Effect>>;
  latestScanResultRunNodeFixesGreaterThan?: InputMaybe<Scalars['Int']['input']>;
  latestScanResultRunNodeFixesLessThan?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  orderBy?: InputMaybe<Array<AccountWorkspacesOrderByInput>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  prStatus?: InputMaybe<Array<PullRequestStatus>>;
  repositoryId?: InputMaybe<Scalars['ID']['input']>;
  scmType?: InputMaybe<ScmType>;
  size?: InputMaybe<Scalars['Int']['input']>;
  tagsInclude?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export enum AccountWorkspacesOrderByField {
  Branch = 'BRANCH',
  LatestScanResultCondition = 'LATEST_SCAN_RESULT_CONDITION',
  LatestScanResultCreatedAt = 'LATEST_SCAN_RESULT_CREATED_AT',
  LatestScanResultFixes = 'LATEST_SCAN_RESULT_FIXES',
  Name = 'NAME',
  Path = 'PATH',
  RepositoryId = 'REPOSITORY_ID',
  ScmRepositoryId = 'SCM_REPOSITORY_ID'
}

export type AccountWorkspacesOrderByInput = {
  direction: OrderByDirection;
  field: AccountWorkspacesOrderByField;
};

export type AllTimeMetrics = {
  __typename?: 'AllTimeMetrics';
  resolvedFixes: Scalars['Int']['output'];
  totalFixes: Scalars['Int']['output'];
};

export type AssetInstanceLocation = {
  __typename?: 'AssetInstanceLocation';
  /** The scenario path: a directory or a filepath */
  branch: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** the repository branch */
  path: Scalars['String']['output'];
};

export type AssetInstanceLocationResponse = AssetInstanceLocation | GombocError;

export type AssetType = {
  __typename?: 'AssetType';
  /** The name of the cloud provider (AWS, GCP, Azure) */
  cloudProviderName: Scalars['String']['output'];
  /** This is the internal mapping of what a cloud resource is, originally was in cfn */
  gombocCloudResourceId: Scalars['ID']['output'];
  /** This is the type of the resource as defined by the observation provider */
  providerType: Scalars['String']['output'];
};

export enum BitBucketApiVersion {
  V2_0 = 'V2_0'
}

export type BitBucketWorkspaceWebhook = {
  __typename?: 'BitBucketWorkspaceWebhook';
  active: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
};

export type BitBucketWorkspaceWebhookResponse = BitBucketWorkspaceWebhook | GombocError;

export type CreateAzdoIntegrationInput = {
  organization: Scalars['String']['input'];
  personalAccessToken: Scalars['String']['input'];
};

export type CreateAzdoIntegrationOutput = GombocError | ScmIntegration;

export type CreateBitBucketIntegrationInput = {
  /** A valid workspace access token */
  accessToken: Scalars['String']['input'];
  apiVersion: BitBucketApiVersion;
  /** A valid Gomboc Token. If provided, we will attempt to create a webhook for the BitBucket workspace. */
  gombocAccessToken?: InputMaybe<Scalars['String']['input']>;
  workspaceSlug: Scalars['String']['input'];
};

export type CreateBitBucketIntegrationOutput = GombocError | ScmIntegration;

export type CreateBitBucketWorkspaceWebhookInput = {
  gombocAccessToken: Scalars['String']['input'];
  scmIntegrationId: Scalars['ID']['input'];
};

export type CreateCspmIntegrationOutput = CreateCspmIntegrationResponse | GombocError;

export type CreateCspmIntegrationResponse = {
  __typename?: 'CreateCspmIntegrationResponse';
  apiKey: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  integration: CspmIntegration;
};

export type CreateCustomIntegrationInput = {
  cloudResourceProviderName: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  name: Scalars['String']['input'];
  notificationPassthrough?: InputMaybe<NotificationPassthrough>;
  observationProviderName: Scalars['String']['input'];
};

export type CreateGitHubIntegrationInput = {
  app?: InputMaybe<GitHubApp>;
  code: Scalars['String']['input'];
  installationId: Scalars['ID']['input'];
};

export type CreateGitHubIntegrationResponse = GombocError | ScmIntegration;

export type CreateGitLabIntegrationInput = {
  apiUrl: Scalars['String']['input'];
  apiVersion: GitLabApiVersion;
  groupAccessToken: Scalars['String']['input'];
};

export type CreateGitLabIntegrationOutput = GombocError | ScmIntegration;

export type CreateHashicorpDriftIntegrationInput = {
  /** Access token to use for the integration */
  accessToken: Scalars['String']['input'];
  /** Name of the integration */
  name: Scalars['String']['input'];
};

export type CreateHashicorpRunTaskIntegrationInput = {
  /** Name of the integration */
  name: Scalars['String']['input'];
};

export type CreateOrcaIntegrationInput = {
  gombocToken: Scalars['String']['input'];
  name: Scalars['String']['input'];
  orcaRegion: OrcaRegion;
  orcaToken: Scalars['String']['input'];
};

export type CreateRunTaskIntegrationOutput = GombocError | RunTaskIntegration;

export type CreateWizIntegrationInput = {
  gombocToken: Scalars['String']['input'];
  name: Scalars['String']['input'];
  wizApiUrl: Scalars['String']['input'];
  wizAuthUrl: Scalars['String']['input'];
  wizClientId: Scalars['ID']['input'];
  wizClientSecret: Scalars['String']['input'];
};

export type CreateWorkspaceInput = {
  branch: Scalars['String']['input'];
  infrastructureTool?: InputMaybe<InfrastructureTool>;
  language?: InputMaybe<Language>;
  path: Scalars['String']['input'];
  repositoryId: Scalars['ID']['input'];
  scmIntegrationId: Scalars['ID']['input'];
  scmType: ScmType;
};

/** Code Resources Under Management (CRUM) Metrics */
export type CrumMetrics = {
  __typename?: 'CrumMetrics';
  count: Scalars['Int']['output'];
  iacTool: Scalars['String']['output'];
  resourceType: Scalars['String']['output'];
};

export type CrumMetricsInput = {
  iacToolIn?: InputMaybe<Array<Scalars['String']['input']>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  resourceTypeIn?: InputMaybe<Array<Scalars['String']['input']>>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type CrumMetricsPage = {
  __typename?: 'CrumMetricsPage';
  page: Scalars['Int']['output'];
  results: Array<CrumMetrics>;
  size: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

export type CspmIntegration = {
  __typename?: 'CspmIntegration';
  /** If applicable, this will be the associated cloud provider (AWS, GCP) */
  cloudResourceProviderName?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** The api token given to the user upon creating an integration that they will put in their webhook */
  integrationToken: Scalars['String']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  name: Scalars['String']['output'];
  /** this will be "ORCA" if it's orca, WIZ if wiz, and anything else means it's custom */
  observationProviderName: CspmIntegrationType;
  organizationId: Scalars['String']['output'];
};

export enum CspmIntegrationType {
  Custom = 'CUSTOM',
  Customgomboc = 'CUSTOMGOMBOC',
  Orca = 'ORCA',
  Wiz = 'WIZ'
}

export type CspmObservation = {
  __typename?: 'CspmObservation';
  /** The cloud account id if it exists, otherwise an empty string */
  cloudAccountId: Scalars['String']['output'];
  /** The specific unique id of the cloud asset i.e 'vm_215151194724_i-09b8a8f38e1ccebff"' */
  cloudAssetId: Scalars['ID']['output'];
  /** The name of the associated cloud asset type */
  cloudAssetTypeName: Scalars['String']['output'];
  /** The name of the cloud provider (AWS, GCP, Azure) */
  cloudProviderName: Scalars['String']['output'];
  /** The definition of the resource as told by us */
  cloudResource: AssetType;
  /** location of the asset instance if there is one, and it can be reached */
  codeResource?: Maybe<AssetInstanceLocation>;
  id: Scalars['ID']['output'];
  /** Name of the cspm provider issuing the observation (WIZ, ORCA, ...) */
  observationProviderName: CspmIntegrationType;
  /** Groups all the source types into one object (name, description, id) */
  observationSource: CspmObservationSource;
  /** The type of security alert (defaults to "unknown"). */
  securityType: Scalars['String']['output'];
  /** The severity of the alert (defaults to "info"). */
  severity: CspmSeverity;
  timestamp: Scalars['String']['output'];
};

export type CspmObservationOutput = CspmObservation | GombocError;

export type CspmObservationSource = {
  __typename?: 'CspmObservationSource';
  /** A short HTML‑encoded description of the finding. */
  description?: Maybe<Scalars['String']['output']>;
  /** The name or unique ID of the alert, shown to the user. */
  id: Scalars['ID']['output'];
  /** A short name to differentiate the finding */
  name: Scalars['String']['output'];
  /** The direct URL to the alert. */
  url?: Maybe<Scalars['String']['output']>;
};

export type CspmObservationsInput = {
  canBeScanned?: InputMaybe<Scalars['Boolean']['input']>;
  cloudProviderName?: InputMaybe<Scalars['String']['input']>;
  observationProviderName?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  severity?: InputMaybe<CspmSeverity>;
  size?: InputMaybe<Scalars['Int']['input']>;
  sourceName?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type CspmObservationsPage = {
  __typename?: 'CspmObservationsPage';
  page: Scalars['Int']['output'];
  results: Array<CspmObservation>;
  size: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export enum CspmSeverity {
  Critical = 'CRITICAL',
  High = 'HIGH',
  Info = 'INFO',
  Low = 'LOW',
  Medium = 'MEDIUM',
  Unknown = 'UNKNOWN'
}

export type DailyMetrics = {
  __typename?: 'DailyMetrics';
  date: Scalars['String']['output'];
  resolvedFixes: Scalars['Int']['output'];
  totalCumulativeFixes: Scalars['Int']['output'];
  totalFixes: Scalars['Int']['output'];
};

export type DailyMetricsInput = {
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
  timestampGreaterThan?: InputMaybe<Scalars['String']['input']>;
  timestampLessThan?: InputMaybe<Scalars['String']['input']>;
};

export type DailyMetricsPage = {
  __typename?: 'DailyMetricsPage';
  page: Scalars['Int']['output'];
  results: Array<DailyMetrics>;
  size: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

export type DeleteBitBucketWorkspaceWebhookInput = {
  scmIntegrationId: Scalars['ID']['input'];
};

export type DeleteScmIntegrationInput = {
  integrationId: Scalars['ID']['input'];
};

export type DeleteWorkspaceTagInput = {
  tagId: Scalars['ID']['input'];
};

export enum Effect {
  Preview = 'Preview',
  SubmitForReview = 'SubmitForReview'
}

export type FixEvent = {
  __typename?: 'FixEvent';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  impactScore: Scalars['String']['output'];
  policyName: Scalars['String']['output'];
  resourceType: Scalars['String']['output'];
  riskScore: Scalars['String']['output'];
  scanResultNode: ScanResultNode;
  totalFixes: Scalars['Int']['output'];
  workspace: Workspace;
};

export type FixEventPage = {
  __typename?: 'FixEventPage';
  page: Scalars['Int']['output'];
  results: Array<FixEvent>;
  size: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

export type FixEventResponse = FixEvent | GombocError;

export enum GitHubApp {
  Community = 'COMMUNITY',
  Enterprise = 'ENTERPRISE'
}

export enum GitHubInstallationEventAction {
  Created = 'CREATED',
  Deleted = 'DELETED',
  NewPermissionsAccepted = 'NEW_PERMISSIONS_ACCEPTED',
  Suspended = 'SUSPENDED',
  Unsuspended = 'UNSUSPENDED'
}

export enum GitLabApiVersion {
  V4 = 'V4'
}

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

export type IacBranchesInput = {
  repositoryId: Scalars['ID']['input'];
  scmType: ScmType;
};

export type IacRepositoriesInput = {
  scmType: ScmType;
};

export type ImpactScoreMetrics = {
  __typename?: 'ImpactScoreMetrics';
  impactScore: Scalars['String']['output'];
  totalFixes: Scalars['Int']['output'];
};

export enum InfrastructureTool {
  Bash = 'BASH',
  Bicep = 'BICEP',
  C = 'C',
  Cloudformation = 'CLOUDFORMATION',
  CloudformationJson = 'CLOUDFORMATION_JSON',
  CloudformationYaml = 'CLOUDFORMATION_YAML',
  Cpp = 'CPP',
  Csharp = 'CSHARP',
  Css = 'CSS',
  Docker = 'DOCKER',
  Elixir = 'ELIXIR',
  Go = 'GO',
  Gotemplate = 'GOTEMPLATE',
  Groovy = 'GROOVY',
  Hcl = 'HCL',
  Helm = 'HELM',
  Html = 'HTML',
  Java = 'JAVA',
  Javascript = 'JAVASCRIPT',
  Json = 'JSON',
  Kotlin = 'KOTLIN',
  Kubernetes = 'KUBERNETES',
  Lua = 'LUA',
  Markdown = 'MARKDOWN',
  Ocaml = 'OCAML',
  Orl = 'ORL',
  Php = 'PHP',
  Protobuf = 'PROTOBUF',
  Python = 'PYTHON',
  Ruby = 'RUBY',
  Rust = 'RUST',
  Scala = 'SCALA',
  Sql = 'SQL',
  Swift = 'SWIFT',
  Terraform = 'TERRAFORM',
  Toml = 'TOML',
  Typescript = 'TYPESCRIPT',
  Xml = 'XML',
  Yaml = 'YAML'
}

export enum Language {
  Bash = 'BASH',
  Bicep = 'BICEP',
  C = 'C',
  Cloudformation = 'CLOUDFORMATION',
  CloudformationJson = 'CLOUDFORMATION_JSON',
  CloudformationYaml = 'CLOUDFORMATION_YAML',
  Cpp = 'CPP',
  Csharp = 'CSHARP',
  Css = 'CSS',
  Docker = 'DOCKER',
  Elixir = 'ELIXIR',
  Go = 'GO',
  Gotemplate = 'GOTEMPLATE',
  Groovy = 'GROOVY',
  Hcl = 'HCL',
  Helm = 'HELM',
  Html = 'HTML',
  Java = 'JAVA',
  Javascript = 'JAVASCRIPT',
  Json = 'JSON',
  Kotlin = 'KOTLIN',
  Kubernetes = 'KUBERNETES',
  Lua = 'LUA',
  Markdown = 'MARKDOWN',
  Ocaml = 'OCAML',
  Orl = 'ORL',
  Php = 'PHP',
  Protobuf = 'PROTOBUF',
  Python = 'PYTHON',
  Ruby = 'RUBY',
  Rust = 'RUST',
  Scala = 'SCALA',
  Sql = 'SQL',
  Swift = 'SWIFT',
  Terraform = 'TERRAFORM',
  Toml = 'TOML',
  Typescript = 'TYPESCRIPT',
  Xml = 'XML',
  Yaml = 'YAML'
}

export type Mutation = {
  __typename?: 'Mutation';
  scanOnPullRequest: ScanRequestResponseType;
  /** *Internal use only* */
  scanOnSchedule: ScanRequestResponseType;
};


export type MutationScanOnPullRequestArgs = {
  input: ScanOnPullRequestInput;
};


export type MutationScanOnScheduleArgs = {
  input: ScanOnScheduleInput;
};

export type NotificationPassthrough = {
  auth: Scalars['JSON']['input'];
  url: Scalars['String']['input'];
};

export type OnGitHubInstallationEventInput = {
  action: GitHubInstallationEventAction;
  app: GitHubApp;
  enterpriseId?: InputMaybe<Scalars['ID']['input']>;
  gitHubAccountId: Scalars['ID']['input'];
  gitHubAccountLogin: Scalars['String']['input'];
  gitHubSenderLogin: Scalars['String']['input'];
  installationId: Scalars['ID']['input'];
};

export type OnGitHubMetaEventInput = {
  app: GitHubApp;
  installationId: Scalars['ID']['input'];
};

export type OnGitHubPullRequestEventInput = {
  app: GitHubApp;
  autoFormat?: InputMaybe<Scalars['Boolean']['input']>;
  installationId: Scalars['ID']['input'];
  pullRequestEvent: PullRequestEvent;
  pullRequestNumber: Scalars['String']['input'];
  repositoryId: Scalars['String']['input'];
  repositoryOwnerId?: InputMaybe<Scalars['String']['input']>;
};

export enum OrcaRegion {
  Australia = 'AUSTRALIA',
  Brazil = 'BRAZIL',
  Europe = 'EUROPE',
  India = 'INDIA',
  Israel = 'ISRAEL',
  Us = 'US'
}

export enum OrderByDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

/** A customer organization as represented in the system */
export type Organization = {
  __typename?: 'Organization';
  /**
   * CSPM Integrations associated with the account
   * @deprecated Use Query.cspmIntegrations instead
   */
  cspmIntegrations: Array<CspmIntegration>;
  /** Returns true if the organization has at least one Policy Statement */
  hasPolicy: Scalars['Boolean']['output'];
  /** Returns true if the organization has at least one SPM Integration */
  hasScmIntegrations: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  /**
   * Open Pull Requests from remediations
   * @deprecated Use Account.pullRequests instead
   */
  pullRequests: PullRequestPage;
  /** Returns one SCM integration by its ID, or an error if not found */
  scmIntegration: ScmIntegrationResponse;
  /** Returns SCM integrations for this organization */
  scmIntegrations: Array<ScmIntegration>;
};


/** A customer organization as represented in the system */
export type OrganizationPullRequestsArgs = {
  input: OrganizationPullRequestsInput;
};


/** A customer organization as represented in the system */
export type OrganizationScmIntegrationArgs = {
  id: Scalars['ID']['input'];
};

export type OrganizationPullRequestsInput = {
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type OrganizationResponse = GombocError | Organization;

export type PolicyMetrics = {
  __typename?: 'PolicyMetrics';
  policyName: Scalars['String']['output'];
  policyNameClean: Scalars['String']['output'];
  totalFixes: Scalars['Int']['output'];
};

export type PolicyMetricsInput = {
  page?: InputMaybe<Scalars['Int']['input']>;
  policyNameIn?: InputMaybe<Array<Scalars['String']['input']>>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type PolicyMetricsPage = {
  __typename?: 'PolicyMetricsPage';
  page: Scalars['Int']['output'];
  results: Array<PolicyMetrics>;
  size: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

export type PullRequest = {
  __typename?: 'PullRequest';
  externalUrl: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  identifier: Scalars['String']['output'];
  parent?: Maybe<PullRequest>;
  scmType: ScmType;
  status: PullRequestStatus;
  title: Scalars['String']['output'];
};

export enum PullRequestEvent {
  Discarded = 'DISCARDED',
  Merged = 'MERGED',
  Opened = 'OPENED',
  Synchronized = 'SYNCHRONIZED'
}

export type PullRequestPage = {
  __typename?: 'PullRequestPage';
  page: Scalars['Int']['output'];
  results: Array<PullRequest>;
  size: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

export type PullRequestResponse = GombocError | PullRequest;

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
  /** Internal use only */
  scmRunnerScan: ScmRunnerScanResponse;
};


export type QueryScmRunnerScanArgs = {
  input: ScmRunnerScanInput;
};

export type RepositoryLinkingInput = {
  integrationId: Scalars['ID']['input'];
};

/** Places from where scan requests can originate */
export enum RequestOrigin {
  CspmService = 'CSPM_SERVICE',
  GombocSchedule = 'GOMBOC_SCHEDULE',
  HclTerraformRunTask = 'HCL_TERRAFORM_RUN_TASK',
  Ide = 'IDE',
  Mcp = 'MCP',
  Portal = 'PORTAL',
  PortalDrift = 'PORTAL_DRIFT',
  ScmPullRequest = 'SCM_PULL_REQUEST',
  ScmSchedule = 'SCM_SCHEDULE'
}

export type ResourceMetrics = {
  __typename?: 'ResourceMetrics';
  resourceType: Scalars['String']['output'];
  resourceTypeClean: Scalars['String']['output'];
  totalFixes: Scalars['Int']['output'];
};

export type ResourceMetricsInput = {
  page?: InputMaybe<Scalars['Int']['input']>;
  resourceTypeIn?: InputMaybe<Array<Scalars['String']['input']>>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type ResourceMetricsPage = {
  __typename?: 'ResourceMetricsPage';
  page: Scalars['Int']['output'];
  results: Array<ResourceMetrics>;
  size: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

export type RiskScoreMetrics = {
  __typename?: 'RiskScoreMetrics';
  riskScore: Scalars['String']['output'];
  totalFixes: Scalars['Int']['output'];
};

export type Run = {
  __typename?: 'Run';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  request: ScanRequestNode;
  results: ScanResultNodePage;
  status: RunStatus;
  totalFixes: Scalars['Int']['output'];
};


export type RunResultsArgs = {
  input: RunScanResultNodeInput;
};

export type RunLog = {
  __typename?: 'RunLog';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  level: RunLogLevel;
  message: Scalars['String']['output'];
  /** @deprecated Use createdAt instead, for consistency */
  timestamp: Scalars['String']['output'];
};

export enum RunLogLevel {
  Critical = 'CRITICAL',
  Debug = 'DEBUG',
  Error = 'ERROR',
  Info = 'INFO',
  Warning = 'WARNING'
}

export type RunLogPage = {
  __typename?: 'RunLogPage';
  page: Scalars['Int']['output'];
  results: Array<RunLog>;
  size: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

export type RunLogResponse = GombocError | RunLog;

export type RunNode = {
  __typename?: 'RunNode';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  logs: RunLogPage;
  metadata: Scalars['JSON']['output'];
  run: Run;
  status: RunStatus;
  type: RunNodeType;
};

export type RunNodeResponse = GombocError | RunNode;

export enum RunNodeType {
  ScanRequest = 'SCAN_REQUEST',
  ScanResult = 'SCAN_RESULT'
}

export type RunPage = {
  __typename?: 'RunPage';
  page: Scalars['Int']['output'];
  results: Array<Run>;
  size: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

export type RunResponse = GombocError | Run;

export type RunScanResultNodeInput = {
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export enum RunStatus {
  Failed = 'FAILED',
  InProgress = 'IN_PROGRESS',
  NotStarted = 'NOT_STARTED',
  Success = 'SUCCESS'
}

export type RunTaskIntegration = {
  __typename?: 'RunTaskIntegration';
  createdAt: Scalars['String']['output'];
  /** Name of the user who created the integration */
  createdBy: Scalars['String']['output'];
  /** Key used by hashicorp to create the integration */
  hmacKey: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** Name of the integration */
  name: Scalars['String']['output'];
  /** The name of the run task provider */
  runTaskProviderName: RunTaskIntegrationProvider;
  /** The type of run task integration */
  type: RunTaskIntegrationType;
  /** Webhook url to put in the hashicorp portal when setting up the integration */
  webhookEndpointUrl: Scalars['String']['output'];
};

export enum RunTaskIntegrationProvider {
  Hashicorp = 'HASHICORP'
}

export enum RunTaskIntegrationType {
  Drift = 'DRIFT',
  RunTask = 'RUN_TASK'
}

export type ScanOnPullRequestInput = {
  autoFormat?: InputMaybe<Scalars['Boolean']['input']>;
  effect: Effect;
  languages?: InputMaybe<Array<Language>>;
  pullRequestIdentifier: Scalars['String']['input'];
  scenarioPaths: Array<Scalars['String']['input']>;
};

export type ScanOnScheduleInput = {
  autoFormat?: InputMaybe<Scalars['Boolean']['input']>;
  directory: Scalars['String']['input'];
  effect: Effect;
  languages?: InputMaybe<Array<Language>>;
  recurse: Scalars['Boolean']['input'];
};

export type ScanReport = {
  __typename?: 'ScanReport';
  appliedRules?: Maybe<Array<Scalars['String']['output']>>;
  files: Array<ScanReportFile>;
  footer: Scalars['String']['output'];
  summary: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type ScanReportFile = {
  __typename?: 'ScanReportFile';
  summary: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type ScanRequestNode = {
  __typename?: 'ScanRequestNode';
  createdAt: Scalars['String']['output'];
  /** The user who created the scan request */
  createdBy?: Maybe<Scalars['String']['output']>;
  /** The mode in which the scan was requested */
  effect?: Maybe<Effect>;
  id: Scalars['ID']['output'];
  logs: RunLogPage;
  /** Indicates where the request came from */
  requestOrigin?: Maybe<RequestOrigin>;
  /** The run this scan request node belongs to */
  run: Run;
  /** The status of the scan request node */
  status: RunStatus;
};

export type ScanRequestResponseType = {
  __typename?: 'ScanRequestResponseType';
  errors: Array<Maybe<GombocError>>;
  scanRequestId: Scalars['ID']['output'];
};

export enum ScanResultCondition {
  AllFixed = 'ALL_FIXED',
  Compliant = 'COMPLIANT',
  NoneFixed = 'NONE_FIXED',
  SomeFixed = 'SOME_FIXED'
}

export type ScanResultNode = {
  __typename?: 'ScanResultNode';
  /** The related repository branch name */
  branch?: Maybe<Scalars['String']['output']>;
  /** A general state of the scan result */
  condition?: Maybe<ScanResultCondition>;
  createdAt: Scalars['String']['output'];
  /** The user who created the scan result */
  createdBy?: Maybe<Scalars['String']['output']>;
  /** The duration of the scan request */
  duration?: Maybe<Scalars['Int']['output']>;
  /** The mode in which the scan was requested */
  effect?: Maybe<Effect>;
  /** The number of fixes found and applied during the scan */
  fixesCount?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  /**
   * The related infrastructure tool
   * @deprecated Use language instead
   */
  infrastructureTool?: Maybe<InfrastructureTool>;
  language?: Maybe<Language>;
  logs: RunLogPage;
  /** The related directory or file path */
  path?: Maybe<Scalars['String']['output']>;
  /** The Pull Request, if one was created */
  pullRequest?: Maybe<PullRequest>;
  /** Indicates where the request came from */
  requestOrigin?: Maybe<RequestOrigin>;
  /** The run this scan request node belongs to */
  run: Run;
  /** The report obtained after a scan is complete, contains multiple sections. */
  scanReport?: Maybe<ScanReport>;
  /** Repository associated with the scanresult */
  scmRepository?: Maybe<ScmRepository>;
  /** The SCM type of the repository */
  scmType?: Maybe<ScmType>;
  /** The resulting status of the scan node */
  status: RunStatus;
  /** The workspace where this scan result took place, if one exists */
  workspace?: Maybe<Workspace>;
};

export type ScanResultNodePage = {
  __typename?: 'ScanResultNodePage';
  page: Scalars['Int']['output'];
  results: Array<ScanResultNode>;
  size: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

export type ScanResultNodeResponse = GombocError | ScanResultNode;

export type ScanWorkspaceBatchInput = {
  autoFormat?: InputMaybe<Scalars['Boolean']['input']>;
  effect: Effect;
  workspaceIds: Array<Scalars['ID']['input']>;
};

export type ScanWorkspaceDriftInput = {
  workspaceId: Scalars['ID']['input'];
};

export type ScanWorkspaceInput = {
  autoFormat?: InputMaybe<Scalars['Boolean']['input']>;
  effect: Effect;
  workspaceId: Scalars['ID']['input'];
};

export type ScmBranch = {
  __typename?: 'ScmBranch';
  /** Returns additional info on the branch (e.g.  "main", "protected"...) */
  label?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

/** Integrations grant access to SCM repositories */
export type ScmIntegration = {
  __typename?: 'ScmIntegration';
  /** Only BitBucket: Returns the related webhook, if it exists. */
  bitBucketWebhook?: Maybe<BitBucketWorkspaceWebhook>;
  createdAt: Scalars['String']['output'];
  /** Returns the email of the user who integrated the SCM provider */
  createdBy: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** Use it to access nested repo owners. Might be null if wrong scope or integration expired */
  repoOwner: ScmRepoOwnerResponse;
  scmType: ScmType;
};


/** Integrations grant access to SCM repositories */
export type ScmIntegrationRepoOwnerArgs = {
  scope?: InputMaybe<Scalars['String']['input']>;
};

export type ScmIntegrationPage = {
  __typename?: 'ScmIntegrationPage';
  page: Scalars['Int']['output'];
  results: Array<ScmIntegration>;
  size: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ScmIntegrationResponse = GombocError | ScmIntegration;

export type ScmRepoOwner = {
  __typename?: 'ScmRepoOwner';
  avatarUrl: Scalars['String']['output'];
  children: ScmRepoOwnersPage;
  htmlUrl: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  parentScope?: Maybe<Scalars['String']['output']>;
  path: Scalars['String']['output'];
  repositories: ScmRepositoriesPage;
  scmType: ScmType;
  scope?: Maybe<Scalars['String']['output']>;
  searchRepositories: ScmRepositoriesPage;
  type: Scalars['String']['output'];
};


export type ScmRepoOwnerChildrenArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type ScmRepoOwnerRepositoriesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type ScmRepoOwnerSearchRepositoriesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  search: Scalars['String']['input'];
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type ScmRepoOwnerResponse = GombocError | ScmRepoOwner | UnreachableRepoOwner;

export type ScmRepoOwnersPage = {
  __typename?: 'ScmRepoOwnersPage';
  page: Scalars['Int']['output'];
  results: Array<ScmRepoOwner>;
  size: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ScmRepositoriesPage = {
  __typename?: 'ScmRepositoriesPage';
  page: Scalars['Int']['output'];
  results: Array<ScmRepository>;
  size: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ScmRepository = {
  __typename?: 'ScmRepository';
  branches: Array<ScmBranch>;
  htmlUrl: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isPublic: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  owner: ScmRepoOwnerResponse;
  scmType: ScmType;
  workspaces: WorkspacePage;
};


export type ScmRepositoryBranchesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type ScmRepositoryWorkspacesArgs = {
  input: ScmRepositoryWorkspacesInput;
};

export type ScmRepositoryMetrics = {
  __typename?: 'ScmRepositoryMetrics';
  scmRepository: ScmRepository;
  totalFixes: Scalars['Int']['output'];
};

export type ScmRepositoryMetricsInput = {
  page?: InputMaybe<Scalars['Int']['input']>;
  scmRepositoryIdIn?: InputMaybe<Array<Scalars['ID']['input']>>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type ScmRepositoryMetricsPage = {
  __typename?: 'ScmRepositoryMetricsPage';
  page: Scalars['Int']['output'];
  results: Array<ScmRepositoryMetrics>;
  size: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

export type ScmRepositoryResponse = GombocError | ScmRepository | UnreachableRepository;

export type ScmRepositoryWorkspacesInput = {
  branch?: InputMaybe<Scalars['String']['input']>;
  isArchived?: InputMaybe<Scalars['Boolean']['input']>;
  language?: InputMaybe<Language>;
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type ScmRunnerScan = {
  __typename?: 'ScmRunnerScan';
  fixesCount: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  logs: Array<ScmRunnerScanLog>;
  status: ScmRunnerScanStatus;
};


export type ScmRunnerScanLogsArgs = {
  input: ScmRunnerScanLogsInput;
};

export type ScmRunnerScanInput = {
  id: Scalars['ID']['input'];
};

export type ScmRunnerScanLog = {
  __typename?: 'ScmRunnerScanLog';
  createdAt: Scalars['String']['output'];
  level: ScmRunnerScanLogLevel;
  message: Scalars['String']['output'];
};

export enum ScmRunnerScanLogLevel {
  Critical = 'CRITICAL',
  Debug = 'DEBUG',
  Error = 'ERROR',
  Info = 'INFO',
  Warning = 'WARNING'
}

/** Allow consumers to only fetch logs created after a certain time so that they can log as logs come - unix epoch milliseconds */
export type ScmRunnerScanLogsInput = {
  createdAfter?: InputMaybe<Scalars['String']['input']>;
};

export type ScmRunnerScanResponse = GombocError | ScmRunnerScan;

export enum ScmRunnerScanStatus {
  Failed = 'FAILED',
  InProgress = 'IN_PROGRESS',
  SucceededWithoutFixes = 'SUCCEEDED_WITHOUT_FIXES',
  SucceededWithFixes = 'SUCCEEDED_WITH_FIXES'
}

export enum ScmType {
  Azdo = 'AZDO',
  Bitbucket = 'BITBUCKET',
  Github = 'GITHUB',
  Gitlab = 'GITLAB'
}

export type SetAssetInstanceLocationInput = {
  branch: Scalars['String']['input'];
  cloudAssetId: Scalars['ID']['input'];
  linkedRepositoryId: Scalars['String']['input'];
  observationId: Scalars['ID']['input'];
  path: Scalars['String']['input'];
  securityBenchmarkRecommendationIds: Array<Scalars['ID']['input']>;
};

export type SetCspmObservationSecurityBenchmarkRecommendationsInput = {
  cspmObservationId: Scalars['ID']['input'];
  securityBenchmarkRecommendationIds: Array<Scalars['ID']['input']>;
};

export type StartRepositoryLinkingOuput = GombocError | WorkflowResponse;

/** Represents a repository owner that was either deleted or is unreachable due to service or integration issues */
export type UnreachableRepoOwner = {
  __typename?: 'UnreachableRepoOwner';
  id: Scalars['ID']['output'];
  lastKnownName: Scalars['String']['output'];
  scmType: ScmType;
};

/** Represents a repository that was either deleted or is unreachable due to service or integration issues */
export type UnreachableRepository = {
  __typename?: 'UnreachableRepository';
  id: Scalars['ID']['output'];
  lastKnownName: Scalars['String']['output'];
  scmType: ScmType;
};

export type UpdateBranchReportsInput = {
  accountId: Scalars['ID']['input'];
};

export type UpdateBranchReportsOutput = GombocError | WorkflowResponse;

export type UpdateWorkspaceInput = {
  isArchived?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  workspaceId: Scalars['ID']['input'];
};

export type UpdateWorkspaceTagsInput = {
  tagNames: Array<Scalars['String']['input']>;
  workspaceId: Scalars['ID']['input'];
};

export type WeeklyMetrics = {
  __typename?: 'WeeklyMetrics';
  resolvedFixes: Scalars['Int']['output'];
  totalCumulativeFixes: Scalars['Int']['output'];
  totalCumulativeResolvedFixes: Scalars['Int']['output'];
  totalCumulativeUnresolvedFixes: Scalars['Int']['output'];
  totalFixes: Scalars['Int']['output'];
  week: Scalars['Int']['output'];
  year: Scalars['Int']['output'];
};

export type WeeklyMetricsInput = {
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
  timestampGreaterThan?: InputMaybe<Scalars['String']['input']>;
  timestampLessThan?: InputMaybe<Scalars['String']['input']>;
};

export type WeeklyMetricsPage = {
  __typename?: 'WeeklyMetricsPage';
  page: Scalars['Int']['output'];
  results: Array<WeeklyMetrics>;
  size: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

export type WorkflowResponse = {
  __typename?: 'WorkflowResponse';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Workspace = {
  __typename?: 'Workspace';
  branch: Scalars['String']['output'];
  /** When the workspace was created */
  createdAt: Scalars['String']['output'];
  /** Run node associated with the latest drift detection */
  driftRunNode?: Maybe<ScanResultNode>;
  /** The URL to the Gomboc Portal */
  htmlUrl: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** @deprecated Use language instead */
  infrastructureTool: InfrastructureTool;
  isArchived: Scalars['Boolean']['output'];
  language: Language;
  lastScanResultNode?: Maybe<ScanResultNode>;
  /** Name of the workspace, defaults to reponame-branch-path, but is mutable by user */
  name?: Maybe<Scalars['String']['output']>;
  path: Scalars['String']['output'];
  /**
   * Use if repository is deleted or unreachable
   * @deprecated Get it from scmRepository
   */
  repositoryNameFallback: Scalars['String']['output'];
  /**
   * Use if repository is deleted or unreachable
   * @deprecated Get it from scmRepository
   */
  repositoryOwnerNameFallback: Scalars['String']['output'];
  /** Get a page of run nodes for this workspace */
  runNodes: ScanResultNodePage;
  /** Get the parent SCM repository */
  scmRepository: ScmRepositoryResponse;
  /** Returns a page of tags for this workspace */
  tags: Array<WorkspaceTag>;
};


export type WorkspaceRunNodesArgs = {
  input: WorkspaceRunNodesInput;
};

export type WorkspaceMetrics = {
  __typename?: 'WorkspaceMetrics';
  totalFixes: Scalars['Int']['output'];
  workspace: Workspace;
};

export type WorkspaceMetricsInput = {
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
  workspaceIdIn?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type WorkspaceMetricsPage = {
  __typename?: 'WorkspaceMetricsPage';
  page: Scalars['Int']['output'];
  results: Array<WorkspaceMetrics>;
  size: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

export type WorkspacePage = {
  __typename?: 'WorkspacePage';
  page: Scalars['Int']['output'];
  results: Array<Workspace>;
  size: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

export type WorkspaceResponse = GombocError | Workspace;

export type WorkspaceRunNodesInput = {
  createdAfter?: InputMaybe<Scalars['String']['input']>;
  createdBefore?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<RunStatus>;
  type?: InputMaybe<RunNodeType>;
};

export type WorkspaceTag = {
  __typename?: 'WorkspaceTag';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type ScanOnPullRequestMutationVariables = Exact<{
  input: ScanOnPullRequestInput;
}>;


export type ScanOnPullRequestMutation = { __typename: 'Mutation', scanOnPullRequest: { __typename: 'ScanRequestResponseType', scanRequestId: string, errors: Array<{ __typename: 'GombocError', message: string, code?: GombocErrorCode | null } | null> } };

export type ScanOnScheduleMutationVariables = Exact<{
  input: ScanOnScheduleInput;
}>;


export type ScanOnScheduleMutation = { __typename: 'Mutation', scanOnSchedule: { __typename: 'ScanRequestResponseType', scanRequestId: string, errors: Array<{ __typename: 'GombocError', message: string, code?: GombocErrorCode | null } | null> } };

export type ScmRunnerScanQueryVariables = Exact<{
  scmRunnerScanInput: ScmRunnerScanInput;
  scmRunnerScanLogsInput: ScmRunnerScanLogsInput;
}>;


export type ScmRunnerScanQuery = { __typename: 'Query', scmRunnerScan: { __typename: 'GombocError', code?: GombocErrorCode | null, message: string } | { __typename: 'ScmRunnerScan', id: string, status: ScmRunnerScanStatus, fixesCount: number, logs: Array<{ __typename: 'ScmRunnerScanLog', level: ScmRunnerScanLogLevel, message: string, createdAt: string }> } };

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
export const ScmRunnerScanDocument = new TypedDocumentString(`
    query scmRunnerScan($scmRunnerScanInput: ScmRunnerScanInput!, $scmRunnerScanLogsInput: ScmRunnerScanLogsInput!) {
  __typename
  scmRunnerScan(input: $scmRunnerScanInput) {
    __typename
    ... on ScmRunnerScan {
      __typename
      id
      status
      fixesCount
      logs(input: $scmRunnerScanLogsInput) {
        __typename
        level
        message
        createdAt
      }
    }
    ... on GombocError {
      __typename
      code
      message
    }
  }
}
    `) as unknown as TypedDocumentString<ScmRunnerScanQuery, ScmRunnerScanQueryVariables>;