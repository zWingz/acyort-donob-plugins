const remark = require('remark')
const slug = require('remark-slug')
const html = require('remark-html')
const autoheading = require('remark-autolink-headings')
const highlight = require('./highlight')
const prettier = require('./prettier')
const heading = require('./headings')

const defaultOptions = {
  highlightOpt: {},
}

/**
 * remark parser
 *
 * @param {string} content markdown content
 * @param {object} [opt={}] parser options
 * @returns
 */
function parseMd(content, opt = {}) {
  const { highlightOpt } = { ...defaultOptions, ...opt }
  const c = remark()
    .use(prettier)
    .use(highlight, highlightOpt)
    .use([slug, heading, autoheading])
    .use(html)
    .processSync(content)
  return c.contents
}
module.exports.parseMd = parseMd
