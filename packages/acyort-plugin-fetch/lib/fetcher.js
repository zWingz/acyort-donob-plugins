const { join } = require('path')
const octokit = require('@octokit/rest')()
const ora = require('ora')
const logSymbols = require('log-symbols')

function fetch(acyort) {
  const cacheFile = join(__dirname, 'issues.json')
  const {
    repository, author: creator, gitToken, issuesPageSize = 20, issuesCache = false,
  } = acyort.config
  const [owner, repo] = repository.split('/')
  const { fs } = acyort

  const spinner = ora({
    text: 'Fetch issues...\n',
    color: 'green',
  }).start()
  if (issuesCache && fs.existsSync(cacheFile)) {
    spinner.succeed('Fetch issues completed')
    return Promise.resolve(require(cacheFile)) // eslint-disable-line
  }
  octokit.authenticate({
    type: 'token',
    // token: 'd#e8919195a05bd0c3e3c0d5b5bcfd218bc606694'.split('#').join(''),
    token: gitToken.split('#').join(''),
  })
  let result = []

  return new Promise((resolve) => {
    async function load(page = 1) {
      const { data, headers } = await octokit.issues
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
      result = result.concat(data)
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
// module.exports = async function fetcher() {
//   this.store.set('issues', await fetch(this))
// }
