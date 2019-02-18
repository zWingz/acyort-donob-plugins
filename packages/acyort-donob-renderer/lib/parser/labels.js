const path = require('path')

const tags = []

function setTags(label, post) {
  const { id } = label
  const pos = tags.findIndex(each => each.id === id)

  if (pos === -1) {
    tags.push({
      ...label,
      type: 'tags',
      posts: [post],
    })
  } else {
    tags[pos].posts.push(post)
  }
}
function parseLabels({ labels, tagsDir, post }) {
  if (!labels) {
    return []
  }
  return labels.map((label) => {
    const {
      id, name, description, color, node_id: nodeId,
    } = label
    const ret = {
      id,
      name,
      url: path.join('/', tagsDir, id.toString()),
      description,
      color,
      nodeId,
    }
    setTags(ret, post)
    return ret
  })
}

module.exports = {
  parseLabels,
  getLabels: /* istanbul ignore next */ () => tags,
}
