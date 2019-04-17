const remark = require('remark')
const slug = require('remark-slug')
const html = require('remark-html')
const autoheading = require('remark-autolink-headings')
const container = require('remark-container')
const { frontMatter } = require('./front-matter')
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
function parseMd(md, opt = {}) {
  const { highlightOpt } = { ...defaultOptions, ...opt }
  const { content } = frontMatter(md)
  const c = remark()
    .use(container, {
      className: 'custom-block',
    })
    .use([slug, heading, autoheading])
    .use(prettier)
    .use(highlight, highlightOpt)
    .use(html)
    .processSync(content)
  return c.contents
}

module.exports.parseMd = parseMd
