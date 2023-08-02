const core = require('@actions/core');
const github = require('@actions/github');
const Toolkit = require('actions-toolkit')
import {
    FrontMatterAttributes,
    frontmatterSchema,
    listToArray,
    setOutputs,
  } from "./helpers";




async function run() {

   //
   const templated = {
    body: env.renderString(body, templateVariables),
    title: env.renderString(attributes.title, templateVariables),
  };
  const assignees = Toolkit.inputs.assignees;

  try {
    const issue = await tools.github.issues.create({
      ...Toolkit.context.repo,
      ...templated,
      assignees: assignees
        ? listToArray(assignees)
        : listToArray(attributes.assignees),
      labels: listToArray(attributes.labels),
      milestone:
        Number(tools.inputs.milestone || attributes.milestone) || undefined,
    });

    setOutputs(tools, issue.data);
    Toolkit.log.success(
      `Created issue ${issue.data.title}#${issue.data.number}: ${issue.data.html_url}`
    );
  } catch (err) {
    return logError(Toolkit, template, "creating", err);
  }

   //


    const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN');

    const octokit = github.getOctokit(GITHUB_TOKEN);

    const { context = {} } = github;
    const { pull_request } = context.payload;

    await octokit.rest.issues.createComment({
        ...context.repo,
        issue_number: pull_request.number,
        body: `Thank you for submitting a pull request! We will try to review this as soon as we can:  https://github.com/vickeyksoni/thank-you-action/pull/${pull_request.number}  @vickeyksoni`
      });
  }
  
  run();

