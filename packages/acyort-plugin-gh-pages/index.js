const push = require('./lib')

function AcyortPluginGhPages(acyort) {
  acyort.cli.register('commands', {
    name: 'ghpage',
    fullName: 'ghpage',
    description: 'publish to gh-pages',
    action() {
      push(this.config.get())
    },
  })
  acyort.workflow.register(() => {
    push(acyort.config.get())
  })
}
AcyortPluginGhPages.name = 'acyort-plugin-ghpages'
module.exports = AcyortPluginGhPages
