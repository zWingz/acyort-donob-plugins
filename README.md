# acyort-donob-plugins

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

### acyort-plugin-ghpages

see [gh-pages](https://github.com/tschaub/gh-pages)

``` yaml
ghPages:
  # gh-pages config

plugins:
  - acyort-plugin-fetch
  - acyort-donob-renderer
  - acyort-plugin-ghpages
```
