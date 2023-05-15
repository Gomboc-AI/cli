export var ExitCode;
(function (ExitCode) {
    ExitCode[ExitCode["SUCCESS"] = 0] = "SUCCESS";
    ExitCode[ExitCode["INVALID_CONFIG_FILE"] = 10] = "INVALID_CONFIG_FILE";
    ExitCode[ExitCode["MISSING_SEARCH_PATTERN"] = 11] = "MISSING_SEARCH_PATTERN";
    ExitCode[ExitCode["NO_TEMPLATES_FOUND"] = 12] = "NO_TEMPLATES_FOUND";
    ExitCode[ExitCode["NO_POLICIES_FOUND"] = 13] = "NO_POLICIES_FOUND";
    ExitCode[ExitCode["INVALID_TEMPLATE"] = 14] = "INVALID_TEMPLATE";
    ExitCode[ExitCode["VIOLATIONS_FOUND"] = 20] = "VIOLATIONS_FOUND";
    ExitCode[ExitCode["SIDE_EFFECTS_FAILED"] = 30] = "SIDE_EFFECTS_FAILED";
    ExitCode[ExitCode["SERVER_ERROR"] = 99] = "SERVER_ERROR";
})(ExitCode || (ExitCode = {}));
