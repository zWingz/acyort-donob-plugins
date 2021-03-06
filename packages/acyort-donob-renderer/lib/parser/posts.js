const path = require('path')
const { parseMd, frontMatter } = require('acyort-util-md')
const { parseLabels } = require('./labels')

function postParse(issue, config) {
  const {
    id,
    number,
    title,
    labels,
    created_at: created,
    updated_at: updated,
    body,
    user: { login, html_url: homePage, avatar_url: avatar },
  } = issue
  const {
    postsDir, tagsDir, gitalk = false, repository = '',
  } = config
  const url = path.join('/', postsDir, `${id.toString()}.html`)
  const [owner, repo] = repository.split('/')
  const postOptionalData = frontMatter(body)
  const { keywords = [], description = '', ...rst } = postOptionalData
  return {
    id,
    url,
    path: url,
    number,
    title,
    labels: parseLabels({
      labels,
      tagsDir,
      post: {
        id,
        url,
        title,
        created,
        updated,
      },
    }),
    keywords: keywords.join(','),
    description,
    created,
    updated,
    raw: body,
    body: parseMd(body, {
      highlightOpt: {
        showLineNumbers: false,
      },
    }),
    user: {
      name: login,
      homePage,
      avatar,
    },
    gitalk: gitalk
      ? {
        owner,
        repo,
        admin: [owner],
        ...gitalk,
        number,
      }
      : false,
    frontMatter: rst,
  }
}

module.exports = postParse
