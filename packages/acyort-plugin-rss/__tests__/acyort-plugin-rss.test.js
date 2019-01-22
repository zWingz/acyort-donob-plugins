const RssParser = require('rss-parser')
const rss = require('../lib')

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
    const url = 'fdsafdsfa'
    const item1 = {
      title: 'item1-title',
      date: '2019-01-01',
      description: 'itel body lllll',
      categories: ['label1', 'label2'],
      url,
    }
    const item2 = {
      title: 'item2-title',
      categories: [],
      date: '2019-05-07',
      description: 'ite2 222',
      url,
      author: 'item2 author',
    }
    const itmes = [item1, item2]
    const ret = rss(config, itmes)
    const rssRet = await parser.parseString(ret)
    const [rssItem1, rssItem2] = rssRet.items
    expect(rssItem1.content).toBe(item1.description)
    expect(rssItem1.categories).toEqual(item1.categories)
    expect(rssItem2.title).toBe(item2.title)
    expect(rssItem2.pubDate).toBe(new Date(item2.date).toUTCString())
    expect(rssItem2.link).toBe(url)
    expect(rssItem2.creator).toBe(item2.author)
    expect(rssItem1.creator).toBe(author)
  })
})
