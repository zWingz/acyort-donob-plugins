const rssItems = []

function getRssItems() {
  return rssItems
}

function markRssItem(post, config) {
  const { url: baseUrl } = config
  const {
    url, title, labels, created: date, body, user, id,
  } = post
  const item = {
    title,
    guid: id,
    description: body,
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
