const lodash = require('lodash')
const { join } = require('path')
const filterParse = require('./filter')
const postsParse = require('./posts')
const archivesParse = require('./archives')
const pagesParse = require('./pages')
const pagination = require('./pagination')
const { markRssItem, getRssItems } = require('./rss')
const { generateTags, getTags } = require('./labels')

module.exports = (issues, config) => {
  let { pages, posts } = filterParse(issues)
  posts = posts.map((each) => {
    const post = postsParse(each, config)
    markRssItem(post, config)
    return post
  })
  pages = pages.map(each => pagesParse(each))
  const rssItems = getRssItems()
  const { pageSize = {}, archivesDir, tagsDir } = config
  const archives = archivesParse(posts, {
    archivesDir,
    pageSize: pageSize.archives,
  }).map(each => ({
    ...each,
    // path: `${each.path}/index.html`,
  }))
  const tags = generateTags({
    pageSize: pageSize.tags,
    tagsDir,
  })
  const tagsMain = {
    path: join('/', tagsDir, 'index.html'),
    data: getTags(),
  }
  const index = pagination(
    posts.map(each => lodash.pick(each, 'title', 'id', 'url', 'created')),
    { pageSize: pageSize.posts },
  ).map(each => ({
    ...each,
    // path: path.join(each.path, 'index.html'),
  }))
  return {
    pages,
    posts,
    archives,
    tags,
    index,
    rssItems,
    tagsMain,
  }
}
