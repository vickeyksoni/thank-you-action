// const core = require('@actions/core');
// const github = require('@actions/github');

const core = require('@actions/core');
const github = require('@actions/github');
const { context } = require('@actions/github');


async function run() {

  // Get the current date
const currentDate = new Date();

// Add 5 days to the current date
  const futureDate = new Date(currentDate);
  futureDate.setDate(currentDate.getDate() + 6);

  const day = String(futureDate.getDate()).padStart(2, '0');
  const month = String(futureDate.getMonth()).padStart(2, '0')
  const year = futureDate.getFullYear();
  var futureDateString = `${day}-${month}-${year}`;

  const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN');
  const octokit = github.getOctokit(GITHUB_TOKEN);

    const { data: { number: newIssueNumber, id: newIssueId, node_id: newIssueNodeId } } = (await octokit.rest.issues.create({
      ...context.repo,
      title: core.getInput('title') + " " + futureDateString,
      labels: ["bug"],
      assignees: [core.getInput('assignees')],
      body: '### Updates:'
    })) || {};
  
    core.debug(`New issue number: ${newIssueNumber}`);
    core.debug(`New issue id: ${newIssueId}`);
    core.debug(`New issue node ID: ${newIssueNodeId}`);
  

    // const { pull_request } = context.payload;
    var bodyNew = core.getInput('body') + newIssueNumber;
    bodyNew = bodyNew.replace('Sync:', `Sync: ${futureDateString}`)
    console.log(bodyNew);
    await octokit.rest.issues.createComment({
        ...context.repo,
        issue_number: core.getInput('original_issue'),
        body: bodyNew
      });
  }
  
  run();

