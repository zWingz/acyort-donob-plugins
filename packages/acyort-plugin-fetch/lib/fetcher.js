const { join } = require('path')
const Octokit = require('@octokit/rest')
const ora = require('ora')
const logSymbols = require('log-symbols')
const fs = require('fs-extra')

function fetch(config = {}) {
  const cacheFile = join(__dirname, 'issues.json')
  const {
    repository,
    author: creator,
    gitToken,
    issuesPageSize = 20,
    issuesCache = false,
    issuesFilter,
  } = config
  if (!repository) {
    const msg = 'missing repository'
    ora(msg).fail()
    return Promise.reject(new Error(msg))
  }
  const [owner, repo] = repository.split('/')

  const spinner = ora({
    text: 'Fetch issues...\n',
    color: 'green',
  }).start()
  if (issuesCache && fs.existsSync(cacheFile)) {
    spinner.succeed('Fetch issues completed')
    return Promise.resolve(require(cacheFile)); // eslint-disable-line
  }
  let auth
  if (gitToken) {
    if (gitToken.includes('#')) {
      auth = gitToken.split('#').join('')
    } else {
      auth = gitToken
    }
  }
  const octokit = new Octokit({
    auth: auth ? `token ${auth}` : undefined,
  })
  let result = []
  return new Promise((resolve) => {
    async function load(page = 1) {
      const { data = [], headers } = await octokit.issues
        .listForRepo({
          owner,
          repo,
          sort: 'created',
          per_page: issuesPageSize,
          direction: 'desc',
          page,
          creator: creator || owner,
        })
        .catch((e) => {
          // spinner.fail('fail to fetch issues: ', e.message)
          spinner.stopAndPersist({
            symbol: logSymbols.error,
            text: `Fail to fetch issues from page ${page}, error: ${e}`,
          })
          return {
            data: [],
            headers: {},
          }
        })
      result = result.concat(
        (data || []).filter(
          each => !issuesFilter || !new RegExp(issuesFilter).test(each.title),
        ),
      )
      const { link } = headers
      if (link && link.includes('rel="next"')) {
        spinner.stopAndPersist({
          symbol: logSymbols.success,
          text: `Succeed to fetch issues from page ${page}`,
        })
        load(page + 1)
      } else {
        if (issuesCache) {
          fs.outputFileSync(cacheFile, JSON.stringify(result))
        }
        spinner.succeed('Fetch issues completed')
        resolve(result)
      }
    }
    load()
  })
}

module.exports = fetch
