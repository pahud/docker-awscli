
import cdk = require('@aws-cdk/core');
import codebuild = require('@aws-cdk/aws-codebuild');
import events = require('@aws-cdk/aws-events');
import { ScheduledBuild } from '@pahud/aws-codebuild-patterns';


const app = new cdk.App()

new ScheduledBuild(app, 'ScheduledBuild', {
  source: codebuild.Source.gitHub({
    owner: 'pahud',
    repo: 'docker-awscli'
  }),
  schedule: events.Schedule.rate(cdk.Duration.days(1)),
  repositoryName: 'awscli-daily-autobuild'
})