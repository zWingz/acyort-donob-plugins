const mdToc = require('markdown-toc')
const GhSlugger = require('github-slugger')
const remark = require('remark')
const html = require('remark-html')

const slugger = new GhSlugger()
const slugger2 = new GhSlugger()
let tmp = 0

/**
 * as same as remark-slug
 * use the github-slugger to generate toc
 *
 * @param {*} md
 * @returns
 */
function toc(md) {
  slugger.reset()
  slugger2.reset()
  tmp = 0
  const { content: tocContent } = mdToc(md, {
    slugify(str) {
      let r
      if (tmp % 2 === 0) {
        r = slugger.slug(str)
      } else {
        r = slugger2.slug(str)
      }
      tmp += 1
      return r
    },
  })
  const { contents } = remark().use(html).processSync(tocContent)
  return contents
}

module.exports.toc = toc
