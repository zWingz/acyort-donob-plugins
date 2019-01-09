const parser = require('./parser')

function processor(issues, acyort) {
  const config = {
    postsDir: 'posts',
    tagsDir: 'tags',
    ...acyort.config,
  }
  const {
    posts, archives, index, pages,
  } = parser(issues, config)
  return {
    posts,
    archives,
    index,
    pages,
  }
}

module.exports = processor
