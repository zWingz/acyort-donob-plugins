const prism = require('gatsby-remark-prismjs')

const defaultOptions = {
  classPrefix: 'language-',
  inlineCodeMarker: null,
  aliases: {},
  noInlineHighlight: false,
  showLineNumbers: false,
}

function attacher(options) {
  const opt = {
    ...defaultOptions,
    ...options,
  }
  return (tree) => {
    prism({ markdownAST: tree }, opt)
  }
}

module.exports = attacher
