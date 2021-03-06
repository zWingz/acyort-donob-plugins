const get = jest.fn().mockResolvedValue([])
const set = jest.fn()
const copySource = jest.fn().mockReturnValue(1)
const min = jest.fn()
const { join } = require('path')

const copyFileSync = jest.fn()
const helperRegister = jest.fn()
const favicon = 'fafdsafdsa'
jest.doMock('../lib/minify', () => min)
jest.doMock('fs-extra', () => ({
  copyFileSync, pathExistsSync: () => true,
}))
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
      set,
    },
    util: {
      copySource,
    },
    workflow: {
      register,
    },
    config: {
      get() {
        return {
          base,
          public: publicDir,
          favicon,
        }
      },
    },
    helper: {
      register: helperRegister,
    },
  })
  it('test workflow register', () => {
    expect(register).toBeCalledTimes(1)
    expect(cache).toHaveLength(1)
    expect(helperRegister).toBeCalledTimes(1)
    expect(helperRegister).toBeCalledWith('_toc', expect.any(Function))
  })
  it('test workflow exec', async () => {
    await cache[0]()
    expect(copySource).toBeCalledTimes(1)
    expect(copyFileSync).toBeCalledTimes(1)
    expect(copyFileSync).toBeCalledWith(join(base, favicon), join(base, publicDir, favicon))

    expect(get).toBeCalledTimes(1)
    expect(set).toBeCalledWith('rssData', {
      items: [],
      rssConfig: {
        webMaster: '',
      },
    })

    expect(min).toBeCalledTimes(1)
    expect(min).toBeCalledWith(join(base, publicDir))
  })
})
