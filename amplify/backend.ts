import * as cdk from "aws-cdk-lib";
import * as codebuild from "aws-cdk-lib/aws-codebuild";
import * as codepipeline from "aws-cdk-lib/aws-codepipeline";
import * as codepipeline_actions from "aws-cdk-lib/aws-codepipeline-actions";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecr from "aws-cdk-lib/aws-ecr";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as imagebuilder from "aws-cdk-lib/aws-imagebuilder";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as route53 from "aws-cdk-lib/aws-route53";

import { defineBackend } from "@aws-amplify/backend";

const backend = defineBackend({});

const TelemetryBackendStack = backend.createStack("TelemetryBackend");

const TelemetryBackendImageRepository = new ecr.Repository(
  TelemetryBackendStack,
  "TelemetryBackendImageRepository",
);

const TelemetryBackendCodeBuildProject = new codebuild.Project(
  TelemetryBackendStack,
  "TelemetryBackendCodeBuildProject",
  {
    // buildSpec: codebuild.BuildSpec.fromObjectToYaml({}),
    buildSpec: codebuild.BuildSpec.fromSourceFilename("amplify/buildspec.yml"),
    source: codebuild.Source.gitHub({
      owner: "UCSolarCarTeam",
      repo: "Helios-Telemetry",
      branchOrRef: "main",
      webhook: true,
      webhookFilters: [
        codebuild.FilterGroup.inEventOf(
          codebuild.EventAction.PULL_REQUEST_MERGED,
          codebuild.EventAction.PUSH,
        ).andBranchIs("main"),
      ],
      webhookFilters: [
        codebuild.FilterGroup.inEventOf(
          codebuild.EventAction.PULL_REQUEST_MERGED,
          codebuild.EventAction.PUSH,
        ).andBranchIs("main"),
      ],
    }),

    environment: {
      buildImage: codebuild.LinuxBuildImage.STANDARD_5_0,
      privileged: true,
      computeType: codebuild.ComputeType.MEDIUM,
      computeType: codebuild.ComputeType.MEDIUM,
      environmentVariables: {
        AWS_DEFAULT_REGION: {
          value: cdk.Stack.of(TelemetryBackendStack).region,
        },
        AWS_ACCOUNT_ID: {
          value: cdk.Stack.of(TelemetryBackendStack).account,
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
    },
  },
);

TelemetryBackendImageRepository.grantPush(TelemetryBackendCodeBuildProject);

const TelemetryECSTaskDefintion = new ecs.Ec2TaskDefinition(
  TelemetryBackendStack,
  "TelemetryECSTaskDefintion",
  {},
);
TelemetryECSTaskDefintion.addContainer("TheContainer", {
  image: ecs.ContainerImage.fromEcrRepository(TelemetryBackendImageRepository),
  memoryLimitMiB: 256,
  portMappings: [
    {
      containerPort: 3001,
      hostPort: 3001,
      protocol: ecs.Protocol.TCP,
    },
  ],
});

const TelemetryBackendVPC = new ec2.Vpc(
  TelemetryBackendStack,
  "TelemetryBackendVPC",
  {
    maxAzs: 1,
    natGateways: 0,
  },
);

const TelemetryBackendVPCSecurityGroup = new ec2.SecurityGroup(
  TelemetryBackendStack,
  "TelemetryBackendSecurityGroup",
  {
    vpc: TelemetryBackendVPC,
  },
);
TelemetryBackendVPCSecurityGroup.addIngressRule(
  ec2.Peer.anyIpv4(),
  ec2.Port.tcp(3001),
  "Allow inbound traffic on port 3001",
);

const TelemetryECSCluster = new ecs.Cluster(
  TelemetryBackendStack,
  "TelemetryBackendCluster",
  {
    vpc: TelemetryBackendVPC,
    capacity: {
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

      desiredCapacity: 1,
      maxCapacity: 1,
      minCapacity: 1,
      allowAllOutbound: true,
      associatePublicIpAddress: true,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PUBLIC,
      },
    },
  },
);

const TelemetryECSService = new ecs.Ec2Service(
  TelemetryBackendStack,
  "TelemetryECSService",
  {
    cluster: TelemetryECSCluster,
    taskDefinition: TelemetryECSTaskDefintion,
    desiredCount: 1,
  },
);
// TelemetryECSTaskDefintion.grantRun(TelemetryECSCluster.gran);

// const SolarCarHostedZone = route53.HostedZone.fromLookup(
// const SolarCarHostedZone = route53.HostedZone.fromLookup(
//   TelemetryBackendStack,
//   "TelemetryBackendHostedZone",
//   "TelemetryBackendHostedZone",
//   {
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
//   target: route53.RecordTarget.fromIpAddresses("")
// });

// // const TelemetryBackendEC2 = new ec2.Instance(TelemetryBackendStack, "TelemetryBackendEC2", {instanceType: ec2.InstanceType.})
