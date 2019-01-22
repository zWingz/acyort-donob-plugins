const RSS = require('rss')

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
    rss.item({ author: webMaster, ...each })
  })
  return rss.xml()
}
module.exports = acyortPluginRss
