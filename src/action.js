// const core = require('@actions/core');
// const github = require('@actions/github');

// import {
//     FrontMatterAttributes,
//     frontmatterSchema,
//     listToArray,
//     setOutputs,
//   } from "./helpers";




async function run() {
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
      title: core.getInput('title'),// + toString((new Date()).getDay()) + "-" + toString((new Date()).getMonth()) + "-" + toString((new Date()).getFullYear()),
      labels: ["bug"],
      assignees: [core.getInput('assignees')],
      body: '**Updates**'
    })) || {};
  
    core.debug(`New issue number: ${newIssueNumber}`);
    core.debug(`New issue id: ${newIssueId}`);
    core.debug(`New issue node ID: ${newIssueNodeId}`);
  
    console.log(newIssueNumber);
    console.log(newIssueId);

  //   return {
  //     newIssueNumber: Number(newIssueNumber),
  //     newIssueId,
  //     newIssueNodeId
  //   };
  // };

   //


 

    // const { context = {} } = github;
    const { pull_request } = context.payload;
    var bodyNew = core.getInput('body') + newIssueNumber;
    await octokit.rest.issues.createComment({
        ...context.repo,
        issue_number: newIssueNumber, //pull_request.number,
        body: bodyNew

        //body: `Thank you for submitting a pull request! We will try to review this as soon as we can:  https://github.com/vickeyksoni/thank-you-action/pull/${newIssueNumber}  @vickeyksoni`
      });
  }
  
  run();

