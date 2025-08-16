terraform{
    required_providers {  
        aws = {
            source = "hashicorp/aws"
            version = "~> 6.4"
        }
    }

    backend "s3" {
      bucket = "ucsolar-helios-telemetry-remote-state"
      key = "prod/terraform.tfstate"
      region = "ca-central-1"
    }
    
    
}

