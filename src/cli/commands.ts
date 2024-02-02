export enum VerbCommand {
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
  SUBMIT_FOR_REVIEW = 'submit-for-review',
  DIRECT_APPLY = 'direct-apply'
}
