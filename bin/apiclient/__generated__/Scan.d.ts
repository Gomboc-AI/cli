import { TemplatePayload, ScanPolicy, GitHubOptions, GitLabOptions } from "./GlobalTypes";
export interface Scan_scanCfnTemplateExt_scanMeta {
    __typename: "ScanMeta";
    timestamp: string;
    scanId: string;
    portalUrl: string;
}
export interface Scan_scanCfnTemplateExt_sideEffectsResult {
    __typename: "SideEffectsResult";
    success: boolean;
}
export interface Scan_scanCfnTemplateExt_results_complianceObservations_logicalResource {
    __typename: "LogicalResource";
    line: number;
    name: string;
}
export interface Scan_scanCfnTemplateExt_results_complianceObservations_policyStatement_capability {
    __typename: "Capability";
    title: string;
}
export interface Scan_scanCfnTemplateExt_results_complianceObservations_policyStatement {
    __typename: "MustImplementCapabilityPolicyStatement";
    capability: Scan_scanCfnTemplateExt_results_complianceObservations_policyStatement_capability;
}
export interface Scan_scanCfnTemplateExt_results_complianceObservations {
    __typename: "ComplianceObservation";
    logicalResource: Scan_scanCfnTemplateExt_results_complianceObservations_logicalResource;
    policyStatement: Scan_scanCfnTemplateExt_results_complianceObservations_policyStatement;
}
export interface Scan_scanCfnTemplateExt_results_violationObservations_policyStatement_capability {
    __typename: "Capability";
    title: string;
}
export interface Scan_scanCfnTemplateExt_results_violationObservations_policyStatement {
    __typename: "MustImplementCapabilityPolicyStatement";
    capability: Scan_scanCfnTemplateExt_results_violationObservations_policyStatement_capability;
}
export interface Scan_scanCfnTemplateExt_results_violationObservations_trivialRemediation_resolvesWithTransformations_CreateTransformation_logicalResource {
    __typename: "LogicalResource";
    line: number;
    name: string;
}
export interface Scan_scanCfnTemplateExt_results_violationObservations_trivialRemediation_resolvesWithTransformations_CreateTransformation {
    __typename: "CreateTransformation";
    /**
     * Creates a new Property on a Resource
     */
    logicalResource: Scan_scanCfnTemplateExt_results_violationObservations_trivialRemediation_resolvesWithTransformations_CreateTransformation_logicalResource;
    property: string;
    value: string | null;
}
export interface Scan_scanCfnTemplateExt_results_violationObservations_trivialRemediation_resolvesWithTransformations_UpdateTransformation_logicalResource {
    __typename: "LogicalResource";
    line: number;
    name: string;
}
export interface Scan_scanCfnTemplateExt_results_violationObservations_trivialRemediation_resolvesWithTransformations_UpdateTransformation {
    __typename: "UpdateTransformation";
    /**
     * Updates an existing Property on a Resource
     */
    logicalResource: Scan_scanCfnTemplateExt_results_violationObservations_trivialRemediation_resolvesWithTransformations_UpdateTransformation_logicalResource;
    property: string;
    value: string | null;
}
export interface Scan_scanCfnTemplateExt_results_violationObservations_trivialRemediation_resolvesWithTransformations_DeleteTransformation_logicalResource {
    __typename: "LogicalResource";
    line: number;
    name: string;
}
export interface Scan_scanCfnTemplateExt_results_violationObservations_trivialRemediation_resolvesWithTransformations_DeleteTransformation {
    __typename: "DeleteTransformation";
    property: string;
    /**
     * Deletes an existing Property on a Resource
     */
    logicalResource: Scan_scanCfnTemplateExt_results_violationObservations_trivialRemediation_resolvesWithTransformations_DeleteTransformation_logicalResource;
}
export type Scan_scanCfnTemplateExt_results_violationObservations_trivialRemediation_resolvesWithTransformations = Scan_scanCfnTemplateExt_results_violationObservations_trivialRemediation_resolvesWithTransformations_CreateTransformation | Scan_scanCfnTemplateExt_results_violationObservations_trivialRemediation_resolvesWithTransformations_UpdateTransformation | Scan_scanCfnTemplateExt_results_violationObservations_trivialRemediation_resolvesWithTransformations_DeleteTransformation;
export interface Scan_scanCfnTemplateExt_results_violationObservations_trivialRemediation_appliesToLogicalResource {
    __typename: "LogicalResource";
    line: number;
    name: string;
}
export interface Scan_scanCfnTemplateExt_results_violationObservations_trivialRemediation {
    __typename: "Remediation";
    id: string;
    resolvesWithTransformations: Scan_scanCfnTemplateExt_results_violationObservations_trivialRemediation_resolvesWithTransformations[];
    appliesToLogicalResource: Scan_scanCfnTemplateExt_results_violationObservations_trivialRemediation_appliesToLogicalResource;
}
export interface Scan_scanCfnTemplateExt_results_violationObservations_nonTrivialRemediation_appliesToLogicalResource {
    __typename: "LogicalResource";
    line: number;
    name: string;
}
export interface Scan_scanCfnTemplateExt_results_violationObservations_nonTrivialRemediation {
    __typename: "Remediation";
    id: string;
    appliesToLogicalResource: Scan_scanCfnTemplateExt_results_violationObservations_nonTrivialRemediation_appliesToLogicalResource;
}
export interface Scan_scanCfnTemplateExt_results_violationObservations_logicalResource {
    __typename: "LogicalResource";
    line: number;
    name: string;
}
export interface Scan_scanCfnTemplateExt_results_violationObservations {
    __typename: "ViolationObservation";
    policyStatement: Scan_scanCfnTemplateExt_results_violationObservations_policyStatement;
    trivialRemediation: Scan_scanCfnTemplateExt_results_violationObservations_trivialRemediation | null;
    nonTrivialRemediation: Scan_scanCfnTemplateExt_results_violationObservations_nonTrivialRemediation[];
    logicalResource: Scan_scanCfnTemplateExt_results_violationObservations_logicalResource;
}
export interface Scan_scanCfnTemplateExt_results {
    __typename: "CfnScanResult";
    filePath: string;
    error: string | null;
    complianceObservations: Scan_scanCfnTemplateExt_results_complianceObservations[];
    violationObservations: Scan_scanCfnTemplateExt_results_violationObservations[];
}
export interface Scan_scanCfnTemplateExt {
    __typename: "ScanCfnResultType";
    scanMeta: Scan_scanCfnTemplateExt_scanMeta;
    sideEffectsResult: Scan_scanCfnTemplateExt_sideEffectsResult | null;
    results: Scan_scanCfnTemplateExt_results[];
}
export interface Scan {
    scanCfnTemplateExt: Scan_scanCfnTemplateExt;
}
export interface ScanVariables {
    templates: TemplatePayload[];
    policy: ScanPolicy;
    gitHubOptions?: GitHubOptions | null;
    gitLabOptions?: GitLabOptions | null;
}
