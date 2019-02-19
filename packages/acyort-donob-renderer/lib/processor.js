const parser = require('./parser')

function processor(issues, acyort = {}) {
  const config = {
    postsDir: 'posts',
    tagsDir: 'tags',
    archivesDir: 'archives',
    ...acyort.config,
  }
  return parser(issues, config)
}

module.exports = processor
