const pathFn = require('path')
const Marked = require('@acyort/markdown')

function page(issue, config) {
  const marker = new Marked(config)
  const {
    id, title, updated_at: updated, created_at: created, body,
  } = issue

  const [, pagePath, pageTitle] = title.split(/^\[(.+?)]/)
  const splited = pagePath.split('/').filter(i => i)
  const name = splited.slice(-1)[0]
  const url = pathFn.join('/', pagePath, '/')
  const path = pathFn.join(url, 'index.html')

  return {
    id,
    url,
    path,
    name,
    type: 'page',
    title: pageTitle,
    created,
    updated,
    raw: body,
    content: marker.parse(body),
  }
}

module.exports = page
