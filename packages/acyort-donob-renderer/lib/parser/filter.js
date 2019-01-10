function filter(issues) {
  const posts = []
  const pages = []
  for (let i = 0; i < issues.length; i += 1) {
    const {
      title,
    } = issues[i]
    if (/^\[(.+?)]/.test(title)) {
      pages.push(issues[i])
    } else {
      posts.push(issues[i])
    }
  }

  return { posts, pages }
}

module.exports = filter
