const remark = require('remark')
const slug = require('remark-slug')
const html = require('remark-html')
const autoheading = require('remark-autolink-headings')
const highlight = require('./highlight')

const defaultOptions = {
  highlightOpt: {},
}

function parseMd(content, opt = {}) {
  const { highlightOpt } = { ...defaultOptions, ...opt }
  const c = remark()
    .use(highlight, highlightOpt)
    .use([slug, autoheading])
    .use(html)
    .processSync(content)
  return c.contents
}
module.exports.parseMd = parseMd
