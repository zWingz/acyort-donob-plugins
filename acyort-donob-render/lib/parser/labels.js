const path = require('path')

const tags = []

function setTags(label, postId) {
  const { id, name, url } = label
  const pos = tags.findIndex(each => each.id === id)

  if (pos === -1) {
    tags.push({
      id,
      name,
      url,
      type: 'tags',
      posts: [postId],
    })
  } else {
    tags[pos].posts.push(postId)
  }
}
function parseLabels({ labels, tagsDir, postId }) {
  if (!labels.length) {
    return []
  }

  return labels.map((label) => {
    const { id, name } = label
    const ret = {
      id,
      name,
      url: path.join('/', tagsDir, id.toString()),
    }
    setTags(ret, postId)
    return ret
  })
}

module.exports = {
  parseLabels,
  getLabels: () => tags,
}
