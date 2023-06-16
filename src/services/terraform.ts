import chalk from 'chalk'
import { glob } from 'glob'
import { rm, mkdir, readFileSync, writeFile } from 'fs'
import { dirname, join, extname, relative } from 'path'
import { zip, COMPRESSION_LEVEL } from 'zip-a-folder'
import { modifyPath } from 'ramda'

import { GitHubOptions, GitLabOptions, ScanPolicy } from '../apiclient/__generated__/GlobalTypes.js'
import { ScanTfPlan_scanTfPlanExt } from '../apiclient/__generated__/ScanTfPlan.js'
import { ScanTfPlan_scanTfPlanExt_result_complianceObservations_policyStatement } from '../apiclient/__generated__/ScanTfPlan.js'
import { ScanTfPlan_scanTfPlanExt_result_violationObservations_policyStatement } from '../apiclient/__generated__/ScanTfPlan.js'
import { CreateTransformationFragmentTf } from '../apiclient/__generated__/CreateTransformationFragmentTf.js'
import { UpdateTransformationFragmentTf } from '../apiclient/__generated__/UpdateTransformationFragmentTf.js'
import { DeleteTransformationFragmentTf } from '../apiclient/__generated__/DeleteTransformationFragmentTf.js'

import { Client } from '../apiclient/client.js'
import { ConsoleLogger } from '../utils/ConsoleLogger.js'
import { ExitCode } from '../cli/exitCodes.js'
import { hl, checkMark, crossMark, exclamationMark, formatTitle } from '../utils/consoleUtils.js'
import { ConfigParser } from '../utils/ConfigParser.js'
import { CallLighthouse_lighthouse } from '../apiclient/__generated__/CallLighthouse.js'


export interface ScanTfInput {
  authToken: string
  apiUrl: string
  config: string
  output: string
  plan: string
  workingDirectory: string
  gitHubOptions?: GitHubOptions
  gitLabOptions?: GitLabOptions
  secretAccessKey?: string
}

const readablePolicyStatement = (policyStatement: ScanTfPlan_scanTfPlanExt_result_complianceObservations_policyStatement | ScanTfPlan_scanTfPlanExt_result_violationObservations_policyStatement): string => {
  // Get a human readable policy statement
  const capability = policyStatement.capability.title
  if(policyStatement.__typename === 'MustImplementCapabilityPolicyStatement') { return `Must implement ${capability}` }
  return `unknown policy statement for ${capability}`
}

const readableTransformation = (transformation: CreateTransformationFragmentTf | UpdateTransformationFragmentTf | DeleteTransformationFragmentTf): string => {
  // Get a human readable instruction for Create, Update and Delete transformations
  const { filePath: resFilePath, line: resLine, name: resName } = transformation.logicalResource
  const at = `At ${hl(resName)} (${resFilePath}:${resLine})`

  const _formatValue = (value: any): string => {
    return value ? `value ${hl(value)}` : 'any value'
  }

  switch(transformation.__typename) {
    case 'TfDeleteTransformation':
      return `${at}: Delete property ${hl(transformation.property)}`
    case 'TfUpdateTransformation':
      return `${at}: Update property ${hl(transformation.property)} to have ${_formatValue(transformation.value)}`
    case 'TfCreateTransformation':
      return `${at}: Add a property ${hl(transformation.property)} with ${_formatValue(transformation.value)}`
    default:
      return 'invalid transformation'
  }
}

type TfPlanBreadcrumbs = Array<number|string>

const findSensitives = (breadcrumbs: TfPlanBreadcrumbs, isSensitive: any, sensitives: TfPlanBreadcrumbs[]): void => {
  if (isSensitive == null) {
    return
  } else if (typeof isSensitive == "boolean" && isSensitive==true) {
      sensitives.push(breadcrumbs)
  } else if (isSensitive instanceof Array) {
    isSensitive.forEach((_, index) => {
      const bc = [...breadcrumbs] 
      bc.push(index)
      findSensitives(bc, isSensitive[index], sensitives)
    })
  } else if (isSensitive instanceof Object) {
    for (const [key, _] of Object.entries(isSensitive)) {
      const bc = [...breadcrumbs, key] 
      findSensitives(bc, isSensitive[key], sensitives)
    }
  }
}

const sanitizedTfPlanObject = (filePath: string): any => {
  // Gets a Terraform Plan JSON file path and returns a base64 enconded string of the file after removing sensitive data 
  const contents = readFileSync(filePath, 'utf8')
  let json = JSON.parse(contents)
  //for (const resource of json['planned_values']['root_module']['resources']) {
  const sensitives: TfPlanBreadcrumbs[] = []
  json['planned_values']['root_module']['resources'].forEach((_: any, index: number) => {
    const sensitiveValues = json['planned_values']['root_module']['resources'][index]['sensitive_values']
    // initial bradcrumbs includes the resource index and the property 'values'
    findSensitives([index, 'values'], sensitiveValues, sensitives)
  })
  for (const breadcrumbs of sensitives){
    const path = ['planned_values', 'root_module', 'resources', ...breadcrumbs]
    const newValue = modifyPath(path, () => "<redacted>", json)
    json = newValue
  }
  return json
}

export const scanTf = async (inputs: ScanTfInput): Promise<ExitCode> => {
  let exitCode = ExitCode.SUCCESS
  
  const client = new Client(inputs.apiUrl, inputs.authToken)
  let lighthouseMessages: CallLighthouse_lighthouse[]
  try {
    lighthouseMessages = await client.callLighthouse()
  } catch (e: any) {
    lighthouseMessages = []
  }

  const cl = new ConsoleLogger(inputs.output !== 'text')

  cl.log(formatTitle('Running Gomboc.ai for Terraform'))

  cl._log(`Reading Gomboc configuration: ${hl(inputs.config)} ${checkMark}\n`)

  const cwd = inputs.workingDirectory
  cl._log(`Working Terraform directory: ${hl(cwd)} ${checkMark}\n`)
  
  let configParser: ConfigParser
  let mustImplementCapabilities: string[]

  try {
    configParser = new ConfigParser(inputs.config)
    mustImplementCapabilities = configParser.getMustImplementCapabilities()
  } catch (e: any) {
    cl.err(ExitCode.INVALID_CONFIG_FILE, e, lighthouseMessages)
    return ExitCode.INVALID_CONFIG_FILE
  }

  const tfPlanFilePath = join(cwd, inputs.plan)
  cl._log(`Terraform plan file: ${hl(inputs.plan)} ${checkMark}`)

  const tfPlanObject = sanitizedTfPlanObject(tfPlanFilePath)
  const tfPlanObjectJsonStr = JSON.stringify(tfPlanObject);
  const tfPlanObjectJsonB64 = Buffer.from(tfPlanObjectJsonStr).toString("base64");

  if (extname(inputs.plan.toLowerCase()) !== '.json') {
    cl.err(ExitCode.INVALID_PLAN_FILE, `Plan file must have a JSON extension`, lighthouseMessages)
    return ExitCode.INVALID_PLAN_FILE
  }

  cl.__log(`Stripping sensitive values ${exclamationMark}\n`)
  
  const wip = './wip'
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  await mkdir(wip, { recursive: true }, (err) => {})
  // Look for Terraform config files and print results
  const configFiles = await glob(join('.', cwd, '**/*.tf'))
  const configFilesCount = configFiles.length
  if(configFilesCount === 0){
    cl.err(ExitCode.NO_CONFIGURATION_FILES_FOUND, `Did not find any configuration files`, lighthouseMessages)
    return ExitCode.NO_CONFIGURATION_FILES_FOUND 
  } else {
    cl._log(`Terraform configuration files: ${hl(configFilesCount)} ${checkMark}`)
    for (const configFile of configFiles) {
      const relativeConfigFile = relative(cwd, configFile)
      cl.__log(`${checkMark} ${hl(relativeConfigFile)}`)
      const wipRelativeFilePath = join(wip, relativeConfigFile)
      await mkdir(dirname(wipRelativeFilePath), { recursive: true }, (err) => {
        if (err) {
          console.log(err);
        } else {
          writeFile(wipRelativeFilePath, readFileSync(configFile, 'utf8'), (err) => {
            if (err) {
              console.log(err);
            }
          })
        }
      })
    }
    cl._log('')
  }
  // zip Tf configuration files directory and encode to base64
  const zipFile = 'tf.zip'
  await zip(wip, zipFile, {compression: COMPRESSION_LEVEL.uncompressed});
  const tfConfigFilesDirectoryContent = readFileSync(zipFile, 'base64')
  // cleanup local file created
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  await rm(wip, { recursive: true }, (err) => {})
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  await rm(zipFile, (err) => {})

  cl._log(`Policies found: ${hl(mustImplementCapabilities.length)} ${checkMark}`)
  mustImplementCapabilities.forEach((capability: string) => {
    cl.__log(`${exclamationMark} ${hl(`Must implement ${capability}`)}`)
  })
  cl.log('')

  const policy: ScanPolicy = { mustImplement: mustImplementCapabilities }

  cl.log(formatTitle('Running Gomboc.ai Terraform'))

  let scan: ScanTfPlan_scanTfPlanExt

  try {
    scan = await client.scanTfPlan(tfPlanObjectJsonB64, tfConfigFilesDirectoryContent, policy, inputs.gitHubOptions, inputs.gitLabOptions, inputs.secretAccessKey)
  } catch (e: any) {
    cl.err(ExitCode.SERVER_ERROR, e, lighthouseMessages)
    //cl.allLighthouseMessages(lighthouseMessages)
    return ExitCode.SERVER_ERROR
  }

  cl.log(`Scan completed ${checkMark}\n`)
  cl._log(`ID: ${hl(scan!.scanMeta!.scanId)}`)
  cl._log(`Timestamp: ${hl(scan!.scanMeta!.timestamp)}`)
  // cl._log(`URL: ${hl(scan!.scanMeta!.portalUrl)}`)
  cl._log('')

  if(scan.sideEffectsResult?.success===false){
    cl.err(ExitCode.SIDE_EFFECTS_FAILED, `One or more side effects failed`, lighthouseMessages)
    return ExitCode.SIDE_EFFECTS_FAILED
  }

  cl.log(`Results for proposed plan ${checkMark}\n`)
  // Print violation observations
  if(scan.result.violationObservations.length > 0) {
    exitCode = ExitCode.VIOLATIONS_FOUND
    cl._log(chalk.red(`In violation`))
    scan.result.violationObservations.forEach((observation) => {
      const resource = observation.logicalResource
      const policyStatement = readablePolicyStatement(observation.policyStatement)
      const location = `${resource.filePath}:${resource.line}`
      if (resource.definedByModule) {
        const resourceType = resource.type.split('.').pop()
        const message = `Module ${hl(resource.definedByModule)} (${location}) instantiates a ${hl(resourceType)} that violates ${hl(policyStatement)}`
        cl.__log(`${crossMark} ${message}`)
      } else {
        let statement = ''
        statement = `Resource ${hl(resource.name)} (${location}) violates ${hl(policyStatement)}`
        if(observation.trivialRemediation != null){
          cl.__log(`${crossMark} ${statement}. To remediate, do this:`)
          for (const transformation of observation.trivialRemediation.resolvesWithTransformations) {
            cl.___log(`↪ ${readableTransformation(transformation)}`)
          }
        } else {
          cl.__log(`${crossMark} ${statement}. The remediation(s) cannot be described in a single line.`)
          // cl.___log(`↪ ${scan.scanMeta.portalUrl}`)
        }
      }
    })
    cl._log('')
  }
  // Print compliance observations
  if(scan.result.complianceObservations.length > 0) {
    cl._log(chalk.green(`In compliance`))
    scan.result.complianceObservations.forEach((observation) => {
      const resource = observation!.logicalResource
      const policyStatement = readablePolicyStatement(observation!.policyStatement)
      const location = `${resource.filePath}:${resource.line}`
      const statement = `Resource ${hl(resource.name)} (${location}) complies with ${hl(policyStatement)}`
      cl.__log(`${checkMark} ${statement}`)
    })
    cl._log('')
  }
  if(inputs.output === 'json'){
    console.log(JSON.stringify(scan!, null, 2))
  } else {
    if(exitCode === ExitCode.VIOLATIONS_FOUND){
      cl.err(ExitCode.VIOLATIONS_FOUND, `The plan contains one or more violations`, [])
    }
    // We print these now, even if there were no violations
    cl.allLighthouseMessages(lighthouseMessages)
  }

  return exitCode
}
