

export type Settings = {
  SERVER_URL: string;
  CLIENT_URL: string;
  DEBUG_MODE: boolean;
}

const DEFAULT_GOMBOC_SERVER_URL = 'https://scan.app.gomboc.ai/graphql'
const DEFAULT_GOMBOC_CLIENT_URL = 'https://app.gomboc.ai'

export const getSettings = (): Settings => {
  let gombocServerUrl = process.env.GOMBOC_SERVER_URL ?? ''
  let gombocClientUrl = process.env.GOMBOC_CLIENT_URL ?? ''

  try {
    new URL(gombocClientUrl)
  } catch (e) {
    gombocClientUrl = DEFAULT_GOMBOC_CLIENT_URL
  }
  try {
    new URL(gombocServerUrl)
  } catch (e) {
    gombocServerUrl = DEFAULT_GOMBOC_SERVER_URL
  }

  console.log(`Connecting to client at ${gombocClientUrl}`)
  console.log(`Connecting to server at ${gombocServerUrl}`)

  const settings = {
    SERVER_URL: gombocServerUrl,
    CLIENT_URL: gombocClientUrl,
    DEBUG_MODE: process.env.GOMBOC_DEBUG != null,
  }
  return settings
}


export const settings = getSettings();
