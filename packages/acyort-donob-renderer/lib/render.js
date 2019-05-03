
function render(acyort, { data, template, contentKey }, globalData) {
  data.forEach((each) => {
    const { path, pagination, data: content } = each
    const opt = {
      template,
      path,
    }
    if (pagination) {
      opt.data = {
        pagination,
        [contentKey]: content,
        globalData,
      }
    } else {
      opt.data = {
        ...each,
        globalData,
      }
    }
    acyort.util.outputHTML(opt)
  })
}

module.exports = ({
  posts = [], pages = [], archives = [], index = [], tags = [], tagsMain = {},
}, globalData = {}, acyort) => {
  const renderList = [{
    template: 'index',
    contentKey: 'posts',
    data: index,
  }, {
    template: 'post',
    data: posts,
  }, {
    template: 'archives',
    contentKey: 'archives',
    data: archives,
  }, {
    template: 'page',
    data: pages,
  }]
  tags.forEach((each) => {
    renderList.push({
      template: 'tags',
      data: each,
      contentKey: 'tags',
    })
  })
  renderList.forEach((each) => {
    render(acyort, each, globalData)
  })
  const { data: tagsData } = tagsMain
  if (tagsData && tagsData.length) {
    acyort.util.outputHTML({
      template: 'tagsMain',
      path: tagsMain.path,
      data: {
        tags: tagsMain.data,
        globalData,
      },
    })
  }
}
