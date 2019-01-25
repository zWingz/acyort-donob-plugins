const mdToc = require('markdown-toc')
const parseMd = require('./markdown')

function toc(md) {
  const { content } = mdToc(md)
  // content = decodeURI(content)
  const html = parseMd(content)
  return html
}
module.exports = toc
