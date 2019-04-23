# acyort-donob-plugins

[![CircleCI](https://circleci.com/gh/zWingz/acyort-donob-plugins.svg?style=svg)](https://circleci.com/gh/zWingz/acyort-donob-plugins)
[![codecov](https://codecov.io/gh/zWingz/acyort-donob-plugins/branch/master/graph/badge.svg)](https://codecov.io/gh/zWingz/acyort-donob-plugins)

[DEMO](https://zwing.site)

## Plugins

[detail](https://zwing.site/posts/417715171.html)

### acyort-plugin-fetch-issues

```yaml
# config.yml

# fetch config
repository: # optional, used in gitalk and acyort-plugin-fetch
author: # issues creator, default repo owner
gitToken: # set github token if repo is private
issuesPageSize: # issues per_page, default: 20
issuesCache: # cache issues
```

### acyort-donob-renderer

```yaml
template: acyort-templates-donob-plus

title: ''

tagsDir: # default tags
postsDir: # default posts
archivesDir: # default archives
pageSize:
  archives: # default 10
  posts: # default 10

gitalk: # default false
  clientID:
  clientSecret:
  owner: # split by repository
  repo: # split by repository
  # gitalk config

favicon: # favicon.ico, copy to public/favicon.ico
```

### acyort-templates-donob-plus

```yaml
# config.yml
template: acyort-templates-donob-plus
title: # blog title
description: # blog description

baidu: # baidu-tongji key
```

### acyort-plugin-rss

generate from [node-rss](https://github.com/dylang/node-rss)

```yaml
# config.yml
url: # site url, required
rss: # true or rssConfig, see the node-rss doc
rssDataFrom: # plugin to provide rssData, default acyort-donob-renderer
```

### acyort-plugin-ghpages

see [gh-pages](https://github.com/tschaub/gh-pages)

```yaml
ghPages:
# gh-pages config

plugins:
  - acyort-plugin-ghpages
```

### acyort-util-md

parser for `markdown`

## Markdown Extensions

See [acyort-util-md](https://github.com/zWingz/acyort-donob-plugins/blob/master/packages/acyort-util-md/README.md) for more details

### front-matter

```text
---
keywords:
  - key1
  - key2
description: posts desc
rstData1:
rstData2:
---
# This is heading
This is content
```
