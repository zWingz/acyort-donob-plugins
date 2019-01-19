const RSS = require('rss')

function parseItem(item) {
  const {
    title, labels, created, body, url, author,
  } = item
  return {
    title,
    description: body,
    url,
    author,
    date: created,
    categories: labels.map(each => each.name),
  }
}

function acyortPluginRss({
  title, description, feedUrl, siteUrl, author, favicon, pubDate, ...rst
}, items) {
  const rss = new RSS({
    ...rst,
    title,
    description,
    webMaster: author,
    feed_url: feedUrl,
    site_url: siteUrl,
    image_url: favicon,
    pubDate,
  })
  items.forEach((each) => {
    rss.item(parseItem({ ...each, author }))
  })
  return rss.xml()
}
module.exports = acyortPluginRss
