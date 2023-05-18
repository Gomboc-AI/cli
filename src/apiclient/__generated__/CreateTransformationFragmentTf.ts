/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CreateTransformationFragmentTf
// ====================================================

export interface CreateTransformationFragmentTf_logicalResource {
  __typename: "LogicalResource";
  filePath: string | null;
  line: number;
  name: string;
}

export interface CreateTransformationFragmentTf {
  __typename: "CreateTransformation";
  /**
   * Creates a new Property on a Resource
   */
  logicalResource: CreateTransformationFragmentTf_logicalResource;
  property: string;
  value: string | null;
}
