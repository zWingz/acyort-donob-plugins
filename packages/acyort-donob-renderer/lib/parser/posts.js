const Mark = require('@acyort/markdown')
const path = require('path')
const { parseLabels } = require('./labels')

const marker = new Mark({
  lineNumbers: true,
})

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
    body: marker.parse(body),
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
