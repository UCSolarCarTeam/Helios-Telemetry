variable "aws_access_key" {
  description = "AWS access key for DynamoDB"
  type        = string
  sensitive   = true
}

variable "aws_secret_key" {
  description = "AWS secret key for DynamoDB"
  type        = string
  sensitive   = true
}