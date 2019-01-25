const path = require('path')
const parseMd = require('../markdown')
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
  return {
    id,
    url,
    path: url,
    number,
    title,
    labels: parseLabels({ labels, tagsDir, postId: id }),
    created,
    updated,
    raw: body,
    body: parseMd(body, {
      lineNumber: true,
    }),
    user: {
      name: login,
      homePage,
      avatar,
    },
    gitalk: gitalk ? {
      owner,
      repo,
      admin: [owner],
      ...gitalk,
      number,
    } : false,
  }
}

module.exports = postParse
