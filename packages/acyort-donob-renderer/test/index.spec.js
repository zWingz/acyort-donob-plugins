const get = jest.fn().mockResolvedValue([])
const copySource = jest.fn().mockReturnValue(1)
const plugins = require('..')

const cache = []
const register = jest.fn((fn) => {
  cache.push(fn)
})
describe('test register plugins', () => {
  plugins({
    store: {
      get,
    },
    copySource,
    workflow: {
      register,
    },
  })
  it('test workflow register', () => {
    expect(register).toBeCalledTimes(1)
    expect(cache).toHaveLength(1)
  })
  it('test workflow exec', async () => {
    await cache[0]()
    expect(copySource).toBeCalledTimes(1)
  })
})
