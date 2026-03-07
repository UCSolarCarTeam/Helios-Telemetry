_last edited march 27 2025_

# Amplify Folder Documentation

Hello it's burton again I will be explaining what exactly is in the amplify folder

[Amplify](https://aws.amazon.com/amplify/) is an AWS service that we use to host our backend, which also handles our CI/CD Pipeline

## AWS Environment Setup

Ask your tech lead to:

1. Create you an IAM account with sufficient permissions
2. Create a secret access key so you have access to the CLI
3. Help you configure your AWS profile

To configure AWS locally, run these specific commands after these 3 steps have been completed:

```bash
aws configure
```

Then, four options should have appeared and you should have filled them out

```bash
asked for access key id
asked for secret access id secret whatever secreter one
asked for region
asked for json format or whatever, can leave this one empty
```

You can check to see if this worked by running:

```bash
aws sts get-caller-identity
```

The output should be something like:

```json
{
  "UserId": "SDJHFHSDJLFHJKLSEDHTRJKLS",
  "Account": "34523452345",
  "Arn": "arn:aws:iam::34523452345:user/{whatever your lead named your IAM username whatever}"
}
```

## What AWS Services do we use?

As of when this was last edited, these are the AWS Services that we use:

- IAM (used for role management - to allow certain team members to access certain resources)
- Secrets manager (to retrieve and store secrets safely without them getting leaked)
- CloudFormation (sort of, we do have logs for certain services)
- Route 53 (managing our DNS records)
- Elastic Container Registry (ECR, used for storing our docker images to be later pulled into ECS)
- ECS (to deploy our EC2 containers)
- CodePipeline (CodeCommit, CodeBuild, and CodeDeploy are a part of this and are more in depth explained [here](#cicd-pipeline))

## Our CI/CD Pipeline

This is kind of confusing but not really. Below is an image of the most basic of what our pipeline looks like. Basically, **whenever a commit is merged into main**, and passes all the github action tests and checks, **CodeCommit** will recognize this and notify **CodeBuild** to start a build to build our new latest image based on our [Dockerfile](../Dockerfile).

![aws pic](https://i.imgur.com/1kh3uYG.png)

If this image is built successfully, an `imagedefinitions.json()` artifact will have been created and passed into the **CodeDeploy** task to deploy our backend on **ECS** using **EC2** instances.

We followed a tutorial for this. If you are ever confused about configuring this, please refer to [this documentation](https://docs.aws.amazon.com/codepipeline/latest/userguide/ecs-cd-pipeline.html).

### Connecting through the instance through SSM

You need this IAM Role to be able to connect through SSM

```
AmazonEC2RoleforSSM
```
