const path = require('path')

function parsePaginator(current, total) {
  const result = []
  const begin = Math.max(current - 2, 1)
  const end = Math.min(current + 2, total)
  if (begin > 1) result.push(1)
  if (begin > 2) result.push(false)
  for (let i = begin; i <= end; i += 1) {
    result.push(i)
  }
  if (end < total - 1) result.push(false)
  if (end < total) result.push(total)
  return result
}

function generatePagePath({ page, prefix, base }) {
  const root = path.join('/', base)
  return page === 1 ? root : path.join(root, prefix, `${page}`)
}

function genPage({
  current, totalPages, prefix, base,
}) {
  const prf = path.join('/', base, prefix)
  /* eslint-disable */
  const prevPage =
    current > 1 ? generatePagePath({ page: current - 1, base, prefix }) : ''
  /* eslint-enable */
  const nextPage = current < totalPages ? path.join(prf, `${current + 1}`) : ''
  const items = parsePaginator(current, totalPages).map(each => (each
    ? {
      page: each,
      active: each === current,
      url: generatePagePath({ page: each, base, prefix }),
    }
    : {
      placeholder: true,
    }))
  return {
    currentPage: current,
    items,
    prevPage,
    nextPage,
  }
}

function parsePage({ pages, ...rst }) {
  const base = path.join('/', rst.base)
  return {
    pagination: genPage({
      ...rst,
    }),
    data: pages,
    path:
      rst.current === 1 ? base : path.join(base, rst.prefix, `${rst.current}`),
  }
}
/* istanbul ignore next */
function pagination(data, { pageSize = 10, prefix = 'page', base = '/' } = {}) {
  let current = 1
  const { length } = data
  const totalPages = Math.ceil(length / pageSize)
  const result = []
  for (let i = 0; i < totalPages; i += 1) {
    const pages = data.slice(0 + (current - 1) * pageSize, current * pageSize)
    const temp = parsePage({
      pages,
      current,
      pageSize,
      totalPages,
      prefix,
      base,
    })
    result.push(temp)
    current += 1
  }
  return result
}

module.exports = pagination
