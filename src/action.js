// const core = require('@actions/core');
// const github = require('@actions/github');

async function run() {

  const currentDate = new Date();
  const day = String(currentDate.getDay()).padStart(2, '0');
  const month = String(currentDate.getMonth()).padStart(2, '0')
  const year = currentDate.getFullYear();
  var currentDateString = `${day}-${month}-${year}`;

  const core = require('@actions/core');
  const github = require('@actions/github');

  const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN');

  const octokit = github.getOctokit(GITHUB_TOKEN);
  //

  const { context } = require('@actions/github');

  // const createNewIssue = async (options) => {
    // // Remove empty props in order to make valid API calls
    // options = removeEmptyProp(Object.assign({}, options));
  
    core.info(`Creating new issue with options: ${JSON.stringify('Test')} and body: Body `);

    const { data: { number: newIssueNumber, id: newIssueId, node_id: newIssueNodeId } } = (await octokit.rest.issues.create({
      ...context.repo,
      title: core.getInput('title') + " " + currentDateString,// + toString((new Date()).getDay()) + "-" + toString((new Date()).getMonth()) + "-" + toString((new Date()).getFullYear()),
      labels: ["bug"],
      assignees: [core.getInput('assignees')],
      body: '### Updates:'
    })) || {};
  
    core.debug(`New issue number: ${newIssueNumber}`);
    core.debug(`New issue id: ${newIssueId}`);
    core.debug(`New issue node ID: ${newIssueNodeId}`);
  
    console.log(newIssueNumber);
    console.log(newIssueId);

    const { pull_request } = context.payload;
    var bodyNew = core.getInput('body') + newIssueNumber;
    bodyNew = bodyNew.replace('Sync:', `Sync: ${currentDateString}`)
    console.log(bodyNew);
    await octokit.rest.issues.createComment({
        ...context.repo,
        issue_number: 42,//newIssueNumber, //pull_request.number,
        body: bodyNew
      });
  }
  
  run();

