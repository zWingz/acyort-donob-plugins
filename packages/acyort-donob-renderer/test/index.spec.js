const get = jest.fn().mockResolvedValue([])
const copySource = jest.fn().mockReturnValue(1)
const min = jest.fn()
const { join } = require('path')

jest.doMock('../lib/minify', () => min)

const cache = []
const register = jest.fn((fn) => {
  cache.push(fn)
})
const base = './fdsaf'
const publicDir = 'fda'
const plugins = require('..')

describe('test register plugins', () => {
  plugins({
    store: {
      get,
    },
    copySource,
    workflow: {
      register,
    },
    config: {
      base,
      public: publicDir,
    },
  })
  it('test workflow register', () => {
    expect(register).toBeCalledTimes(1)
    expect(cache).toHaveLength(1)
  })
  it('test workflow exec', async () => {
    await cache[0]({
      config: {
        base, public: publicDir,
      },
    })
    expect(copySource).toBeCalledTimes(1)
    expect(min).toBeCalledTimes(1)
    expect(min).toBeCalledWith(join(base, publicDir))
  })
})
