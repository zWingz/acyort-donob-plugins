const { parseMd } = require('acyort-util-md')

const rssItems = []

function getRssItems() {
  return rssItems
}

function markRssItem(post, config) {
  const { url: baseUrl } = config
  const {
    url, title, labels, created: date, raw, user, id,
  } = post
  const item = {
    title,
    guid: id,
    // description: body,
    description: parseMd(raw),
    date,
    author: user.name,
    url: baseUrl + url,
    categories: labels.map(each => each.name),
  }
  rssItems.push(item)
}

module.exports = {
  markRssItem,
  getRssItems,
}
