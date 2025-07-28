
# module S3 bucekt 
module "s3_bucket"{
    source = "./modules/remote-state"

    bucket_location = "remote-state-prod"
    name ="SolarCar Telemetry Remote State"
    environment = "prod"
}
# module code pipeline

resource "aws_ecr_repository" "default"{
    name = "Helios Telemetry ECR"
    description = "This is where we store our images that are used to buld our images."
}
# import {
#   to = aws_ecr_repository.service
#   id = "test-service"
# }
# TODO: We can migrate our existing one over but tbh it doesn't even matter:

resource "aws_codebuild_project" "TelemetryCodeBuild"{
    name = "Helios-Telemetry-CodeBuild"
    description = "This codebuild will contain all the information about our codebuild project."

    build_timeout = 5
}
resource "aws_codebuild_webhook" "main"{
    project_name = aws_codebuild_project.
}

# module infrastcutre ops

