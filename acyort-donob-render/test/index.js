const config = require('acyort/lib/config/')
const path = require('path')

const acyort = require('acyort')({
  // ...config(path.resolve(__dirname, 'temp')),
  base: path.resolve(__dirname, 'temp'),
  title: 'zWing',
  menu: {
    Archives: '/archives',
    About: '/about',
  },
  public: '/',
  language: 'en',
  root: '/',
  template: '../../../../acyort-templates-donob-plus/templates',
})
const issues = require('../../acyort-donob-fetch/lib/issues.json')
const processor = require('../lib/processor')
const render = require('../lib/render')

const data = processor(issues, acyort)
render(data, acyort)
acyort.copySource()
