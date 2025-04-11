

export type Settings = {
  SERVER_URL: string;
  CLIENT_URL: string;
  DEBUG_MODE: boolean;
}

export const getSettings = (): Settings => {
  const gombocServerUrl = process.env.GOMBOC_SERVER_URL
  const gombocClientUrl = process.env.GOMBOC_CLIENT_URL
  const settings = {
    SERVER_URL: gombocServerUrl == null || gombocServerUrl === '' ? 'https://scan.app.gomboc.ai/graphql' : gombocServerUrl,
    CLIENT_URL: gombocClientUrl == null || gombocClientUrl === '' ? 'https://app.gomboc.ai' : gombocClientUrl,
    DEBUG_MODE: process.env.GOMBOC_DEBUG != null,
  }
  return settings
}


export const settings = getSettings();
