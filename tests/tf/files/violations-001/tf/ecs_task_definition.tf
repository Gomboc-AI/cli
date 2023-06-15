# For tables schema reference, see
# db_bootstrap.py script

resource "aws_dynamodb_table" "nodes_table" {
  name         = "${var.account_settings[data.aws_caller_identity.current.account_id].env}-Nodes"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "key"


  attribute {
    name = "key"
    type = "S"
  }

  attribute {
    name = "label"
    type = "S"
  }

  global_secondary_index {
    name            = "label"
    hash_key        = "label"
    projection_type = "ALL"
  }
}

resource "aws_dynamodb_table" "edges_table" {
  name                        = "${var.account_settings[data.aws_caller_identity.current.account_id].env}-Edges"
  billing_mode                = "PAY_PER_REQUEST"
  hash_key                    = "key"
  deletion_protection_enabled = true

  attribute {
    name = "key"
    type = "S"
  }

  attribute {
    name = "edge_label"
    type = "S"
  }

  attribute {
    name = "source_key"
    type = "S"
  }

  attribute {
    name = "target_key"
    type = "S"
  }

  global_secondary_index {
    name            = "edge_label"
    hash_key        = "edge_label"
    projection_type = "ALL"
  }

  global_secondary_index {
    name            = "out_edges"
    hash_key        = "source_key"
    range_key       = "edge_label"
    projection_type = "ALL"
  }

  global_secondary_index {
    name            = "in_edges"
    hash_key        = "target_key"
    range_key       = "edge_label"
    projection_type = "ALL"
  }
}

resource "aws_ecs_service" "ecs-service" {
  name                  = var.account_settings[data.aws_caller_identity.current.account_id].family_name
  cluster               = var.account_settings[data.aws_caller_identity.current.account_id].cluster_arn
  task_definition       = aws_ecs_task_definition.deploy_ecs_service.arn
  launch_type           = "FARGATE"
  desired_count         = var.account_settings[data.aws_caller_identity.current.account_id].ecs_count
  wait_for_steady_state = true

  network_configuration {
    subnets         = var.account_settings[data.aws_caller_identity.current.account_id].subnet_ids
    security_groups = [aws_security_group.ecs_security_group.id]
  }

  deployment_circuit_breaker {
    enable   = true
    rollback = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.workload-target-group.arn
    container_name   = var.account_settings[data.aws_caller_identity.current.account_id].container_name
    container_port   = var.account_settings[data.aws_caller_identity.current.account_id].container_port
  }

  service_registries {
    registry_arn = aws_service_discovery_service.discovery_service_registration.arn
  }
}

# Define a Log group for the container
resource "aws_cloudwatch_log_group" "ecs_log_group" {
  name = "/${var.account_settings[data.aws_caller_identity.current.account_id].cluster_name}/${var.account_settings[data.aws_caller_identity.current.account_id].family_name}/GraphQL"
}

# Define a Log group for the collector
resource "aws_cloudwatch_log_group" "otel_agent_log_group" {
  name = "/${var.account_settings[data.aws_caller_identity.current.account_id].cluster_name}/${var.account_settings[data.aws_caller_identity.current.account_id].family_name}/OTEL"
}

resource "aws_ecs_task_definition" "deploy_ecs_service" {
  family                   = var.account_settings[data.aws_caller_identity.current.account_id].family_name
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = 1024
  memory                   = 2048
  execution_role_arn       = aws_iam_role.ecs_tasks_execution_role.arn
  task_role_arn            = aws_iam_role.ecs_task_role.arn
  container_definitions = jsonencode([
    {
      name      = var.account_settings[data.aws_caller_identity.current.account_id].container_name
      image     = var.IMAGE_URL
      essential = true
      environment = [
        { name = "NODE_TABLE_NAME", value = aws_dynamodb_table.nodes_table.name },
        { name = "EDGE_TABLE_NAME", value = aws_dynamodb_table.edges_table.name },
        { name = "STAGE", value = var.account_settings[data.aws_caller_identity.current.account_id].env },
      ]
      portMappings = [
        {
          containerPort = var.account_settings[data.aws_caller_identity.current.account_id].container_port
          hostPort      = var.account_settings[data.aws_caller_identity.current.account_id].container_port
        }
      ]
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.ecs_log_group.name
          "awslogs-region"        = "us-east-1"
          "awslogs-stream-prefix" = "${var.account_settings[data.aws_caller_identity.current.account_id].container_name}"
        }
      }
    },
    {
      name         = "OTEL-Collector"
      image        = "255036831885.dkr.ecr.us-east-1.amazonaws.com/awscollector:latest"
      essential    = false
      portMappings = []
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.otel_agent_log_group.name
          "awslogs-region"        = "us-east-1"
          "awslogs-stream-prefix" = "${var.account_settings[data.aws_caller_identity.current.account_id].family_name}/OTEL"
        }
      }
    }
  ])
}


## ECS TASK ROLE

# Assume role for ECS tasks
resource "aws_iam_role" "ecs_task_role" {
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })
}

# Policy to read and write from nodes and edges table
resource "aws_iam_policy" "task_role_policiy" {
  name        = "task_role_policiy"
  description = "Role policy to read and write from nodes and edges table"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      { # Permissionf for the OTEL Sidecar
        Action = [
          "xray:PutTraceSegments",
          "xray:PutTelemetryRecords",
          "xray:GetSamplingRules",
          "xray:GetSamplingTargets",
          "xray:GetSamplingStatisticSummaries",
        ]
        Effect   = "Allow"
        Resource = ["*"]
      },
      {
        Action = [
          "dynamodb:PutItem",
          "dynamodb:GetItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
          "dynamodb:Scan",
          "dynamodb:Query",
          "dynamodb:BatchGetItem",
          "dynamodb:BatchWriteItem",
          "dynamodb:DescribeTable",
        ]
        Effect = "Allow"
        Resource = [
          "${aws_dynamodb_table.nodes_table.arn}",
          "${aws_dynamodb_table.edges_table.arn}",
          "${aws_dynamodb_table.nodes_table.arn}/index/*",
          "${aws_dynamodb_table.edges_table.arn}",
          "${aws_dynamodb_table.edges_table.arn}/index/*",
        ]
      }
    ]
  })
}

## ECS TASK EXECUTION ROLE
# Attach policiy to read and write from nodes and edges table to ecs task role
resource "aws_iam_role_policy_attachment" "task_role_policiy_attachement" {
  role       = aws_iam_role.ecs_task_role.name
  policy_arn = aws_iam_policy.task_role_policiy.arn
}

resource "aws_iam_role" "ecs_tasks_execution_role" {
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "ecs_tasks_execution_role" {
  role       = aws_iam_role.ecs_tasks_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_service_discovery_service" "discovery_service_registration" {
  name = var.account_settings[data.aws_caller_identity.current.account_id].family_name

  health_check_custom_config {
    failure_threshold = 1
  }

  dns_config {
    namespace_id = data.aws_ssm_parameter.namespace_id.value

    dns_records {
      ttl  = 10
      type = "A"
    }
  }
}
