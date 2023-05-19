import chalk from 'chalk';
import { glob } from 'glob';
import { rm, mkdir, readFileSync, writeFile } from 'fs';
import { dirname, join, extname } from 'path';
import { zip, COMPRESSION_LEVEL } from 'zip-a-folder';
import { modifyPath } from 'ramda';
import { Client } from '../apiclient/client.js';
import { ConsoleLogger } from '../utils/ConsoleLogger.js';
import { ExitCode } from '../cli/exitCodes.js';
import { hl, checkMark, crossMark, exclamationMark, formatTitle } from '../utils/consoleUtils.js';
import { ConfigParser } from '../utils/ConfigParser.js';
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
const findSensitives = (breadcrumbs, isSensitive, sensitives) => {
    if (isSensitive == null) {
        return;
    }
    else if (typeof isSensitive == "boolean" && isSensitive == true) {
        sensitives.push(breadcrumbs);
    }
    else if (isSensitive instanceof Array) {
        isSensitive.forEach((_, index) => {
            const bc = [...breadcrumbs];
            bc.push(index);
            findSensitives(bc, isSensitive[index], sensitives);
        });
    }
    else if (isSensitive instanceof Object) {
        for (const [key, _] of Object.entries(isSensitive)) {
            const bc = [...breadcrumbs];
            bc.push(key);
            findSensitives(bc, isSensitive[key], sensitives);
        }
    }
};
const sanitizedTfPlanObject = (filePath) => {
    // Gets a Terraform Plan JSON file path and returns a base64 enconded string of the file after removing sensitive data 
    const contents = readFileSync(filePath, 'utf8');
    let json = JSON.parse(contents);
    //for (const resource of json['planned_values']['root_module']['resources']) {
    const sensitives = [];
    json['planned_values']['root_module']['resources'].forEach((_, index) => {
        const sensitiveValues = json['planned_values']['root_module']['resources'][index]['sensitive_values'];
        // initial bradcrumbs includes the resource index and the property 'values'
        findSensitives([index, 'values'], sensitiveValues, sensitives);
    });
    for (const breadcrumbs of sensitives) {
        const path = ['planned_values', 'root_module', 'resources', ...breadcrumbs];
        const newValue = modifyPath(path, () => "<redacted>", json);
        json = newValue;
    }
    return json;
};
export const scanTf = async (inputs) => {
    let exitCode = ExitCode.SUCCESS;
    const cl = new ConsoleLogger(inputs.output !== 'text');
    cl.log(formatTitle('Running Gomboc.ai for Terraform'));
    cl._log(`Reading configuration: ${hl(inputs.config)} ${checkMark}\n`);
    let configParser;
    let mustImplementCapabilities;
    try {
        configParser = new ConfigParser(inputs.config);
        mustImplementCapabilities = configParser.getMustImplementCapabilities();
    }
    catch (e) {
        cl.err(ExitCode.INVALID_CONFIG_FILE, e.message);
        return ExitCode.INVALID_CONFIG_FILE;
    }
    const tfPlanFilePath = join(inputs.workingDirectory, inputs.plan);
    cl._log(`Terraform plan file: ${hl(tfPlanFilePath)} ${checkMark}`);
    const tfPlanObject = sanitizedTfPlanObject(tfPlanFilePath);
    const tfPlanObjectJsonStr = JSON.stringify(tfPlanObject);
    const tfPlanObjectJsonB64 = Buffer.from(tfPlanObjectJsonStr).toString("base64");
    if (extname(inputs.plan.toLowerCase()) !== '.json') {
        cl.err(ExitCode.INVALID_PLAN_FILE, `Plan file must have a JSON extension`);
        return ExitCode.INVALID_PLAN_FILE;
    }
    cl.__log(`Stripping sensitive values ${exclamationMark}\n`);
    const wip = './wip';
    await mkdir(wip, { recursive: true }, (err) => { });
    // Look for Terraform config files and print results
    const configFiles = await glob(join('.', inputs.workingDirectory, '**/*.tf'));
    const configFilesCount = configFiles.length;
    if (configFilesCount === 0) {
        cl.err(ExitCode.NO_CONFIGURATION_FILES_FOUND, `Did not find any configuration files`);
        return ExitCode.NO_CONFIGURATION_FILES_FOUND;
    }
    else {
        cl._log(`Terraform configuration files: ${hl(configFilesCount)} ${checkMark}`);
        for (const configFile of configFiles) {
            cl.__log(`${checkMark} ${hl(configFile)}`);
            const wipFilePath = join(wip, configFile);
            await mkdir(dirname(wipFilePath), { recursive: true }, (err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    writeFile(wipFilePath, readFileSync(configFile, 'utf8'), (err) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
            });
        }
        cl._log('');
    }
    // zip Tf configuration files directory and encode to base64
    const zipFile = 'tf.zip';
    await zip(wip, zipFile, { compression: COMPRESSION_LEVEL.uncompressed });
    const tfConfigFilesDirectoryContent = readFileSync(zipFile, 'base64');
    // cleanup local file created
    await rm(wip, { recursive: true }, (err) => { });
    await rm(zipFile, (err) => { });
    cl._log(`Policies found: ${hl(mustImplementCapabilities.length)} ${checkMark}`);
    mustImplementCapabilities.forEach((capability) => {
        cl.__log(`${exclamationMark} ${hl(`Must implement ${capability}`)}`);
    });
    cl.log('');
    const policy = { mustImplement: mustImplementCapabilities };
    cl.log(formatTitle('Running Gomboc.ai Terraform'));
    let scan;
    try {
        const client = new Client(inputs.apiUrl, inputs.authToken);
        scan = await client.scanTfPlan(tfPlanObjectJsonB64, tfConfigFilesDirectoryContent, policy, inputs.gitHubOptions, inputs.gitLabOptions);
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
    cl.log(`Results for proposed plan ${checkMark}\n`);
    // Print violation observations
    if (scan.result.violationObservations.length > 0) {
        exitCode = ExitCode.VIOLATIONS_FOUND;
        cl._log(chalk.red(`In violation`));
        scan.result.violationObservations.forEach((observation) => {
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
    if (scan.result.complianceObservations.length > 0) {
        cl._log(chalk.green(`In compliance`));
        scan.result.complianceObservations.forEach((observation) => {
            const resource = observation.logicalResource;
            const policyStatement = readablePolicyStatement(observation.policyStatement);
            const statement = `l.${resource.line}: Resource ${hl(resource.name)} complies with ${hl(policyStatement)}`;
            cl.__log(`${checkMark} ${statement}`);
        });
        cl._log('');
    }
    if (inputs.output === 'json') {
        console.log(JSON.stringify(scan, null, 2));
    }
    if (exitCode === ExitCode.VIOLATIONS_FOUND) {
        cl.err(ExitCode.VIOLATIONS_FOUND, `One or more templates had violations`);
    }
    return exitCode;
};
