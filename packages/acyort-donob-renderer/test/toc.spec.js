const fs = require('fs-extra')
const { join } = require('path')
const toc = require('../lib/toc')

describe('test toc', () => {
  it('render toc', () => {
    const content = fs.readFileSync(join(__dirname, './fixtures/parse.md'), {
      encoding: 'utf8',
    })
    const html = toc(content)
    expect(html).toMatchSnapshot('toc')
  })
})
