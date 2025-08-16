
# module S3 bucekt 
module "s3_bucket"{
    source = "./modules/remote-state"

    bucket_name = "ucsolar-helios-telemetry-remote-state"
    name ="helios-telemetry-remote-state"
    environment = "prod"
}

# Secrets Manager

# Create the secrets
resource "aws_secretsmanager_secret" "default"{
    for_each = toset([
    "HeliosTelemetryBackendSSL/Chain${var.old_stack_name}",
    "HeliosTelemetryBackendSSL/Certificate${var.old_stack_name}",
    "HeliosTelemetryBackendSSL/PrivateKey${var.old_stack_name}",
    "HeliosTelemetryMQTTCredentials${var.old_stack_name}"
  ])
    name =  each.key
    
    tags ={
      name = each.key,
      source = "terraform"
    }
}
