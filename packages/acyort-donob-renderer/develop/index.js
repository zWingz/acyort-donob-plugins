const acyort = require('acyort')
const config = require('acyort/lib/config')
const fetcher = require('acyort-plugin-fetch')

const renderer = require('..')
const path = require('path')

const ins = acyort(config(path.join(__dirname)))
fetcher(ins)
renderer(ins)
ins.process()
