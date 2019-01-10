const config = require('acyort/lib/config/')

process.env.NODE_DEBUG = 'gh-pages'
const path = require('path')
const acyort = require('acyort')({
  ...config(path.resolve(__dirname, './fixtures')),
  public: 'temp',
  template: 'ccc45',
})
const plugin = require('..')

plugin(acyort)
acyort.process()
