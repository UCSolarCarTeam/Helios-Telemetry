# Output Values

output "ecr_repository_url" {
    value = aws_ecr_repository.telemetry_image_repository.ecr_repository_url
}

output "lambda_function_arn"{
    value = aws_lambda_function.renew_certificate_lambda.arn
}