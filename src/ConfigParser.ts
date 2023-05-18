import { parse } from 'yaml'
import { hl } from './consoleUtils.js';
import { extname } from 'path';

import { readFileSync } from 'fs';


export class ConfigParser {
  configData: any

  constructor(configFilePath: string) {
    const configExtension = extname(configFilePath)
    const VALID_CONFIG_EXTENSIONS = ['.yaml', '.yml']
    if (!VALID_CONFIG_EXTENSIONS.includes(configExtension)) {
      throw (`Config file must have a valid extension (${VALID_CONFIG_EXTENSIONS.join(', ')})`)
    }
    const configFile = readFileSync(configFilePath, 'utf8')
    this.configData = parse(configFile)
  }

  public getPolicies = () => {
    const policies = this.configData['policies']
    if(policies == null){ throw new Error(`The config file is missing a ${hl('policies')} object`) }
    return policies
  }

  public getMustImplementCapabilities = () => {
    const mustImplementCapabilities = this.getPolicies()['must-implement']
    if(mustImplementCapabilities == null) { throw new Error(`The ${hl('policies')} object is missing a ${hl('must-implement')} property`) }
    if(mustImplementCapabilities.length == 0) { throw new Error(`The ${hl('must-implement')} array must contain at least one Capability`) }
    return mustImplementCapabilities
  }

  public getOptions = () => {
    const options = this.configData['options']
    if(options == null){ throw new Error(`The config file is missing an ${hl('options')} object`) }
    return options
  }

  public getSearchPatterns = () => {
    const searchPatterns = this.getOptions()['search-pattern']
    if(searchPatterns == null){ throw new Error(`The ${hl('options')} object is missing a ${hl('search-pattern')} property`) }
    if(searchPatterns.length == 0) { throw new Error(`The ${hl('search-pattern')} array must contain at least one pattern`) }
    return searchPatterns
  }

  public getIgnorePatterns = () => {
    const ignorePatterns = this.getOptions()['ignore-pattern']
    if(ignorePatterns == null){ return [] }
    return ignorePatterns
  }
}  