/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TemplatePayload, ScanPolicy, GitHubOptions, GitLabOptions } from "./GlobalTypes";

// ====================================================
// GraphQL query operation: ScanCfnTemplates
// ====================================================

export interface ScanCfnTemplates_scanCfnTemplateExt_scanMeta {
  __typename: "ScanMeta";
  timestamp: string;
  scanId: string;
  portalUrl: string;
}

export interface ScanCfnTemplates_scanCfnTemplateExt_sideEffectsResult {
  __typename: "SideEffectsResult";
  success: boolean;
}

export interface ScanCfnTemplates_scanCfnTemplateExt_results_complianceObservations_logicalResource {
  __typename: "LogicalResource";
  line: number;
  name: string;
}

export interface ScanCfnTemplates_scanCfnTemplateExt_results_complianceObservations_policyStatement_capability {
  __typename: "Capability";
  title: string;
}

export interface ScanCfnTemplates_scanCfnTemplateExt_results_complianceObservations_policyStatement {
  __typename: "MustImplementCapabilityPolicyStatement";
  capability: ScanCfnTemplates_scanCfnTemplateExt_results_complianceObservations_policyStatement_capability;
}

export interface ScanCfnTemplates_scanCfnTemplateExt_results_complianceObservations {
  __typename: "ComplianceObservation";
  logicalResource: ScanCfnTemplates_scanCfnTemplateExt_results_complianceObservations_logicalResource;
  policyStatement: ScanCfnTemplates_scanCfnTemplateExt_results_complianceObservations_policyStatement;
}

export interface ScanCfnTemplates_scanCfnTemplateExt_results_violationObservations_policyStatement_capability {
  __typename: "Capability";
  title: string;
}

export interface ScanCfnTemplates_scanCfnTemplateExt_results_violationObservations_policyStatement {
  __typename: "MustImplementCapabilityPolicyStatement";
  capability: ScanCfnTemplates_scanCfnTemplateExt_results_violationObservations_policyStatement_capability;
}

export interface ScanCfnTemplates_scanCfnTemplateExt_results_violationObservations_trivialRemediation_resolvesWithTransformations_CreateTransformation_logicalResource {
  __typename: "LogicalResource";
  filePath: string | null;
  line: number;
  name: string;
}

export interface ScanCfnTemplates_scanCfnTemplateExt_results_violationObservations_trivialRemediation_resolvesWithTransformations_CreateTransformation {
  __typename: "CreateTransformation";
  /**
   * Creates a new Property on a Resource
   */
  logicalResource: ScanCfnTemplates_scanCfnTemplateExt_results_violationObservations_trivialRemediation_resolvesWithTransformations_CreateTransformation_logicalResource;
  property: string;
  value: string | null;
}

export interface ScanCfnTemplates_scanCfnTemplateExt_results_violationObservations_trivialRemediation_resolvesWithTransformations_UpdateTransformation_logicalResource {
  __typename: "LogicalResource";
  filePath: string | null;
  line: number;
  name: string;
}

export interface ScanCfnTemplates_scanCfnTemplateExt_results_violationObservations_trivialRemediation_resolvesWithTransformations_UpdateTransformation {
  __typename: "UpdateTransformation";
  /**
   * Updates an existing Property on a Resource
   */
  logicalResource: ScanCfnTemplates_scanCfnTemplateExt_results_violationObservations_trivialRemediation_resolvesWithTransformations_UpdateTransformation_logicalResource;
  property: string;
  value: string | null;
}

export interface ScanCfnTemplates_scanCfnTemplateExt_results_violationObservations_trivialRemediation_resolvesWithTransformations_DeleteTransformation_logicalResource {
  __typename: "LogicalResource";
  filePath: string | null;
  line: number;
  name: string;
}

export interface ScanCfnTemplates_scanCfnTemplateExt_results_violationObservations_trivialRemediation_resolvesWithTransformations_DeleteTransformation {
  __typename: "DeleteTransformation";
  property: string;
  /**
   * Deletes an existing Property on a Resource
   */
  logicalResource: ScanCfnTemplates_scanCfnTemplateExt_results_violationObservations_trivialRemediation_resolvesWithTransformations_DeleteTransformation_logicalResource;
}

export type ScanCfnTemplates_scanCfnTemplateExt_results_violationObservations_trivialRemediation_resolvesWithTransformations = ScanCfnTemplates_scanCfnTemplateExt_results_violationObservations_trivialRemediation_resolvesWithTransformations_CreateTransformation | ScanCfnTemplates_scanCfnTemplateExt_results_violationObservations_trivialRemediation_resolvesWithTransformations_UpdateTransformation | ScanCfnTemplates_scanCfnTemplateExt_results_violationObservations_trivialRemediation_resolvesWithTransformations_DeleteTransformation;

export interface ScanCfnTemplates_scanCfnTemplateExt_results_violationObservations_trivialRemediation_appliesToLogicalResource {
  __typename: "LogicalResource";
  line: number;
  name: string;
}

export interface ScanCfnTemplates_scanCfnTemplateExt_results_violationObservations_trivialRemediation {
  __typename: "Remediation";
  id: string;
  resolvesWithTransformations: ScanCfnTemplates_scanCfnTemplateExt_results_violationObservations_trivialRemediation_resolvesWithTransformations[];
  appliesToLogicalResource: ScanCfnTemplates_scanCfnTemplateExt_results_violationObservations_trivialRemediation_appliesToLogicalResource;
}

export interface ScanCfnTemplates_scanCfnTemplateExt_results_violationObservations_nonTrivialRemediation_appliesToLogicalResource {
  __typename: "LogicalResource";
  line: number;
  name: string;
}

export interface ScanCfnTemplates_scanCfnTemplateExt_results_violationObservations_nonTrivialRemediation {
  __typename: "Remediation";
  id: string;
  appliesToLogicalResource: ScanCfnTemplates_scanCfnTemplateExt_results_violationObservations_nonTrivialRemediation_appliesToLogicalResource;
}

export interface ScanCfnTemplates_scanCfnTemplateExt_results_violationObservations_logicalResource {
  __typename: "LogicalResource";
  line: number;
  name: string;
}

export interface ScanCfnTemplates_scanCfnTemplateExt_results_violationObservations {
  __typename: "ViolationObservation";
  policyStatement: ScanCfnTemplates_scanCfnTemplateExt_results_violationObservations_policyStatement;
  trivialRemediation: ScanCfnTemplates_scanCfnTemplateExt_results_violationObservations_trivialRemediation | null;
  nonTrivialRemediation: ScanCfnTemplates_scanCfnTemplateExt_results_violationObservations_nonTrivialRemediation[];
  logicalResource: ScanCfnTemplates_scanCfnTemplateExt_results_violationObservations_logicalResource;
}

export interface ScanCfnTemplates_scanCfnTemplateExt_results {
  __typename: "CfnScanResult";
  filePath: string;
  error: string | null;
  complianceObservations: ScanCfnTemplates_scanCfnTemplateExt_results_complianceObservations[];
  violationObservations: ScanCfnTemplates_scanCfnTemplateExt_results_violationObservations[];
}

export interface ScanCfnTemplates_scanCfnTemplateExt {
  __typename: "ScanCfnResultType";
  scanMeta: ScanCfnTemplates_scanCfnTemplateExt_scanMeta;
  sideEffectsResult: ScanCfnTemplates_scanCfnTemplateExt_sideEffectsResult | null;
  results: ScanCfnTemplates_scanCfnTemplateExt_results[];
}

export interface ScanCfnTemplates {
  scanCfnTemplateExt: ScanCfnTemplates_scanCfnTemplateExt;
}

export interface ScanCfnTemplatesVariables {
  templates: TemplatePayload[];
  policy: ScanPolicy;
  gitHubOptions?: GitHubOptions | null;
  gitLabOptions?: GitLabOptions | null;
  secretAccessKey?: string | null;
}
