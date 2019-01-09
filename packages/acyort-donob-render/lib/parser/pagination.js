const path = require('path')

function genPage({
  current, totalPages, prefix, base,
}) {
  const prf = path.join('/', base, prefix)
  // eslint-disable-next-line
  const prevPage = current > 2 ? path.join(prf, `${current - 1}`) : current > 1 ? path.join('/', base) : ''
  const nextPage = current < totalPages ? path.join(prf, `${current + 1}`) : ''
  return {
    currentPage: current,
    prevPage,
    nextPage,
  }
}

function parsePage({ pages, ...rst } = {}) {
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
