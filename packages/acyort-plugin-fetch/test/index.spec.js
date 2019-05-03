const nock = require('nock')
const plugin = require('..')

const cliRegister = jest.fn()
const workflow = []
const set = jest.fn()
const issues = [1, 2, 3, 4, 5]
const workflowRegister = jest.fn((fn) => {
  workflow.push(fn)
})

const repository = 'zwing/repo'
const config = {
  get() {
    return { repository, gitToken: '1233#fdsa' }
  },
}

const acyort = {
  cli: {
    register: cliRegister,
  },
  workflow: {
    register: workflowRegister,
  },
  config,
  store: {
    set,
  },
}

describe('test acyort plugins', () => {
  plugin(acyort)
  it('register command', () => {
    expect(cliRegister).toBeCalledTimes(1)
    expect(cliRegister.mock.calls[0][0]).toEqual('commands')
    expect(cliRegister.mock.calls[0][1]).toMatchObject({
      name: 'fetch',
      fullName: 'fetch',
      description: 'fetch github issues',
      action: expect.any(Function),
    })
    cliRegister.mock.calls[0][1].action.call({ config })
  })
  it('workflow register', async () => {
    nock('https://api.github.com')
      .get(`/repos/${repository}/issues`)
      .query(true)
      .reply(200, issues)
    expect(workflowRegister).toBeCalledTimes(1)
    expect(workflow).toHaveLength(1)
    await workflow[0]()
    expect(set).toBeCalledTimes(1)
    expect(set).toBeCalledWith('issues', issues)
  })
})
