export enum Stage {
  LOCAL = 'LOCAL',
  BETA = 'BETA',
  PROD = 'PROD',
}

export type Settings = {
  STAGE: Stage;
  SERVER_URL: string;
  DEBUG: boolean;
}

const getDebug = (): boolean => {
  // If env GOMBOC_DEBUG has any value, it's true
  return process.env.GOMBOC_DEBUG != null;
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
    DEBUG: getDebug(),
  }
}

export const settings = getSettings();