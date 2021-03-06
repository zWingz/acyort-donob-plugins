// const issues = require('./fixtures/issues')
const { parseMd } = require('acyort-util-md')
const yaml = require('yaml')
const { issues, mockPages, mockIssues } = require('./fixtures/issues')
const processor = require('../lib/processor')

const postsDir = 'fdsaf'
const archivesDir = 'fdsafd'
const tagsDir = '12fds'
describe('test processor', () => {
  describe('test snapshot', () => {
    const {
      posts, archives, index, pages, rssItems,
    } = processor([
      ...issues,
      mockPages(),
    ])
    it('test posts snapshot', () => {
      expect(posts).toMatchSnapshot('posts')
    })
    it('test index snapshot', () => {
      expect(index).toMatchSnapshot('index')
    })
    it('test archives snapshot', () => {
      expect(archives).toMatchSnapshot('archives')
    })
    it('test pages snapshot', () => {
      expect(pages).toMatchSnapshot('pages')
    })
    it('test rssItems snapshot', () => {
      expect(rssItems).toMatchSnapshot('rssItems')
    })
  })
})
describe('test processor', () => {
  const counter = 6
  const testPosts = Array(counter)
    .fill(issues)
    .reduce((sum, e) => sum.concat(e), [])
    .sort((a, b) => (a.created_at < b.created_at ? 1 : -1))
  const pageIssues = mockPages()
  const testIssues = [...testPosts, pageIssues]
  const postPageSize = 3
  const archivesPageSize = 5
  const clientId = 'fdsafdsa'
  const clientSecret = 'fdsafdsafad'
  const repository = 'zxvc/uiku'
  const gitalk = {
    clientId,
    clientSecret,
  }
  const defaultConfig = {
    postsDir,
    archivesDir,
    tagsDir,
    pageSize: {
      posts: postPageSize,
      archives: archivesPageSize,
    },
    gitalk,
    repository,
  }
  const {
    posts, archives, index, pages,
  } = processor(testIssues, defaultConfig)
  describe('test posts processor', () => {
    it('posts length', () => {
      expect(posts).toHaveLength(testPosts.length)
    })
    it('posts path', () => {
      const p = posts[0]
      expect(p.url).toEqual(`/${postsDir}/${p.id}.html`)
    })
    it('test gitalk in post', () => {
      posts.forEach((each) => {
        expect(each.gitalk).toMatchObject({
          ...gitalk,
          number: each.number,
          owner: repository.split('/')[0],
          repo: repository.split('/')[1],
        })
      })
    })
    it('test front matter', () => {
      const issue = mockIssues('2019-04-17')
      const frontMatter = {
        keywords: ['fdsaf', 'f123', 'fsijoi'],
        description: 'this is desc',
        otherData1: {
          dd: 11,
        },
        otherData2: '123123',
      }
      const yml = yaml.stringify(frontMatter)
      issue.body = `
---
${yml}
---
This is content
`
      const { posts: newPosts } = processor([issue], defaultConfig)
      const p = newPosts[0]
      expect(p.keywords).toEqual(frontMatter.keywords.join(','))
      expect(p.description).toEqual(frontMatter.description)
      expect(p.frontMatter).toEqual({
        otherData1: frontMatter.otherData1,
        otherData2: frontMatter.otherData2,
      })
    })
  })
  describe('test index', () => {
    it('test index pagination', () => {
      expect(index).toHaveLength(Math.ceil(testPosts.length / postPageSize))
      expect(index[0].data).toHaveLength(postPageSize)
    })
    it('test prev & next', () => {
      const getPage = (idx, type) => index[idx].pagination[`${type}Page`]
      expect(getPage(0, 'prev')).toEqual('')
      expect(getPage(0, 'next')).toEqual('/page/2/index.html')
      expect(getPage(1, 'prev')).toEqual('/index.html')
      expect(getPage(1, 'next')).toEqual('/page/3/index.html')
      expect(getPage(index.length - 1, 'next')).toEqual('')
    })
    it('test pagination items', () => {
      const testPaginationItem = (pageItem) => {
        const { items } = pageItem
        for (let i = 0; i < items.length; i += 1) {
          const {
            url, page, active, placeholder,
          } = items[i]
          if (i === 0) {
            expect(url).toBe('/index.html')
          } else if (placeholder) {
            expect(placeholder).toBe(true)
          } else {
            expect(url).toBe(`/page/${page}/index.html`)
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

  describe('test pages', () => {
    it('test pages', () => {
      const pageItem = pages[0]
      const {
        title, name, url, path, content, raw,
      } = pageItem
      expect(name).toEqual(pageIssues.title.match(/\[(.*)\]/)[1])
      expect(title).toEqual(pageIssues.title.split(']')[1])
      expect(url).toEqual(`/${name}/`)
      expect(path).toEqual(`/${name}/index.html`)
      expect(content).toEqual(parseMd(raw))
    })
  })

  describe('test archives', () => {
    it('test archives pagination', () => {
      expect(
        archives[2].data.reduce((s, e) => s.concat(e.posts), []),
      ).toHaveLength(archivesPageSize)
      expect(archives).toHaveLength(
        Math.ceil(testIssues.length / archivesPageSize),
      )
    })
    it('test archives path', () => {
      archives.forEach((each) => {
        const {
          path,
          pagination: { currentPage },
        } = each
        if (currentPage === 1) {
          expect(path).toBe(`/${archivesDir}/index.html`)
        } else {
          expect(path).toBe(`/${archivesDir}/page/${currentPage}/index.html`)
        }
      })
    })
    it('test archives posts', () => {
      const testArchivesPost = (post, skip, year) => {
        const target = posts[skip]
        expect(post.id).toEqual(target.id)
        expect(post.created).toEqual(target.created)
        expect(`${new Date(post.created).getFullYear()}`).toEqual(year)
      }
      const testArchivesYear = (yearArchive, skip) => {
        yearArchive.posts.forEach((e, idx) => {
          testArchivesPost(e, idx + skip, yearArchive.year)
        })
      }
      archives.forEach((archivePage) => {
        const { currentPage } = archivePage.pagination
        let skip = 0
        archivePage.data.forEach((yearArchive) => {
          testArchivesYear(
            yearArchive,
            (currentPage - 1) * archivesPageSize + skip,
          )
          skip += yearArchive.posts.length
        })
      })
    })
  })
})
