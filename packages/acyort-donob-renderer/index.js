const { join } = require('path')
const logSymbols = require('log-symbols')
const ora = require('ora')
const processor = require('./lib/processor')
const render = require('./lib/render')
const mini = require('./lib/minify')

module.exports = function ayrortDonobRenderer(acyort) {
  acyort.workflow.register(() => {
    const spinner = ora('Staring to process...')
    spinner.start()
    const data = acyort.store.get('fetch:issues')
    spinner.stopAndPersist({
      symbol: logSymbols.success,
      text: 'Succeed to process issues',
    })
    spinner.start('Staring to render html...\n')
    const processData = processor(data, acyort)
    render(processData, acyort)
    spinner.stopAndPersist({
      symbol: logSymbols.success,
      text: 'Succeed to render issues',
    })
    spinner.start('Staring to copy source...\n')
    acyort.copySource()
    const { base, public: publicDir } = acyort.config
    spinner.stopAndPersist({
      symbol: logSymbols.success,
      text: 'Succeed to copy source',
    })
    spinner.start('Staring to minify...\n')
    mini(join(base, publicDir))
    spinner.succeed('Succeed to minify\n')
  })
}
