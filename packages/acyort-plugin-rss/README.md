# `acyort-plugin-rss`

plugin for [acyort](https://github.com/acyortjs/acyort/)
use [node-rss](https://github.com/dylang/node-rss) to generate `rss`

## Usage

```yaml
# config.yml
url: # site url
rss: # true or rssConfig, see the node-rss doc
rssDataFrom: # plugin to provide rssData, default acyort-donob-renderer
```

## RssData Provider

```javascript
const rssData = {
  rssConfig: {}, // rss config
  items: [] // rss items
}
acyort.store.set('rssData', rssData)
```

and set config

```yaml
rssDataFrom: rss-data-provider-plugin-name
```

## Related

- [node-rss](https://github.com/dylang/node-rss)
