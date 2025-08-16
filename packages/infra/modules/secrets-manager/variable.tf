variable "secret_manager_names"{
    type= set(string)
    description ="Set of secret manager names to make, ensures that there are no duplicates"
}