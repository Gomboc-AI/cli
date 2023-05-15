export interface UpdateTransformationFragment_logicalResource {
    __typename: "LogicalResource";
    line: number;
    name: string;
}
export interface UpdateTransformationFragment {
    __typename: "UpdateTransformation";
    /**
     * Updates an existing Property on a Resource
     */
    logicalResource: UpdateTransformationFragment_logicalResource;
    property: string;
    value: string | null;
}
