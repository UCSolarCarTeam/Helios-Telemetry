resource "aws_s3_bucket" "default"{
    bucket = var.bucket_location

    tags = {
        Name = var.name
        Environment = var.environment
    }
}
