export interface MustImplementCapabilityPolicyStatementFragment_capability {
    __typename: "Capability";
    title: string;
}
export interface MustImplementCapabilityPolicyStatementFragment {
    __typename: "MustImplementCapabilityPolicyStatement";
    capability: MustImplementCapabilityPolicyStatementFragment_capability;
}
