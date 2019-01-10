const logSymbols = require('log-symbols')
const ora = require('ora')
const processor = require('./lib/processor')
const render = require('./lib/render')


module.exports = function ayrortDonobRenderer(acyort) {
  acyort.workflow.register(async () => {
    const spinner = ora('Staring to process...')
    spinner.start()
    const data = await acyort.store.get('fetch:issues')
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
    spinner.start('Staring to copy source...')
    acyort.copySource()
    spinner.succeed('Succeed to copy source')
  })
}
