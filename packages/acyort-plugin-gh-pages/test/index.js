process.env.NODE_DEBUG = 'gh-pages'
const getConfig = require('acyort/lib/config/get')
const path = require('path')
const acyort = require('acyort')({
  ...getConfig(path.resolve(__dirname, './fixtures')),
  public: 'temp',
  template: 'ccc45',
})
const plugin = require('..')

acyort.workflow.register(() => {
  acyort.util.outputHTML({
    template: 'index',
    path: 'index.html',
    data: {
      one: new Date().toLocaleTimeString(),
    },
  })
})
plugin(acyort)
acyort.workflow.start()
