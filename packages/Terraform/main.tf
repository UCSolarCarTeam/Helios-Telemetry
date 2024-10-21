provider "aws"{
    region = "ca-central-1"
    access_key = var.aws_access_key
    secret_key = var.aws_secret_key
}

# DynamoDB PacketData

resource "aws_dynamodb_table" "packet_data_table"{
    name = "packet_data_table"
    billing_mode = "PROVISIONED" # Could also be pay_per_request but this is safer
    hash_key = "timeAdded"

    attribute {
        # This should be added as a time in UTC Seconds
        name="timeAdded"
        type = "N"
    }
    read_capacity = 5
    # 5 RCUs ~ 5 reads/second
    write_capacity = 3
    # 3 RCUS ~ 3 writes/second

    tags = {
        Name ="packet_data_table"
        Env = "DemoMode"
    }
    #When we are ready to make one for the rest we can change the tag 

}

resource "aws_dynamodb_table" "lap_data_table"{
    name = "lap_data_table"
    billing_mode = "PROVISIONED"
    hash_key = "LapNumber"
    # Don't think we need to add a range key
    read_capacity = 5
    # 5 RCUs ~ 5 reads/second
    write_capacity = 2
    # 2 RCUS ~ 2 writes/second
    attribute{
        name ="LapNumber"
        type = "N"
    }

    tags ={
        Name = "lap_data_table"
        env = "DemoMode"
    }
}