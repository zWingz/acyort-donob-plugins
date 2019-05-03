const acyort = require('acyort')
const getConfig = require('acyort/lib/config/get')
const fetcher = require('acyort-plugin-fetch-issues')

const renderer = require('..')
const path = require('path')

const ins = acyort(getConfig(path.join(__dirname)))
fetcher({
  ...ins,
  store: {
    store: [],
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
ins.workflow.start()
