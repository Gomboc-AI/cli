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
