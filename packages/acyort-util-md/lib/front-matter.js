const grayMatter = require('gray-matter')

function frontMatter(md) {
  const str = md.replace(/^\n/, '').trim()
  return grayMatter(str)
}

module.exports = {
  frontMatter,
}
