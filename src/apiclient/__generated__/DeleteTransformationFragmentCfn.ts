/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DeleteTransformationFragmentCfn
// ====================================================

export interface DeleteTransformationFragmentCfn_logicalResource {
  __typename: "LogicalResource";
  line: number;
  name: string;
}

export interface DeleteTransformationFragmentCfn {
  __typename: "DeleteTransformation";
  property: string;
  /**
   * Deletes an existing Property on a Resource
   */
  logicalResource: DeleteTransformationFragmentCfn_logicalResource;
}
