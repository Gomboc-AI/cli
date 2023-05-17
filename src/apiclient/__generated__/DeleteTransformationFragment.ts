/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DeleteTransformationFragment
// ====================================================

export interface DeleteTransformationFragment_logicalResource {
  __typename: "LogicalResource";
  filePath: string | null;
  line: number;
  name: string;
}

export interface DeleteTransformationFragment {
  __typename: "DeleteTransformation";
  property: string;
  /**
   * Deletes an existing Property on a Resource
   */
  logicalResource: DeleteTransformationFragment_logicalResource;
}
