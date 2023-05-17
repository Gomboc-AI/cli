/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface GitHubOptions {
  accessToken: string;
  createPR?: boolean | null;
  commitOnCurrentBranch?: boolean | null;
  createCommentsWithCodeSuggestions?: boolean | null;
  ref?: string | null;
  sha?: string | null;
  repository?: string | null;
  repositoryOwner?: string | null;
}

export interface GitLabOptions {
  accessToken: string;
  createMR?: boolean | null;
  commitOnCurrentBranch?: boolean | null;
  createCommentsWithCodeSuggestions?: boolean | null;
  projectPath?: string | null;
  namespacePath?: string | null;
  projectId?: string | null;
}

export interface ScanParameter {
  name: string;
  value: string;
}

export interface ScanPolicy {
  mustImplement?: string[] | null;
}

export interface TemplatePayload {
  content: string;
  filePath: string;
  parameters?: ScanParameter[] | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
