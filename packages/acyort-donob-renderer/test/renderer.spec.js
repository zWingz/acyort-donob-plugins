const lodash = require('lodash')
const renderer = require('../lib/render')

/**
 * function to test outputHTML
 *
 * @param {*} testArr index/pages/posts/archives listData
 * @param {*} templateName keys of index/pages/posts/archives
 * @param {*} matchFnc matcher
 * @param {*} { outputHTML }
 * @param {*} globalData
 */
const testFnc = (
  testArr,
  templateName,
  matchFnc,
  acyort,
  globalData,
) => {
  /**
   * function to match outputHTML.mocl.calls
   *
   * @param {*} callArg
   */
  const callMatch = (callArg) => {
    expect(matchFnc(callArg[0], testArr)).not.toEqual(-1)
  }
  const { util: { outputHTML } } = acyort
  renderer(
    {
      [templateName]: testArr,
    },
    globalData,
    acyort,
  )
  expect(outputHTML).toBeCalledTimes(testArr.length)
  // expect(outputHTML)
  outputHTML.mock.calls.forEach(e => callMatch(e, matchFnc))
}

describe('test renderer', () => {
  const posts = [{ path: 'postsPath', body: 'body' }]
  const pages = [{ path: 'pagesPath', content: 'content' }]
  const archives = [
    { path: 'archivesPath', pagination: 'archivesPagination', data: [] },
  ]
  const index = [{ path: 'indexPath', pagination: 'indexPagination', data: [] }]
  let outputHTML
  let acyort
  beforeEach(() => {
    outputHTML = jest.fn()
    acyort = {
      util: {
        outputHTML,
      },
    }
  })
  it('test renderer index', () => {
    const matchFnc = (callArg, arr) => arr.findIndex((each) => {
      // const keys = Object.keys(callArg)
      const { template, path, data } = callArg
      return (
        template === 'index'
          && path === each.path
          && data.posts === each.data
          && data.pagination === each.pagination
          && data.globalData.testGlobal === 'testtest'
      )
      // return
    })
    testFnc(index, 'index', matchFnc, acyort, {
      testGlobal: 'testtest',
    })
  })
  it('test renderer archives', () => {
    const matchFnc = (callArg, arr) => arr.findIndex((each) => {
      // const keys = Object.keys(callArg)
      const { template, path, data } = callArg
      return (
        template === 'archives'
          && path === each.path
          && data.archives === each.data
          && data.pagination === each.pagination
      )
      // return
    })
    testFnc(archives, 'archives', matchFnc, acyort)
  })
  it('test renderer posts', () => {
    const matchFnc = (callArg, arr) => arr.findIndex((each) => {
      // const keys = Object.keys(callArg)
      const { template, path, data } = callArg
      return (
        template === 'post' && path === each.path && data.body === each.body
      )
      // return
    })
    testFnc(posts, 'posts', matchFnc, acyort)
  })
  it('test renderer pages', () => {
    const matchFnc = (callArg, arr) => arr.findIndex((each) => {
      // const keys = Object.keys(callArg)
      const { template, path, data } = callArg
      return (
        template === 'page'
          && path === each.path
          && data.content === each.content
          && data.globalData.pageGlobal === 'page global'
      )
      // return
    })
    testFnc(pages, 'pages', matchFnc, acyort, {
      pageGlobal: 'page global',
    })
  })
  it('test render tags', () => {
    const tags = [
      [{ name: 'label1' }],
      [{ name: 'label2' }, { name: 'label2-2' }],
      [{ name: 'label3' }],
    ]
    renderer({ tags }, {}, acyort)
    expect(outputHTML).toBeCalledTimes(tags.reduce((s, each) => s + each.length, 0))
    const flat = lodash.flatten(tags)
    outputHTML.mock.calls.forEach((e, i) => {
      expect(e[0].data).toMatchObject(flat[i])
    })
  })
  it('test render tagsMain', () => {
    const tagsMain = {
      path: 'path/to/tagsMain',
      data: 'tagsMain/data',
    }
    renderer({
      tagsMain,
    }, {}, acyort)
    expect(outputHTML).toBeCalledTimes(1)
  })
})
