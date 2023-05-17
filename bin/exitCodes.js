export var ExitCode;
(function (ExitCode) {
    ExitCode[ExitCode["SUCCESS"] = 0] = "SUCCESS";
    ExitCode[ExitCode["INVALID_CONFIG_FILE"] = 10] = "INVALID_CONFIG_FILE";
    ExitCode[ExitCode["MISSING_SEARCH_PATTERN"] = 11] = "MISSING_SEARCH_PATTERN";
    ExitCode[ExitCode["NO_TEMPLATES_FOUND"] = 12] = "NO_TEMPLATES_FOUND";
    ExitCode[ExitCode["NO_POLICIES_FOUND"] = 13] = "NO_POLICIES_FOUND";
    ExitCode[ExitCode["TEMPLATE_ERROR"] = 14] = "TEMPLATE_ERROR";
    ExitCode[ExitCode["VIOLATIONS_FOUND"] = 20] = "VIOLATIONS_FOUND";
    ExitCode[ExitCode["SIDE_EFFECTS_FAILED"] = 30] = "SIDE_EFFECTS_FAILED";
    ExitCode[ExitCode["INVALID_PLAN_FILE"] = 201] = "INVALID_PLAN_FILE";
    ExitCode[ExitCode["NO_CONFIGURATION_FILES_FOUND"] = 202] = "NO_CONFIGURATION_FILES_FOUND";
    ExitCode[ExitCode["CLIENT_ERROR"] = 98] = "CLIENT_ERROR";
    ExitCode[ExitCode["SERVER_ERROR"] = 99] = "SERVER_ERROR";
})(ExitCode || (ExitCode = {}));
