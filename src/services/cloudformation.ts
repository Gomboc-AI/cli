import chalk from 'chalk'
import { glob } from 'glob'
import { readFileSync } from 'fs'
import { join, basename } from 'path'

import { GitHubOptions, GitLabOptions, ScanPolicy, TemplatePayload } from '../apiclient/__generated__/GlobalTypes.js'
import { ScanCfnTemplate_scanCfnTemplateExt } from '../apiclient/__generated__/ScanCfnTemplate.js'
import { ScanCfnTemplate_scanCfnTemplateExt_results_complianceObservations_policyStatement } from '../apiclient/__generated__/ScanCfnTemplate.js'
import { ScanCfnTemplate_scanCfnTemplateExt_results_violationObservations_policyStatement } from '../apiclient/__generated__/ScanCfnTemplate.js'
import { CreateTransformationFragmentCfn } from '../apiclient/__generated__/CreateTransformationFragmentCfn.js'
import { UpdateTransformationFragmentCfn } from '../apiclient/__generated__/UpdateTransformationFragmentCfn.js'
import { DeleteTransformationFragmentCfn } from '../apiclient/__generated__/DeleteTransformationFragmentCfn.js'

import { Client } from '../apiclient/client.js'
import { ConsoleLogger } from '../utils/ConsoleLogger.js'
import { ExitCode } from '../cli/exitCodes.js'
import { hl, checkMark, crossMark, exclamationMark, formatTitle } from '../utils/consoleUtils.js'
import { ConfigParser } from '../utils/ConfigParser.js'
import { CallLighthouse_lighthouse } from '../apiclient/__generated__/CallLighthouse.js'
import { CLI_VERSION } from '../cli/version.js'

export interface ScanCfnInput {
  authToken?: string
  secretAccessKey?: string
  apiUrl: string
  config: string
  output: string
  gitHubOptions?: GitHubOptions
  gitLabOptions?: GitLabOptions
}

const readablePolicyStatement = (policyStatement: ScanCfnTemplate_scanCfnTemplateExt_results_complianceObservations_policyStatement | ScanCfnTemplate_scanCfnTemplateExt_results_violationObservations_policyStatement): string => {
  // Get a human readable policy statement
  const capability = policyStatement.capability.title
  if(policyStatement.__typename === 'MustImplementCapabilityPolicyStatement') { return `Must implement ${capability}` }
  return `unknown policy statement for ${capability}`
}

const readableTransformation = (transformation: CreateTransformationFragmentCfn | UpdateTransformationFragmentCfn | DeleteTransformationFragmentCfn, resourceFileName: string): string => {
  // Cloudformation transformations receive the file name as a parameter
  // Get a human readable instruction for Create, Update, and Delete transformations
  const { line: resLine, name: resName } = transformation.logicalResource
  const at = `At ${hl(resName)} (${resourceFileName}:${resLine})`

  const _formatValue = (value: any): string => {
    return value ? `value ${hl(value)}` : 'any value'
  }

  switch(transformation.__typename) {
    case 'CfnDeleteTransformation':
      return `${at}: Delete property ${hl(transformation.property)}`
    case 'CfnUpdateTransformation':
      return `${at}: Update property ${hl(transformation.property)} to have ${_formatValue(transformation.value)}`
    case 'CfnCreateTransformation':
      return `${at}: Add a property ${hl(transformation.property)} with ${_formatValue(transformation.value)}`
    default:
      return 'invalid transformation'
  }
}

export const scanCfn = async (inputs: ScanCfnInput): Promise<ExitCode> => {
  let exitCode = ExitCode.SUCCESS

  const client = new Client(inputs.apiUrl, inputs.authToken)
  let lighthouseMessages: CallLighthouse_lighthouse[]
  try {
    lighthouseMessages = await client.callLighthouse()
  } catch (e: any) {
    lighthouseMessages = []
  }

  const cl = new ConsoleLogger(inputs.output !== 'text')

  cl.log(formatTitle(`Running Gomboc.AI for CloudFormation (v${CLI_VERSION})`))

  cl._log(`Reading configuration: ${hl(inputs.config)} ${checkMark}\n`)
  
  let configParser: ConfigParser
  let mustImplementCapabilities: string[]
  let searchPatterns: string[]
  let ignorePatterns: string[]

  try {
    configParser = new ConfigParser(inputs.config)
    mustImplementCapabilities = configParser.getMustImplementCapabilities()
    searchPatterns = configParser.getSearchPatterns()
    ignorePatterns = configParser.getIgnorePatterns()
  } catch (e: any) {
    cl.err(ExitCode.INVALID_CONFIG_FILE, e, lighthouseMessages)
    return ExitCode.INVALID_CONFIG_FILE
  }

  // Look for CloudFormation templates and print results
  const templateFiles = await glob(searchPatterns, { ignore: ignorePatterns })
  const templateCount = templateFiles.length
  if(templateCount === 0){
    cl.err(ExitCode.NO_TEMPLATES_FOUND, `Did not find any templates`, lighthouseMessages)
    return ExitCode.NO_TEMPLATES_FOUND 
  } else {
    cl._log(`Cloudformation templates: ${hl(templateCount)} ${checkMark}`)
    for (const template of templateFiles) {
      cl.__log(`${checkMark} ${hl(template)}`)
    }
    cl._log('')
  }

  // Build the array of TemplatePayload
  const templatePayloads: TemplatePayload[] = templateFiles.map((filePath: string) => {
    const templatePayload: TemplatePayload = {
      filePath: filePath,
      content: readFileSync(join('.', filePath), 'base64')
    }
    return templatePayload
  })

  cl._log(`Policies found: ${hl(mustImplementCapabilities.length)} ${checkMark}`)
  mustImplementCapabilities.forEach((capability: string) => {
    cl.__log(`${exclamationMark} ${hl(`Must implement ${capability}`)}`)
  })
  cl.log('')

  const policy: ScanPolicy = { mustImplement: mustImplementCapabilities }

  let scan: ScanCfnTemplate_scanCfnTemplateExt

  try {
    scan = await client.scanCfnTemplate(templatePayloads, policy, inputs.gitHubOptions, inputs.gitLabOptions, inputs.secretAccessKey)
  } catch (e: any) {
    cl.err(ExitCode.SERVER_ERROR, e, lighthouseMessages)
    return ExitCode.SERVER_ERROR
  }

  cl.log(`Scan completed ${checkMark}\n`)
  cl._log(`ID: ${hl(scan!.scanMeta!.scanId)}`)
  cl._log(`Timestamp: ${hl(scan!.scanMeta!.timestamp)}`)
  //cl._log(`URL: ${hl(scan!.scanMeta!.portalUrl)}`)
  cl._log('')

  if(scan.sideEffectsResult?.success===false){
    cl.err(ExitCode.SIDE_EFFECTS_FAILED, `One or more side effects failed`, lighthouseMessages)
    return ExitCode.SIDE_EFFECTS_FAILED
  }

  for (const result of scan!.results) {
    cl.log(`Results for ${hl(result.filePath)} ${checkMark}\n`)
    if(result.error != null) {
      exitCode = ExitCode.TEMPLATE_ERROR
      cl.err(ExitCode.TEMPLATE_ERROR, result.error, [])
      cl._log('')
      continue
    }
    const fileName = basename(result.filePath)
    // Print violation observations
    if(result.violationObservations.length > 0) {
      exitCode = ExitCode.VIOLATIONS_FOUND
      cl._log(chalk.red(`In violation`))
      result.violationObservations.forEach((observation) => {
        const resource = observation.logicalResource
        const policyStatement = readablePolicyStatement(observation.policyStatement)
        const location = `${fileName}:${resource.line}`
        const statement = `Resource ${hl(resource.name)} (${location}) violates ${hl(policyStatement)}`
        if(observation.trivialRemediation != null){
          cl.__log(`${crossMark} ${statement}. To remediate, do this:`)
          for (const transformation of observation.trivialRemediation.resolvesWithTransformations) {
            cl.___log(`↪ ${readableTransformation(transformation, fileName)}`)
          }
        } else {
          cl.__log(`${crossMark} ${statement}. The remediation(s) cannot be described in a single line.`)
          //cl.___log(`↪ ${scan.scanMeta.portalUrl}`)
        }
      })
      cl._log('')
    }
    // Print compliance observations
    if(result.complianceObservations.length > 0) {
      cl._log(chalk.green(`In compliance`))
      result.complianceObservations.forEach((observation) => {
        const resource = observation!.logicalResource
        const policyStatement = readablePolicyStatement(observation!.policyStatement)
        const location = `${fileName}:${resource.line}`
        const statement = `Resource ${hl(resource.name)} (${location}) complies with ${hl(policyStatement)}`
        cl.__log(`${checkMark} ${statement}`)
      })
      cl._log('')
    }
  }
  if(inputs.output === 'json'){
    console.log(JSON.stringify(scan!, null, 2))
  } else {
    if(exitCode === ExitCode.VIOLATIONS_FOUND){
      cl.err(ExitCode.VIOLATIONS_FOUND, `One or more templates had violations`, [])
    }
    // We print these now, even if there were no violations
    cl.allLighthouseMessages(lighthouseMessages)
  }
  return exitCode
}
