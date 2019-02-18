const parser = require('./parser')

function processor(issues, acyort = {}) {
  const config = {
    postsDir: 'posts',
    tagsDir: 'tags',
    archivesDir: 'archives',
    ...acyort.config,
  }
  const {
    posts, archives, index, pages, rssItems,
    labels,
  } = parser(issues, config)
  return {
    posts,
    archives,
    index,
    pages,
    labels,
    rssItems,
  }
}

module.exports = processor
