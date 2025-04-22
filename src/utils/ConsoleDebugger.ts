import { settings } from '../settings.js';
import { hl } from './consoleUtils.js';


class ConsoleDebugger {

  constructor() {
    if (settings.DEBUG_MODE) {
      console.log(hl(`..:: DEBUG IS ON`))
      console.log("Applied environment:", { env: process.env })
      console.log("Applied settings:", { settings })

    }
  }

  public log = (title: string, content: any) => {
    if (settings.DEBUG_MODE) {
      console.log(hl(`..:: DEBUG ${title}`), content)
    }
  }
}

export const consoleDebugger = new ConsoleDebugger();
