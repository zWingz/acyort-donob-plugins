module.exports = ({
  posts, pages, archives, index,
}, acyort) => {
  index.forEach((each) => {
    const { path, pagination, data } = each
    acyort.outputHTML({
      template: 'index',
      path,
      data: {
        pagination,
        posts: data,
      },
    })
  })
  posts.forEach((each) => {
    acyort.outputHTML({
      template: 'post',
      path: each.path,
      data: each,
    })
  })
  archives.forEach((each) => {
    const { path, pagination, data } = each
    acyort.outputHTML({
      template: 'archives',
      path,
      data: {
        pagination,
        archives: data,
      },
    })
  })
  pages.forEach((each) => {
    const { path } = each
    acyort.outputHTML({
      template: 'page',
      path,
      data: each,
    })
  })
}
