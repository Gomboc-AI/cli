/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UpdateTransformationFragmentCfn
// ====================================================

export interface UpdateTransformationFragmentCfn_logicalResource {
  __typename: "LogicalResource";
  line: number;
  name: string;
}

export interface UpdateTransformationFragmentCfn {
  __typename: "UpdateTransformation";
  /**
   * Updates an existing Property on a Resource
   */
  logicalResource: UpdateTransformationFragmentCfn_logicalResource;
  property: string;
  value: string | null;
}
