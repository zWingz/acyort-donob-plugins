const minify = require('html-minifier').minify
const fs = require('fs-extra')

async function min(path) {
  const content = await fs.readFile(path, {
    encoding: 'utf-8',
  })
  const miniHTML = minify(content)
  fs.writeFile(path, miniHTML)
}
