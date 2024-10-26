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

const TelemetryBackendImageRepository = new ecr.Repository(
  TelemetryBackendStack,
  "TelemetryBackendImageRepository",
);

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

const TelemetryECSTaskDefintion = new ecs.Ec2TaskDefinition(
  TelemetryBackendStack,
  "TelemetryECSTaskDefintion",
  {
    volumes: [
      {
        efsVolumeConfiguration: {
          fileSystemId: "fs-0ef2c6e2055ced2c7",
          rootDirectory: "/mnt/efs",
        },
        name: "TelemetryBackendEFS",
      },
    ],
  },
);

TelemetryECSTaskDefintion.addContainer("TheContainer", {
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
    PRIVATE_KEY: ecs.Secret.fromSecretsManager(
      TelemetryBackendSecretsManagerPrivKey,
    ),
  },
});

// Allow ECS Task to read the Secrets Manager Store
TelemetryBackendSecretsManagerPrivKey.grantRead(
  TelemetryECSTaskDefintion.taskRole,
);
TelemetryBackendSecretsManagerChain.grantRead(
  TelemetryECSTaskDefintion.taskRole,
);
TelemetryBackendSecretsManagerCertificate.grantRead(
  TelemetryECSTaskDefintion.taskRole,
);

const TelemetryBackendVPC = new ec2.Vpc(
  TelemetryBackendStack,
  "TelemetryBackendVPC",
  {
    maxAzs: 1,
    natGateways: 0,
  },
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
    maxHealthyPercent: 100,
    minHealthyPercent: 0,
    taskDefinition: TelemetryECSTaskDefintion,
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

//Give DynamoDB Permissions to hte packet data and lap data
const dynamoDbAccessPolicy = new iam.PolicyStatement({
  actions: [
    "dynamodb:PutItem",
    "dynamodb:GetItem",
    "dynamodb:Scan",
    "dynamodb:Query",
  ],
  effect: iam.Effect.ALLOW,

  resources: [
    `arn:aws:dynamodb:${cdk.Stack.of(TelemetryBackendStack).region}:${cdk.Stack.of(TelemetryBackendStack).account}:table/packet_data_table`,
    `arn:aws:dynamodb:${cdk.Stack.of(TelemetryBackendStack).region}:${cdk.Stack.of(TelemetryBackendStack).account}:table/lap_data_table`,
  ],
});

// Attach the policy to the ECS Task Role
TelemetryECSTaskDefintion.taskRole.addToPrincipalPolicy(dynamoDbAccessPolicy);

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
