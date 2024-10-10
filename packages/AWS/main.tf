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
        # change to specific ips if need be
    }

    ingress{
        from_port = 80
        to_port = 80
        protocol ="tcp"
        cidr_blocks = ["0.0.0.0/0"]

    }
    ingress {
        from_port   = 1883
        to_port     = 1883
        protocol    = "tcp"
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
#CodeBuild Project
# We can change this in the future if we want to make a bot on github instead which would be a lot nicer long term
# TODO finish this, use this --> https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/codebuild_project

resource "aws_codebuild" "backend_build"{
    name = "TelemetryBackendCodeBuildProject"
    service_role = aws_iam_role.codebuild_role.arn 
    source {
        type = "GITHUB"
        location = "https://github.com/UCSolarCarTeam/Helios-Telemetry"
        git_clone_depth = 1

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
            name = "IMAGE_REPO_NAME"
            value = aws_ecr_repository.backend_repo.repository_name
            # Hallucination ^ lmao 
        }

        environment_variable {
            name = "IMAGE_REPO_URI"
            value = aws_ecr_repository.backend_repo.ecr_repository_url
        }

    }

    buildspec = file("buildspec.yml")

}


resource "aws_ecs" ""{

}