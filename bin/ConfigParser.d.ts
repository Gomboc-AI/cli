export declare class ConfigParser {
    configData: any;
    constructor(configFilePath: string);
    getPolicies: () => any;
    getMustImplementCapabilities: () => any;
    getOptions: () => any;
    getSearchPatterns: () => any;
    getIgnorePatterns: () => any;
}
