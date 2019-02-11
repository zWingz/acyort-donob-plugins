const visit = require('unist-util-visit')

/**
 * add class 'heading' to head
 *
 * @returns
 */
function attacher() {
  return (tree) => {
    visit(tree, 'heading', (node) => {
      const { data: { hProperties } } = node
      const { class: className } = hProperties
      hProperties.class = className ? `heading ${className}` : 'heading'
    })
  }
}

module.exports = attacher
