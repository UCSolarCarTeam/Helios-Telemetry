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

const a = codebuild.Source.gitHub({
  owner: "UCSolarCarTeam",
  repo: "Helios-Telemetry",
  branchOrRef: "main",
  webhook: true,
});

const TelemetryBackendCodeBuildProject = new codebuild.Project(
  TelemetryBackendStack,
  "TelemetryBackendCodeBuild",
  {
    buildSpec: codebuild.BuildSpec.fromSourceFilename("buildspec.yml"),
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

const TelemetryDeployAction = new codepipeline_actions.EcsDeployAction({
  actionName: "TelemetryDeployAction",
  service: new ecs.Ec2Service(
    TelemetryBackendStack,
    "TelemetryBackendService",
    {
      cluster: new ecs.Cluster(
        TelemetryBackendStack,
        "TelemetryBackendCluster",
      ),
      taskDefinition: new ecs.Ec2TaskDefinition(
        TelemetryBackendStack,
        "TelemetryBackendTaskDefinition",
      ),
      desiredCount: 1,
    },
  ),
  input: TelemetryBuildOutput,
});

const TelemetryBackendPipeline = new codepipeline.Pipeline(
  TelemetryBackendStack,
  "TelemetryBackendPipeline",
  {
    restartExecutionOnUpdate: true,
    stages: [
      {
        stageName: "Source",
        actions: [TelemetrySourceAction],
      },
      {
        stageName: "Build",
        actions: [TelemetryBuildAction],
      },
      {
        stageName: "Deploy",
        actions: [TelemetryDeployAction],
      },
    ],
  },
);

// const TelemetryBackendEC2 = new ec2.Instance(TelemetryBackendStack, "TelemetryBackendEC2", {instanceType: ec2.InstanceType.})
