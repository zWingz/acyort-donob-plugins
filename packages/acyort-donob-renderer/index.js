const { join } = require('path')
const logSymbols = require('log-symbols')
const ora = require('ora')
const fs = require('fs-extra')
const { toc } = require('acyort-util-md')
const processor = require('./lib/processor')
const render = require('./lib/render')
const mini = require('./lib/minify')

console.log(112);

module.exports = function ayrortDonobRenderer(acyort) {
  acyort.helper.register('_toc', toc)
  acyort.workflow.register(async () => {
    /* istanbul ignore next */
    const {
      base,
      public: publicDir,
      favicon = '',
      repository = '',
    } = acyort.config.get()
    const spinner = ora('Starting to process...')
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
    spinner.start('Starting to render html...\n')
    acyort.store.set('rssData', rssData)
    render(
      rst,
      {
        rssPath: 'rss.xml',
      },
      acyort,
    )
    spinner.stopAndPersist({
      symbol: logSymbols.success,
      text: 'Succeed to render html',
    })
    spinner.start('Starting to copy source...\n')
    acyort.util.copySource()
    /* istanbul ignore next */
    if (favicon) {
      const fav = join(base, favicon)
      if (fs.pathExistsSync(fav)) {
        fs.copyFileSync(fav, join(base, publicDir, favicon))
      }
    }
    spinner.stopAndPersist({
      symbol: logSymbols.success,
      text: 'Succeed to copy source',
    })
    spinner.start('Starting to minify...\n')
    await mini(join(base, publicDir))
    spinner.succeed('Succeed to minify\n')
  })
}
