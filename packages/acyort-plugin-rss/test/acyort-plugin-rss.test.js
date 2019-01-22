const RssParser = require('rss-parser')
const { join } = require('path')
const acyort = require('acyort')
const fs = require('fs-extra')
const rss = require('../lib')
const plugin = require('..')
const { acyortConfig, items } = require('./fixtures/rss')

const parser = new RssParser()

describe('test rss', () => {
  it('rss config', async () => {
    const url = 'https://zwing.ste'
    const config = {
      title: 'rss title',
      description: 'rss description',
      feedUrl: `${url}/rss.xml`,
      siteUrl: url,
      author: 'author',
      favicon: `${url}/favicon.ico`,
      pubDate: '2019 01-21',
    }
    const ret = rss(config, [])
    const rssRet = await parser.parseString(ret)
    expect(rssRet.title).toBe(config.title)
    expect(rssRet.description).toBe(config.description)
    expect(rssRet.link).toBe(config.siteUrl)
    expect(rssRet.feedUrl).toBe(config.feedUrl)
    expect(rssRet.pubDate).toBe(new Date(config.pubDate).toUTCString())
  })
  it('rss items', async () => {
    const author = ' fdsafdsaf'
    const config = {
      author,
    }
    const [item1, item2] = items
    const ret = rss(config, items)
    const rssRet = await parser.parseString(ret)
    const [rssItem1, rssItem2] = rssRet.items
    expect(rssItem1.content).toBe(item1.description)
    expect(rssItem1.categories).toEqual(item1.categories)
    expect(rssItem2.title).toBe(item2.title)
    expect(rssItem2.pubDate).toBe(new Date(item2.date).toUTCString())
    expect(rssItem2.link).toBe(item2.url)
    expect(rssItem2.creator).toBe(item2.author)
    expect(rssItem1.creator).toBe(author)
  })
})

function exec(config, pluginRssConfig) {
  const ins = acyort(config)
  ins.store.store.push({
    key: 'plugin:test:rssData',
    data: {
      rssConfig: pluginRssConfig,
      items,
    },
  })
  plugin({
    ...ins,
    store: {
      get: ins.store.get.bind({
        context: ins.store,
        namespace: 'plugin:acyort-plugin-rss',
      }),
    },
  })
  ins.process()
}

describe('test plugin', () => {
  const tempDir = join(__dirname, 'temp')
  const rssPath = join(tempDir, 'rss.xml')
  const date = global.Date
  beforeAll(() => {
    const mockedDate = new Date(2019, 1, 22)
    global.Date = class extends Date {
      constructor() {
        return mockedDate
      }
    }
  })
  afterAll(() => {
    global.Date = date
  })
  afterEach(() => {
    fs.removeSync(tempDir)
  })
  it('test plugins workflow', () => {
    exec(acyortConfig)
    expect(fs.pathExistsSync(rssPath)).toBeTruthy()
  })
  it('not generate rss when store.rssData not exist', () => {
    exec({
      ...acyortConfig,
      rssDataFrom: undefined,
    })
    expect(fs.pathExistsSync(rssPath)).toBeFalsy()
  })
  it('not generate rss when rss=false', () => {
    exec({
      ...acyortConfig,
      rss: false,
    })
    expect(fs.pathExistsSync(rssPath)).toBeFalsy()
  })
  it('not generate rss when url is empty', () => {
    exec({
      ...acyortConfig,
      url: '',
    })
    expect(fs.pathExistsSync(rssPath)).toBeFalsy()
  })
  it('test rss content', async () => {
    const pluginRssConfig = {
      title: 'title from plugin',
    }
    exec(
      { ...acyortConfig, favicon: 'favicon.ico', rss: { webMaster: 'master' } },
      pluginRssConfig,
    )
    const rssContent = await parser.parseString(fs.readFileSync(rssPath))
    expect(rssContent).toMatchSnapshot('rssContent')

    // test channel
    expect(rssContent.feedUrl).toBe(`${acyortConfig.url}/rss.xml`)
    expect(rssContent.link).toBe(`${acyortConfig.url}`)
    expect(rssContent.image.url).toBe(`${acyortConfig.url}/favicon.ico`)
    expect(rssContent.image.link).toBe(acyortConfig.url)
    expect(rssContent.title).toBe(pluginRssConfig.title)
    expect(rssContent.description).toBe(acyortConfig.description)

    // test items
    const [item1, item2] = rssContent.items
    expect(item1.link).toBe(items[0].url)
    expect(item1.creator).toBe('master')
    expect(item1.content).toBe(items[0].description)
    expect(item2.creator).toBe(items[1].author)
  })
})
