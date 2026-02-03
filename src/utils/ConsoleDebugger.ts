import { settings } from '../settings';
import { hlDebug } from './consoleUtils';


class ConsoleDebugger {
  isSilenced: boolean

  constructor() {
    this.isSilenced = !settings.DEBUG_MODE;
    if (!this.isSilenced) {
      console.log(hlDebug(`[DEBUG IS ON]`))
      console.log(hlDebug(`Applied environment: ${JSON.stringify({ env: process.env })}`))
      console.log(hlDebug(`Applied settings: ${JSON.stringify({ settings })}`))
    }
  }

  public log = (title: string, content: unknown) => {
    if (!this.isSilenced) {
      const contentStr = typeof content === 'string' ? content : JSON.stringify(content)
      console.log(hlDebug(`[DEBUG] ${title} ${contentStr}`))
    }
  }
}

export const consoleDebugger = new ConsoleDebugger();
