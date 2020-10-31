const { Command } = require('commander')
const { Octokit } = require('@octokit/rest')

const ghToken = process.env.GITHUB_TOKEN

function usage() {
  const program = new Command()
  program
    .requiredOption('-o, --org <string>', 'Organization name (owner)')
    .requiredOption(
      '-t --team <string>',
      'Team Slug (without organization name)'
    )
    .requiredOption(
      '-r --repo <string>',
      'Repository Name (without organization name)'
    )
    .option(
      '-p --permission <"pull" | "push" | "admin" | "maintain" | "triage">',
      'Permission (default pull)',
      'pull'
    )
  program.parse()

  return program
}

function createClient(token) {
  return new Octokit({
    auth: token,
  })
}

function addPermission(org, team, repo, permission) {
  const octokit = createClient(ghToken)
  return octokit.teams.addOrUpdateRepoPermissionsInOrg({
    org: org,
    team_slug: team,
    owner: org,
    repo: repo,
    permission: permission,
  })
}

const pg = usage()
const { org, team, repo, permission } = pg

console.log(`Grant '${permission} ${org}/${repo}' to Team '${org}/${team}'.`)

addPermission(org, team, repo, permission)
  .catch((e) => {
    console.log(e)
  })
