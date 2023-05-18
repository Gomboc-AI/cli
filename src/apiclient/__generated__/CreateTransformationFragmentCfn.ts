/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CreateTransformationFragmentCfn
// ====================================================

export interface CreateTransformationFragmentCfn_logicalResource {
  __typename: "LogicalResource";
  line: number;
  name: string;
}

export interface CreateTransformationFragmentCfn {
  __typename: "CreateTransformation";
  /**
   * Creates a new Property on a Resource
   */
  logicalResource: CreateTransformationFragmentCfn_logicalResource;
  property: string;
  value: string | null;
}
