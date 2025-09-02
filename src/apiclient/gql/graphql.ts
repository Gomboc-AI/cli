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
  /** Returns a list of known IaC branches (from the account's workspace repositories) */
  iacBranches: Array<Scalars['String']['output']>;
  /** Returns a list of known IaC repositories (from the account's workspaces) */
  iacRepositories: Array<ScmRepository>;
  id: Scalars['ID']['output'];
  license: AccountLicense;
  pullRequest: PullRequestResponse;
  pullRequests: PullRequestPage;
  /** @deprecated Use license instead */
  type: AccountType;
  workspace: WorkspaceResponse;
  workspaces: WorkspacePage;
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
export type AccountWorkspaceArgs = {
  id: Scalars['ID']['input'];
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

export enum AccountType {
  Community = 'COMMUNITY',
  Enterprise = 'ENTERPRISE'
}

export type AccountWorkspacesInput = {
  branch?: InputMaybe<Scalars['String']['input']>;
  infrastructureTool?: InputMaybe<InfrastructureTool>;
  isDeprecated?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  prStatus?: InputMaybe<Array<PullRequestStatus>>;
  repositoryId?: InputMaybe<Scalars['ID']['input']>;
  scanStatus?: InputMaybe<Array<ScanResultCondition>>;
  scmType?: InputMaybe<ScmType>;
  size?: InputMaybe<Scalars['Int']['input']>;
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
  Gcp = 'GCP'
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
  Integer = 'INTEGER',
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
  /** Return one Gomboc project by its slug, or an error if not found */
  project: ProjectResponse;
  /** Returns all Gomboc projects for this organization */
  projects: Array<Project>;
  /**
   * Open Pull Requests from remediations
   * @deprecated Use Account.pullRequests instead
   */
  pullRequests: PullRequestPage;
  /**
   * Returns recent scan requests for this organization
   * @deprecated not implemented
   */
  scans: Array<ScanRequestResponse>;
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
export type OrganizationScansArgs = {
  before?: InputMaybe<Scalars['String']['input']>;
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
  scmType: ScmType;
  status: PullRequestStatus;
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
};


export type QueryScanBranchArgs = {
  scanRequestId: Scalars['ID']['input'];
};


export type QueryScanDirectoryArgs = {
  scanRequestId: Scalars['ID']['input'];
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
  /** The URL to the Gomboc Portal */
  htmlUrl: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** Orca Security Alert ID -- if there is one */
  orcaAlertId?: Maybe<Scalars['ID']['output']>;
  /** The Pull Request that triggered this scan, if there is one */
  pullRequest?: Maybe<PullRequest>;
  requestOrigin: RequestOrigin;
  scanResults: ScanResultPage;
  scans: ScanPage;
};


export type ScanRequestScanResultsArgs = {
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

/** A Scan Result that originated from a Scan Request */
export type ScanResult = {
  __typename?: 'ScanResult';
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

export type ScanResultPage = {
  __typename?: 'ScanResultPage';
  page: Scalars['Int']['output'];
  results: Array<ScanResult>;
  size: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

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
  repoOwner?: Maybe<ScmRepoOwner>;
  scmType: ScmType;
};


/** Integrations grant access to SCM repositories */
export type ScmIntegrationRepoOwnerArgs = {
  scope?: InputMaybe<Scalars['String']['input']>;
};

export type ScmIntegrationResponse = GombocError | ScmIntegration;

export type ScmRepoOwner = {
  __typename?: 'ScmRepoOwner';
  avatarUrl: Scalars['String']['output'];
  children: ScmRepoOwnersPage;
  htmlUrl: Scalars['String']['output'];
  name: Scalars['String']['output'];
  parentScope?: Maybe<Scalars['String']['output']>;
  path: Scalars['String']['output'];
  repositories: ScmRepositoriesPage;
  scope: Scalars['String']['output'];
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

export type ScmRepoOwnersPage = {
  __typename?: 'ScmRepoOwnersPage';
  page: Scalars['Int']['output'];
  results: Array<ScmRepoOwner>;
  size: Scalars['Int']['output'];
  total?: Maybe<Scalars['Int']['output']>;
};

export type ScmRepositoriesPage = {
  __typename?: 'ScmRepositoriesPage';
  page: Scalars['Int']['output'];
  results: Array<ScmRepository>;
  size: Scalars['Int']['output'];
  total?: Maybe<Scalars['Int']['output']>;
};

export type ScmRepository = {
  __typename?: 'ScmRepository';
  branches: Array<ScmBranch>;
  htmlUrl: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isPublic: Scalars['Boolean']['output'];
  link?: Maybe<Link>;
  name: Scalars['String']['output'];
  owner: ScmRepoOwner;
  workspaces: WorkspacePage;
};


export type ScmRepositoryBranchesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type ScmRepositoryWorkspacesArgs = {
  input: ScmRepositoryWorkspacesInput;
};

export type ScmRepositoryWorkspacesInput = {
  branch?: InputMaybe<Scalars['String']['input']>;
  infrastructureTool?: InputMaybe<InfrastructureTool>;
  isDeprecated?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

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

/** Represents a repository that was either deleted or is unreachable due to service or integration issues */
export type UnreachableRepository = {
  __typename?: 'UnreachableRepository';
  id: Scalars['ID']['output'];
};

export type UpdateBranchReportsInput = {
  accountId: Scalars['ID']['input'];
};

export type UpdateBranchReportsOutput = GombocError | WorkflowResponse;

export type UpdateWorkspaceInput = {
  isDeprecated: Scalars['Boolean']['input'];
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
  isDeprecated: Scalars['Boolean']['output'];
  lastScanResult?: Maybe<ScanResult>;
  path: Scalars['String']['output'];
  /** Use if repository is deleted or unreachable */
  repositoryNameFallback: Scalars['String']['output'];
  /** Use if repository is deleted or unreachable */
  repositoryOwnerNameFallback: Scalars['String']['output'];
};

export type WorkspacePage = {
  __typename?: 'WorkspacePage';
  page: Scalars['Int']['output'];
  results: Array<Workspace>;
  size: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

export type WorkspaceResponse = GombocError | Workspace;

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
  size: Scalars['Int']['input'];
}>;


export type ScanBranchActionResultsQuery = { __typename: 'Query', scanBranch: { __typename: 'FailedScan', id: string, message: string } | { __typename: 'GombocError', code?: GombocErrorCode | null, message: string } | { __typename: 'ScanBranch', id: string, childrenCompleted: number, childrenError: number, childrenExpected: number, children: Array<{ __typename: 'FailedScan', id: string, message: string } | { __typename: 'GombocError', code?: GombocErrorCode | null, message: string } | { __typename: 'ScanScenario', id: string, result?: { __typename: 'ScanResult', id: string, policyObservations: { __typename: 'PolicyObservationsPage', results: Array<{ __typename: 'PolicyObservation', filepath: string, lineNumber: number, resourceName: string, resourceType: string, disposition: Disposition, capabilityTitle?: string | null }> } } | null }> } };

export type ScanBranchStatusQueryVariables = Exact<{
  scanRequestId: Scalars['ID']['input'];
}>;


export type ScanBranchStatusQuery = { __typename: 'Query', scanBranch: { __typename: 'FailedScan', id: string, message: string } | { __typename: 'GombocError', code?: GombocErrorCode | null, message: string } | { __typename: 'ScanBranch', id: string, childrenCompleted: number, childrenError: number, childrenExpected: number } };

export type ScanDirectoryActionResultsQueryVariables = Exact<{
  scanRequestId: Scalars['ID']['input'];
  size: Scalars['Int']['input'];
}>;


export type ScanDirectoryActionResultsQuery = { __typename: 'Query', scanDirectory: { __typename: 'FailedScan', id: string, message: string } | { __typename: 'GombocError', code?: GombocErrorCode | null, message: string } | { __typename: 'ScanDirectory', id: string, childrenCompleted: number, childrenError: number, childrenExpected: number, children: Array<{ __typename: 'FailedScan', id: string, message: string } | { __typename: 'GombocError', code?: GombocErrorCode | null, message: string } | { __typename: 'ScanScenario', id: string, result?: { __typename: 'ScanResult', id: string, policyObservations: { __typename: 'PolicyObservationsPage', results: Array<{ __typename: 'PolicyObservation', filepath: string, lineNumber: number, resourceName: string, resourceType: string, disposition: Disposition, capabilityTitle?: string | null }> } } | null }> } };

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
    query scanBranchActionResults($scanRequestId: ID!, $size: Int!) {
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
              exclude: [ALREADY_COMPLIANT, NOT_APPLICABLE, INSUFFICIENT_INFO_TO_REMEDIATE, CANNOT_REMEDIATE]
              page: 1
              size: $size
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
    query scanDirectoryActionResults($scanRequestId: ID!, $size: Int!) {
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
              size: $size
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