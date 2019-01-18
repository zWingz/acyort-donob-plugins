const config = require('acyort/lib/config/')

process.env.NODE_DEBUG = 'gh-pages'
const path = require('path')
const acyort = require('acyort')({
  ...config(path.resolve(__dirname, '.')),
})
const plugin = require('..')

plugin({
  ...acyort,
  store: {
    store: [],
    set: acyort.store.set.bind({ context: acyort.store, namespace: 'plugin:acyort-plugin-fetch-issues' }),
  },
})
acyort.process()
