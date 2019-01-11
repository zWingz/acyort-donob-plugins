const fs = require('fs-extra')
const path = require('path')

const authenticate = jest.fn()
const firstRet = ['first', 'ret']
const secRet = ['sec', 'rerrr']
const listForRepo = jest.fn().mockResolvedValueOnce({
  data: firstRet,
  headers: {
    link: 'rel="next"',
  },
}).mockResolvedValueOnce({
  data: secRet,
  headers: {
    link: 'rel="next"',
  },
}).mockRejectedValueOnce('reject')

jest.doMock('@octokit/rest', () => function rest() {
  return {
    authenticate,
    issues: {
      listForRepo,
    },
  }
})
const fetch = require('../lib/fetcher')

describe('test fetcher', () => {
  it('test fetcher', async () => {
    const repository = 'lalal/fdsa'
    const gitToken = '123#12312321'
    const d = await fetch({
      repository, gitToken,
    })
    expect(authenticate).toBeCalledWith({
      type: 'token',
      token: gitToken.split('#').join(''),
    })
    // console.log(listForRepo.mock.calls)
    expect(listForRepo.mock.calls).toMatchSnapshot('octokit.issues')
    expect(listForRepo).toBeCalledTimes(3)
    expect(d).toEqual([...firstRet, ...secRet])
  })
})

describe('test repo or token not exist', () => {
  it('reject error', async () => {
    await fetch({}).catch((e) => {
      expect(e.message).toEqual('missing repository or gitToken')
    })
  })
})


describe('test cache', () => {
  const issuesPath = path.join(__dirname, '../lib/issues.json')
  let d
  const repository = 'lalal/fdsa'
  const gitToken = '123#12312321'
  const conf = {
    repository, gitToken, issuesCache: true,
  }
  it('test cache file', async () => {
    const cacheData = [1, 2, 3, 4, 5, 6, 7]
    listForRepo.mockResolvedValue({
      data: cacheData,
      headers: {},
    })
    d = await fetch(conf)
    expect(fs.pathExistsSync(issuesPath)).toBe(true)
  })
  it('resolve cacheData if cache exist', async () => {
    const newD = await fetch(conf)
    expect(newD).toEqual(d)
    fs.removeSync(issuesPath)
  })
})
