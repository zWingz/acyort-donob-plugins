const cheerio = require('cheerio')
const { parseMd } = require('..')

describe('test parseMd', () => {
  it('test generate md', () => {
    const md = `
# heading
content one
## heading2
\`\`\` javascript
const a = 1
\`\`\`
`
    const dom = parseMd(md)
    const $ = cheerio.load(dom)
    expect($('p').text()).toEqual('content one')
    expect($('#heading')).toHaveLength(1)
    expect($('#heading2')).toHaveLength(1)
    expect($('[data-language="javascript"]')).toHaveLength(1)
  })
  it('test code-highlight', () => {
    const md = `
\`\`\` javascript
const a = 1 // highlight-line
// highlight-next-line
const b = 2
// highlight-start
const c = a + b
const d = c + a
// highlight-end
function test() {}
\`\`\`
`
    const dom = parseMd(md)
    const $ = cheerio.load(dom)
    expect($('.gatsby-highlight-code-line')).toHaveLength(4)
  })
  it('test showLineNumber', () => {
    const md = `
\`\`\` javascript
// const a = 1
// const b = 2

// const c = a + b
// const d = c + a

// function test() {}
\`\`\`
`
    const dom = parseMd(md, {
      highlightOpt: {
        showLineNumbers: true,
      },
    })
    const $ = cheerio.load(dom)
    expect($('.line-numbers-rows span')).toHaveLength(8)
  })
  it('test prettier', () => {
    const md = `
\`\`\`javascript
const a = "b";
const b=123;
\`\`\`
`
    const dom = parseMd(md)
    expect(/;/.test(dom)).toBeFalsy()
    expect(/"b"/.test(dom)).toBeFalsy()
    expect(/'b'/.test(dom)).toBeTruthy()
  })
})
