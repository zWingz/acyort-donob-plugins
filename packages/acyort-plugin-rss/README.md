# `acyort-plugin-rss`

use [node-rss](https://github.com/dylang/node-rss) to generate `rss` from `acyort`

## Usage

```yaml
# config.yml
url: # site url
rss: # true or rssConfig, see the node-rss doc
rssDataFrom: # plugin to provide rssData, default acyort-donob-renderer
```

## plugin to provide rssData

```javascript
const rssData = {
  rssConfig: {},
  items: []
}
acyort.store.set('rssData', rssData)
```

and set config

```yaml
rssDataFrom: rss-data-provider-plugin-name
```



## Related

- [node-rss](https://github.com/dylang/node-rss)
