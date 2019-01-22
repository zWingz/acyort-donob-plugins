const url = 'https://xzy.com'

const acyortConfig = {
  title: 'test rss',
  description: 'test rss description',
  url,
  public: '/temp',
  rss: true,
  base: './test',
  rssDataFrom: 'test',
}

const items = [
  {
    guid: 1,
    title: 'item1-title',
    date: '2019-01-01',
    description: 'itel body lllll',
    categories: ['label1', 'label2'],
    url: 'path/to/item1',
  },
  {
    guid: 2,
    title: 'item2-title',
    categories: [],
    date: '2019-05-07',
    description: 'ite2 222',
    url: 'path/to/item2',
    author: 'item2 author',
  },
]

module.exports = {
  acyortConfig,
  items,
}
