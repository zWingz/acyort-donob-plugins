
const fetcher = jest.fn().mockResolvedValue(100)
const cliRegister = jest.fn()
const workflow = []
const set = jest.fn()
const workflowRegister = jest.fn((fn) => {
  workflow.push(fn)
})
const config = { d: 1, c: 2 }
jest.doMock('../lib/fetcher', () => fetcher)
const plugin = require('..')

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
    expect(fetcher).toBeCalledTimes(1)
    expect(fetcher).toBeCalledWith(config)
  })
  it('workflow register', async () => {
    expect(workflowRegister).toBeCalledTimes(1)
    expect(workflow).toHaveLength(1)
    await workflow[0]()
    expect(fetcher).toBeCalledTimes(2)
    expect(set).toBeCalledTimes(1)
    expect(set).toBeCalledWith('fetch:issues', 100)
  })
})
