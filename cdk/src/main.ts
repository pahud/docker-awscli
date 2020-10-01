import * as cdk from '@aws-cdk/core';
import * as codebuild from '@aws-cdk/aws-codebuild';
import * as events from '@aws-cdk/aws-events';
import { ScheduledBuild } from '@pahud/aws-codebuild-patterns';


export class MyStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: cdk.StackProps = {}) {
    super(scope, id, props);

    new ScheduledBuild(scope, 'ScheduledBuildAwsCli', {
      source: codebuild.Source.gitHub({
        owner: 'pahud',
        repo: 'docker-awscli'
      }),
      schedule: events.Schedule.rate(cdk.Duration.days(1)),
      repositoryName: 'awscli-daily-autobuild'
    })
  }
}

const app = new cdk.App();
new MyStack(app, 'my-stack');
app.synth();



