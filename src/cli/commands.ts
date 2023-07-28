export enum VerbCommand {
    SCAN = 'scan',
    REMEDIATE = 'remediate'
}

export enum SourceCommand {
    LOCAL = 'local',
    REMOTE = 'remote'
}

export enum ServiceCommand {
    CLOUDFORMATION = 'cloudformation',
    TERRAFORM = 'terraform'
}

export enum ClientCommand {
    GITHUB = 'github',
    GITLAB = 'gitlab'
}

export enum EffectCommand {
    DIRECT_APPLY = 'direct-apply',
    SUBMIT_FOR_REVIEW = 'submit-for-review'
}
