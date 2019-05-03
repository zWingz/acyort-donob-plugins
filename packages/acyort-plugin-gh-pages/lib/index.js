const ghpages = require('gh-pages')
const ora = require('ora')
const path = require('path')
const dayjs = require('dayjs')

module.exports = function push(config) {
  const { base, public: publicPath, ghPages = {} } = config
  const outputDir = path.join(base, publicPath)
  const spinner = ora({
    text: 'Starting to publish...\n',
    color: 'green',
  }).start()
  const date = dayjs().format('YYYY-MM-DD hh:mm:ss')
  ghpages.publish(outputDir, { ...ghPages, message: `Updated by gh-pages - ${date}` }, (err) => {
    if (err) {
      spinner.fail('Publish to gh-pages fail')
    } else {
      spinner.succeed('Publish to gh-pages succeed')
    }
  })
}
