import chalk from 'chalk'

import { Action, ScanPolicy } from '../apiclient/__generated__/GlobalTypes.js'
import { Lighthouse_lighthouse } from '../apiclient/__generated__/Lighthouse.js'
import { RemediateRemoteTfCode_remediateRemoteTfCode } from '../apiclient/__generated__/RemediateRemoteTfCode.js'
import { RemediateRemoteTfCode_remediateRemoteTfCode_result_complianceObservations_policyStatement } from '../apiclient/__generated__/RemediateRemoteTfCode.js'
import { RemediateRemoteTfCode_remediateRemoteTfCode_result_violationObservations_policyStatement } from '../apiclient/__generated__/RemediateRemoteTfCode.js'
import { CreateTransformationFragmentTf } from '../apiclient/__generated__/CreateTransformationFragmentTf.js'
import { UpdateTransformationFragmentTf } from '../apiclient/__generated__/UpdateTransformationFragmentTf.js'
import { DeleteTransformationFragmentTf } from '../apiclient/__generated__/DeleteTransformationFragmentTf.js'

import { Client } from '../apiclient/client.js'
import { ConsoleLogger } from '../utils/ConsoleLogger.js'
import { ExitCode } from '../cli/exitCodes.js'
import { hl, checkMark, crossMark, formatTitle, exclamationMark } from '../utils/consoleUtils.js'
import { CLI_VERSION } from '../cli/version.js'


export interface Inputs {
  authToken: string
  apiUrl: string
  output: string
  workingDirectory: string
  action: Action
  accessToken: string
}

const readablePolicyStatement = (policyStatement: RemediateRemoteTfCode_remediateRemoteTfCode_result_complianceObservations_policyStatement | RemediateRemoteTfCode_remediateRemoteTfCode_result_violationObservations_policyStatement): string => {
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

export const resolve = async (inputs: Inputs): Promise<ExitCode> => {
  let exitCode = ExitCode.SUCCESS
  
  const client = new Client(inputs.apiUrl, inputs.authToken)
  let lighthouseMessages: Lighthouse_lighthouse[]
  try {
    lighthouseMessages = await client.lighthouseQueryCall()
  } catch (e: any) {
    lighthouseMessages = []
  }

  const cl = new ConsoleLogger(inputs.output !== 'text')

  cl.log(formatTitle(`Running Gomboc.AI Remediate for Terraform (v${CLI_VERSION})`))

  cl._log(`Terraform directory: ${hl(inputs.workingDirectory)} ${checkMark}\n`)

  cl._log(`Action: ${hl(inputs.action)} ${checkMark}\n`)
  
  cl.log('')

  let scan: RemediateRemoteTfCode_remediateRemoteTfCode

  try {
    scan = await client.remediateRemoteTfCodeQueryCall(inputs.workingDirectory, inputs.action, inputs.accessToken)
  } catch (e: any) {
    cl.err(ExitCode.SERVER_ERROR, e, lighthouseMessages)
    return ExitCode.SERVER_ERROR
  }

  cl.log(`Scan completed ${checkMark}\n`)
  cl._log(`ID: ${hl(scan!.scanMeta!.scanId)}`)
  cl._log(`Timestamp: ${hl(scan!.scanMeta!.timestamp)}`)
  // cl._log(`URL: ${hl(scan!.scanMeta!.portalUrl)}`)
  cl._log('')

  cl.log(`Results for proposed plan ${checkMark}\n`)

  const atLeastOneViolationObservation = scan.result.violationObservations.length > 0
  const atLeastOneComplianceObservation = scan.result.complianceObservations.length > 0

  // Print violation observations
  if(atLeastOneViolationObservation) {
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
  if(atLeastOneComplianceObservation) {
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

  if(!atLeastOneViolationObservation && !atLeastOneComplianceObservation) {
    cl._log(`${exclamationMark} No observations to report`)
    cl._log('')
  }

  if(scan.sideEffectsResult?.success===false){
    // Print the observations for the plan first, then fail before by side effects failed
    cl.err(ExitCode.SIDE_EFFECTS_FAILED, `One or more side effects failed`, lighthouseMessages)
    return ExitCode.SIDE_EFFECTS_FAILED
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
