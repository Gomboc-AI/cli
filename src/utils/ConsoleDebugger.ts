import { settings } from '../settings.js';
import { hl } from './consoleUtils.js';


class ConsoleDebugger {
  isSilenced: boolean

  constructor() {
    this.isSilenced = !settings.DEBUG_MODE;

    if(!this.isSilenced){
      console.log(hl(`..:: DEBUG IS ON`))
    }
  }

  public log = (title: string, content: any) => {
    if(!this.isSilenced){
      console.log(hl(`..:: DEBUG ${title}`), content)
    }
  }
}  

export const consoleDebugger = new ConsoleDebugger();