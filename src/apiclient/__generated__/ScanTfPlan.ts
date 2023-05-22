/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ScanPolicy, GitHubOptions, GitLabOptions } from "./GlobalTypes";

// ====================================================
// GraphQL query operation: ScanTfPlan
// ====================================================

export interface ScanTfPlan_scanTfPlanExt_scanMeta {
  __typename: "ScanMeta";
  timestamp: string;
  scanId: string;
  portalUrl: string;
}

export interface ScanTfPlan_scanTfPlanExt_sideEffectsResult {
  __typename: "SideEffectsResult";
  success: boolean;
}

export interface ScanTfPlan_scanTfPlanExt_result_complianceObservations_logicalResource {
  __typename: "LogicalResource";
  filePath: string | null;
  line: number;
  name: string;
}

export interface ScanTfPlan_scanTfPlanExt_result_complianceObservations_policyStatement_capability {
  __typename: "Capability";
  title: string;
}

export interface ScanTfPlan_scanTfPlanExt_result_complianceObservations_policyStatement {
  __typename: "MustImplementCapabilityPolicyStatement";
  capability: ScanTfPlan_scanTfPlanExt_result_complianceObservations_policyStatement_capability;
}

export interface ScanTfPlan_scanTfPlanExt_result_complianceObservations {
  __typename: "ComplianceObservation";
  logicalResource: ScanTfPlan_scanTfPlanExt_result_complianceObservations_logicalResource;
  policyStatement: ScanTfPlan_scanTfPlanExt_result_complianceObservations_policyStatement;
}

export interface ScanTfPlan_scanTfPlanExt_result_violationObservations_policyStatement_capability {
  __typename: "Capability";
  title: string;
}

export interface ScanTfPlan_scanTfPlanExt_result_violationObservations_policyStatement {
  __typename: "MustImplementCapabilityPolicyStatement";
  capability: ScanTfPlan_scanTfPlanExt_result_violationObservations_policyStatement_capability;
}

export interface ScanTfPlan_scanTfPlanExt_result_violationObservations_trivialRemediation_resolvesWithTransformations_CreateTransformation_logicalResource {
  __typename: "LogicalResource";
  filePath: string | null;
  line: number;
  name: string;
}

export interface ScanTfPlan_scanTfPlanExt_result_violationObservations_trivialRemediation_resolvesWithTransformations_CreateTransformation {
  __typename: "CreateTransformation";
  /**
   * Creates a new Property on a Resource
   */
  logicalResource: ScanTfPlan_scanTfPlanExt_result_violationObservations_trivialRemediation_resolvesWithTransformations_CreateTransformation_logicalResource;
  property: string;
  value: string | null;
}

export interface ScanTfPlan_scanTfPlanExt_result_violationObservations_trivialRemediation_resolvesWithTransformations_UpdateTransformation_logicalResource {
  __typename: "LogicalResource";
  filePath: string | null;
  line: number;
  name: string;
}

export interface ScanTfPlan_scanTfPlanExt_result_violationObservations_trivialRemediation_resolvesWithTransformations_UpdateTransformation {
  __typename: "UpdateTransformation";
  /**
   * Updates an existing Property on a Resource
   */
  logicalResource: ScanTfPlan_scanTfPlanExt_result_violationObservations_trivialRemediation_resolvesWithTransformations_UpdateTransformation_logicalResource;
  property: string;
  value: string | null;
}

export interface ScanTfPlan_scanTfPlanExt_result_violationObservations_trivialRemediation_resolvesWithTransformations_DeleteTransformation_logicalResource {
  __typename: "LogicalResource";
  filePath: string | null;
  line: number;
  name: string;
}

export interface ScanTfPlan_scanTfPlanExt_result_violationObservations_trivialRemediation_resolvesWithTransformations_DeleteTransformation {
  __typename: "DeleteTransformation";
  property: string;
  /**
   * Deletes an existing Property on a Resource
   */
  logicalResource: ScanTfPlan_scanTfPlanExt_result_violationObservations_trivialRemediation_resolvesWithTransformations_DeleteTransformation_logicalResource;
}

export type ScanTfPlan_scanTfPlanExt_result_violationObservations_trivialRemediation_resolvesWithTransformations = ScanTfPlan_scanTfPlanExt_result_violationObservations_trivialRemediation_resolvesWithTransformations_CreateTransformation | ScanTfPlan_scanTfPlanExt_result_violationObservations_trivialRemediation_resolvesWithTransformations_UpdateTransformation | ScanTfPlan_scanTfPlanExt_result_violationObservations_trivialRemediation_resolvesWithTransformations_DeleteTransformation;

export interface ScanTfPlan_scanTfPlanExt_result_violationObservations_trivialRemediation_appliesToLogicalResource {
  __typename: "LogicalResource";
  filePath: string | null;
  line: number;
  name: string;
}

export interface ScanTfPlan_scanTfPlanExt_result_violationObservations_trivialRemediation {
  __typename: "Remediation";
  id: string;
  resolvesWithTransformations: ScanTfPlan_scanTfPlanExt_result_violationObservations_trivialRemediation_resolvesWithTransformations[];
  appliesToLogicalResource: ScanTfPlan_scanTfPlanExt_result_violationObservations_trivialRemediation_appliesToLogicalResource;
}

export interface ScanTfPlan_scanTfPlanExt_result_violationObservations_nonTrivialRemediation_appliesToLogicalResource {
  __typename: "LogicalResource";
  filePath: string | null;
  line: number;
  name: string;
}

export interface ScanTfPlan_scanTfPlanExt_result_violationObservations_nonTrivialRemediation {
  __typename: "Remediation";
  id: string;
  appliesToLogicalResource: ScanTfPlan_scanTfPlanExt_result_violationObservations_nonTrivialRemediation_appliesToLogicalResource;
}

export interface ScanTfPlan_scanTfPlanExt_result_violationObservations_logicalResource {
  __typename: "LogicalResource";
  filePath: string | null;
  line: number;
  name: string;
}

export interface ScanTfPlan_scanTfPlanExt_result_violationObservations {
  __typename: "ViolationObservation";
  policyStatement: ScanTfPlan_scanTfPlanExt_result_violationObservations_policyStatement;
  trivialRemediation: ScanTfPlan_scanTfPlanExt_result_violationObservations_trivialRemediation | null;
  nonTrivialRemediation: ScanTfPlan_scanTfPlanExt_result_violationObservations_nonTrivialRemediation[];
  logicalResource: ScanTfPlan_scanTfPlanExt_result_violationObservations_logicalResource;
}

export interface ScanTfPlan_scanTfPlanExt_result {
  __typename: "TfScanResult";
  complianceObservations: ScanTfPlan_scanTfPlanExt_result_complianceObservations[];
  violationObservations: ScanTfPlan_scanTfPlanExt_result_violationObservations[];
}

export interface ScanTfPlan_scanTfPlanExt {
  __typename: "ScanTfResultType";
  scanMeta: ScanTfPlan_scanTfPlanExt_scanMeta;
  sideEffectsResult: ScanTfPlan_scanTfPlanExt_sideEffectsResult | null;
  result: ScanTfPlan_scanTfPlanExt_result;
}

export interface ScanTfPlan {
  scanTfPlanExt: ScanTfPlan_scanTfPlanExt;
}

export interface ScanTfPlanVariables {
  plan: string;
  workingDirectory: string;
  policy: ScanPolicy;
  gitHubOptions?: GitHubOptions | null;
  gitLabOptions?: GitLabOptions | null;
  secretAccessKey?: string | null;
}
