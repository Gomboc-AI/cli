import { settings } from '../settings.js';
import { hl } from './consoleUtils.js';


class ConsoleDebugger {
  isSilenced: boolean

  constructor(isSilenced = true) {
    this.isSilenced = isSilenced;
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

const getConsoleDebugger = (): ConsoleDebugger => {
  return new ConsoleDebugger(settings.DEBUG === false);
}

export const consoleDebugger = getConsoleDebugger();