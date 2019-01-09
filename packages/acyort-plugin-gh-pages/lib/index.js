const ghpages = require('gh-pages')
const ora = require('ora')
const path = require('path')

function push(config) {
  const { base, public: publicPath, ghPages = {} } = config
  const outputDir = path.join(base, publicPath)
  const spinner = ora({
    text: 'Starting to publish...\n',
    color: 'green',
  }).start()
  ghpages.publish(outputDir, ghPages, (err) => {
    if (err) {
      spinner.fail('Publish to gh-pages fail')
    } else {
      spinner.succeed('Publish to gh-pages succeed')
    }
  })
}

function AcyortPluginGhPages(acyort) {
  acyort.cli.register('commands', {
    name: 'ghpage',
    fullName: 'ghpage',
    description: 'publish to gh-pages',
    action() {
      push(this.config)
    },
  })
  acyort.workflow.register(() => {
    push.call(acyort, acyort.config)
  })
}
AcyortPluginGhPages.name = 'acyort-plugin-ghpages'
module.exports = AcyortPluginGhPages
