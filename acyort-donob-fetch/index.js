const fetcher = require('./lib/fetcher')

module.exports = (acyort) => {
  // run(acyort)
  acyort.cli.register('commands', {
    name: 'fetch',
    fullName: 'fetch',
    description: 'fetch github pages',
    action() {
      fetcher(this)
    },
  })
  acyort.workflow.register(() => {
    fetcher.call(acyort, acyort)
  })
}
