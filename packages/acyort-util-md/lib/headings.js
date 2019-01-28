const visit = require('unist-util-visit')

function attacher() {
  return (tree) => {
    visit(tree, 'heading', (node) => {
      console.log(node)
    })
  }
}

module.exports = attacher
