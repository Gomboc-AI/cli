import { TemplatePayload, ScanPolicy, GitHubOptions, GitLabOptions } from "./GlobalTypes";
export interface ScanCfnTemplate_scanCfnTemplateExt_scanMeta {
    __typename: "ScanMeta";
    timestamp: string;
    scanId: string;
    portalUrl: string;
}
export interface ScanCfnTemplate_scanCfnTemplateExt_sideEffectsResult {
    __typename: "SideEffectsResult";
    success: boolean;
}
export interface ScanCfnTemplate_scanCfnTemplateExt_results_complianceObservations_logicalResource {
    __typename: "LogicalResource";
    line: number;
    name: string;
}
export interface ScanCfnTemplate_scanCfnTemplateExt_results_complianceObservations_policyStatement_capability {
    __typename: "Capability";
    title: string;
}
export interface ScanCfnTemplate_scanCfnTemplateExt_results_complianceObservations_policyStatement {
    __typename: "MustImplementCapabilityPolicyStatement";
    capability: ScanCfnTemplate_scanCfnTemplateExt_results_complianceObservations_policyStatement_capability;
}
export interface ScanCfnTemplate_scanCfnTemplateExt_results_complianceObservations {
    __typename: "ComplianceObservation";
    logicalResource: ScanCfnTemplate_scanCfnTemplateExt_results_complianceObservations_logicalResource;
    policyStatement: ScanCfnTemplate_scanCfnTemplateExt_results_complianceObservations_policyStatement;
}
export interface ScanCfnTemplate_scanCfnTemplateExt_results_violationObservations_policyStatement_capability {
    __typename: "Capability";
    title: string;
}
export interface ScanCfnTemplate_scanCfnTemplateExt_results_violationObservations_policyStatement {
    __typename: "MustImplementCapabilityPolicyStatement";
    capability: ScanCfnTemplate_scanCfnTemplateExt_results_violationObservations_policyStatement_capability;
}
export interface ScanCfnTemplate_scanCfnTemplateExt_results_violationObservations_trivialRemediation_resolvesWithTransformations_CreateTransformation_logicalResource {
    __typename: "LogicalResource";
    line: number;
    name: string;
}
export interface ScanCfnTemplate_scanCfnTemplateExt_results_violationObservations_trivialRemediation_resolvesWithTransformations_CreateTransformation {
    __typename: "CreateTransformation";
    /**
     * Creates a new Property on a Resource
     */
    logicalResource: ScanCfnTemplate_scanCfnTemplateExt_results_violationObservations_trivialRemediation_resolvesWithTransformations_CreateTransformation_logicalResource;
    property: string;
    value: string | null;
}
export interface ScanCfnTemplate_scanCfnTemplateExt_results_violationObservations_trivialRemediation_resolvesWithTransformations_UpdateTransformation_logicalResource {
    __typename: "LogicalResource";
    line: number;
    name: string;
}
export interface ScanCfnTemplate_scanCfnTemplateExt_results_violationObservations_trivialRemediation_resolvesWithTransformations_UpdateTransformation {
    __typename: "UpdateTransformation";
    /**
     * Updates an existing Property on a Resource
     */
    logicalResource: ScanCfnTemplate_scanCfnTemplateExt_results_violationObservations_trivialRemediation_resolvesWithTransformations_UpdateTransformation_logicalResource;
    property: string;
    value: string | null;
}
export interface ScanCfnTemplate_scanCfnTemplateExt_results_violationObservations_trivialRemediation_resolvesWithTransformations_DeleteTransformation_logicalResource {
    __typename: "LogicalResource";
    line: number;
    name: string;
}
export interface ScanCfnTemplate_scanCfnTemplateExt_results_violationObservations_trivialRemediation_resolvesWithTransformations_DeleteTransformation {
    __typename: "DeleteTransformation";
    property: string;
    /**
     * Deletes an existing Property on a Resource
     */
    logicalResource: ScanCfnTemplate_scanCfnTemplateExt_results_violationObservations_trivialRemediation_resolvesWithTransformations_DeleteTransformation_logicalResource;
}
export type ScanCfnTemplate_scanCfnTemplateExt_results_violationObservations_trivialRemediation_resolvesWithTransformations = ScanCfnTemplate_scanCfnTemplateExt_results_violationObservations_trivialRemediation_resolvesWithTransformations_CreateTransformation | ScanCfnTemplate_scanCfnTemplateExt_results_violationObservations_trivialRemediation_resolvesWithTransformations_UpdateTransformation | ScanCfnTemplate_scanCfnTemplateExt_results_violationObservations_trivialRemediation_resolvesWithTransformations_DeleteTransformation;
export interface ScanCfnTemplate_scanCfnTemplateExt_results_violationObservations_trivialRemediation_appliesToLogicalResource {
    __typename: "LogicalResource";
    line: number;
    name: string;
}
export interface ScanCfnTemplate_scanCfnTemplateExt_results_violationObservations_trivialRemediation {
    __typename: "Remediation";
    id: string;
    resolvesWithTransformations: ScanCfnTemplate_scanCfnTemplateExt_results_violationObservations_trivialRemediation_resolvesWithTransformations[];
    appliesToLogicalResource: ScanCfnTemplate_scanCfnTemplateExt_results_violationObservations_trivialRemediation_appliesToLogicalResource;
}
export interface ScanCfnTemplate_scanCfnTemplateExt_results_violationObservations_nonTrivialRemediation_appliesToLogicalResource {
    __typename: "LogicalResource";
    line: number;
    name: string;
}
export interface ScanCfnTemplate_scanCfnTemplateExt_results_violationObservations_nonTrivialRemediation {
    __typename: "Remediation";
    id: string;
    appliesToLogicalResource: ScanCfnTemplate_scanCfnTemplateExt_results_violationObservations_nonTrivialRemediation_appliesToLogicalResource;
}
export interface ScanCfnTemplate_scanCfnTemplateExt_results_violationObservations_logicalResource {
    __typename: "LogicalResource";
    line: number;
    name: string;
}
export interface ScanCfnTemplate_scanCfnTemplateExt_results_violationObservations {
    __typename: "ViolationObservation";
    policyStatement: ScanCfnTemplate_scanCfnTemplateExt_results_violationObservations_policyStatement;
    trivialRemediation: ScanCfnTemplate_scanCfnTemplateExt_results_violationObservations_trivialRemediation | null;
    nonTrivialRemediation: ScanCfnTemplate_scanCfnTemplateExt_results_violationObservations_nonTrivialRemediation[];
    logicalResource: ScanCfnTemplate_scanCfnTemplateExt_results_violationObservations_logicalResource;
}
export interface ScanCfnTemplate_scanCfnTemplateExt_results {
    __typename: "CfnScanResult";
    filePath: string;
    error: string | null;
    complianceObservations: ScanCfnTemplate_scanCfnTemplateExt_results_complianceObservations[];
    violationObservations: ScanCfnTemplate_scanCfnTemplateExt_results_violationObservations[];
}
export interface ScanCfnTemplate_scanCfnTemplateExt {
    __typename: "ScanCfnResultType";
    scanMeta: ScanCfnTemplate_scanCfnTemplateExt_scanMeta;
    sideEffectsResult: ScanCfnTemplate_scanCfnTemplateExt_sideEffectsResult | null;
    results: ScanCfnTemplate_scanCfnTemplateExt_results[];
}
export interface ScanCfnTemplate {
    scanCfnTemplateExt: ScanCfnTemplate_scanCfnTemplateExt;
}
export interface ScanCfnTemplateVariables {
    templates: TemplatePayload[];
    policy: ScanPolicy;
    gitHubOptions?: GitHubOptions | null;
    gitLabOptions?: GitLabOptions | null;
    secretAccessKey?: string | null;
}
