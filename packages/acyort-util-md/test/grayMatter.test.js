const { frontMatter } = require('../index.js')

describe('test frontMatter', () => {
  it('get front-matter', () => {
    const str = `
---
title: Blog
data2: 
    - 1
    - 2
data3: 
    dd: 1
    ff: 2
---
My awesome blog.`
    const data = frontMatter(str)
    expect(data.title).toBe('Blog')
    expect(data.data2).toEqual([1, 2])
    expect(data.data3).toEqual({
      dd: 1,
      ff: 2,
    })
  })
})
