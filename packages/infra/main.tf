
# module S3 bucekt 
module "s3_bucket"{
    source = "./modules/remote-state"

    bucket_location = "remote-state-prod"
    name ="SolarCar Telemetry Remote State"
    environment = "prod"
}
# module code pipeline


# module infrastcutre ops

