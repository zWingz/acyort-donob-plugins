const { join } = require('path')
const acyortPluginRss = require('./lib')

module.exports = function ayrortDonobRenderer(acyort) {
  acyort.workflow.register(() => {
    const {
      public: publicDir,
      favicon = '',
      url,
      title,
      description,
      rssConfig,
    } = acyort.config
    const rss = acyortPluginRss({
      title,
      description,
      siteUrl: url,
      favicon,
      ...rssConfig,
    })
  })
}
