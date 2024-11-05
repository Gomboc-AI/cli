export enum Stage {
  LOCAL = 'LOCAL',
  BETA = 'BETA',
  PROD = 'PROD',
  DEV = 'DEV',
}

// Environment variables:
// GOMBOC_STAGE: LOCAL | BETA | PROD
// GOMBOC_DEBUG: any value

export type Settings = {
  STAGE: Stage;
  SERVER_URL: string;
  CLIENT_URL: string;
  DEBUG_MODE: boolean;
}

const inDebugMode = (): boolean => {
  return process.env.GOMBOC_DEBUG != null;
}

const getStage = (): Stage => {
  const envStage = process.env.GOMBOC_STAGE;
  switch (envStage) {
    case 'LOCAL':
      return Stage.LOCAL;
      case 'DEV':
        return Stage.DEV;
    case 'BETA':
      return Stage.BETA;
    case 'PROD':
      return Stage.PROD;
    default:
      return Stage.PROD;
  }
}

const getServerUrl = (stage: Stage): string => {
  const urlOverride = process.env.GOMBOC_SERVER_URL_OVERRIDE;
  if (urlOverride) {
    return urlOverride;
  }
  switch (stage) {
    case Stage.LOCAL:
      return 'http://localhost:4000/graphql';
      case Stage.DEV:
      return 'http://scan.dev.gcp.gomboc.ai.graphql';
    case Stage.BETA:
      return 'https://scan.beta.gomboc.ai/graphql';
    case Stage.PROD:
      return 'https://scan.app.gomboc.ai/graphql';
  }
}

const getClientUrl = (stage: Stage): string => {
  const urlOverride = process.env.GOMBOC_CLIENT_URL_OVERRIDE;
  if (urlOverride) {
    return urlOverride;
  }
  switch (stage) {
    case Stage.LOCAL:
      return 'http://localhost:3000';
      case Stage.DEV:
      return 'https://app.dev.gcp.gomboc.ai';
    case Stage.BETA:
      return 'https://app.beta.gomboc.ai';
    case Stage.PROD:
      return 'https://app.gomboc.ai';
  }
}

export const getSettings = (): Settings => {
  const stage = getStage();

  return {
    STAGE: stage,
    SERVER_URL: getServerUrl(stage),
    CLIENT_URL: getClientUrl(stage),
    DEBUG_MODE: inDebugMode(),
  }
}

export const settings = getSettings();
