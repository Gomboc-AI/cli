export interface DeleteTransformationFragment_logicalResource {
    __typename: "LogicalResource";
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
