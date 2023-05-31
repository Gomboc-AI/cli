
data "aws_secretsmanager_secret_version" "oidc_client_secret_version" {
  secret_id = var.account_settings[data.aws_caller_identity.current.account_id].oidc_secret_secret_id
}

resource "aws_lb_listener_rule" "webapp_traffic_rule" {
  listener_arn = var.account_settings[data.aws_caller_identity.current.account_id].lb_listener_arn
  priority     = 10

  action {
    type = "authenticate-oidc"

    authenticate_oidc {
      authorization_endpoint = "https://login.microsoftonline.com/81e518e1-9938-450b-925c-ee318d480b52/oauth2/v2.0/authorize"
      client_id              = "ce697f41-7d2f-4338-9708-7fba28e358c1"
      client_secret          = jsondecode(data.aws_secretsmanager_secret_version.oidc_client_secret_version.secret_string)["client_secret"]
      issuer                 = "https://login.microsoftonline.com/81e518e1-9938-450b-925c-ee318d480b52/v2.0"
      user_info_endpoint     = "https://graph.microsoft.com/oidc/userinfo"
      token_endpoint         = "https://login.microsoftonline.com/81e518e1-9938-450b-925c-ee318d480b52/oauth2/v2.0/token"
      scope                  = "openid profile"
      session_timeout        = 3600
    }
  }

  condition {
    path_pattern {
      values = ["/graphql*"]
    }
  }

  # Forward authenticated traffic to ECS Service
  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.workload-target-group.arn
  }
}


# Security group for ECS service
resource "aws_security_group" "ecs_security_group" {
  vpc_id                 = var.account_settings[data.aws_caller_identity.current.account_id].vpc_id
  revoke_rules_on_delete = true
}

#Load balancer public ingress rule
resource "aws_security_group_rule" "load_balancer_ingress_rule" {
  count                    = length(var.account_settings[data.aws_caller_identity.current.account_id].lb_security_group_id)
  type                     = "ingress"
  from_port                = var.account_settings[data.aws_caller_identity.current.account_id].container_port
  to_port                  = var.account_settings[data.aws_caller_identity.current.account_id].container_port
  protocol                 = "tcp"
  security_group_id        = aws_security_group.ecs_security_group.id
  source_security_group_id = element(var.account_settings[data.aws_caller_identity.current.account_id].lb_security_group_id, count.index)
}
#VPC ingress rule
resource "aws_security_group_rule" "peer_ingress_rule" {
  count                    = var.account_settings[data.aws_caller_identity.current.account_id].databricks_security_group_id == "" ? 0 : 1
  type                     = "ingress"
  from_port                = 8001
  to_port                  = 8001
  protocol                 = "tcp"
  security_group_id        = aws_security_group.ecs_security_group.id
  source_security_group_id = var.account_settings[data.aws_caller_identity.current.account_id].databricks_security_group_id
}

# #Scan API ingress rule
#The security group should be identified by the Tags stack="ScanAPI" stage=<stage> and name="service_security_group"

data "aws_security_group" "scan_api_security_group" {
  filter {
    name   = "tag:stack"
    values = ["ScanAPI"]
  }

  filter {
    name   = "tag:stage"
    values = [var.account_settings[data.aws_caller_identity.current.account_id].env]
  }

  filter {
    name   = "tag:Name"
    values = ["service_security_group"]
  }
}

resource "aws_security_group_rule" "scan_api_ingress_rule" {
  type                     = "ingress"
  from_port                = var.account_settings[data.aws_caller_identity.current.account_id].container_port
  to_port                  = var.account_settings[data.aws_caller_identity.current.account_id].container_port
  protocol                 = "tcp"
  security_group_id        = aws_security_group.ecs_security_group.id
  source_security_group_id = data.aws_security_group.scan_api_security_group.id
}

#Allow all egress rule
resource "aws_security_group_rule" "egress_all_rule" {
  type              = "egress"
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.ecs_security_group.id
}

resource "aws_lb_target_group" "workload-target-group" {
  port        = var.account_settings[data.aws_caller_identity.current.account_id].container_port
  protocol    = "HTTP"
  vpc_id      = var.account_settings[data.aws_caller_identity.current.account_id].vpc_id
  target_type = "ip"

  health_check {
    path = "/healthcheck"
  }
}
