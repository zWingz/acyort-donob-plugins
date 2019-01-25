const { join } = require('path')
const fs = require('fs-extra')
const parseMd = require('../lib/markdown')

describe('test markdown parse', () => {
  it('test heading parse', () => {
    const content = fs.readFileSync(join(__dirname, './fixtures/parse.md'), {
      encoding: 'utf8',
    })
    expect(parseMd(content)).toMatchSnapshot('parseMd')
  })
  it('test parse code', () => {
    const code = `
\`\`\`javascript
const a = 1
const b = 1
const c = a + b
\`\`\`
    `
    const content = parseMd(code)
    expect(content).toMatchSnapshot('parseCode')
  })
  it('test code with lineNumber', () => {
    const code = `
\`\`\`js
const a = 1
const b = 1
const c = a + b
\`\`\`
`
    const content = parseMd(code, {
      lineNumber: true,
    })
    expect(content).toMatchSnapshot('parseCodeLineNumber')
  })
  it('test code with uknow lang', () => {
    const c = `
\`\`\`fdsa
const a = 1
const b = 1
const c = a + b
\`\`\`
    `
    const content = parseMd(c)
    expect(content).toMatchSnapshot('parseCodeUnknowLang')
  })
})
