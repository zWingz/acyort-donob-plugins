const path = require('path')
const config = require('acyort/lib/config')
const fetch = require('acyort-plugin-fetch')
const renderer = require('..')

const acyort = require('acyort')(config(path.resolve(__dirname)))

fetch(acyort)
renderer(acyort)

acyort.process()
// acyort.copyS
// acyort.

// const data = processor(issues, acyort)
// render(data, acyort)
// acyort.copySource()
