const fetcher = require('./lib/fetcher')

module.exports = (acyort) => {
  // run(acyort)
  acyort.cli.register('commands', {
    name: 'fetch',
    fullName: 'fetch',
    description: 'fetch github issues',
    action() {
      fetcher(this.config)
    },
  })
  acyort.workflow.register(async () => {
    const data = await fetcher.call(acyort, acyort.config)
    acyort.store.set('issues', data)
  })
}
