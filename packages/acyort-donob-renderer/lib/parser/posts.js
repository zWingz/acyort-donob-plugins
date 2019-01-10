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
    user: { html_url: homePage, avatar_url: avatar },
  } = issue
  const { postsDir, tagsDir } = config
  const url = path.join('/', postsDir, `${id.toString()}.html`)
  return {
    id,
    url,
    path: url,
    number,
    title,
    labels: parseLabels({ labels, tagsDir, postId: id }),
    created,
    updated,
    row: body,
    body: marker.parse(body),
    user: {
      homePage,
      avatar,
    },
  }
}

module.exports = postParse
