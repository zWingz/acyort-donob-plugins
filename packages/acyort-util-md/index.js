const { frontMatter } = require('./lib/front-matter')
const { toc } = require('./lib/toc')
const { parseMd } = require('./lib/markdown')

module.exports = {
  toc,
  parseMd,
  frontMatter(arg) {
    return frontMatter(arg).data
  },
}
