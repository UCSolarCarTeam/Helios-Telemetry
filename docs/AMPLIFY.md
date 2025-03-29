_last edited march 27 2025_

# Amplify Folder Documentation

Hello it's burton again I will be explaining what exactly is in the amplify folder

[Amplify](https://aws.amazon.com/amplify/) is an AWS service that we use to host our backend, which also handles our CI/CD Pipeline

### What AWS Services do we use?

As of when this was last edited, these are the AWS Services that we use:

- DynamoDB (to store data for our 3 [tables](#our-tables))
- IAM (used for role management - to allow certain team members to access certain resources)
- Secrets manager (to retrieve and store secrets safely without them getting leaked)
- CloudFormation (sort of, we do have logs for certain services)
- Route 53 (managing our DNS records)
- Elastic Container Registry (ECR, used for storing our docker images to be later pulled into ECS)
- ECS (to deploy our EC2 containers)
- CodePipeline (CodeCommit, CodeBuild, and CodeDeploy are a part of this and are more in depth explained [here](#cicd-pipeline))

## Our CI/CD Pipeline

This is kind of confusing but not really. Below is an image of the most basic of what our pipeline looks like. Basically, **whenever a commit is merged into main**, and passes all the github action tests and checks, **CodeCommit** will recognize this and notify **CodeBuild** to start a build to build our new latest image based on our [Dockerfile](../Dockerfile).

[](https://imgur.com/a/J0qk61e)

If this image is built successfully, an `imagedefinitions.json()` artifact will have been created and passed into the **CodeDeploy** task to deploy our backend on **ECS** using **EC2** instances.

We followed a tutorial for this. If you are ever confused about configuring this, please refer to [this documentation](https://docs.aws.amazon.com/codepipeline/latest/userguide/ecs-cd-pipeline.html).

## Our tables

### Driver Table

This table stores the driver name and the driver's RFID as it's main partition key so we can fetch the lap data for that specific driver. Here is the main schema of the driver table, which is also defined in the backend.ts file [here](../packages/amplify/amplify/backend.ts#L137)

```JSON
{
    "Table": {
        "AttributeDefinitions": [
            {
                "AttributeName": "Rfid",
                "AttributeType": "S"
            }
        ],
        "TableName": "amplify-d2m2fu81qyo9pl-amplifymain-branch-f78c72a9c8-TelemetryBackend00F6569C-QPV5X166STWQ-driverdatatable6750A51B-O7CL7AMIRCFM",
        "KeySchema": [
            {
                "AttributeName": "Rfid",
                "KeyType": "HASH"
            }
        ],
        "TableStatus": "ACTIVE",
        "CreationDateTime": "2025-03-20T15:56:52.561000-06:00",
        "ProvisionedThroughput": {
            "NumberOfDecreasesToday": 0,
            "ReadCapacityUnits": 0,
            "WriteCapacityUnits": 0
        },
        "TableSizeBytes": 122,
        "ItemCount": 2,
        "TableArn": "arn:aws:dynamodb:ca-central-1:602361116849:table/amplify-d2m2fu81qyo9pl-amplifymain-branch-f78c72a9c8-TelemetryBackend00F6569C-QPV5X166STWQ-driverdatatable6750A51B-O7CL7AMIRCFM",
        "TableId": "49b5771b-d264-4a52-b469-498a57940558",
        "BillingModeSummary": {
            "BillingMode": "PAY_PER_REQUEST",
            "LastUpdateToPayPerRequestDateTime": "2025-03-20T15:56:52.561000-06:00"
        },
        "DeletionProtectionEnabled": false
    }
}
```

### Lap Table

This table stores the [lap](./TELEMETRY.md#lap) data and the driver's [RFID](./TELEMETRY.md#rfid) as it's main partition key. We also have the timestamp of when that lap was recorded as a sort key, so later (not done rn as of this being written) we can add functionality of fetching the laps based on a specific timestamp. Here is the main schema of the lap table, which is also defined in the backend.ts file [here](../packages/amplify/amplify/backend.ts#L126)

```JSON
{
    "Table": {
        "AttributeDefinitions": [
            {
                "AttributeName": "Rfid",
                "AttributeType": "S"
            },
            {
                "AttributeName": "timestamp",
                "AttributeType": "N"
            }
        ],
        "TableName": "amplify-d2m2fu81qyo9pl-amplifymain-branch-f78c72a9c8-TelemetryBackend00F6569C-QPV5X166STWQ-lapdatatable045D6A05-18U9Z8JTTMJ3N",
        "KeySchema": [
            {
                "AttributeName": "Rfid",
                "KeyType": "HASH"
            },
            {
                "AttributeName": "timestamp",
                "KeyType": "RANGE"
            }
        ],
        "TableStatus": "ACTIVE",
        "CreationDateTime": "2025-03-20T15:56:52.473000-06:00",
        "ProvisionedThroughput": {
            "NumberOfDecreasesToday": 0,
            "ReadCapacityUnits": 0,
            "WriteCapacityUnits": 0
        },
        "TableSizeBytes": 694,
        "ItemCount": 3,
        "TableArn": "arn:aws:dynamodb:ca-central-1:602361116849:table/amplify-d2m2fu81qyo9pl-amplifymain-branch-f78c72a9c8-TelemetryBackend00F6569C-QPV5X166STWQ-lapdatatable045D6A05-18U9Z8JTTMJ3N",
        "TableId": "a2cbaf85-972d-4067-98aa-e9282708fa7f",
        "BillingModeSummary": {
            "BillingMode": "PAY_PER_REQUEST",
            "LastUpdateToPayPerRequestDateTime": "2025-03-20T15:56:52.473000-06:00"
        },
        "DeletionProtectionEnabled": false
    }
}
```

### Packet Table

This table stores the [packet](./TELEMETRY.md#packet) data. The timestamp of when that packet was received as a sort key so we can fetch the packets based on a specific timestamp. which is what we do in the [playback](./TELEMETRY.md#playback-function). A good example of how we use it is also in this function in the `DynamoDB.ts` file [here](../packages/server/src/datasources/DynamoDB/DynamoDB.ts#L82). Here is the main schema of the packet data table, which is also defined in the backend.ts file [here](../packages/amplify/amplify/backend.ts#L115)

```JSON
{
    "Table": {
        "AttributeDefinitions": [
            {
                "AttributeName": "id",
                "AttributeType": "S"
            },
            {
                "AttributeName": "timestamp",
                "AttributeType": "N"
            }
        ],
        "TableName": "amplify-d2m2fu81qyo9pl-amplifymain-branch-f78c72a9c8-TelemetryBackend00F6569C-QPV5X166STWQ-packetdatatable4FB463D7-JEPBKJQDQP1G",
        "KeySchema": [
            {
                "AttributeName": "id",
                "KeyType": "HASH"
            },
            {
                "AttributeName": "timestamp",
                "KeyType": "RANGE"
            }
        ],
        "TableStatus": "ACTIVE",
        "CreationDateTime": "2024-12-07T20:27:38.460000-07:00",
        "ProvisionedThroughput": {
            "NumberOfDecreasesToday": 0,
            "ReadCapacityUnits": 0,
            "WriteCapacityUnits": 0
        },
        "TableSizeBytes": 102008477,
        "ItemCount": 13662,
        "TableArn": "arn:aws:dynamodb:ca-central-1:602361116849:table/amplify-d2m2fu81qyo9pl-amplifymain-branch-f78c72a9c8-TelemetryBackend00F6569C-QPV5X166STWQ-packetdatatable4FB463D7-JEPBKJQDQP1G",
        "TableId": "61f3fc53-fa0c-4096-af0a-4683a079b1c6",
        "BillingModeSummary": {
            "BillingMode": "PAY_PER_REQUEST",
            "LastUpdateToPayPerRequestDateTime": "2024-12-07T20:27:38.460000-07:00"
        },
        "DeletionProtectionEnabled": false
    }
}
```
