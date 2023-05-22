/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UpdateTransformationFragmentTf
// ====================================================

export interface UpdateTransformationFragmentTf_logicalResource {
  __typename: "LogicalResource";
  filePath: string | null;
  line: number;
  name: string;
}

export interface UpdateTransformationFragmentTf {
  __typename: "UpdateTransformation";
  /**
   * Updates an existing Property on a Resource
   */
  logicalResource: UpdateTransformationFragmentTf_logicalResource;
  property: string;
  value: string | null;
}
