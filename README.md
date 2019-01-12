# acyort-donob-plugins

## Usage

```yaml
# config.yml

# template
template: acyort-templates-donob-plus

# fetch config
repository: # optional, used in gitalk and acyort-plugin-fetch
author: # issues creator, default repo owner
gitToken:  # your github token
issuesPageSize: # issues per_page, default: 20
issuesCache: # cache issues

# renderer config
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

# gh-pages config
ghPages:
  # gh-pages config, see

plugins:
  - acyort-plugin-fetch
  - acyort-donob-renderer
  - acyort-plugin-ghpages


```
