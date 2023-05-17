import chalk from 'chalk';
import { parse } from 'yaml';
import { glob } from 'glob';
import { rm, mkdir, readFileSync, writeFile } from 'fs';
import { dirname, join, extname } from 'path';
import { zip, COMPRESSION_LEVEL } from 'zip-a-folder';
import { Client } from './apiclient/client.js';
import { ConsoleLogger } from './ConsoleLogger.js';
import { ExitCode } from './exitCodes.js';
const hl = chalk.hex('#FFFFA7'); // highlight
const exclamation = chalk.redBright.bold('!');
const checkMark = chalk.green('✔');
const crossMark = chalk.red('✖');
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
const reSanitize = (value, isSensitive) => {
    //console.log(`will try value "${value}", isSensitive "${isSensitive}"`)
    if (value == null || isSensitive == null) {
        return;
    }
    else if (typeof isSensitive == "boolean") {
        //console.log(`-- is a boolean ${isSensitive}`)
        if (isSensitive) {
            console.log(`>>>>>>>>>>>>> Will sanitize`);
            console.log(value);
            console.log('');
            value = '******';
        }
    }
    else if (isSensitive instanceof Array) {
        //console.log(`-- is an array`)
        isSensitive.forEach((_, index) => {
            reSanitize(value[index], isSensitive[index]);
        });
    }
    else if (isSensitive instanceof Object) {
        //console.log(`-- is an object`)
        for (const [k, v] of Object.entries(isSensitive)) {
            reSanitize(value[k], isSensitive[k]);
        }
    }
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
    const json = JSON.parse(contents);
    //for (const resource of json['planned_values']['root_module']['resources']) {
    const sensitives = [];
    json['planned_values']['root_module']['resources'].forEach((_, index) => {
        const sensitiveValues = json['planned_values']['root_module']['resources'][index]['sensitive_values'];
        // initial bradcrumbs includes the resource index and the property 'values'
        findSensitives([index, 'values'], sensitiveValues, sensitives);
    });
    if (sensitives.length > 0) {
        console.log(`Found ${sensitives.length} sensitive values`);
        for (const breadcrumbs of sensitives) {
            console.log(`   @${breadcrumbs.join('.')}`);
        }
    }
    //TODO for each sensitive in sentives
    // go to the equivalent path in "values" (instead of "sentiive_values")
    // and replace the value with """
    //console.log(JSON.stringify(json))
    return {};
};
export const scanTf = async (inputs) => {
    console.log(inputs);
    let exitCode = ExitCode.SUCCESS;
    const cl = new ConsoleLogger(inputs.output !== 'text');
    cl.log(formatTitle('Running Gomboc.ai for Terraform'));
    const CONFIG_FILE_PATH = inputs.config.toLowerCase();
    const configExtension = extname(CONFIG_FILE_PATH);
    const VALID_CONFIG_EXTENSIONS = ['.yaml', '.yml'];
    if (!VALID_CONFIG_EXTENSIONS.includes(configExtension)) {
        cl.err(ExitCode.INVALID_CONFIG_FILE, `Config file must have a valid extension (${VALID_CONFIG_EXTENSIONS.join(', ')})`);
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
    cl._log(`Run configuration: ${hl(CONFIG_FILE_PATH)} ${checkMark}\n`);
    if (extname(inputs.plan.toLowerCase()) !== '.json') {
        cl.err(ExitCode.INVALID_PLAN_FILE, `Plan file must have a JSON extension`);
        return ExitCode.INVALID_PLAN_FILE;
    }
    const tfPlanFilePath = join(inputs.workingDirectory, inputs.plan);
    // OPTION A: plan file as it is 
    //const planObjectJsonB64 = readFileSync(tfPlanFilePath, 'base64')
    // OPTION B: plan file sanitized 
    const tfPlanObject = sanitizedTfPlanObject(tfPlanFilePath);
    const tfPlanObjectJsonStr = JSON.stringify(tfPlanObject);
    const tfPlanObjectJsonB64 = Buffer.from(tfPlanObjectJsonStr).toString("base64");
    cl._log(`Terraform plan file: ${hl(tfPlanFilePath)} ${checkMark}\n`);
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
    cl._log(`Policies found: ${hl(mustImplementCapabilities.length)} ${checkMark}`);
    mustImplementCapabilities.forEach((capability) => {
        cl.__log(`${exclamation} ${hl(`Must implement ${capability}`)}`);
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
    //cl.log(`Results for proposed plan${hl(results.filePath)} ${checkMark}\n`)
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
    return exitCode;
};
