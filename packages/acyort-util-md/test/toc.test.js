const cheerio = require('cheerio')
const { toc, parseMd } = require('..')

describe('test toc', () => {
  it('test generate toc', () => {
    const markdownString = `
## heading1
  content
## heading2
### Sub-heading
## heading 3
`
    const str = toc(markdownString)
    const $ = cheerio.load(str)
    expect($('a')).toHaveLength(4)
    expect($('li')).toHaveLength(4)
    expect($('ul')).toHaveLength(2)
    expect($('a[href="#sub-heading"]').text()).toEqual('Sub-heading')
    expect($('a[href="#heading-3"]').text()).toEqual('heading 3')
  })
  it('test toc repeat slugger', () => {
    const mdString = `
## heading1
## heading1-1
### heading1
## heading1-2
## 测试中文 啦啦啦
    `
    const str = toc(mdString)
    const content = parseMd(mdString)
    const $toc = cheerio.load(str)
    const $md = cheerio.load(content)
    const $a = $toc('a')
    $md('.heading').each((idx, element) => {
      const { id } = element.attribs
      const href = $a
        .eq(idx)
        .attr('href')
        .replace('#', '')
      expect(id).toEqual(decodeURI(href))
      expect($md(element).text()).toEqual($a.eq(idx).text())
    })
    expect($toc('a[href="#heading1-1"]'))
  })
})
