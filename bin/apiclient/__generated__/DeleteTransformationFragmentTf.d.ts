export interface DeleteTransformationFragmentTf_logicalResource {
    __typename: "LogicalResource";
    filePath: string | null;
    line: number;
    name: string;
}
export interface DeleteTransformationFragmentTf {
    __typename: "DeleteTransformation";
    property: string;
    /**
     * Deletes an existing Property on a Resource
     */
    logicalResource: DeleteTransformationFragmentTf_logicalResource;
}
