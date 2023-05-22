# Gomboc.ai CLI

> **Note**
> If you plan on using this from your GitHub deployment pipeline, we recommend using the [Gomboc.ai Action](https://github.com/Gomboc-AI/cloudformation)


To get started, run:

```bash
gomboc --help
```

## Cloudformation

### Configuration file

| Element | Required | Description |
| --- | --- | --- |
| <kbd>policies.must-implement</kbd> | REQUIRED | A list of capabilities that will be enforced |
| <kbd>options.search&#x2011;pattern</kbd> | REQUIRED |  A list of search patterns to the CloudFormation templates (JSON or YAML) |
| <kbd>options.ignore&#x2011;pattern</kbd> | OPTIONAL |  A list of patterns that will be ignored in the search |

Here's an example for CloudFormation:

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

## Terraform

### Configuration file

| Element | Required | Description |
| --- | --- | --- |
| <kbd>policies.must-implement</kbd> | REQUIRED | A list of capabilities that will be enforced |

### Instructions on generating the Terraform plan JSON file

Generate a JSON file representing your Terraform Plan: 

```
terraform plan -out=tfplan
terraform show -json tfplan > tfplan.json
```

Pass it to the command as follows:

`--plan tfplan.json` 

> **Note**
> Gomboc will make reasonable efforts to strip secrets from the Terraform Plan file. Consumers of this CLI should take active precautions to sanitize their documents before they are passed. We recommend reading the official Terraform guidelines on how to manage secrets and sensitive values. There are also free and commercially available tools for this purpose.

### Exit Codes

The execution will end with one of the following codes

| Code | Result | Description |
| ---: | --- | --- |
|  0 | SUCCESS | There were no reasons to raise an alert |
| 10 | INVALID_CONFIG_FILE | The config file contains errors |
| 14 | CAPABILITY_DOES_NOT_EXIST | At least one of the requested capabilities does not exist |
| 20 | VIOLATIONS_FOUND | Policy violation(s) found in at least one template |
| 30 | SIDE_EFFECTS_FAILED | Something went wrong when trying to apply side effects |
| 98 | CLIENT_ERROR | Something went wrong at the client level |
| 99 | SERVER_ERROR | Something went wrong at the server level |
| 101 | NO_TEMPLATES_FOUND | The provided search pattern(s) did not yield any findings |
| 102 | TEMPLATE_ERROR | Something went wrong with the template |
| 201 | INVALID_PLAN_FILE | The Terraform Plan file is missing or invalid |
| 202 | NO_CONFIGURATION_FILES_FOUND | No Terraform configuration files were found |

`0xx` codes are common to all services

`1xx` codes relate to CloudFormation

`2xx` codes relate to Terraform
