const renderer = require('../lib/render')

const testFnc = (
  testArr,
  templateName,
  matchFnc,
  { outputHTML },
  globalData,
) => {
  const callMatch = (callArg) => {
    expect(matchFnc(callArg[0], testArr)).not.toEqual(-1)
  }
  renderer(
    {
      [templateName]: testArr,
    },
    globalData,
    { outputHTML },
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
      outputHTML,
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
})
