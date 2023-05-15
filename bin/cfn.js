import chalk from 'chalk';
import { parse } from 'yaml';
import { glob } from 'glob';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Client } from './apiclient/client.js';
import { ConsoleLogger } from './ConsoleLogger.js';
import { ExitCode } from './exitCodes.js';
const hl = chalk.hex('#FFFFA7'); // highlight
const exclamation = chalk.redBright.bold('!');
const tick = chalk.green('✔');
const cross = chalk.red('✖');
const formatTitle = (title) => {
    const lineBreak = '--------------------------------------------';
    return `${chalk.gray(lineBreak)}\n${chalk.blue.bold(title)}\n`;
};
const readablePolicyStatement = (policyStatement) => {
    // Get a human readable policy statement
    const capability = policyStatement.capability.title;
    if (policyStatement.__typename === 'MustImplementCapabilityPolicyStatement') {
        return `Must implement ${capability}`;
    }
    return `unknown policy statement for ${capability}`;
};
const readableTransformation = (transformation) => {
    // Get a human readable instruction for Create, Update and Delete transformations
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
    let exitCode = ExitCode.SUCCESS;
    const cl = new ConsoleLogger(inputs.output !== 'text');
    cl.log(formatTitle('Initializing Gomboc.ai CloudFormation'));
    const CONFIG_FILE_PATH = inputs.config.toLowerCase();
    if (!CONFIG_FILE_PATH.endsWith('.yaml') && !CONFIG_FILE_PATH.endsWith('.yml')) {
        cl.err(ExitCode.INVALID_CONFIG_FILE, `Config filepath must have a YAML extension`);
        return ExitCode.INVALID_CONFIG_FILE;
    }
    let configData;
    try {
        const configFile = readFileSync(CONFIG_FILE_PATH, 'utf8');
        configData = parse(configFile);
    }
    catch (e) {
        cl.err(ExitCode.INVALID_CONFIG_FILE, `Could not find ${hl(CONFIG_FILE_PATH)} or file is corrupted`);
        return ExitCode.INVALID_CONFIG_FILE;
    }
    cl._log(`Run configuration: ${hl(CONFIG_FILE_PATH)} ${tick}\n`);
    const scanOptions = configData['options'];
    // Read and print match patterns
    const searchPattern = scanOptions['search-pattern'];
    if (searchPattern == null) {
        cl.err(ExitCode.MISSING_SEARCH_PATTERN, `At least one search pattern must be specified`);
        return ExitCode.MISSING_SEARCH_PATTERN;
    }
    // Read and print ignore patterns
    const ignorePattern = scanOptions['ignore-pattern'] ?? [];
    // Look for CloudFormation templates and print results
    const templateFiles = await glob(searchPattern, { ignore: ignorePattern });
    const templateCount = templateFiles.length;
    if (templateCount === 0) {
        cl.err(ExitCode.NO_TEMPLATES_FOUND, `Did not find any templates`);
        return ExitCode.NO_TEMPLATES_FOUND;
    }
    else {
        cl._log(`Cloudformation templates: ${hl(templateCount)} ${tick}`);
        for (const template of templateFiles) {
            cl.__log(`${tick} ${hl(template)}`);
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
    let policies;
    let mustImplementCapabilities;
    try {
        policies = configData['policies'];
        mustImplementCapabilities = policies['must-implement'];
    }
    catch (e) {
        cl.err(ExitCode.NO_POLICIES_FOUND, `At least one must-implement policy must be specified`);
        return ExitCode.NO_POLICIES_FOUND;
    }
    cl._log(`Policies found: ${hl(mustImplementCapabilities.length)} ${tick}`);
    mustImplementCapabilities.forEach((capability) => {
        cl.__log(`${exclamation} ${hl(`Must implement ${capability}`)}`);
    });
    cl.log('');
    const policy = { mustImplement: mustImplementCapabilities };
    cl.log(formatTitle('Running Gomboc.ai CloudFormation'));
    let scan;
    try {
        const client = new Client(inputs.apiUrl, inputs.idToken);
        scan = await client.scanCfnTemplate(templatePayloads, policy, inputs.gitHubOptions, inputs.gitLabOptions);
    }
    catch (e) {
        cl.err(ExitCode.SERVER_ERROR, e);
        return ExitCode.SERVER_ERROR;
    }
    if (scan.sideEffectsResult?.success === false) {
        cl.err(ExitCode.SIDE_EFFECTS_FAILED, `One or more side effects failed`);
        return ExitCode.SIDE_EFFECTS_FAILED;
    }
    cl.log(`Successful scan ${tick}\n`);
    cl._log(`ID: ${hl(scan.scanMeta.scanId)}`);
    cl._log(`Timestamp: ${hl(scan.scanMeta.timestamp)}`);
    cl._log(`URL: ${hl(scan.scanMeta.portalUrl)}`);
    cl._log('');
    for (const result of scan.results) {
        cl.log(`Results for ${hl(result.filePath)} ${tick}\n`);
        // Print errors if any
        if (result.error != null) {
            exitCode = ExitCode.INVALID_TEMPLATE;
            cl._log(`${chalk.red(`Error`)}: ${hl(result.error)}`);
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
                    cl.__log(`${cross} ${statement}. To remediate, do this:`);
                    for (const transformation of observation.trivialRemediation.resolvesWithTransformations) {
                        cl.___log(`↪ ${readableTransformation(transformation)}`);
                    }
                }
                else {
                    cl.__log(`${cross} ${statement}. There is no trivial remediation:`);
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
                cl.__log(`${tick} ${statement}`);
            });
            cl._log('');
        }
    }
    if (inputs.output === 'json') {
        console.log(JSON.stringify(scan, null, 2));
    }
    return exitCode;
};
