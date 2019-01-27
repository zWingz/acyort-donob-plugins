const mdToc = require('markdown-toc')
const GhSlugger = require('github-slugger')
const remark = require('remark')
const html = require('remark-html')

const slugger = new GhSlugger()

function toc(md) {
  slugger.reset()
  const { content: tocContent } = mdToc(md, {
    slugify(str) {
      return slugger.slug(str)
    },
  })
  const { contents } = remark().use(html).processSync(tocContent)
  return contents
}


module.exports.toc = toc
