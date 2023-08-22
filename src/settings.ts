export enum Stage {
  LOCAL = 'LOCAL',
  BETA = 'BETA',
  PROD = 'PROD',
}

const TRUE_VALUE = 'true';

// Environment variables:
// GOMBOC_STAGE: LOCAL | BETA | PROD
// GOMBOC_DEBUG: any value
// GOMBOC_CANARY_MODE: any value

export type Settings = {
  STAGE: Stage;
  SERVER_URL: string;
  DEBUG_MODE: boolean;
  CANARY_MODE: boolean;
}

const inDebugMode = (): boolean => {
  return process.env.GOMBOC_DEBUG === TRUE_VALUE;
}

const inCanaryMode = (): boolean => {
  // When in canary mode, the CLI will exit with a success code
  // in any case where the server returns a success response.
  // Nothing is printed to the console.
  // TODO canary mode should send a side-effect dry mode to the server
  return process.env.GOMBOC_CANARY_MODE === TRUE_VALUE;
}

const getStage = (): Stage => {
  const envStage = process.env.GOMBOC_STAGE;
  switch (envStage) {
    case 'LOCAL':
      return Stage.LOCAL;
    case 'BETA':
      return Stage.BETA;
    case 'PROD':
      return Stage.PROD;
    default:
      return Stage.PROD;
  }
}

const getServerUrl = (stage: Stage): string => {
  switch (stage) {
    case Stage.LOCAL:
      return 'http://localhost:4000/graphql';
    case Stage.BETA:
      return 'https://scan.beta.gomboc.ai/graphql';
    case Stage.PROD:
      return 'https://scan.gomboc.ai/graphql';
  }
}

export const getSettings = (): Settings => {
  const stage = getStage();

  return {
    STAGE: stage,
    SERVER_URL: getServerUrl(stage),
    DEBUG_MODE: inDebugMode(),
    CANARY_MODE: inCanaryMode(),
  }
}

export const settings = getSettings();