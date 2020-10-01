const {
  AwsCdkTypeScriptApp,
  Semver
} = require('projen');

const project = new AwsCdkTypeScriptApp({
  cdkVersion: "1.63.0",
  name: "cdk-docker-awscli",
  authorName: "Pahud Hsieh",
  authorEmail: "pahudnet@gmail.com",
  repository: "https://github.com/pahud/docker-awscli.git",
  cdkDependencies: [
    "@aws-cdk/core",
    "@aws-cdk/aws-codebuild",
    "@aws-cdk/aws-events-targets",
    "@aws-cdk/aws-sns",
    "@aws-cdk/aws-sns-subscriptions",
    "@aws-cdk/aws-sqs",
  ]
});

project.addDependencies({
  "@pahud/aws-codebuild-patterns": Semver.caret('1.1.0'),
});



const common_exclude = ['cdk.out', 'cdk.context.json', 'docker-compose.yml', 'images', 'yarn-error.log'];
project.npmignore.exclude(...common_exclude);
project.gitignore.exclude(...common_exclude);

project.synth();
