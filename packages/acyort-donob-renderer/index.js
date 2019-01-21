const { join } = require('path')
const logSymbols = require('log-symbols')
const ora = require('ora')
const fs = require('fs-extra')
const processor = require('./lib/processor')
const render = require('./lib/render')
const mini = require('./lib/minify')

module.exports = function ayrortDonobRenderer(acyort) {
  acyort.workflow.register(async () => {
    const {
      base, public: publicDir, favicon = '', repository = '',
    } = acyort.config
    const spinner = ora('Staring to process...')
    spinner.start()
    const data = acyort.store.get('issues', 'acyort-plugin-fetch-issues')
    const { rssItems, ...rst } = processor(data, acyort)
    const rssData = {
      items: rssItems,
      rssConfig: {
        webMaster: repository.split('/')[0] || '',
      },
    }
    spinner.stopAndPersist({
      symbol: logSymbols.success,
      text: 'Succeed to process issues',
    })
    spinner.start('Staring to render html...\n')
    acyort.store.set('rssData', rssData)
    render(rst, acyort)
    spinner.stopAndPersist({
      symbol: logSymbols.success,
      text: 'Succeed to render issues',
    })
    spinner.start('Staring to copy source...\n')
    acyort.copySource()
    const fav = join(base, favicon)
    if (favicon && fs.pathExistsSync(fav)) {
      fs.copyFileSync(fav, join(base, publicDir, favicon))
    }
    spinner.stopAndPersist({
      symbol: logSymbols.success,
      text: 'Succeed to copy source',
    })
    spinner.start('Staring to minify...\n')
    await mini(join(base, publicDir))
    spinner.succeed('Succeed to minify\n')
  })
}
