# acyort-donob-plugins

[DEMO](https://zwing.site)

## Usage

### acyort-plugin-fetch-issues

```yaml
# config.yml

# fetch config
repository: # optional, used in gitalk and acyort-plugin-fetch
author: # issues creator, default repo owner
gitToken:  # your github token
issuesPageSize: # issues per_page, default: 20
issuesCache: # cache issues
```

### acyort-donob-renderer

``` yaml
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

``` yaml
# config.yml
template: acyort-templates-donob-plus
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

``` yaml
ghPages:
  # gh-pages config

plugins:
  - acyort-plugin-ghpages
```

### acyort-util-md

parser for `markdown`
