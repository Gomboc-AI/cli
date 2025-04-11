import { consoleDebugger } from './utils/ConsoleDebugger';

export type Settings = {
  SERVER_URL: string;
  CLIENT_URL: string;
  DEBUG_MODE: boolean;
}

export const getSettings = (): Settings => {
  const settings = {
    SERVER_URL: process.env.GOMBOC_SERVER_URL ?? 'https://scan.app.gomboc.ai/graphql',
    CLIENT_URL: process.env.GOMBOC_CLIENT_URL ?? 'https://app.gomboc.ai',
    DEBUG_MODE: process.env.GOMBOC_DEBUG != null,
  }
  consoleDebugger.log("Applied environment:", { env: process.env })
  consoleDebugger.log("Applied settings:", { settings })
  return settings
}


export const settings = getSettings();
