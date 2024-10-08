export enum ExitCode {
    SUCCESS = 0,
    // INVALID_CONFIG_FILE = 10,
    // CAPABILITY_DOES_NOT_EXIST = 14,
    VIOLATIONS_FOUND = 20,
    // SIDE_EFFECTS_FAILED = 30,
    COMMAND_ERROR = 80,
    BUSINESS_ERROR = 90,
    CLIENT_ERROR = 98,
    SERVER_ERROR = 99,
    SERVER_TIMEOUT_ERROR = 300,
    // NO_TEMPLATES_FOUND = 101,
    // TEMPLATE_ERROR = 102,
    INVALID_ARGUMENTS = 103,
    FAILED_SCAN = 800,
    // INVALID_PLAN_FILE = 201,
    // NO_CONFIGURATION_FILES_FOUND = 202,
}