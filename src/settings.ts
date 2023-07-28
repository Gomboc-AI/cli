enum Stage {
  LOCAL = 'LOCAL',
  BETA = 'BETA',
  PROD = 'PROD',
};

export type Settings = {
  STAGE: Stage;
  SERVER_URL: string;
};

const getStage = (): Stage => {
  const envStage = process.env.STAGE;
  switch (envStage) {
    case 'LOCAL':
      return Stage.LOCAL;
    case 'BETA':
      return Stage.BETA;
    case 'PROD':
      return Stage.PROD;
    default:
      console.log(`Unknown stage ${envStage}, defaulting to PROD`)
      return Stage.PROD;
  }
};

const getServerUrl = (stage: Stage): string => {
  switch (stage) {
    case Stage.LOCAL:
      return 'http://localhost:4000/graphql';
    case Stage.BETA:
      return 'https://scan.beta.gomboc.ai/graphql';
    case Stage.PROD:
      return 'https://scan.gomboc.ai/graphql';
  }
};

export const getSettings = (): Settings => {
  const stage = getStage();

  return {
    STAGE: stage,
    SERVER_URL: getServerUrl(stage),
  };
};

export const settings = getSettings();