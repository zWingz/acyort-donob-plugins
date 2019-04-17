const { frontMatter } = require('../index.js')

describe('test frontMatter', () => {
  it('get front-matter', () => {
    const str = `
---
title: Blog
data2: dada
---
My awesome blog.`
    const data = frontMatter(str)
    expect(data.title).toBe('Blog')
    expect(data.data2).toBe('dada')
  })
})
