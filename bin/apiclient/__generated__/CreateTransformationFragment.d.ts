export interface CreateTransformationFragment_logicalResource {
    __typename: "LogicalResource";
    filePath: string | null;
    line: number;
    name: string;
}
export interface CreateTransformationFragment {
    __typename: "CreateTransformation";
    /**
     * Creates a new Property on a Resource
     */
    logicalResource: CreateTransformationFragment_logicalResource;
    property: string;
    value: string | null;
}
