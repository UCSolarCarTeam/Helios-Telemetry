resource "aws_secretsmanager_secret" "default"{
    for_each = var.secret_manager_names
    name =  each.key
}