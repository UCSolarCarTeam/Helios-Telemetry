# Provider Configurations
terraform {
    required_providers{
        aws = {
            source = "hashicorp/aws"
            version = "~> 4.0" 
            #  Specify the verison we are targeting
        }

    }
}

provider "aws"{
    region = var.region
}