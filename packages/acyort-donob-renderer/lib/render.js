
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
    acyort.outputHTML(opt)
  })
}

module.exports = ({
  posts = [], pages = [], archives = [], index = [], labels = [],
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
  labels.forEach((each) => {
    renderList.push({
      template: 'tags',
      data: each,
      contentKey: 'tags',
    })
  })
  renderList.forEach((each) => {
    render(acyort, each, globalData)
  })
}
