const parser = require('./parser')

function processor(issues, acyortConfig = {}) {
  const config = {
    postsDir: 'posts',
    tagsDir: 'tags',
    archivesDir: 'archives',
    ...acyortConfig,
  }
  return parser(issues, config)
}

module.exports = processor
