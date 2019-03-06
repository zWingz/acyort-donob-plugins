const fs = require('fs-extra')
const { join } = require('path')
const nock = require('nock')
const fetch = require('../lib/fetcher')

describe('test listIssues', () => {
  const repository = 'lalal/fdsa'
  const gitToken = '123#12312321'
  const creator = 'craetor'
  const issuesPageSize = '20'
  it('test octokit listForRepo', async () => {
    const testQuery = jest.fn()
    const data = []
    nock('https://api.github.com')
      .get(`/repos/${repository}/issues`)
      .query((query) => {
        testQuery(query)
        return true
      })
      .reply(200, data)
    const d = await fetch({
      repository,
      gitToken,
      issuesPageSize,
      author: creator,
    })
    expect(testQuery).toBeCalledTimes(1)
    expect(testQuery).toBeCalledWith({
      sort: 'created',
      per_page: issuesPageSize,
      direction: 'desc',
      page: '1',
      creator,
    })
    expect(d).toEqual(data)
  })
  it('test multi page', async () => {
    const testQuery = jest.fn()
    const data = [1, 2, 3]
    const data2 = [4, 6, 7]
    let index = 0
    nock('https://api.github.com')
      .defaultReplyHeaders({
        link() {
          if (index) return null
          index += 1
          return 'rel="next"'
        },
      })
      .get(`/repos/${repository}/issues`)
      .times(2)
      .query((query) => {
        testQuery(query)
        return true
      })
      .reply(200, (url, body, cb) => cb(null, [200, index ? data2 : data]))
    const d = await fetch({
      repository,
      gitToken,
    })
    expect(testQuery).toBeCalledTimes(2)
    expect(d).toEqual(data.concat(data2))
  })
  it('test fetch fail', async () => {
    nock('https://api.github.com')
      .get(`/repos/${repository}/issues`)
      .query(true)
      .reply(500, 'error in api')
    const d = await fetch({
      repository, gitToken,
    })
    expect(d).toEqual([])
  })
  it('error when missing repository or gitToken', async () => {
    expect(fetch()).rejects.toThrow('missing repository')
  })
  it('issuesCache', async () => {
    fs.removeSync(join(__dirname, '../lib/issues.json'))
    const data = [12, 34, 56]
    nock('https://api.github.com')
      .get(`/repos/${repository}/issues`)
      .query(true)
      .reply(200, data)
    await fetch({
      repository, gitToken, issuesCache: true,
    })
    nock.cleanAll()
    const cached = await fetch({
      repository, gitToken, issuesCache: true,
    })
    expect(cached).toEqual(data)
    fs.removeSync(join(__dirname, '../lib/issues.json'))
  })
})
