const {
  AwsCdkTypeScriptApp,
  GithubWorkflow,
  Semver
} = require('projen');

const AUTOMATION_TOKEN = 'GITHUB_TOKEN';


const project = new AwsCdkTypeScriptApp({
  cdkVersion: "1.63.0",
  name: "cdk-docker-awscli",
  authorName: "Pahud Hsieh",
  authorEmail: "pahudnet@gmail.com",
  repository: "https://github.com/pahud/docker-awscli.git",
  dependabot: false,
  antitamper: false,
  cdkDependencies: [
    "@aws-cdk/core",
    "@aws-cdk/aws-codebuild",
    "@aws-cdk/aws-events",
    "@aws-cdk/aws-events-targets",
    "@aws-cdk/aws-sns",
    "@aws-cdk/aws-sns-subscriptions",
    "@aws-cdk/aws-sqs",
  ]
});

project.addDependencies({
  "@pahud/aws-codebuild-patterns": Semver.caret('1.1.0'),
});


// create a custom projen and yarn upgrade workflow
const workflow = new GithubWorkflow(project, 'ProjenYarnUpgrade');

workflow.on({
  schedule: [{
    cron: '0 6 * * *'
  }], // 6am every day
  workflow_dispatch: {}, // allow manual triggering
});

workflow.addJobs({
  upgrade: {
    'runs-on': 'ubuntu-latest',
    'steps': [
      ...project.workflowBootstrapSteps,

      // yarn upgrade
      {
        run: `yarn upgrade`
      },

      // upgrade projen
      {
        run: `yarn projen:upgrade`
      },

      // submit a PR
      {
        name: 'Create Pull Request',
        uses: 'peter-evans/create-pull-request@v3',
        with: {
          'token': '${{ secrets.' + AUTOMATION_TOKEN + ' }}',
          'commit-message': 'chore: upgrade projen',
          'branch': 'auto/projen-upgrade',
          'title': 'chore: upgrade projen and yarn',
          'body': 'This PR upgrades projen and yarn upgrade to the latest version',
          'labels': 'auto-merge',
        }
      },
    ],
  },
});



const common_exclude = ['cdk.out', 'cdk.context.json', 'docker-compose.yml', 'images', 'yarn-error.log'];
project.npmignore.exclude(...common_exclude);
project.gitignore.exclude(...common_exclude);

project.synth();
