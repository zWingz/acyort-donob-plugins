const path = require('path')
const lodash = require('lodash')
const pagination = require('./pagination')

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
      name: lodash.startCase(name),
      url: path.join('/', tagsDir, id.toString()),
      description,
      color,
      nodeId,
    }
    setTags(ret, post)
    return ret
  })
}

function generateTags({ pageSize, tagsDir }) {
  const ret = []
  tags.forEach((each) => {
    const paginator = pagination(each.posts, {
      base: path.join(tagsDir, each.id.toString()),
      pageSize,
    })
    ret.push(
      paginator.map(page => ({
        ...page,
        data: {
          ...lodash.pick(each, ['id', 'color', 'description']),
          posts: page.data,
        },
      })),
    )
  })
  return ret
}

module.exports = {
  parseLabels,
  generateTags,
  getTags: () => tags.map(each => ({
    ...each,
  })),
  // getLabels: /* istanbul ignore next */ () => tags,
}
