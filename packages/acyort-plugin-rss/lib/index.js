const RSS = require('rss')

function parseItem(item) {
  const {
    title, categories, craetedDate, description, url, author, guid,
  } = item
  return {
    title,
    description,
    url,
    guid,
    author,
    date: craetedDate,
    categories,
  }
}

function acyortPluginRss({
  title, description, feedUrl, siteUrl, webMaster, imageUrl, pubDate, ...rst
}, items) {
  const rss = new RSS({
    title,
    description,
    webMaster,
    feed_url: feedUrl,
    site_url: siteUrl,
    image_url: imageUrl,
    pubDate,
    ...rst,
  })
  items.forEach((each) => {
    rss.item(parseItem({ author: webMaster, ...each }))
  })
  return rss.xml()
}
module.exports = acyortPluginRss
