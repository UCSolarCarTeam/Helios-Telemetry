# Main.tf 
# Main terraform configuration file

#VPC

resource "aws_vpc" "telemetry_backend_vpc" {
    cidr_block = "0.0.0.0/0" 
    # TODO: Adjust the CIDR as needed
    enable_dns_support = true
    enable_dns_hostnames = true

    tags = {
        Name = "${var.stack_name}-vpc"
    }
  
}

#Security Group
#Setting the security group for the vpc made ^
resource "aws_security_group" "telemetry_backend_sg"{
    vpc_id = aws_vpc.telemetry_backend_vpc.id 
    
    ingress {
        from_port = 3001
        to_port = 3001
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
        description = "Backend - ALlow inbound traffic on port 3001"
        # change to specific ips if need be
    }

    ingress{
        from_port = 80
        to_port = 80
        protocol ="tcp"
        cidr_blocks = ["0.0.0.0/0"]
        description = "Certbot - Allow inbound traffic on port 80"

    }
    ingress {
        from_port   = 1883
        to_port     = 1883
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
        description = "Aedes - Allow inbound traffic on port 1883"
        
    }   
    egress = {
        from_port = 0
        to_port =0
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }
    tags = {
        Name = "${var.stack_name}-sg"
    }

}


#ECR Repo
resource "aws_ecr_repository" "telemetry_image_repository" {
  name = "${var.stack_name}-image-repo"
}


#Secrets Manager for SSL certificates
resource "aws_secretsmanager_secret" "private_key"{
    name = "HeliosTelemetryBackendSSL/PrivateKey_${var.stack_name}"
}
resource "aws_secretsmanager_secret" "certificate" {
  name = "HeliosTelemetryBackendSSL/Certificate_${var.stack_name}"
}
resource "aws_secretsmanager_secret" "chain" {
  name = "HeliosTelemetryBackendSSL/Chain_${var.stack_name}"
}

# Elastic Cloud Repository
resource "aws_ecr_repository" "backend_repo"{
    name = "TelemetryBackendImageRepository"
}

resource "aws_iam_role" "telemetry_backend_codebuild_role"{
    name = "TelemetryBackendCodeBuildRole"
    assume_role_policy = jsonencode({
        Version = "2012-10-17",
        Statement =[{
            Action = "sts:AssumeRole"
            Effect = "Allow",
            Principal ={
                Service = "codebuild.amazonaws.com"
            }
        }]
    })

    managed_policy_arns = [
    "arn:aws:iam::aws:polic/SecretsManagerReadWrite"
]
}

resource "aws_iam_role_policy" "telemetry_backend_ecr_push_policy"{
    role = aws_iam_role.telemetry_backend_codebuild_role.id
    policy = jsonencode({
        Version = "2012-10-17"
        Statement = [{
            Effect   = "Allow",
            Action   = [
                "ecr:GetDownloadUrlForLayer",
                "ecr:BatchCheckLayerAvailability",
                "ecr:PutImage",
                "ecr:InitiateLayerUpload",
                "ecr:UploadLayerPart",
                "ecr:CompleteLayerUpload"
            ],   
            Resource = "*"
        }]
    })
}


#CodeBuild Project
# We can change this in the future if we want to make a bot on github instead which would be a lot nicer long term
# TODO finish this, use this --> https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/codebuild_project
# Atlantis to Apply Terraform To plan and apply IaC
#CodeBuild or GH actions to create image to upload to ECR
resource "aws_codebuild" "backend_build"{
    name = "TelemetryBackendCodeBuildProject"
    build_timeout =60
    description = "Builds image to store in ECR"
    source {
        type = "GITHUB"
        location = "https://github.com/UCSolarCarTeam/Helios-Telemetry.git"
        git_clone_depth = 1
        buildspec = "packages/amplify/amplify/buildspec.yml"

        git_submodules_config {
            fetch_submodules = true
        }

        webhook = true
        filter_group {
            filters{
                type = "EVENT"
                pattern="PUSH,PULL_REQUEST_MERGED"
            }
            filters{
                type="BRANCH"
                pattern ="main"
            }
            filters{
                type= "FILE_PATH"
                pattern="packages/server/*"
            }
        }

    }

    environment{
        compute_type = "BUILD_GENERAL1_MEDIUM"
        # TODO: Change this so that instead it ggrabs it from the ECR
        image = "aws/codebuild/standard:5.0" 
        type =  "LINUX_CONTAINER"
        privileged_mode = true

        environment_variable{
            name = "AWS_ACCOUNT_ID"
            value = var.AWS_ACCOUNT_ID
            # TODO: get ^ from the variables.tf 

        }
        environment_variable{
            name ="AWS_DEFAULT_REGION"
            value=var.AWS_DEFAULT_REGION
            # TODO update this
        }
        environment_variable{
            name = "IMAGE_REPO_NAME"
            value = aws_ecr_repository.telemetry_backend_image_repo.repository_name
            # Hallucination ^ lmao 
        }

        environment_variable {
            name = "IMAGE_REPO_URI"
            value = aws_ecr_repository.backend_repo.ecr_repository_url
        }
        environment_variable{
            name = "IMAGE_TAG"
            value = "latest"
        }

    }
    service_role = aws_iam_role.telemetry_backend_codebuild_role.arn
    # buildspec = file("buildspec.yml")

}


resource "aws_ecs" "telemetry_ecs_task_definition"{
    family = "TelemetryECSTaskDefinition"
    network_mode = "awsvpc"
    requires_compabilities = ["EC2"]
    cpu = "512"
    memory = "1024"

    container_definitions = jsonencode([{
        name = "TheContainer"
        image = "${aws_ecr_repository.telemetry_backend_image_repo.repository_url}:latest"
        memory = 900

        portMappings = [
            {
                containerPort = 3001
                hostPort = 3001
                protocl = "tcp"
            },
            {
                containerPort = 80
                hostPort      = 80
                protocol      = "tcp"
            },
            {
                containerPort = 1883
                hostPort      = 1883
                protocol      = "tcp"
            }
        ]
        Secrets = [
            {
                name = "CERTIFICATE"
                valueFrom = aws_secretsmanager_secret.certificate.arn
            },
            {
                name      = "CHAIN"
                valueFrom = aws_secretsmanager_secret.chain.arn
            },
            {
                name      = "PRIVATE_KEY"
                valueFrom = aws_secretsmanager_secret.private_key.arn
            }

        ]
    }])
}

resource "aws_ecs_cluster" "telemetry_backend_cluster"{
    name = "TelemtryBackendCluster"
}

resource "aws_autoscaling_group" "ecs_asg" {
    desired_capacity =  1
    max_size = 1
    min_size = 1
    vpc_zone_identifier = [aws_subnet.telemetry_backend_public_subnet.id]

    launch_configuration = aws_launch_configuration.ecs_launch_configuration.id

    tag {
        key = "Name"
        value = "TelemetryBackendCluster-ASG"
        propagate_at_launch = true
    }
}

data "aws_route53_zone" "solar_car_hosted_zone" {
  zone_id = "Z00168143RCUWIOU5XRGV"
  name    = "calgarysolarcar.ca"
}


#  TODO: INCLUDE LAMBDA Provisioning 