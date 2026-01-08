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
  hasFeatureBoolean: Scalars['Boolean']['output'];
  hasFeatureNumber: Scalars['Float']['output'];
  hasFeatureObject: Scalars['JSON']['output'];
  hasFeatureString: Scalars['String']['output'];
  /** Returns a list of known IaC branches (from the account's workspace repositories) */
  iacBranches: Array<Scalars['String']['output']>;
  /**
   * Returns a list of known IaC repositories (from the account's workspaces)
   * @deprecated No longer supported
   */
  iacRepositories: Array<ScmRepository>;
  id: Scalars['ID']['output'];
  license: AccountLicense;
  policyName: Scalars['String']['output'];
  pullRequest: PullRequestResponse;
  pullRequests: PullRequestPage;
  /** Returns a page of runs for the account */
  runs: RunPage;
  /** Returns a page of scan requests for the account */
  scanRequests: ScanRequestPage;
  /** Returns a single SCM integration by its ID, or an error if not found */
  scmIntegration: ScmIntegrationResponse;
  /** Returns a page of SCM integrations for the account */
  scmIntegrations: ScmIntegrationPage;
  scmRepositories: ScmRepositoriesPage;
  /** Returns a page of adopted security benchmark recommendations for the account */
  securityBenchmarkRecommendations: SecurityBenchmarkRecommendationPage;
  workspace: WorkspaceResponse;
  workspaceByName: WorkspaceResponse;
  workspaceScmTypes: Array<Maybe<ScmType>>;
  workspaces: WorkspacePage;
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
export type AccountScanRequestsArgs = {
  input: AccountScanRequestsInput;
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
export type AccountSecurityBenchmarkRecommendationsArgs = {
  input: AccountSecurityBenchmarkRecommendationsInput;
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

export enum AccountLicense {
  Community = 'COMMUNITY',
  Enterprise = 'ENTERPRISE'
}

export type AccountPullRequestsInput = {
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type AccountRunsInput = {
  createdAfter?: InputMaybe<Scalars['String']['input']>;
  createdBefore?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type AccountScanRequestsInput = {
  createdAfter?: InputMaybe<Scalars['String']['input']>;
  createdBefore?: InputMaybe<Scalars['String']['input']>;
  createdBy?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  requestOrigin?: InputMaybe<RequestOrigin>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type AccountScmIntegrationsInput = {
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type AccountScmRepositoriesInput = {
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type AccountSecurityBenchmarkRecommendationsInput = {
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type AccountWorkspacesInput = {
  branch?: InputMaybe<Scalars['String']['input']>;
  infrastructureTool?: InputMaybe<InfrastructureTool>;
  isArchived?: InputMaybe<Scalars['Boolean']['input']>;
  latestScanResultConditionIn?: InputMaybe<Array<ScanResultCondition>>;
  latestScanResultCreatedAfter?: InputMaybe<Scalars['String']['input']>;
  latestScanResultCreatedBefore?: InputMaybe<Scalars['String']['input']>;
  latestScanResultFixesGreaterThan?: InputMaybe<Scalars['Int']['input']>;
  latestScanResultFixesLessThan?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  orderBy?: InputMaybe<Array<AccountWorkspacesOrderByInput>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  prStatus?: InputMaybe<Array<PullRequestStatus>>;
  repositoryId?: InputMaybe<Scalars['ID']['input']>;
  scmType?: InputMaybe<ScmType>;
  size?: InputMaybe<Scalars['Int']['input']>;
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

export type AssetInstanceLocation = {
  __typename?: 'AssetInstanceLocation';
  /** The scenario path: a directory or a filepath */
  branch: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** maps to a repository */
  link: Link;
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

export type BulkAllLinkScanRemoteInput = {
  iacTools: Array<InfrastructureTool>;
};

export type BulkLinkScanRemoteInput = {
  iacTools: Array<InfrastructureTool>;
  linkIds: Array<Scalars['ID']['input']>;
};

export type Capability = {
  __typename?: 'Capability';
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export type CfnAttribute = {
  __typename?: 'CfnAttribute';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
};

export type CfnProperty = {
  __typename?: 'CfnProperty';
  customRules: Array<CustomRule>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  slug: Scalars['String']['output'];
  subproperties: Array<CfnSubProperty>;
};

export type CfnResource = {
  __typename?: 'CfnResource';
  attributes: Array<CfnAttribute>;
  codeResource?: Maybe<CodeResource>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  properties: Array<CfnProperty>;
};

export type CfnResourcePage = {
  __typename?: 'CfnResourcePage';
  page: Scalars['Int']['output'];
  results: Array<CfnResource>;
  size: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type CfnResourcePageInput = {
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type CfnSubProperty = {
  __typename?: 'CfnSubProperty';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  properties: Array<CfnProperty>;
};

export type CloudResource = {
  __typename?: 'CloudResource';
  documentationUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  provider: CloudResourceProvider;
  title: Scalars['String']['output'];
};

export enum CloudResourceProvider {
  Aws = 'AWS',
  Azure = 'AZURE',
  Gcp = 'GCP',
  Kubernetes = 'KUBERNETES',
  Oci = 'OCI',
  Unspecified = 'UNSPECIFIED'
}

export type CodeObservation = {
  __typename?: 'CodeObservation';
  codeResourceInstance: CodeResourceInstance;
  disposition: Disposition;
};

export type CodePosition = {
  __typename?: 'CodePosition';
  column: Scalars['Int']['output'];
  line: Scalars['Int']['output'];
};

export type CodeResource = {
  __typename?: 'CodeResource';
  cloudResource?: Maybe<CloudResource>;
  configOptions: ConfigOptionPage;
  documentationUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  infrastructureTool: InfrastructureTool;
};


export type CodeResourceConfigOptionsArgs = {
  input: PageInput;
};

export type CodeResourceInstance = {
  __typename?: 'CodeResourceInstance';
  codeResource: CodeResource;
  filepath: Scalars['String']['output'];
  line: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type CodeResourcePage = {
  __typename?: 'CodeResourcePage';
  page: Scalars['Int']['output'];
  results: Array<CodeResource>;
  size: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ConfigOption = {
  __typename?: 'ConfigOption';
  capability: Capability;
  /** @deprecated This is moved inside of the CodeResource object. DEV-2330 */
  cloudResource?: Maybe<CloudResource>;
  codeResource: CodeResource;
  id: Scalars['ID']['output'];
  ontologicalSubgraph: OntologicalSubgraph;
  /** @deprecated this is equivalent to the nodeLabel:codeResourceId */
  resourceKey: Scalars['String']['output'];
};

export type ConfigOptionPage = {
  __typename?: 'ConfigOptionPage';
  page: Scalars['Int']['output'];
  results: Array<ConfigOption>;
  size: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

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

export type CreateHashicorpIntegrationInput = {
  /** Name of the integration */
  name: Scalars['String']['input'];
};

export type CreateOrcaIntegrationInput = {
  gombocToken: Scalars['String']['input'];
  name: Scalars['String']['input'];
  orcaRegion: OrcaRegion;
  orcaToken: Scalars['String']['input'];
};

export type CreatePresenceBasedCustomRuleInput = {
  comment: Scalars['String']['input'];
  description: Scalars['String']['input'];
  /** The type of rule being applied to the value as CFN sees it: IMPLEMENTS_IF_PRESENT, IMPLEMENTS_IF_ABSENT */
  ruleType: PresenceBasedRule;
  targetName: Scalars['String']['input'];
  /** The type of target that the rule is targeting, tf or cfn */
  targetType: CustomRuleTargetType;
  title: Scalars['String']['input'];
};

export type CreateProjectResponse = GombocError | Project;

export type CreateRunTaskIntegrationOutput = GombocError | RunTaskIntegration;

export type CreateTicketInput = {
  externalUrl: Scalars['String']['input'];
  scanResultId: Scalars['ID']['input'];
};

export type CreateTicketOutput = GombocError | Ticket;

export type CreateValueBasedCustomRuleInput = {
  comment: Scalars['String']['input'];
  description: Scalars['String']['input'];
  /** The type of rule being applied to the value as CFN sees it: IMPLEMENTS_IF_EQUAL_TO, IMPLEMENTS_IF_NOT_EQUAL_TO, IMPLEMENTS_IF_REGEX_MATCHES, IMPLEMENTS_IF_NOT_REGEX_MATCHES */
  ruleType: ValueBasedRule;
  /** The underlying type of value of the custom rule: BOOL, STRING, NUMBER */
  scalarType: CustomRuleScalarType;
  targetName: Scalars['String']['input'];
  /** The type of target that the rule is targeting, tf or cfn */
  targetType: CustomRuleTargetType;
  title: Scalars['String']['input'];
  /** expects a base64 encoded string */
  value: Scalars['String']['input'];
  /** the type of rule that is being created: SCALAR, OTHER */
  valueType: CustomRuleValueType;
};

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
  infrastructureTool: InfrastructureTool;
  path: Scalars['String']['input'];
  repositoryId: Scalars['ID']['input'];
  scmIntegrationId: Scalars['ID']['input'];
  scmType: ScmType;
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
  /** Reference to the latest scan request if it exists */
  latestScanRequest?: Maybe<ScanRequest>;
  /** Name of the cspm provider issuing the observation (WIZ, ORCA, ...) */
  observationProviderName: CspmIntegrationType;
  /** Groups all the source types into one object (name, description, id) */
  observationSource: CspmObservationSource;
  /** The array of security benchmarks */
  securityBenchmarkRecommendations: Array<SecurityBenchmarkRecommendation>;
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

/** Custom policy, points to a target attribute or property */
export type CustomRule = {
  __typename?: 'CustomRule';
  /** the comment that will show up in a PR when a remediation is found */
  comment: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  /** custom description of the custom rule provided by the user */
  description: Scalars['String']['output'];
  /** standard iac tool variable */
  iacTool: InfrastructureTool;
  id: Scalars['ID']['output'];
  /** this is a string exposing what the actual rule is implementing, */
  internalDescription: Scalars['String']['output'];
  target: CustomRuleTarget;
  /** title of the custom rule */
  title: Scalars['String']['output'];
};

export enum CustomRuleScalarType {
  Bool = 'BOOL',
  Number = 'NUMBER',
  String = 'STRING'
}

/** The target of a custom policy, can be either terraform or cloudformation */
export type CustomRuleTarget = CfnProperty | TfAttribute;

export enum CustomRuleTargetType {
  CfnProperty = 'CFN_PROPERTY',
  TfAttribute = 'TF_ATTRIBUTE'
}

export enum CustomRuleValueType {
  Other = 'OTHER',
  Scalar = 'SCALAR'
}

/** @deprecated - please use presencebased or valuebased custom rule */
export type CustomRulesInput = {
  order?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  resourceType?: InputMaybe<Scalars['String']['input']>;
  ruleType?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type CustomRulesPage = {
  __typename?: 'CustomRulesPage';
  page: Scalars['Int']['output'];
  results: Array<CustomRule>;
  size: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

export type CustomRulesResponse = CustomRulesPage | GombocError;

export type DeleteBitBucketWorkspaceWebhookInput = {
  scmIntegrationId: Scalars['ID']['input'];
};

export type DeleteCustomRulesInput = {
  ids: Array<Scalars['ID']['input']>;
};

export type DeleteScmIntegrationInput = {
  integrationId: Scalars['ID']['input'];
};

export type DeleteTicketInput = {
  ticketId: Scalars['ID']['input'];
};

export enum Disposition {
  AlreadyCompliant = 'ALREADY_COMPLIANT',
  AutoRemediated = 'AUTO_REMEDIATED',
  CannotRemediate = 'CANNOT_REMEDIATE',
  InsufficientInfoToRemediate = 'INSUFFICIENT_INFO_TO_REMEDIATE',
  NotApplicable = 'NOT_APPLICABLE',
  RequiresUserInput = 'REQUIRES_USER_INPUT'
}

export type Edge = {
  __typename?: 'Edge';
  label: Scalars['String']['output'];
  source: Node;
  target: Node;
  value?: Maybe<Scalars['String']['output']>;
};

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

export enum FixType {
  Add = 'ADD',
  Delete = 'DELETE',
  Update = 'UPDATE'
}

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

export type GitMetaDataInput = {
  defaultName?: InputMaybe<Scalars['String']['input']>;
  headName?: InputMaybe<Scalars['String']['input']>;
  lastMergeCommit?: InputMaybe<Scalars['String']['input']>;
  remote?: InputMaybe<Scalars['String']['input']>;
};

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

export type GroupRemediatedFileComment = {
  __typename?: 'GroupRemediatedFileComment';
  benchmarkRecommendation: SecurityBenchmarkRecommendation;
  position: CodePosition;
};

export type GroupedFixesInput = {
  fileContents: Array<IacScanContent>;
  iacTool: InfrastructureTool;
  requestOrigin?: InputMaybe<RequestOrigin>;
};

export type GroupedFixesResponse = GombocError | GroupedFixesSuccess;

export type GroupedFixesSuccess = {
  __typename?: 'GroupedFixesSuccess';
  remediatedFiles: Array<GroupedRemediatedFile>;
};

export type GroupedRemediatedFile = {
  __typename?: 'GroupedRemediatedFile';
  comments: Array<GroupRemediatedFileComment>;
  content: Scalars['String']['output'];
  path: Scalars['String']['output'];
};

export type IacScanContent = {
  fileContent: Scalars['String']['input'];
  filePath: Scalars['String']['input'];
};

export type IacBranchesInput = {
  repositoryId: Scalars['ID']['input'];
  scmType: ScmType;
};

export type IacRepositoriesInput = {
  scmType: ScmType;
};

export type IndividualFixesInput = {
  fileContents: Array<IacScanContent>;
  iacTool: InfrastructureTool;
  requestOrigin?: InputMaybe<RequestOrigin>;
};

export type IndividualFixesResponse = GombocError | IndividualFixesSuccess;

export type IndividualFixesSuccess = {
  __typename?: 'IndividualFixesSuccess';
  remediations: Array<IndividualRemediation>;
};

export type IndividualRemediation = {
  __typename?: 'IndividualRemediation';
  benchmarkRecommendation: SecurityBenchmarkRecommendation;
  codeObservation: CodeObservation;
  fixes: Array<RemediationFix>;
};

export enum InfrastructureTool {
  Cloudformation = 'CLOUDFORMATION',
  Terraform = 'TERRAFORM'
}

export type LineFix = {
  __typename?: 'LineFix';
  fixType: FixType;
  issueType: Scalars['String']['output'];
  lineOffset: Scalars['Int']['output'];
  newValue: Scalars['String']['output'];
  oldValue: Scalars['String']['output'];
  position: Position;
};

export type Link = {
  __typename?: 'Link';
  createdAt: Scalars['String']['output'];
  /** Returns the email of the user who linked the repository */
  createdBy: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** Return the latest Scan Request related to this linked repository */
  lastScanRequest?: Maybe<ScanRequest>;
  /** Returns the project the repository is linked to */
  project: Project;
  /** Open Pull Requests from remediations */
  pullRequests: PullRequestPage;
  /** Returns a page of Scan Results related to this linked repository */
  scanResults: ScanResultPage;
  /** Returns the repository itself */
  scmRepository: LinkedScmRepository;
  /** Returns the name of the SCM Provider */
  scmType: ScmType;
  /** Returns a URL-friendly slug for the linked repository */
  slug: Scalars['ID']['output'];
};


export type LinkPullRequestsArgs = {
  input: LinkPullRequestsInput;
};


export type LinkScanResultsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type LinkPullRequestsInput = {
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type LinkRepositoriesInput = {
  integrations: Array<LinkRepositoriesIntegrationInput>;
  projectId: Scalars['ID']['input'];
};

export type LinkRepositoriesIntegrationInput = {
  scmIntegrationId: Scalars['ID']['input'];
  selectedRepositoryIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type LinkRepositoryResponse = GombocError | Link;

export type LinkResponse = GombocError | Link;

export type LinkScanRemoteInput = {
  autoFormat?: InputMaybe<Scalars['Boolean']['input']>;
  branchName?: InputMaybe<Scalars['String']['input']>;
  effect: Effect;
  iacTools: Array<InfrastructureTool>;
  linkId: Scalars['ID']['input'];
  pullRequestTitle?: InputMaybe<Scalars['String']['input']>;
  recurse?: InputMaybe<Scalars['Boolean']['input']>;
  workingDirectory?: InputMaybe<Scalars['String']['input']>;
};

export type LinkedScmRepository = ScmRepository | UnreachableRepository;

export type LinksPage = {
  __typename?: 'LinksPage';
  /** Use this to get the next page */
  lastKey?: Maybe<Scalars['ID']['output']>;
  links: Array<Link>;
};

/** A Local Scan Result that originated from a Scan Request */
export type LocalScanResult = {
  __typename?: 'LocalScanResult';
  createdAt: Scalars['String']['output'];
  createdBy: Scalars['String']['output'];
  /** The duration of the scan request */
  duration: Scalars['String']['output'];
  /** The URL to the Gomboc Portal */
  htmlUrl: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** The related infrastructure tool */
  infrastructureTool: InfrastructureTool;
  /** A page of policy observations in this scan result */
  policyObservations: PolicyObservationsPage;
  /** Indicates where the request came from */
  requestOrigin: RequestOrigin;
  /** The parent scan request ID */
  scanRequestId: Scalars['ID']['output'];
};


/** A Local Scan Result that originated from a Scan Request */
export type LocalScanResultPolicyObservationsArgs = {
  input: LocalScanResultPolicyObservationsInput;
};

export type LocalScanResultPage = {
  __typename?: 'LocalScanResultPage';
  page: Scalars['Int']['output'];
  results: Array<LocalScanResult>;
  size: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

export type LocalScanResultPolicyObservationsInput = {
  exclude?: InputMaybe<Array<Disposition>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type LocalScanResultResponse = GombocError | LocalScanResult;

export type LocalScanResultsInput = {
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type LogicalResource = {
  __typename?: 'LogicalResource';
  /** @deprecated This has been relocated into codeResource. DEV-2330 */
  cloudResource?: Maybe<CloudResource>;
  codeResource?: Maybe<CodeResource>;
  filepath: Scalars['String']['output'];
  line: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type MetaDataInput = {
  git?: InputMaybe<GitMetaDataInput>;
  os?: InputMaybe<OsMetaDataInput>;
};

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

export type Node = {
  __typename?: 'Node';
  id: Scalars['ID']['output'];
  label: Scalars['String']['output'];
};

export type NotificationPassthrough = {
  auth: Scalars['JSON']['input'];
  url: Scalars['String']['input'];
};

export type OsMetaDataInput = {
  machineName?: InputMaybe<Scalars['String']['input']>;
  privateIp?: InputMaybe<Scalars['String']['input']>;
  publicIp?: InputMaybe<Scalars['String']['input']>;
  userName?: InputMaybe<Scalars['String']['input']>;
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

export type OntologicalSubgraph = {
  __typename?: 'OntologicalSubgraph';
  edges: Array<Edge>;
  nodes: Array<Node>;
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
  /** Returns true if the organization has at least one Linked Repository */
  hasLinks: Scalars['Boolean']['output'];
  /** Returns true if the organization has at least one Policy Statement */
  hasPolicy: Scalars['Boolean']['output'];
  /** Returns true if the organization has received at least one Scan Request */
  hasScanRequests: Scalars['Boolean']['output'];
  /** Returns true if the organization has at least one SPM Integration */
  hasScmIntegrations: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  /**
   * Return one Gomboc project by its slug, or an error if not found
   * @deprecated Projects are deprecated
   */
  project: ProjectResponse;
  /**
   * Returns all Gomboc projects for this organization
   * @deprecated Projects are deprecated
   */
  projects: Array<Project>;
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
export type OrganizationProjectArgs = {
  slug: Scalars['String']['input'];
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

export type PageInput = {
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type PolicyObservation = {
  __typename?: 'PolicyObservation';
  /**
   * The policy statement capability Title involved
   * @deprecated Deprecated in favor of recommendation
   */
  capabilityTitle?: Maybe<Scalars['String']['output']>;
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

export type PolicyStatementPayloadMustImplement = {
  __typename?: 'PolicyStatementPayloadMustImplement';
  capability: Capability;
};

export type PolicyStatementPayloadType = PolicyStatementPayloadMustImplement;

export type Position = {
  __typename?: 'Position';
  /** @deprecated Use type CodePosition */
  column: Scalars['Int']['output'];
  /** @deprecated Use type CodePosition */
  line: Scalars['Int']['output'];
};

export enum PresenceBasedRule {
  ImplementsIfAbsent = 'IMPLEMENTS_IF_ABSENT',
  ImplementsIfPresent = 'IMPLEMENTS_IF_PRESENT'
}

export enum ProcessorType {
  ConfigOption = 'CONFIG_OPTION',
  Orl = 'ORL'
}

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
  /** *Internal use only* */
  scanBranch: ScanBranchResponse;
  /** *Internal use only* */
  scanDirectory: ScanDirectoryResponse;
  /** Returns a single Scan Request by its ID, or an error if not found */
  scanRequest: ScanRequestResponse;
  scmRunnerScan: ScmRunnerScanResponse;
};


export type QueryScanBranchArgs = {
  scanRequestId: Scalars['ID']['input'];
};


export type QueryScanDirectoryArgs = {
  scanRequestId: Scalars['ID']['input'];
};


export type QueryScanRequestArgs = {
  id: Scalars['ID']['input'];
};


export type QueryScmRunnerScanArgs = {
  input: ScmRunnerScanInput;
};

export type RemediationComment = {
  __typename?: 'RemediationComment';
  /** We should include a category and description of each fix. */
  category?: Maybe<Scalars['String']['output']>;
  fileName: Scalars['String']['output'];
  fixes: Array<LineFix>;
  iacTool: InfrastructureTool;
  logicalResource: LogicalResource;
  policyStatement: PolicyStatement;
};

export type RemediationFix = {
  __typename?: 'RemediationFix';
  codePosition: CodePosition;
  filepath: Scalars['String']['output'];
  fixType: FixType;
  lineOffset: Scalars['Int']['output'];
  newLine: Array<Scalars['String']['output']>;
  oldLine: Array<Scalars['String']['output']>;
};

export type RepositoryLinkingInput = {
  integrationId: Scalars['ID']['input'];
};

/** Places from where scan requests can originate */
export enum RequestOrigin {
  Community = 'COMMUNITY',
  CspmService = 'CSPM_SERVICE',
  GombocSchedule = 'GOMBOC_SCHEDULE',
  HclTerraformRunTask = 'HCL_TERRAFORM_RUN_TASK',
  Ide = 'IDE',
  Mcp = 'MCP',
  Portal = 'PORTAL',
  ScmPullRequest = 'SCM_PULL_REQUEST',
  ScmSchedule = 'SCM_SCHEDULE',
  Workflow = 'WORKFLOW'
}

export type Run = {
  __typename?: 'Run';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  request: ScanRequestNode;
  results: ScanResultNodePage;
  status: RunStatus;
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
  /** The type of the integration */
  runTaskProviderName: RunTaskIntegrationType;
  /** Webhook url to put in the hashicorp portal when setting up the integration */
  webhookEndpointUrl: Scalars['String']['output'];
};

export enum RunTaskIntegrationType {
  Hashicorp = 'HASHICORP'
}

export type Scan = {
  __typename?: 'Scan';
  children: ScanPage;
  createdAt: Scalars['String']['output'];
  createdBy: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  metadata: Scalars['String']['output'];
  parent?: Maybe<Scan>;
  scanRequestId: Scalars['ID']['output'];
  scanResult?: Maybe<ScanResult>;
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

export type ScanFromCspmInput = {
  /** the effect --- defaults to 'SubmitForReview' */
  effect?: InputMaybe<Effect>;
  /** the observation id, the associated alertId */
  observationId: Scalars['ID']['input'];
  /** The target for the scan */
  scanTarget: ScanTargetInput;
};

export type ScanLocalScenario = {
  __typename?: 'ScanLocalScenario';
  results: Array<RemediationComment>;
};

export type ScanLocalScenarioInput = {
  fileContents: Array<IacScanContent>;
  iacTool: InfrastructureTool;
  metaData?: InputMaybe<MetaDataInput>;
};

export type ScanLocalScenarioOutput = GombocError | ScanLocalScenario;

export type ScanOnPullRequestInput = {
  autoFormat?: InputMaybe<Scalars['Boolean']['input']>;
  effect: Effect;
  iacTools: Array<InfrastructureTool>;
  pullRequestIdentifier: Scalars['String']['input'];
  scenarioPaths: Array<Scalars['String']['input']>;
};

export type ScanOnScheduleInput = {
  autoFormat?: InputMaybe<Scalars['Boolean']['input']>;
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

export type ScanReport = {
  __typename?: 'ScanReport';
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
  id: Scalars['ID']['output'];
  scanResults: ScanResultPage;
  status: ScanRequestStatus;
};


export type ScanRequestScanResultsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type ScanRequestNode = {
  __typename?: 'ScanRequestNode';
  createdAt: Scalars['String']['output'];
  /** The user who created the scan request */
  createdBy: Scalars['String']['output'];
  /** The mode in which the scan was requested */
  effect?: Maybe<Effect>;
  id: Scalars['ID']['output'];
  logs: RunLogPage;
  /** Indicates where the request came from */
  requestOrigin?: Maybe<RequestOrigin>;
  /** The status of the scan request node */
  status: RunStatus;
};

export type ScanRequestPage = {
  __typename?: 'ScanRequestPage';
  page: Scalars['Int']['output'];
  results: Array<ScanRequest>;
  size: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

export type ScanRequestResponse = FailedScan | GombocError | ScanRequest;

export type ScanRequestResponseType = {
  __typename?: 'ScanRequestResponseType';
  errors: Array<Maybe<GombocError>>;
  scanRequestId: Scalars['ID']['output'];
};

export enum ScanRequestStatus {
  Concluded = 'CONCLUDED',
  Failed = 'FAILED',
  Running = 'RUNNING'
}

export type ScanResponse = FailedScan | GombocError | Scan;

/** A Scan Result that originated from a Scan Request */
export type ScanResult = {
  __typename?: 'ScanResult';
  id: Scalars['ID']['output'];
  /** The related infrastructure tool */
  infrastructureTool: InfrastructureTool;
  /**
   * The list of observations in this scan result
   * @deprecated use policyObservations -- paginated
   */
  observations: Array<PolicyObservation>;
  /** A page of policy observations in this scan result */
  policyObservations: PolicyObservationsPage;
};


/** A Scan Result that originated from a Scan Request */
export type ScanResultObservationsArgs = {
  exclude?: InputMaybe<Array<Disposition>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


/** A Scan Result that originated from a Scan Request */
export type ScanResultPolicyObservationsArgs = {
  exclude?: InputMaybe<Array<Disposition>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
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
  /** The duration of the scan request */
  duration?: Maybe<Scalars['String']['output']>;
  /** The mode in which the scan was requested */
  effect?: Maybe<Effect>;
  /** The number of fixes found and applied during the scan */
  fixesCount?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  /** The related infrastructure tool */
  infrastructureTool?: Maybe<InfrastructureTool>;
  logs: RunLogPage;
  /** The related directory or file path */
  path?: Maybe<Scalars['String']['output']>;
  /** The Pull Request, if one was created */
  pullRequest?: Maybe<PullRequest>;
  /** Indicates where the request came from */
  requestOrigin?: Maybe<RequestOrigin>;
  /** The report obtained after a scan is complete, contains multiple sections. */
  scanReport?: Maybe<ScanReport>;
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

export type ScanResultPage = {
  __typename?: 'ScanResultPage';
  page: Scalars['Int']['output'];
  results: Array<ScanResult>;
  size: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

export type ScanResultPageResponse = GombocError | ScanResultPage;

export type ScanResultResponse = GombocError | ScanResult;

export type ScanScenario = {
  __typename?: 'ScanScenario';
  id: Scalars['ID']['output'];
  result?: Maybe<ScanResult>;
};

export type ScanScenarioResponse = FailedScan | GombocError | ScanScenario;

export type ScanScmUrlInput = {
  accountId: Scalars['ID']['input'];
  branchName: Scalars['String']['input'];
  commitUrl?: InputMaybe<Scalars['String']['input']>;
  effect: Effect;
  iacTool: InfrastructureTool;
  pullRequestUrl?: InputMaybe<Scalars['String']['input']>;
  recurse?: InputMaybe<Scalars['Boolean']['input']>;
  repositoryUrl: Scalars['String']['input'];
  requestOrigin: RequestOrigin;
  requestedBy: Scalars['String']['input'];
  workingDirectory: Scalars['String']['input'];
};

export type ScanTarget = {
  __typename?: 'ScanTarget';
  /** The repository branch */
  branch: Scalars['String']['output'];
  /** The confidence that this is a matching scan target */
  confidence: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  /** Maps to a repository */
  link?: Maybe<Link>;
  /** The scenario path: a directory or a filepath */
  path: Scalars['String']['output'];
  /** Policy observation attached to this scan target */
  policyObservation: PolicyObservation;
};

export type ScanTargetInput = {
  /** The repository branch */
  branch: Scalars['String']['input'];
  /** Maps to a repository */
  linkId: Scalars['ID']['input'];
  /** The scenario path: a directory or a filepath */
  path: Scalars['String']['input'];
};

export type ScanWorkspaceBatchInput = {
  autoFormat?: InputMaybe<Scalars['Boolean']['input']>;
  effect: Effect;
  workspaceIds: Array<Scalars['ID']['input']>;
};

export type ScanWorkspaceInput = {
  autoFormat?: InputMaybe<Scalars['Boolean']['input']>;
  effect: Effect;
  workspaceId: Scalars['ID']['input'];
};

export type ScmBranch = {
  __typename?: 'ScmBranch';
  /** Returns additional info on the branch (e.g. "main", "protected"...) */
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
  /** @deprecated This field will be removed soon */
  link?: Maybe<Link>;
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

export type ScmRepositoryResponse = GombocError | ScmRepository | UnreachableRepository;

export type ScmRepositoryWorkspacesInput = {
  branch?: InputMaybe<Scalars['String']['input']>;
  infrastructureTool?: InputMaybe<InfrastructureTool>;
  isArchived?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type ScmRunnerScan = {
  __typename?: 'ScmRunnerScan';
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

export type SearchScanTargetsInput = {
  cspmObservationId: Scalars['ID']['input'];
};

export type SearchScanTargetsPage = {
  __typename?: 'SearchScanTargetsPage';
  /** A ranked list of the scan target based on the confidence */
  results: Array<ScanTarget>;
};

export type SecurityBenchmark = {
  __typename?: 'SecurityBenchmark';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  versions: Array<SecurityBenchmarkVersion>;
};

export type SecurityBenchmarkRecommendation = {
  __typename?: 'SecurityBenchmarkRecommendation';
  benchmarkVersion: SecurityBenchmarkVersion;
  controls: Array<SecurityFrameworkControl>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  identifier: Scalars['String']['output'];
  isAdopted: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
};

export type SecurityBenchmarkRecommendationPage = {
  __typename?: 'SecurityBenchmarkRecommendationPage';
  page: Scalars['Int']['output'];
  results: Array<SecurityBenchmarkRecommendation>;
  size: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

export type SecurityBenchmarkRecommendationResponse = GombocError | SecurityBenchmarkRecommendation;

export type SecurityBenchmarkVersion = {
  __typename?: 'SecurityBenchmarkVersion';
  benchmark: SecurityBenchmark;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  recommendations: Array<SecurityBenchmarkRecommendation>;
  relatedFrameworkVersions: Array<SecurityFrameworkVersion>;
};

export type SecurityFramework = {
  __typename?: 'SecurityFramework';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  versions: Array<SecurityFrameworkVersion>;
};

export type SecurityFrameworkControl = {
  __typename?: 'SecurityFrameworkControl';
  description: Scalars['String']['output'];
  /** @deprecated Use frameworkVersion instead */
  framework: SecurityFrameworkVersion;
  frameworkVersion: SecurityFrameworkVersion;
  id: Scalars['ID']['output'];
  identifier: Scalars['String']['output'];
  name: Scalars['String']['output'];
  recommendations: Array<SecurityBenchmarkRecommendation>;
};

export type SecurityFrameworkVersion = {
  __typename?: 'SecurityFrameworkVersion';
  /** @deprecated Use relatedBenchmarkVersions instead */
  benchmarks: Array<SecurityBenchmarkVersion>;
  controls: Array<SecurityFrameworkControl>;
  framework: SecurityFramework;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  relatedBenchmarkVersions: Array<SecurityBenchmarkVersion>;
  releasedAt?: Maybe<Scalars['String']['output']>;
};

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

export type TfAttribute = {
  __typename?: 'TfAttribute';
  computed?: Maybe<Scalars['Boolean']['output']>;
  customRules: Array<CustomRule>;
  deprecated?: Maybe<Scalars['Boolean']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  required?: Maybe<Scalars['Boolean']['output']>;
  sensitive?: Maybe<Scalars['Boolean']['output']>;
  slug: Scalars['String']['output'];
  type?: Maybe<Scalars['String']['output']>;
};

export type TfNestedBlock = {
  __typename?: 'TfNestedBlock';
  attributes: Array<TfAttribute>;
  id: Scalars['ID']['output'];
  nestedBlocks: Array<TfNestedBlock>;
};

export type TfResource = {
  __typename?: 'TfResource';
  attributes: Array<TfAttribute>;
  codeResource?: Maybe<CodeResource>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  nestedBlocks: Array<TfNestedBlock>;
};

export type TfResourcePage = {
  __typename?: 'TfResourcePage';
  page: Scalars['Int']['output'];
  results: Array<TfResource>;
  size: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type TfResourcePageInput = {
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
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

export type ToggleAdoptSecurityBenchmarkRecommendationsInput = {
  securityBenchmarkRecommendationId: Scalars['ID']['input'];
  value: Scalars['Boolean']['input'];
};

export type ToggleAdoptSecurityBenchmarkVersionInput = {
  securityBenchmarkVersionId: Scalars['ID']['input'];
  value: Scalars['Boolean']['input'];
};

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

export enum ValueBasedRule {
  ImplementsIfEqualTo = 'IMPLEMENTS_IF_EQUAL_TO',
  ImplementsIfNotEqualTo = 'IMPLEMENTS_IF_NOT_EQUAL_TO',
  ImplementsIfNotRegexMatches = 'IMPLEMENTS_IF_NOT_REGEX_MATCHES',
  ImplementsIfRegexMatches = 'IMPLEMENTS_IF_REGEX_MATCHES'
}

export type WorkflowResponse = {
  __typename?: 'WorkflowResponse';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Workspace = {
  __typename?: 'Workspace';
  branch: Scalars['String']['output'];
  /** The URL to the Gomboc Portal */
  htmlUrl: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  infrastructureTool: InfrastructureTool;
  isArchived: Scalars['Boolean']['output'];
  lastScanResult?: Maybe<ScanResult>;
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
  /** Returns a page of Scan Results related to this workspace */
  scanResults: ScanResultPageResponse;
  /** Get the parent SCM repository */
  scmRepository: ScmRepositoryResponse;
};


export type WorkspaceRunNodesArgs = {
  input: WorkspaceRunNodesInput;
};


export type WorkspaceScanResultsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
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


export type ScmRunnerScanQuery = { __typename: 'Query', scmRunnerScan: { __typename: 'GombocError', code?: GombocErrorCode | null, message: string } | { __typename: 'ScmRunnerScan', id: string, status: ScmRunnerScanStatus, logs: Array<{ __typename: 'ScmRunnerScanLog', level: ScmRunnerScanLogLevel, message: string, createdAt: string }> } };

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