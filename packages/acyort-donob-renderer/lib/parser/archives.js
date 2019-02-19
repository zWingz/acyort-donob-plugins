const lodash = require('lodash')
const pagination = require('./pagination')

function group(post) {
  return new Date(post.created).getFullYear()
}

function setArchives(p) {
  let posts = lodash.groupBy(p, group)
  posts = Object.keys(posts).sort().reverse().map(each => ({
    year: each,
    posts: posts[each],
  }))
  return posts
}


module.exports = (p, { archivesDir, pageSize }) => {
  const posts = pagination(p.map(each => lodash.pick(each, ['id', 'created', 'title', 'url'])), {
    base: archivesDir,
    pageSize,
  })
  return posts.map(each => ({
    ...each,
    data: setArchives(each.data),
  }))
}
