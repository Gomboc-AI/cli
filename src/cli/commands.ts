
export enum EffectCommand {
  SUBMIT_FOR_REVIEW = 'submit-for-review',
  AUDIT = 'audit',
}

export enum EventCommand {
  ON_SCHEDULE = 'on-schedule',
  ON_PULL_REQUEST = 'on-pull-request'
}

export enum IacOptions {
  CLOUDFORMATION = 'cloudformation',
  TERRAFORM = 'terraform'
}
