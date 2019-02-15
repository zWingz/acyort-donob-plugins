const visit = require('unist-util-visit')
const prettier = require('prettier')

const parserMap = {
  js: 'babel',
  javascript: 'babel',
  typescript: 'typescript',
  ts: 'typescript',
  css: 'css',
  sass: 'scss',
  scss: 'scss',
  less: 'less',
  json: 'json',
  mdx: 'mdx',
  html: 'html',
  vue: 'vue',
  yaml: 'yaml',
}

/**
 * prettier for code
 *
 * @returns
 */
function attacher() {
  return (tree) => {
    visit(tree, 'code', (node) => {
      const { lang, value } = node
      /* istanbul ignore next */
      if (lang && lang in parserMap) {
        const parser = parserMap[lang]
        try {
          // eslint-disable-next-line
          node.value = prettier.format(value, {
            parser,
            semi: false,
            singleQuote: true,
            jsxSingleQuote: true,
          })
        } catch (e) {
          // ignore
        }
      }
    })
  }
}

module.exports = attacher
