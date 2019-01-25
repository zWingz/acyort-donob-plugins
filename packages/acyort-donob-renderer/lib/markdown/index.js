const marked = require('marked')
const code = require('./code')
const heading = require('./heading')

const { Renderer } = marked
function parseMd(content, {
  lineNumber = false,
} = {}) {
  const renderer = Object.assign(new Renderer(), {
    code: (str, lang) => code(str, lang, lineNumber),
    heading,
  })
  marked.setOptions({ renderer })
  return marked(content)
}

module.exports = parseMd
