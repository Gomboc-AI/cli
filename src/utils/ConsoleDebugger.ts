import { settings } from '../settings';
import { hl } from './consoleUtils';


class ConsoleDebugger {
  isSilenced: boolean

  constructor() {
    this.isSilenced = !settings.DEBUG_MODE;
    if (!this.isSilenced) {
      console.log(hl(`..:: DEBUG IS ON`))
      console.log("Applied environment:", { env: process.env })
      console.log("Applied settings:", { settings })

    }
  }

  public log = (title: string, content: any) => {
    if (!this.isSilenced) {
      console.log(hl(`..:: DEBUG ${title}`), content)
    }
  }
}

export const consoleDebugger = new ConsoleDebugger();
