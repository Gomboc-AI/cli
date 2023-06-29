export enum ActionCommand {
    SCAN = 'scan',
    REMEDIATE = 'remediate'
}

export enum LocationCommand {
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