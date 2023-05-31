terraform {
  # backend "s3" {
  #   key = "CfnAPI"
  # }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.51.0"
    }
  }
}

data "aws_caller_identity" "current" {}

provider "aws" {
  region = "us-east-1"
}

variable "IMAGE_URL" {
  type        = string
  description = "Image URL of Docker image to deploy"
}


variable "name" {
  type        = string
  description = "Name of the workload"
  default     = "CfnAPI"
}

# resource "aws_dynamodb_table" "state_bucket_lock_table" {
#   name         = "${data.aws_caller_identity.current.account_id}-tfstatelock-${lower(var.name)}"
#   hash_key     = "LockID"
#   billing_mode = "PAY_PER_REQUEST"

#   attribute {
#     name = "LockID"
#     type = "S"
#   }
# }

# resource "aws_s3_bucket" "state_bucket" {
#   bucket = "${data.aws_caller_identity.current.account_id}-tfstate-${lower(var.name)}"
# }

# resource "aws_s3_bucket_versioning" "state_bucket_versioning" {
#   bucket = aws_s3_bucket.state_bucket.id
#   versioning_configuration {
#     status = "Enabled"
#   }
# }

# resource "aws_s3_bucket_server_side_encryption_configuration" "state_bucket_encryption" {
#   bucket = aws_s3_bucket.state_bucket.id
#   rule {
#     apply_server_side_encryption_by_default {
#       sse_algorithm = "AES256"
#     }
#   }
# }

# Map of environments defined by the account id
variable "account_settings" {
  type = map(object({
    cluster_arn                  = string
    cluster_name                 = string
    container_name               = string
    container_port               = number
    databricks_security_group_id = string
    ecs_count                    = string
    env                          = string
    family_name                  = string
    healthcheck_path             = string
    infrastructure_stack_name    = string
    lb_listener_arn              = string
    lb_security_group_id         = list(string)
    oidc_secret_secret_id        = string
    subnet_ids                   = list(string)
    vpc_id                       = string
  }))

  default = {
    298481701677 = {
      cluster_arn                  = "arn:aws:ecs:us-east-1:298481701677:cluster/Beta"
      cluster_name                 = "Beta"
      container_name               = "GraphQL"
      container_port               = 8001
      databricks_security_group_id = ""
      ecs_count                    = 1
      env                          = "BETA"
      family_name                  = "CfnAPI"
      healthcheck_path             = "/graphql"
      infrastructure_stack_name    = "AWSProdApplicationAccountIAC"
      lb_listener_arn              = "arn:aws:elasticloadbalancing:us-east-1:298481701677:listener/app/tf-lb-20230130022905685600000004/3f9b608f871615e3/a2f4b4cabe12f4b1"
      lb_security_group_id         = ["sg-082d5b58fad90249e", "sg-03d7188a14542e0fd"]
      oidc_secret_secret_id        = "arn:aws:secretsmanager:us-east-1:298481701677:secret:terraform-20230130022857817500000001-wX6Ddb"
      subnet_ids                   = ["subnet-098f476aad03c0587", "subnet-0bc402681b04521bd", "subnet-068f9f98cc5f98b78"]
      vpc_id                       = "vpc-0fbdfe958ad8cd4ec"
    }

    808127352874 = {
      cluster_arn                  = "arn:aws:ecs:us-east-1:808127352874:cluster/Prod"
      cluster_name                 = "Prod"
      container_name               = "GraphQL"
      container_port               = 8001
      databricks_security_group_id = "sg-00a4fc2c463b3f2ef"
      ecs_count                    = 3
      env                          = "PROD"
      family_name                  = "CfnAPI"
      healthcheck_path             = "/graphql"
      infrastructure_stack_name    = "AWSProdApplicationAccountIAC"
      lb_listener_arn              = "arn:aws:elasticloadbalancing:us-east-1:808127352874:listener/app/tf-lb-20230130033437783700000004/7b87e09336a78ab3/00c58a7cc992caa5"
      lb_security_group_id         = ["sg-02d66a2cc5417cb8f", "sg-0402fd94b39f5ebc4"]
      oidc_secret_secret_id        = "arn:aws:secretsmanager:us-east-1:808127352874:secret:terraform-20230130033435851400000001-1p3HKo"
      subnet_ids                   = ["subnet-00fc4b75ee0621bad", "subnet-02b422382b5d1ddef", "subnet-01af36e02217ff5a0"]
      vpc_id                       = "vpc-0bc965b61635cc05f"
    }
  }
}

data "aws_iam_openid_connect_provider" "github" {
  url = "https://token.actions.githubusercontent.com"
}


resource "aws_iam_role" "GitHub_ReadOnly" {
  name                = "GitHub-ReadOnly-${var.name}"
  managed_policy_arns = ["arn:aws:iam::aws:policy/job-function/ViewOnlyAccess", aws_iam_policy.additional_read_policies.arn]
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        "Effect" : "Allow",
        "Principal" : {
          "Federated" : data.aws_iam_openid_connect_provider.github.arn
        },
        "Action" : "sts:AssumeRoleWithWebIdentity",
        "Condition" : {
          "StringLike" : {
            "token.actions.githubusercontent.com:sub" : "repo:Gomboc-AI/${var.name}:pull_request"
          }
        }
      }
    ]
  })
}

resource "aws_iam_policy" "additional_read_policies" {
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action   = ["secretsmanager:GetSecretValue"]
        Effect   = "Allow"
        Resource = "*"
      },
      {
        Action = [
          "iam:Get*",
          "elasticloadbalancing:Describe*",
          "servicediscovery:GetNamespace",
          "servicediscovery:GetService",
          "servicediscovery:ListTagsForResource",
          "ssm:GetParameter",
          "ssm:GetParameters",
          "ssm:GetParametersByPath",
          "ssm:DescribeParameters",
          "logs:ListTagsLogGroup"
        ]
        Effect   = "Allow"
        Resource = "*"
      },
    ]
  })
}

resource "aws_iam_role" "GitHub_ReadWrite" {
  name                = "GitHub-ReadWrite-${var.name}"
  managed_policy_arns = ["arn:aws:iam::aws:policy/AdministratorAccess"]
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        "Effect" : "Allow",
        "Principal" : {
          "Federated" : data.aws_iam_openid_connect_provider.github.arn
        },
        "Action" : "sts:AssumeRoleWithWebIdentity",
        "Condition" : {
          "StringLike" : {
            "token.actions.githubusercontent.com:sub" : "repo:Gomboc-AI/${var.name}:ref:refs/heads/main"
          }
        }
      }
    ]
  })
}

data "aws_ssm_parameter" "vpc_id" {
  name = "/terraform/${var.account_settings[data.aws_caller_identity.current.account_id].infrastructure_stack_name}/${var.account_settings[data.aws_caller_identity.current.account_id].env}/vpc/vpc_id"
}

data "aws_ssm_parameter" "namespace_id" {
  name = "/terraform/${var.account_settings[data.aws_caller_identity.current.account_id].infrastructure_stack_name}/${var.account_settings[data.aws_caller_identity.current.account_id].env}/namespace_id"
}
