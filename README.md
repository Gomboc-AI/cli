# Gomboc.ai CloudFormation CLI

> **Note**
> If you plan on using this from your GitHub deployment pipeline, we recommend using the [Gomboc.ai CloudFormation Action](https://github.com/Gomboc-AI/cloudformation)

To run, simple execute:

```bash
gomboc-cfn run <options>
```

For a complete list of options:

```bash
gomboc-cfn --help
```

### About Gomboc.ai's configuration file

It is a YAML file that specifies different parameters for Gomboc.ai's CloudFormation CLI.

Here's an example:

```
policies: 
  must-implement:
    - Deletion Protection
    - Resource Tags
    - API Key Authentication
    - Provisioned Capacity
    - Request Tracing

options:
  search-pattern:
    - '**/*.{yaml,yml}'
    - '**/*.json'
  ignore-pattern:
    - 'my-private-directory/*'
    - 'tsconfig.json'
```

| Element | Required | Description |
| --- | --- | --- |
| <kbd>policies.must-implement</kbd> | REQUIRED | A list of capabilities that will be enforced |
| <kbd>options.search&#x2011;pattern</kbd> | REQUIRED |  A list of search patterns to the CloudFormation templates (JSON or YAML) |
| <kbd>options.ignore&#x2011;pattern</kbd> | OPTIONAL |  A list of patterns that will be ignored in the search |

### Exit Codes

The execution will end with one of the following codes

| Code | Result | Description |
| ---: | --- | --- |
|  0 | SUCCESS | There were no reasons to raise an alert |
| 10 | INVALID_CONFIG_FILE | Could not read file from provided filepath |
| 11 | MISSING_SEARCH_PATTERN | Did not provide CloudFormation template search pattern |
| 12 | NO_TEMPLATES_FOUND | The provided search pattern(s) did not yield any findings |
| 13 | NO_POLICIES_FOUND | At least one policy must be specified |
| 99 | SERVER_ERROR | Something went wrong at the server level |
| 20 | VIOLATIONS_FOUND | Policy violation(s) found in at least one template |
| 30 | SIDE_EFFECTS_FAILED | Something went wrong when trying to apply side effects |
