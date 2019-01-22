const acyort = require('acyort')
const config = require('acyort/lib/config')
const fetcher = require('acyort-plugin-fetch-issues')
const rss = require('..')
const renderer = require('acyort-donob-renderer')
const path = require('path')

const ins = acyort(config(path.join(__dirname)))
fetcher({
  ...ins,
  store: {
    set: ins.store.set.bind({ context: ins.store, namespace: 'plugin:acyort-plugin-fetch-issues' }),
  },
})
renderer({
  ...ins,
  store: {
    get: ins.store.get.bind({ context: ins.store, namespace: 'plugin:acyort-donob-renderer' }),
    set: ins.store.set.bind({ context: ins.store, namespace: 'plugin:acyort-donob-renderer' }),
  },
})
rss({
  ...ins,
  store: {
    get: ins.store.get.bind({ context: ins.store, namespace: 'plugin:acyort-plugin-rss' }),
    set: ins.store.set.bind({ context: ins.store, namespace: 'plugin:acyort-plugin-rss' }),
  },
})
ins.process()
