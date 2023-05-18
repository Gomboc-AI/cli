import chalk from 'chalk';
import { glob } from 'glob';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Client } from './apiclient/client.js';
import { ConsoleLogger } from './ConsoleLogger.js';
import { ExitCode } from './exitCodes.js';
import { hl, checkMark, crossMark, exclamationMark, formatTitle } from './consoleUtils.js';
import { ConfigParser } from './ConfigParser.js';
const readablePolicyStatement = (policyStatement) => {
    // Get a human readable policy statement
    const capability = policyStatement.capability.title;
    if (policyStatement.__typename === 'MustImplementCapabilityPolicyStatement') {
        return `Must implement ${capability}`;
    }
    return `unknown policy statement for ${capability}`;
};
const readableTransformation = (transformation) => {
    // Get a human readable instruction for Create, Update, and Delete transformations
    const at = `At ${transformation.logicalResource.name} (l.${transformation.logicalResource.line})`;
    if (transformation.__typename === 'DeleteTransformation') {
        return `${at}: Delete property "${hl(transformation.property)}"`;
    }
    else {
        const value = transformation.value ? `value ${hl(transformation.value)}` : 'any value';
        if (transformation.__typename === 'UpdateTransformation') {
            return `${at}: Update property ${hl(transformation.property)}" to have ${value}`;
        }
        else if (transformation.__typename === 'CreateTransformation') {
            return `${at}: Add a property ${hl(transformation.property)} with ${value}`;
        }
    }
    return 'invalid transformation';
};
export const scanCfn = async (inputs) => {
    var pjson = require('./package.json');
    console.log(pjson);
    let exitCode = ExitCode.SUCCESS;
    const cl = new ConsoleLogger(inputs.output !== 'text');
    cl.log(formatTitle('Running Gomboc.ai for CloudFormation'));
    cl._log(`Reading configuration: ${hl(inputs.config)} ${checkMark}\n`);
    let configParser;
    let mustImplementCapabilities;
    let searchPatterns;
    let ignorePatterns;
    try {
        configParser = new ConfigParser(inputs.config);
        mustImplementCapabilities = configParser.getMustImplementCapabilities();
        searchPatterns = configParser.getSearchPatterns();
        ignorePatterns = configParser.getIgnorePatterns();
    }
    catch (e) {
        cl.err(ExitCode.INVALID_CONFIG_FILE, e.message);
        return ExitCode.INVALID_CONFIG_FILE;
    }
    // Look for CloudFormation templates and print results
    const templateFiles = await glob(searchPatterns, { ignore: ignorePatterns });
    const templateCount = templateFiles.length;
    if (templateCount === 0) {
        cl.err(ExitCode.NO_TEMPLATES_FOUND, `Did not find any templates`);
        return ExitCode.NO_TEMPLATES_FOUND;
    }
    else {
        cl._log(`Cloudformation templates: ${hl(templateCount)} ${checkMark}`);
        for (const template of templateFiles) {
            cl.__log(`${checkMark} ${hl(template)}`);
        }
        cl._log('');
    }
    // Build the array of TemplatePayload
    const templatePayloads = templateFiles.map((filePath) => {
        const templatePayload = {
            filePath: filePath,
            content: readFileSync(join('.', filePath), 'base64')
        };
        return templatePayload;
    });
    cl._log(`Policies found: ${hl(mustImplementCapabilities.length)} ${checkMark}`);
    mustImplementCapabilities.forEach((capability) => {
        cl.__log(`${exclamationMark} ${hl(`Must implement ${capability}`)}`);
    });
    cl.log('');
    const policy = { mustImplement: mustImplementCapabilities };
    let scan;
    try {
        const client = new Client(inputs.apiUrl, inputs.authToken);
        scan = await client.scanCfnTemplate(templatePayloads, policy, inputs.gitHubOptions, inputs.gitLabOptions, inputs.secretAccessKey);
    }
    catch (e) {
        cl.err(ExitCode.SERVER_ERROR, e);
        return ExitCode.SERVER_ERROR;
    }
    if (scan.sideEffectsResult?.success === false) {
        cl.err(ExitCode.SIDE_EFFECTS_FAILED, `One or more side effects failed`);
        return ExitCode.SIDE_EFFECTS_FAILED;
    }
    cl.log(`Successful scan ${checkMark}\n`);
    cl._log(`ID: ${hl(scan.scanMeta.scanId)}`);
    cl._log(`Timestamp: ${hl(scan.scanMeta.timestamp)}`);
    cl._log(`URL: ${hl(scan.scanMeta.portalUrl)}`);
    cl._log('');
    for (const result of scan.results) {
        cl.log(`Results for ${hl(result.filePath)} ${checkMark}\n`);
        if (result.error != null) {
            exitCode = ExitCode.TEMPLATE_ERROR;
            cl.err(ExitCode.TEMPLATE_ERROR, result.error);
            cl._log('');
            continue;
        }
        // Print violation observations
        if (result.violationObservations.length > 0) {
            exitCode = ExitCode.VIOLATIONS_FOUND;
            cl._log(chalk.red(`In violation`));
            result.violationObservations.forEach((observation) => {
                const resource = observation.logicalResource;
                const policyStatement = readablePolicyStatement(observation.policyStatement);
                const statement = `l.${resource.line}: Resource ${hl(resource.name)} violates ${hl(policyStatement)}`;
                if (observation.trivialRemediation != null) {
                    cl.__log(`${crossMark} ${statement}. To remediate, do this:`);
                    for (const transformation of observation.trivialRemediation.resolvesWithTransformations) {
                        cl.___log(`↪ ${readableTransformation(transformation)}`);
                    }
                }
                else {
                    cl.__log(`${crossMark} ${statement}. There is no trivial remediation:`);
                    cl.___log(`↪ ${scan.scanMeta.portalUrl}`);
                }
            });
            cl._log('');
        }
        // Print compliance observations
        if (result.complianceObservations.length > 0) {
            cl._log(chalk.green(`In compliance`));
            result.complianceObservations.forEach((observation) => {
                const resource = observation.logicalResource;
                const policyStatement = readablePolicyStatement(observation.policyStatement);
                const statement = `l.${resource.line}: Resource ${hl(resource.name)} complies with ${hl(policyStatement)}`;
                cl.__log(`${checkMark} ${statement}`);
            });
            cl._log('');
        }
    }
    if (inputs.output === 'json') {
        console.log(JSON.stringify(scan, null, 2));
    }
    if (exitCode === ExitCode.VIOLATIONS_FOUND) {
        cl.err(ExitCode.VIOLATIONS_FOUND, `One or more templates had violations`);
    }
    return exitCode;
};
