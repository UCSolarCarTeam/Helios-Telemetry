import * as cdk from "aws-cdk-lib";
import * as codebuild from "aws-cdk-lib/aws-codebuild";
import * as codepipeline from "aws-cdk-lib/aws-codepipeline";
import * as codepipeline_actions from "aws-cdk-lib/aws-codepipeline-actions";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecr from "aws-cdk-lib/aws-ecr";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as imagebuilder from "aws-cdk-lib/aws-imagebuilder";

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
    buildSpec: codebuild.BuildSpec.fromSourceFilename("amplify/buildspec.yml"),
    source: codebuild.Source.gitHub({
      owner: "UCSolarCarTeam",
      repo: "Helios-Telemetry",
      branchOrRef: "main",
      webhook: true,
    }),

    environment: {
      buildImage: codebuild.LinuxBuildImage.STANDARD_5_0,
      privileged: true,
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

const TelemetrySourceOutput = new codepipeline.Artifact(
  "TelemetrySourceOutput",
);

const TelemetryBuildOutput = new codepipeline.Artifact("TelemetryBuildOutput");

const TelemetrySourceAction = new codepipeline_actions.GitHubSourceAction({
  actionName: "TelemetrySourceAction",
  owner: "UCSolarCarTeam",
  repo: "Helios-Telemetry",
  branch: "main",
  oauthToken: cdk.SecretValue.secretsManager("HeliosTelemetrySecret").toJSON()[
    "HeliosTelemetryOAuth"
  ],
  output: TelemetrySourceOutput,
});

const TelemetryBuildAction = new codepipeline_actions.CodeBuildAction({
  actionName: "TelemetryBuildAction",
  project: TelemetryBackendCodeBuildProject,
  input: TelemetrySourceOutput,
  outputs: [TelemetryBuildOutput],
});

const TelemetryECSTaskDefintion = new ecs.Ec2TaskDefinition(
  TelemetryBackendStack,
  "TelemetryECSTaskDefintion",
);
TelemetryECSTaskDefintion.addContainer("TheContainer", {
  image: ecs.ContainerImage.fromEcrRepository(TelemetryBackendImageRepository),
  memoryLimitMiB: 256,
});

const TelemetryECSCluster = new ecs.Cluster(
  TelemetryBackendStack,
  "TelemetryBackendCluster",
);

TelemetryECSCluster.addCapacity("DefaultAutoScalingGroupCapacity", {
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
});

// const TelemetryDeployAction = new codepipeline_actions.EcsDeployAction({
//   actionName: "TelemetryDeployAction",
//   service: new ecs.Ec2Service(
//     TelemetryBackendStack,
//     "TelemetryBackendService",
//     {
//       cluster: TelemetryECSCluster,
//       taskDefinition: TelemetryECSTaskDefintion,
//       desiredCount: 1,
//       // assignPublicIp: true,
//     },
//   ),
//   input: TelemetryBuildOutput,
// });

// const TelemetryBackendPipeline = new codepipeline.Pipeline(
//   TelemetryBackendStack,
//   "TelemetryBackendPipeline",
//   {
//     restartExecutionOnUpdate: true,
//     stages: [
//       {
//         stageName: "Source",
//         actions: [TelemetrySourceAction],
//       },
//       {
//         stageName: "Build",
//         actions: [TelemetryBuildAction],
//       },
//       {
//         stageName: "Deploy",
//         actions: [TelemetryDeployAction],
//       },
//     ],
//   },
// );

// // const TelemetryBackendEC2 = new ec2.Instance(TelemetryBackendStack, "TelemetryBackendEC2", {instanceType: ec2.InstanceType.})
