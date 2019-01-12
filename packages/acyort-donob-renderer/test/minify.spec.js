const fs = require('fs-extra')
const { join } = require('path')
const minify = require('../lib/minify')


describe('test minify', () => {
  const publicPath = join(__dirname, './fixtures/minify')
  const destPath = join(publicPath, '../dest')
  it('minify html && js && css', async () => {
    fs.copySync(publicPath, destPath)
    await minify(destPath)
    expect(fs.readFileSync(join(destPath, 'index.html'), {
      encoding: 'utf-8',
    })).toMatchSnapshot('minifiy:html')
    expect(fs.readFileSync(join(destPath, 'style.css'), {
      encoding: 'utf-8',
    })).toMatchSnapshot('minifiy:css')
    expect(fs.readFileSync(join(destPath, 'index.js'), {
      encoding: 'utf-8',
    })).toMatchSnapshot('minifiy:js')
    fs.removeSync(destPath)
  })
})
