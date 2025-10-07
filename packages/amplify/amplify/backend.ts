import * as cdk from "aws-cdk-lib";
import * as codebuild from "aws-cdk-lib/aws-codebuild";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecr from "aws-cdk-lib/aws-ecr";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as lambda from "aws-cdk-lib/aws-lambda-nodejs";
import * as iam from "aws-cdk-lib/aws-iam";
import * as secretsmanager from "aws-cdk-lib/aws-secretsmanager";
import * as eventbridge from "aws-cdk-lib/aws-events";
import * as eventbridgetargets from "aws-cdk-lib/aws-events-targets";
import * as url from "node:url";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";

import { defineBackend } from "@aws-amplify/backend";

const backend = defineBackend({});

const TelemetryBackendStack = backend.createStack("TelemetryBackend");

const TelemetryBackendSecretsManagerPrivKey = new secretsmanager.Secret(
  TelemetryBackendStack,
  "HeliosTelemetryBackendSSL/PrivateKey",
  {
    secretName:
      "HeliosTelemetryBackendSSL/PrivateKey" + backend.stack.stackName,
  },
);
const TelemetryBackendSecretsManagerChain = new secretsmanager.Secret(
  TelemetryBackendStack,
  "HeliosTelemetryBackendSSL/Chain",
  { secretName: "HeliosTelemetryBackendSSL/Chain" + backend.stack.stackName },
);
const TelemetryBackendSecretsManagerCertificate = new secretsmanager.Secret(
  TelemetryBackendStack,
  "HeliosTelemetryBackendSSL/Certificate",
  {
    secretName:
      "HeliosTelemetryBackendSSL/Certificate" + backend.stack.stackName,
  },
);

const TelemetryBackendSecretsManagerMQTTCredentials = new secretsmanager.Secret(
  TelemetryBackendStack,
  "HeliosTelemetryMQTTCredentials",
  {
    secretName: "HeliosTelemetryMQTTCredentials" + backend.stack.stackName,
    secretObjectValue: {
      password: cdk.SecretValue.unsafePlainText(""),
      username: cdk.SecretValue.unsafePlainText(""),
    },
  },
);

const TelemetryBackendSecretsDatabaseCredentials = new secretsmanager.Secret(
  TelemetryBackendStack,
  "HeliosTelemetryDBCredentials",
  {
    secretName: "HeliosTelemetryDBCredentials" + backend.stack.stackName,
    secretObjectValue: {
      POSTGRES_PASSWORD: cdk.SecretValue.unsafePlainText(""),
      POSTGRES_USERNAME: cdk.SecretValue.unsafePlainText(""),
    },
  },
);

const TelemetryBackendImageRepository = new ecr.Repository(
  TelemetryBackendStack,
  "TelemetryBackendImageRepository",
);

// Build image for our backend container
const TelemetryBackendCodeBuildProject = new codebuild.Project(
  TelemetryBackendStack,
  "TelemetryBackendCodeBuildProject",
  {
    // buildSpec: codebuild.BuildSpec.fromObjectToYaml({}),
    buildSpec: codebuild.BuildSpec.fromSourceFilename(
      "packages/amplify/amplify/buildspec.yml",
    ),
    environment: {
      buildImage: codebuild.LinuxBuildImage.STANDARD_5_0,
      computeType: codebuild.ComputeType.MEDIUM,
      environmentVariables: {
        AWS_ACCOUNT_ID: {
          value: cdk.Stack.of(TelemetryBackendStack).account,
        },
        AWS_DEFAULT_REGION: {
          value: cdk.Stack.of(TelemetryBackendStack).region,
        },
        IMAGE_REPO_NAME: {
          value: TelemetryBackendImageRepository.repositoryName,
        },
        IMAGE_REPO_URI: {
          value: TelemetryBackendImageRepository.repositoryUri,
        },
        IMAGE_TAG: {
          value: "latest",
        },
      },
      privileged: true,
    },
    role: new iam.Role(TelemetryBackendStack, "TelemetryBackendCodeBuildRole", {
      assumedBy: new iam.ServicePrincipal("codebuild.amazonaws.com"),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName("SecretsManagerReadWrite"),
      ],
    }),
    source: codebuild.Source.gitHub({
      branchOrRef: "main",
      owner: "UCSolarCarTeam",
      repo: "Helios-Telemetry",
      webhook: true,
      webhookFilters: [
        codebuild.FilterGroup.inEventOf(
          codebuild.EventAction.PULL_REQUEST_MERGED,
          codebuild.EventAction.PUSH,
        )
          .andBranchIs("main")
          .andFilePathIs("packages/server/*"),
      ],
    }),
  },
);

TelemetryBackendImageRepository.grantPush(TelemetryBackendCodeBuildProject);

const packetDataTable = new dynamodb.Table(
  TelemetryBackendStack,
  "packet_data_table",
  {
    billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
    removalPolicy: cdk.RemovalPolicy.RETAIN_ON_UPDATE_OR_DELETE,
    sortKey: { name: "timestamp", type: dynamodb.AttributeType.NUMBER },
  },
);

const lapDataTable = new dynamodb.Table(
  TelemetryBackendStack,
  "lap_data_table",
  {
    billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    partitionKey: { name: "Rfid", type: dynamodb.AttributeType.STRING },
    removalPolicy: cdk.RemovalPolicy.RETAIN_ON_UPDATE_OR_DELETE,
    sortKey: { name: "timestamp", type: dynamodb.AttributeType.NUMBER },
  },
);

const driverDataTable = new dynamodb.Table(
  TelemetryBackendStack,
  "driver_data_table",
  {
    billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    partitionKey: { name: "Rfid", type: dynamodb.AttributeType.STRING },
    removalPolicy: cdk.RemovalPolicy.RETAIN_ON_UPDATE_OR_DELETE,
  },
);

const gpsCalculatedLapDataTable = new dynamodb.Table(
  TelemetryBackendStack,
  "gps_lap_count_table",
  {
    billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    partitionKey: { name: "Rfid", type: dynamodb.AttributeType.STRING },
    removalPolicy: cdk.RemovalPolicy.RETAIN_ON_UPDATE_OR_DELETE,
    sortKey: { name: "timestamp", type: dynamodb.AttributeType.NUMBER },
  },
);

const TelemetryECSTaskDefinition = new ecs.Ec2TaskDefinition(
  TelemetryBackendStack,
  "TelemetryECSTaskDefinition",
);

// Create IAM role for EC2 instance
const TelemetryBackendVPC = new ec2.Vpc(
  TelemetryBackendStack,
  "TelemetryBackendVPC",
  {
    maxAzs: 1,
    natGateways: 0,
  },
);

// const ec2Role = new iam.Role(TelemetryBackendStack, "TelemetryDBEC2Role", {
//   assumedBy: new iam.ServicePrincipal("ec2.amazonaws.com"),
//   managedPolicies: [
//     iam.ManagedPolicy.fromAwsManagedPolicyName(
//       "AmazonEC2ContainerRegistryReadOnly",
//     ),
//     iam.ManagedPolicy.fromAwsManagedPolicyName("SecretsManagerReadWrite"),
//     iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonSSMManagedInstanceCore"), // allows users to connect to instance using AWS SSM
//   ],
// });

// const dbVolume = new ec2.CfnVolume(TelemetryBackendStack, "TimescaleDBVolume", {
//   availabilityZone: TelemetryBackendVPC.availabilityZones[0],
//   size: 50,
//   volumeType: "gp3",
// });

// dbVolume.cfnOptions.deletionPolicy = cdk.CfnDeletionPolicy.RETAIN;

// const dbSecurityGroup = new ec2.SecurityGroup(
//   TelemetryBackendStack,
//   "TelemetryDBSecurityGroup",
//   {
//     allowAllOutbound: true,
//     description: "Security group for TimescaleDB EC2 instance",
//     vpc: TelemetryBackendVPC,
//   },
// );

// // Open port 5432 (Postgres)
// dbSecurityGroup.addIngressRule(
//   ec2.Peer.anyIpv4(), // once we know things work we can make this so that only the ECS cluster can access it
//   ec2.Port.tcp(5432),
//   "Allow Postgres access",
// );

// // Allow SSH access on port 22
// dbSecurityGroup.addIngressRule(
//   ec2.Peer.anyIpv4(),
//   ec2.Port.tcp(22),
//   "Allow SSH access",
// );

// const keyPair = ec2.KeyPair.fromKeyPairName(
//   TelemetryBackendStack,
//   "KeyPair",
//   "Burton",
// );
// // policy to allow users to connect to instance via ssm, we can use this in the future to grant users permissions to start a session
// // add this policy in the future to users' roles so they can start an ssm session to connect to the instance instead of having to
// // create a .pem file and allow specific ips / users to connect we use this instead.
// const ssmUserPolicy = new iam.Policy(TelemetryBackendStack, "SSMUserPolicy", {
//   statements: [
//     new iam.PolicyStatement({
//       actions: [
//         "ssm:StartSession",
//         "ssm:DescribeSessions",
//         "ssm:GetConnectionStatus",
//       ],
//       resources: ["*"], // allow on all instances; you can narrow this later
//     }),
//   ],
// });

// const dbInstance = new ec2.Instance(
//   TelemetryBackendStack,
//   "TelemetryDBInstance",
//   {
//     instanceType: ec2.InstanceType.of(
//       ec2.InstanceClass.T3,
//       ec2.InstanceSize.SMALL,
//     ),
//     keyPair: keyPair,
//     machineImage: ec2.MachineImage.latestAmazonLinux2023(),
//     role: ec2Role,
//     securityGroup: dbSecurityGroup,
//     vpc: TelemetryBackendVPC,
//     vpcSubnets: {
//       subnetType: ec2.SubnetType.PUBLIC,
//     },
//   },
// );

// // Attach EBS
// const dbVolumeAttachment = new ec2.CfnVolumeAttachment(
//   TelemetryBackendStack,
//   "TimeScaleDBVolumeAttachment",
//   {
//     device: "/dev/xvdh",
//     instanceId: dbInstance.instanceId,
//     volumeId: dbVolume.ref,
//   },
// );

// dbVolumeAttachment.cfnOptions.deletionPolicy = cdk.CfnDeletionPolicy.RETAIN;

// dbInstance.addUserData(`
// #!/bin/bash
// # Update system & install prerequisites
// yum update -y
// amazon-linux-extras enable docker
// yum install -y docker git jq awscli
// systemctl enable docker
// systemctl start docker

// sudo systemctl enable amazon-ssm-agent
// sudo systemctl start amazon-ssm-agent

// # Install Docker Compose
// curl -L "https://github.com/docker/compose/releases/download/v2.23.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
// chmod +x /usr/local/bin/docker-compose

// # Mount EBS volume
// if ! blkid /dev/xvdh; then mkfs -t xfs /dev/xvdh; fi
// mkdir -p /var/lib/timescaledb/data
// mount /dev/xvdh /var/lib/timescaledb/data
// echo '/dev/xvdh /var/lib/timescaledb/data xfs defaults,nofail 0 2' >> /etc/fstab
// chown -R ec2-user:ec2-user /var/lib/timescaledb/data

// # Clone your repo
// cd /home/ec2-user
// git clone https://github.com/UCSolarCarTeam/Helios-Telemetry.git
// cd Helios-Telemetry/packages/db

// # Pull DB secrets
// SECRET_NAME="${TelemetryBackendSecretsDatabaseCredentials.secretName}"
// DB_CREDS=$(aws secretsmanager get-secret-value --secret-id $SECRET_NAME --query SecretString --output text)
// POSTGRES_USERNAME=$(echo $DB_CREDS | jq -r .POSTGRES_USERNAME)
// POSTGRES_PASSWORD=$(echo $DB_CREDS | jq -r .POSTGRES_PASSWORD)

// # Create .env file for Docker Compose has to use sudo sh for permissions
// sudo sh -c 'cat <<EOF > /home/ec2-user/Helios-Telemetry/packages/db/.db.env
// POSTGRES_USER='"$POSTGRES_USERNAME"'
// POSTGRES_PASSWORD='"$POSTGRES_PASSWORD"'
// POSTGRES_DB=postgres
// EOF'

// # Run Docker Compose
// sudo curl -L "https://github.com/docker/compose/releases/download/v2.23.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
// sudo chmod +x /usr/local/bin/docker-compose
// sudo docker-compose up -d`);

TelemetryECSTaskDefinition.addContainer("TheContainer", {
  environment: {
    // DB_HOST: dbInstance.instancePrivateIp,
    DB_NAME: "postgres",
    DB_PORT: "5432",
    DRIVER_TABLE_NAME: driverDataTable.tableName,
    GPS_CALCULATED_LAP_DATA_TABLE: gpsCalculatedLapDataTable.tableName,
    LAP_TABLE_NAME: lapDataTable.tableName,
    PACKET_TABLE_NAME: packetDataTable.tableName,
  },
  image: ecs.ContainerImage.fromEcrRepository(TelemetryBackendImageRepository),
  logging: ecs.LogDrivers.awsLogs({ streamPrefix: "TelemetryBackend" }),
  memoryLimitMiB: 900,
  portMappings: [
    {
      containerPort: 3001,
      hostPort: 3001,
      protocol: ecs.Protocol.TCP,
    },
    {
      containerPort: 80,
      hostPort: 80,
      protocol: ecs.Protocol.TCP,
    },
    {
      containerPort: 1883,
      hostPort: 1883,
      protocol: ecs.Protocol.TCP,
    },
  ],
  secrets: {
    CERTIFICATE: ecs.Secret.fromSecretsManager(
      TelemetryBackendSecretsManagerCertificate,
    ),
    CHAIN: ecs.Secret.fromSecretsManager(TelemetryBackendSecretsManagerChain),
    MQTT_PASSWORD: ecs.Secret.fromSecretsManager(
      TelemetryBackendSecretsManagerMQTTCredentials,
      "password",
    ),
    MQTT_USERNAME: ecs.Secret.fromSecretsManager(
      TelemetryBackendSecretsManagerMQTTCredentials,
      "username",
    ),
    POSTGRES_PASSWORD: ecs.Secret.fromSecretsManager(
      TelemetryBackendSecretsDatabaseCredentials,
      "POSTGRES_PASSWORD",
    ), // pass DB password
    POSTGRES_USERNAME: ecs.Secret.fromSecretsManager(
      TelemetryBackendSecretsDatabaseCredentials,
      "POSTGRES_USERNAME",
    ), // pass DB username,
    PRIVATE_KEY: ecs.Secret.fromSecretsManager(
      TelemetryBackendSecretsManagerPrivKey,
    ),
  },
});

// Allow ECS Task to read the Secrets Manager Store
TelemetryBackendSecretsManagerPrivKey.grantRead(
  TelemetryECSTaskDefinition.taskRole,
);
TelemetryBackendSecretsManagerChain.grantRead(
  TelemetryECSTaskDefinition.taskRole,
);
TelemetryBackendSecretsManagerCertificate.grantRead(
  TelemetryECSTaskDefinition.taskRole,
);
TelemetryBackendSecretsManagerMQTTCredentials.grantRead(
  TelemetryECSTaskDefinition.taskRole,
);

const TelemetryBackendVPCSecurityGroup = ec2.SecurityGroup.fromSecurityGroupId(
  TelemetryBackendStack,
  "TelemetryBackendSecurityGroup",
  TelemetryBackendVPC.vpcDefaultSecurityGroup,
);

TelemetryBackendVPCSecurityGroup.addIngressRule(
  ec2.Peer.anyIpv4(),
  ec2.Port.tcp(3001),
  "Backend - Allow inbound traffic on port 3001",
  true,
);
TelemetryBackendVPCSecurityGroup.addIngressRule(
  ec2.Peer.anyIpv4(),
  ec2.Port.tcp(80),
  "Certbot - Allow inbound traffic on port 80",
  true,
);
TelemetryBackendVPCSecurityGroup.addIngressRule(
  ec2.Peer.anyIpv4(),
  ec2.Port.tcp(1883),
  "Aedes - Allow inbound traffic on port 1883",
  true,
);

const TelemetryECSCluster = new ecs.Cluster(
  TelemetryBackendStack,
  "TelemetryBackendCluster",
  {
    capacity: {
      allowAllOutbound: true,

      associatePublicIpAddress: true,
      desiredCapacity: 1,
      /**
       * ******EXTREME CAUTION:*******
       *
       * ENSURE THE INSTANCE TYPE BELOW IS SET CAREFULLY.
       * THE SPECIFIED RESOURCE WILL BE DEPLOYED AUTOMATICALLY AND CHARGED $$$ :(
       */
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T2,
        ec2.InstanceSize.MICRO,
      ),
      maxCapacity: 1,
      minCapacity: 1,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PUBLIC,
      },
    },
    vpc: TelemetryBackendVPC,
  },
);

const TelemetryECSService = new ecs.Ec2Service(
  TelemetryBackendStack,
  "TelemetryECSService",
  {
    cluster: TelemetryECSCluster,
    desiredCount: 1,
    enableExecuteCommand: true,
    maxHealthyPercent: 100,
    minHealthyPercent: 0,
    taskDefinition: TelemetryECSTaskDefinition,
  },
);

TelemetryECSService.cluster.connections.allowFromAnyIpv4(
  ec2.Port.tcp(3001),
  "Backend - Allow inbound traffic on port 3001",
);
TelemetryECSService.cluster.connections.allowFromAnyIpv4(
  ec2.Port.tcp(80),
  "Certbot - Allow inbound traffic on port 80",
);
TelemetryECSService.cluster.connections.allowFromAnyIpv4(
  ec2.Port.tcp(1883),
  "Aedes - Allow inbound traffic on port 1883",
);

// Give DynamoDB Permissions to hte packet data and lap data
const dynamoDbAccessPolicy = new iam.PolicyStatement({
  actions: [
    "dynamodb:PutItem",
    "dynamodb:GetItem",
    "dynamodb:UpdateItem",
    "dynamodb:Scan",
    "dynamodb:Query",
  ],
  effect: iam.Effect.ALLOW,

  resources: [
    packetDataTable.tableArn,
    `${packetDataTable.tableArn}/index/type-timestamp-index`,
    lapDataTable.tableArn,
    driverDataTable.tableArn,
    gpsCalculatedLapDataTable.tableArn,
  ],
});

// Attach the policy to the ECS Task Role
TelemetryECSTaskDefinition.taskRole.addToPrincipalPolicy(dynamoDbAccessPolicy);

// const SolarCarHostedZone = route53.HostedZone.fromLookup(
const SolarCarHostedZone = route53.HostedZone.fromHostedZoneAttributes(
  TelemetryBackendStack,
  "TelemetryBackendHostedZone",
  {
    hostedZoneId: "Z00168143RCUWIOU5XRGV",
    zoneName: "calgarysolarcar.ca",
  },
);

// Renew Certificate Lambda
const TelemetryBackendRenewCertificateLambda = new lambda.NodejsFunction(
  TelemetryBackendStack,
  "RenewCertificateLambda",
  {
    entry: url.fileURLToPath(
      new URL("./functions/RenewCertificate/handler.ts", import.meta.url),
    ),
    environment: {
      DNS_RECORD: "aedes.calgarysolarcar.ca",
      HOSTED_ZONE_ID: SolarCarHostedZone.hostedZoneId,
      SECRET_CERT_NAME: TelemetryBackendSecretsManagerCertificate.secretName,
      SECRET_CHAIN_NAME: TelemetryBackendSecretsManagerChain.secretName,
      SECRET_PRIVKEY_NAME: TelemetryBackendSecretsManagerPrivKey.secretName,
    },
    timeout: cdk.Duration.minutes(1),
  },
);

// Events
const TelemetryBackendTriggerCertRenewLambda = new eventbridge.Rule(
  TelemetryBackendStack,
  "BatchTestCheckEventRule",
  { schedule: eventbridge.Schedule.cron({ day: "1", hour: "9" }) },
);

TelemetryBackendTriggerCertRenewLambda.addTarget(
  new eventbridgetargets.LambdaFunction(TelemetryBackendRenewCertificateLambda),
);

// Allow Cert update lambda to update the hosted zone for SSL certificate renewal verification
TelemetryBackendRenewCertificateLambda.addToRolePolicy(
  new iam.PolicyStatement({
    actions: ["route53:ChangeResourceRecordSets"],
    resources: [SolarCarHostedZone.hostedZoneArn],
  }),
);

SolarCarHostedZone.grantDelegation(TelemetryBackendRenewCertificateLambda);
// Allow lambda to edit Route 53 records

// Allow Cert Update Lambda to write to the Secrets Manager Store
TelemetryBackendSecretsManagerPrivKey.grantWrite(
  TelemetryBackendRenewCertificateLambda,
);
TelemetryBackendSecretsManagerChain.grantWrite(
  TelemetryBackendRenewCertificateLambda,
);
TelemetryBackendSecretsManagerCertificate.grantWrite(
  TelemetryBackendRenewCertificateLambda,
);

// Allow Cert Update Lambda to Restart the ECS Service
// TelemetryECSService.taskDefinition.taskRole.grant(
//   backend.RenewCertificate.resources.lambda,
//   ["ecs:UpdateService"]
// );

// new route53.ARecord(TelemetryBackendStack, "AedesARecord", {
//   target: route53.RecordTarget.fromIpAddresses(
//     TelemetryECSCluster.vpc.publicSubnets[0].ipv4CidrBlock
//   ),
//   zone: SolarCarHostedZone,
//   deleteExisting: true,
//   recordName: "aedes",
// });

// const elasticIp = new ec2.CfnEIP(TelemetryBackendStack, 'EIP', {
//   domain: 'vpc',
//   instanceId: instance.instanceId,
// });

// new route53.ARecord(TelemetryBackendStack, "TelemetryBackendARecord", {
//   zone: SolarCarHostedZone,
//   deleteExisting: true,
//   recordName: "aedes",
//   target: route53.RecordTarget.fromIpAddresses("")
// });
//     domainName: "calgarysolarcar.ca",
//   },
// )

// const elasticIp = new ec2.CfnEIP(TelemetryBackendStack, 'EIP', {
//   domain: 'vpc',
//   instanceId: instance.instanceId,
// });

// new route53.ARecord(TelemetryBackendStack, "TelemetryBackendARecord", {
//   zone: SolarCarHostedZone,
//   deleteExisting: true,
//   recordName: "aedes",
//   target: route53.RecordTarget.fromIpAddresses(
//     TelemetryECSCluster.[0].ipv4CidrBlock,
//   ),
// });

// // const TelemetryBackendEC2 = new ec2.Instance(TelemetryBackendStack, "TelemetryBackendEC2", {instanceType: ec2.InstanceType.})
