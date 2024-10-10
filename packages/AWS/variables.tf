# Variable declarations
variable "region"{
    description = "The AWS region to deploy to"
    type = string
    default = "ca-central-1"
}

variable "stack_name"{
    description = "The name of the stack"
    type = string
    default = "TelemetryBackend"
}

# Add more variables here later if we want to change something