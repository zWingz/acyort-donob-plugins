const Marked = require('@acyort/markdown')
const issues = require('./fixtures/issues')
const processor = require('../lib/processor')

const marker = new Marked({
  lineNumbers: true,
})
const postsDir = 'fdsaf'
const archivesDir = 'fdsafd'
const tagsDir = '12fds'
describe('test processor', () => {
  const postPageSize = 2
  const archivesPageSize = 2
  describe('test snapshot', () => {
    const {
      posts, archives, index, pages,
    } = processor(issues, {
      config: {
        postsDir,
        archivesDir,
        tagsDir,
        pageSize: {
          posts: postPageSize,
          archives: archivesPageSize,
        },
      },
    })
    it('test posts snapshot', () => {
      expect(posts).toMatchSnapshot('posts')
    })
    it('test index snapshot', () => {
      expect(index).toMatchSnapshot('index')
    })
    it('test archives snapshot', () => {
      expect(archives).toMatchSnapshot('archives')
    })
    expect(pages).toMatchSnapshot('pages')
  })
})
describe('test processor', () => {
  const moreIsseus = [...issues, ...issues, ...issues, ...issues]
  const postPageSize = 3
  const archivesPageSize = 3
  const {
    posts, archives, index, pages,
  } = processor(moreIsseus, {
    config: {
      postsDir,
      archivesDir,
      tagsDir,
      pageSize: {
        posts: postPageSize,
        archives: archivesPageSize,
      },
    },
  })
  describe('test posts processor', () => {
    it('posts length', () => {
      expect(posts).toHaveLength(moreIsseus.length)
      expect(posts[0].body).toEqual(marker.parse(posts[0].raw))
    })
    it('posts path', () => {
      const p = posts[0]
      expect(p.url).toEqual(`/${postsDir}/${p.id}.html`)
    })
  })
  describe('test index', () => {
    it('test index pagination', () => {
      expect(index).toHaveLength(Math.ceil(moreIsseus.length / postPageSize))
      expect(index[0].data).toHaveLength(postPageSize)
    })
    it('test prev & next', () => {
      const getPage = (idx, type) => index[idx].pagination[`${type}Page`]
      expect(getPage(0, 'prev')).toEqual('')
      expect(getPage(0, 'next')).toEqual('/page/2')
      expect(getPage(1, 'prev')).toEqual('/')
      expect(getPage(1, 'next')).toEqual('/page/3')
      expect(getPage(index.length - 1, 'next')).toEqual('')
    })
    it('test pagination items', () => {
      const testPaginationItem = (pageItem) => {
        const tmp = pageItem.items
        for (let i = 0; i < tmp.length; i += 1) {
          const {
            url, page, active, placeholder,
          } = tmp[i]
          if (i === 0) {
            expect(url).toBe('/')
          } else if (placeholder) {
            expect(placeholder).toBe(true)
          } else {
            expect(url).toBe(`/page/${page}`)
          }
          if (!placeholder) {
            expect(active).toBe(page === pageItem.currentPage)
          }
        }
      }
      index.forEach((each) => {
        testPaginationItem(each.pagination)
      })
    })
  })

  it('test pages snapshot', () => {
  })
})
