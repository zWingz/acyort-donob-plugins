const Mark = require('@acyort/markdown')

const rssItems = []
const marker = new Mark({
  lineNumbers: false,
})

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
    description: marker.parse(raw),
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
