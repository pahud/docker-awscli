AWS CLI in minimal footprint
============================

Automatic built minimal docker image for AWS CLI based on Alpine Linux (`library/alpine:latest`), around 77MB.

## Usage

configure an alias in your `~/.bash_profile`

```
alias aws="docker run -v $HOME:/root -v `pwd`:/workdir  pahud/awscli:latest"
```

in a new terminal, you can just run `aws` like this

```
$ aws sts get-caller-identity
{
    "Account": "123456789",
    "UserId": "XXXXXXXXXXXXXXX",
    "Arn": "arn:aws:iam::123456789:user/pahud"
}
```


Refer to <http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html> for detail.

## More information
Alpine Linux: <https://registry.hub.docker.com/_/alpine/>

AWS cli: <https://aws.amazon.com/cli/>



## Build Your Own AWS CLI Docker image with AWS CDK and Automate the pipeline

This sample will generate a daily auto image building stack for you with AWS CDK(see this [tweet](https://twitter.com/pahudnet/status/1193576209977724931) for more details).

```js

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
```

