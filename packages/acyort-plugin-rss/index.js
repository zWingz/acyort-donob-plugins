const { join } = require('path')
const fs = require('fs-extra')
const acyortPluginRss = require('./lib')

module.exports = function ayrortDonobRenderer(acyort) {
  acyort.workflow.register(() => {
    const {
      public: publicDir,
      favicon: imageUrl = '',
      url,
      title,
      description,
      rss: globalConfig,
      rssDataFrom = 'acyort-donob-renderer',
      base,
    } = acyort.config
    if (!url || !globalConfig) {
      return
    }
    const { rssConfig: pluginConfig = {}, items } = acyort.store.get(
      'rssData',
      rssDataFrom,
    )
    const rss = acyortPluginRss(
      {
        title,
        description,
        pubDate: new Date(),
        siteUrl: url,
        feedUrl: `${url}/rss.xml`,
        imageUrl: imageUrl ? `${url}/favicon.ico` : '',
        ...pluginConfig,
        ...(globalConfig === true ? {} : globalConfig),
      },
      items,
    )
    fs.outputFileSync(join(base, publicDir, 'rss.xml'), rss, {
      encoding: 'utf-8',
    })
  })
}
